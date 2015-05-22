// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * @fileoveriew A router that handles incoming server rpcs.
 * @private
 */

var Promise = require('../lib/promise');
var Stream = require('../proxy/stream');
var MessageType = require('../proxy/message-type');
var Incoming = MessageType.Incoming;
var Outgoing = MessageType.Outgoing;
var ErrorConversion = require('../vdl/error-conversion');
var vlog = require('./../lib/vlog');
var StreamHandler = require('../proxy/stream-handler');
var verror = require('../gen-vdl/v.io/v23/verror');
var createSecurityCall = require('../security/create-security-call');
var createServerCall = require('./create-server-call');
var vdl = require('../vdl');
var typeUtil = require('../vdl/type-util');
var Deferred = require('../lib/deferred');
var capitalize = require('../vdl/util').capitalize;
var namespaceUtil = require('../naming/util');
var naming = require('../gen-vdl/v.io/v23/naming');
var Glob = require('./glob');
var GlobStream = require('./glob-stream');
var ServerRpcReply =
  require('../gen-vdl/v.io/x/ref/services/wspr/internal/lib').ServerRpcReply;
var serverVdl =
  require('../gen-vdl/v.io/x/ref/services/wspr/internal/rpc/server');
var CaveatValidationResponse = serverVdl.CaveatValidationResponse;
var AuthReply = serverVdl.AuthReply;
var LookupReply = serverVdl.LookupReply;
var vtrace = require('../vtrace');
var lib =
  require('../gen-vdl/v.io/x/ref/services/wspr/internal/lib');
var Blessings = require('../security/blessings');
var BlessingsId =
  require('../gen-vdl/v.io/x/ref/services/wspr/internal/principal').BlessingsId;
var WireBlessings =
  require('../gen-vdl/v.io/v23/security').WireBlessings;
var SharedContextKeys = require('../runtime/shared-context-keys');
var hexVom = require('../lib/hex-vom');
var vom = require('../vom');
var byteUtil = require('../vdl/byte-util');

/**
 * A router that handles routing incoming requests to the right
 * server
 * @constructor
 * @private
 */
var Router = function(
  proxy, appName, rootCtx, controller, caveatRegistry, blessingsManager) {
  this._servers = {};
  this._proxy = proxy;
  this._streamMap = {};
  this._contextMap = {};
  this._appName = appName;
  this._rootCtx = rootCtx;
  this._caveatRegistry = caveatRegistry;
  this._outstandingRequestForId = {};
  this._controller = controller;
  this._blessingsManager = blessingsManager;

  proxy.addIncomingHandler(Incoming.INVOKE_REQUEST, this);
  proxy.addIncomingHandler(Incoming.LOOKUP_REQUEST, this);
  proxy.addIncomingHandler(Incoming.AUTHORIZATION_REQUEST, this);
  proxy.addIncomingHandler(Incoming.CANCEL, this);
  proxy.addIncomingHandler(Incoming.CAVEAT_VALIDATION_REQUEST, this);
  proxy.addIncomingHandler(Incoming.LOG_MESSAGE, this);
};

Router.prototype.handleRequest = function(messageId, type, request) {
  switch (type) {
    case Incoming.INVOKE_REQUEST:
      this.handleRPCRequest(messageId, request);
      break;
    case Incoming.LOOKUP_REQUEST:
      this.handleLookupRequest(messageId, request);
      break;
    case Incoming.AUTHORIZATION_REQUEST:
      this.handleAuthorizationRequest(messageId, request);
      break;
    case Incoming.CANCEL:
      this.handleCancel(messageId, request);
      break;
    case Incoming.CAVEAT_VALIDATION_REQUEST:
      this.handleCaveatValidationRequest(messageId, request);
      break;
    case Incoming.LOG_MESSAGE:
      if (request.level ===  typeUtil.unwrap(lib.LogLevel.INFO)) {
        vlog.logger.info(request.message);
      } else if (request.level === typeUtil.unwrap(lib.LogLevel.ERROR)) {
        vlog.logger.error(request.message);
      } else {
        vlog.logger.error('unknown log level ' + request.level);
      }
      break;
    default:
      vlog.logger.error('Unknown request type ' + type);
  }
};

Router.prototype.handleAuthorizationRequest = function(messageId, request) {
  try {
   request = byteUtil.hex2Bytes(request);
  } catch (e) {
    var authReply = new AuthReply({
      // TODO(bjornick): Use the real context
      err: new verror.InternalError(this._rootCtx, 'Failed to decode ', e)
    });

    this._proxy.sendRequest(hexVom.encode(authReply),
                            Outgoing.AUTHORIZATION_RESPONSE, null, messageId);
    return;
  }

  var router = this;
  var decodedRequest;
  vom.decode(request).catch(function(e) {
    return Promise.reject(new verror.InternalError(router._rootCtx,
      'Failed to decode ', e));
  }).then(function(req) {
    decodedRequest = req;
    var ctx = router._rootCtx.withValue(SharedContextKeys.LANG_KEY,
                                        decodedRequest.context.language);
    var server = router._servers[decodedRequest.serverId];
    if (!server) {
      var authReply = new AuthReply({
        // TODO(bjornick): Use the real context
        err: new verror.ExistsError(ctx, 'unknown server')
      });
      router._proxy.sendRequest(hexVom.encode(authReply),
                                Outgoing.AUTHORIZATION_RESPONSE,
                                null, messageId);
      return;
    }
    return createSecurityCall(decodedRequest.call, router._blessingsManager)
    .then(function(call) {
      return server.handleAuthorization(decodedRequest.handle, ctx, call);
    });
  }).then(function() {
    var authReply = new AuthReply({});
    router._proxy.sendRequest(hexVom.encode(authReply),
                              Outgoing.AUTHORIZATION_RESPONSE, null, messageId);
  }).catch(function(e) {
    var errMsg = {
      err: ErrorConversion.fromNativeValue(e, this._appName,
                                           decodedRequest.call.method)
    };
    router._proxy.sendRequest(hexVom.encode(errMsg),
                              Outgoing.AUTHORIZATION_RESPONSE, null,
                              messageId);
  });
};

Router.prototype._validateChain = function(ctx, call, cavs) {
  var router = this;
  var promises = cavs.map(function(cav) {
    var def = new Deferred();
    router._caveatRegistry.validate(ctx, call, cav, function(err) {
      if (err) {
        return def.reject(err);
      }
      return def.resolve();
    });
    return def.promise;
  });
  return Promise.all(promises).then(function(results) {
    return undefined;
  }).catch(function(err) {
    if (!(err instanceof Error)) {
      err = new Error(
        'Non-error value returned from caveat validator: ' +
        err);
    }
    return ErrorConversion.fromNativeValue(err, router._appName,
      'caveat validation');
  });
};

Router.prototype.handleCaveatValidationRequest = function(messageId, request) {
  var router = this;
  createSecurityCall(request.call, this._blessingsManager)
  .then(function(call) {
    var ctx = router._rootCtx.withValue(SharedContextKeys.LANG_KEY,
      request.context.language);
    var resultPromises = request.cavs.map(function(cav) {
      return router._validateChain(ctx, call, cav);
    });
    return Promise.all(resultPromises).then(function(results) {
      var response = new CaveatValidationResponse({
        results: results
      });
      var data = hexVom.encode(response);
      router._proxy.sendRequest(data, Outgoing.CAVEAT_VALIDATION_RESPONSE, null,
        messageId);
    });
  }).catch(function(err) {
    throw new Error('Unexpected error (all promises should resolve): ' + err);
  });
};

Router.prototype.handleLookupRequest = function(messageId, request) {
  var server = this._servers[request.serverId];
  if (!server) {
    // TODO(bjornick): Pass in context here so we can generate useful error
    // messages.
    var reply = new LookupReply({
      err: new verror.NoExistError(this._rootCtx, 'unknown server')
    });
    this._proxy.sendRequest(hexVom.encode(reply), Outgoing.LOOKUP_RESPONSE,
                            null, messageId);
    return;
  }

  var self = this;
  return server._handleLookup(request.suffix).then(function(value) {
   var signatureList = value.invoker.signature();
   var hasAuthorizer = (typeof value.authorizer === 'function');
   var hasGlobber = value.invoker.hasGlobber();
   var reply = new LookupReply({
     handle: value._handle,
     signature: signatureList,
     hasAuthorizer: hasAuthorizer,
     hasGlobber: hasGlobber
   });
   self._proxy.sendRequest(hexVom.encode(reply), Outgoing.LOOKUP_RESPONSE,
                           null, messageId);
 }).catch(function(err) {
   var reply = new LookupReply({
     err: ErrorConversion.fromNativeValue(err, self._appName, '__Signature')
   });
   self._proxy.sendRequest(hexVom.encode(reply), Outgoing.LOOKUP_RESPONSE,
                           null, messageId);
 });
};

/**
 * Handles cancellations of in-progress requests againsts JavaScript service
 * invokations.
 * @private
 * @param {string} messageId Message Id set by the server.
 */
Router.prototype.handleCancel = function(messageId) {
  var ctx = this._contextMap[messageId];
  if (ctx && ctx.cancel) {
    ctx.cancel();
  }
};

Router.prototype.createRPCContext = function(request) {
  var ctx = this._rootCtx;
  // Setup the context passed in the context info passed in from wspr.
  if (!request.call.deadline.noDeadline) {
    var fromNow = request.call.deadline.fromNow;
    var timeout = fromNow.seconds * 1000;
    timeout += fromNow.nanos / 1000000;
    ctx = ctx.withTimeout(timeout);
  } else {
    ctx = ctx.withCancel();
  }
  ctx = ctx.withValue(SharedContextKeys.LANG_KEY,
                      request.call.context.language);
  // Plumb through the vtrace ids
  var suffix = request.call.securityCall.suffix;
  var spanName = '<jsserver>"'+suffix+'".'+request.method;
  // TODO(mattr): We need to enforce some security on trace responses.
  return vtrace.withContinuedTrace(ctx, spanName,
                                   request.call.traceRequest);
};

/**
 * Performs the rpc request.  Unlike handleRPCRequest, this function works on
 * the decoded message.
 * @private
 * @param {string} messageId Message Id set by the server.
 * @param {Object} request Request's structure is
 * {
 *   serverId: number // the server id
 *   method: string // Name of the method on the service to call
 *   args: [] // Array of positional arguments to be passed into the method
 *            // Note: This array contains wrapped arguments!
 * }
 */
Router.prototype._handleRPCRequestInternal = function(messageId, request) {
  // TODO(bjornick): Break this method up into smaller methods.
  var methodName = capitalize(request.method);
  var server = this._servers[request.serverId];
  var err;

  if (!server) {
    // TODO(bprosnitz) What error type should this be.
    err = new Error('Request for unknown server ' + request.serverId);
    this.sendResult(messageId, methodName, null, err);
    return;
  }

  var invoker = server.getInvokerForHandle(request.handle);
  if (!invoker) {
    vlog.logger.error('No invoker found: ', request);
    err = new Error('No service found');
    this.sendResult(messageId, methodName, null, err);
    return;
  }

  var ctx = this.createRPCContext(request);
  var self = this;
  var stream;
  createServerCall(request, this._blessingsManager).then(function(call) {
    if (request.method === 'Glob__') {
      if (!invoker.hasGlobber()) {
        err = new Error('Glob is not implemented');
        self.sendResult(messageId, 'Glob__', null, err);
        return;
      }
      // Glob takes no streaming input and has GlobReply as output.
      stream = new Stream(messageId, self._proxy.senderPromise, false,
        null, naming.GlobReply.prototype._type);
      self._streamMap[messageId] = stream;
      self._contextMap[messageId] = ctx;
      self._outstandingRequestForId[messageId] = 0;
      self.incrementOutstandingRequestForId(messageId);
      var globPattern = typeUtil.unwrap(request.args[0]);
      self.handleGlobRequest(messageId, call.securityCall.suffix,
                             server, new Glob(globPattern), ctx, call, invoker,
                             completion);
      return;
    }

    function completion() {
      // There is no results to a glob method.  Everything is sent back
      // through the stream.
      self.sendResult(messageId, methodName, null, undefined, 1);
    }

    // Find the method signature.
    var signature = invoker.signature();
    var methodSig;
    signature.forEach(function(ifaceSig) {
      ifaceSig.methods.forEach(function(method) {
        if (method.name === methodName) {
          methodSig = method;
        }
      });
    });
    if (methodSig === undefined) {
      err = new verror.NoExistError(
        call, 'Requested method', methodName, 'not found on');
      self.sendResult(messageId, methodName, null, err);
      return;
    }

    // Unwrap the RPC arguments sent to the JS server.
    var unwrappedArgPromises = request.args.map(function(arg, i) {
      // If an any type was expected, unwrapping is not needed.
      if (methodSig.inArgs[i].type.kind === vdl.kind.ANY) {
        return Promise.resolve(arg);
      }
      var unwrapped = typeUtil.unwrap(arg);
      if (unwrapped instanceof BlessingsId) {
        return self._blessingsManager.blessingsFromId(unwrapped);
      }
      return Promise.resolve(unwrapped);
    });

    return Promise.all(unwrappedArgPromises).then(function(unwrappedArgs) {
      var options = {
        methodName: methodName,
        args: unwrappedArgs,
        methodSig: methodSig,
        ctx: ctx,
        call: call,
      };

      self._contextMap[messageId] = options.ctx;
      if (methodIsStreaming(methodSig)) {
        var readType = (methodSig.inStream ? methodSig.inStream.type : null);
        var writeType = (methodSig.outStream ? methodSig.outStream.type : null);
        stream = new Stream(messageId, self._proxy.senderPromise, false,
          readType, writeType);
        self._streamMap[messageId] = stream;
        var rpc = new StreamHandler(options.ctx, stream);
        self._proxy.addIncomingStreamHandler(messageId, rpc);
        options.stream = stream;
      }

      // Invoke the method;
      self.invokeMethod(invoker, options, function(err, results) {
        if (err) {
          var stackTrace;
          if (err instanceof Error && err.stack !== undefined) {
            stackTrace = err.stack;
          }
          vlog.logger.debug('Requested method ' + methodName +
              ' threw an exception on invoke: ', err, stackTrace);

          // The error case has no results; only send the error.
          self.sendResult(messageId, methodName, undefined, err,
              methodSig.outArgs.length);
          return;
        }

        // Has results; associate the types of the outArgs.
        var canonResults = results.map(function(result, i) {
          var t = methodSig.outArgs[i].type;
          if (t.equals(WireBlessings.prototype._type)) {
            if (!(result instanceof Blessings)) {
              vlog.logger.error(
                'Encoding non-blessings value as wire blessings');
                return null;
            }
            return result;
          }
          return vdl.canonicalize.fill(result, t);
        });
        self.sendResult(messageId, methodName, canonResults, undefined,
                        methodSig.outArgs.length);
      });
    });
  });
};
/**
 * Handles incoming requests from the server to invoke methods on registered
 * services in JavaScript.
 * @private
 * @param {string} messageId Message Id set by the server.
 * @param {string} vdlRequest VOM encoded request. Request's structure is
 * {
 *   serverId: number // the server id
 *   method: string // Name of the method on the service to call
 *   args: [] // Array of positional arguments to be passed into the method
 *            // Note: This array contains wrapped arguments!
 * }
 */
Router.prototype.handleRPCRequest = function(messageId, vdlRequest) {
  var err;
  var request;
  var router = this;
  try {
   request = byteUtil.hex2Bytes(vdlRequest);
  } catch (e) {
    err = new Error('Failed to decode args: ' + e);
    this.sendResult(messageId, '', null, err);
    return;
  }
  vom.decode(request).then(function(request) {
    router._handleRPCRequestInternal(messageId, request);
  }, function(e) {
    err = new Error('Failed to decode args: ' + e);
    router.sendResult(messageId, '', null, err);
  });
};

function methodIsStreaming(methodSig) {
  return (typeof methodSig.inStream === 'object' &&
    methodSig.inStream !== null) || (typeof methodSig.outStream === 'object' &&
    methodSig.outStream !== null);
}

/**
 * Invokes a method with a methodSig
 */
Router.prototype.invokeMethod = function(invoker, options, cb) {
  var methodName = options.methodName;
  var args = options.args;
  var ctx = options.ctx;
  var call = options.call;

  var injections = {
    context: ctx,
    call: call,
    stream: options.stream
  };

  var rootCtx = this._rootCtx;
  function InvocationFinishedCallback(err, results) {
    // Note: We use the rootCtx here because we want to make this
    // call to clean up the blessings even if the method invocation
    // is cancelled.
    call.securityCall.remoteBlessings.release(rootCtx);
    cb(err, results);
  }

  invoker.invoke(methodName, args, injections, InvocationFinishedCallback);
};

function createGlobReply(name) {
  name = name || '';
  return new naming.GlobReply({
    'entry': new naming.MountEntry({ name: name })
  });
}

function createGlobErrorReply(name, err, appName) {
  name = name || '';
  var convertedError = ErrorConversion.fromNativeValue(err, appName, 'glob');
  return new naming.GlobReply({
    'error': new naming.GlobError({ name: name, error: convertedError })
  });
}

Router.prototype.handleGlobRequest = function(messageId, name, server, glob,
                                              context, call, invoker, cb) {
  var self = this;
  var options;
  if (invoker.hasMethod('__glob')) {
    options = {
      methodName: '__glob',
      args: [glob.toString()],
      methodSig: { outArgs: [] },
      ctx: context,
      call: call,
      // For the glob__ method we just write the
      // results directly out to the rpc stream.
      stream: this._streamMap[messageId]
    };
    this.invokeMethod(invoker, options, function(err, results) {
      if (err) {
        var verr = new verror.InternalError(context,
          '__glob() failed', glob, err);
        var errReply = createGlobErrorReply(name, verr, self._appName);
        self._streamMap[messageId].write(errReply);
        vlog.logger.info(verr);
      }
      self.decrementOutstandingRequestForId(messageId, cb);
    });
  } else if (invoker.hasMethod('__globChildren')) {
    if (glob.length() === 0) {
      // This means we match the current object.
      this._streamMap[messageId].write(createGlobReply(name));
    }

    if (glob.finished()) {
      this.decrementOutstandingRequestForId(messageId, cb);
      return;
    }
    // Create a GlobStream
    var globStream = new GlobStream();
    options = {
      methodName: '__globChildren',
      args: [],
      methodSig: { outArgs: [] },
      ctx: context,
      call: call,
      stream: globStream
    };
    globStream.on('data', function(child) {
      // TODO(bjornick): Allow for escaped slashes.
      if (child.indexOf('/') !== -1) {
        var verr = new verror.InternalError(context,
          '__globChildren returned a bad child', child);
        var errReply = createGlobErrorReply(name, verr, self._appName);
        self._streamMap[messageId].write(errReply);
        vlog.logger.info(verr);
        return;
      }

      var suffix = namespaceUtil.join(name, child);
      self.incrementOutstandingRequestForId(messageId);
      var nextInvoker;
      var subCall;
      createServerCall(call, this._blessingsManager).then(function(servCall) {
        subCall = servCall;
        subCall.securityCall.suffix = suffix;
        return server._handleLookup(suffix);
      }).then(function(value) {
        nextInvoker = value.invoker;
        return server.handleAuthorization(value._handle, context,
                                          subCall.securityCall);
      }).then(function() {
        var match = glob.matchInitialSegment(child);
        if (match.match) {
          self.handleGlobRequest(messageId, suffix, server, match.remainder,
                                 context, subCall, nextInvoker, cb);
        } else {
          self.decrementOutstandingRequestForId(messageId, cb);
        }
      }).catch(function(e) {
        var verr = new verror.NoServersError(context, suffix, e);
        var errReply = createGlobErrorReply(suffix, verr, self._appName);
        self._streamMap[messageId].write(errReply);
        vlog.logger.info(errReply);
        self.decrementOutstandingRequestForId(messageId, cb);
      });
    });

    this.invokeMethod(invoker, options, function(err, results) {
      if (err) {
        var verr = new verror.InternalError(context,
          '__globChildren() failed', glob, err);
        var errReply = createGlobErrorReply(name, verr, self._appName);
        this._streamMap[messageId].write(errReply);
        vlog.logger.info(verr);
      }
      self.decrementOutstandingRequestForId(messageId, cb);
    });
  } else {
    // This is a leaf of the globChildren call so we return this as
    // a result.
    this._streamMap[messageId].write(createGlobReply(name));

    this.decrementOutstandingRequestForId(messageId, cb);
  }
};

Router.prototype.incrementOutstandingRequestForId = function(id) {
  this._outstandingRequestForId[id]++;
};

Router.prototype.decrementOutstandingRequestForId = function(id, cb) {
  this._outstandingRequestForId[id]--;
  if (this._outstandingRequestForId[id] === 0) {
    cb();
    delete this._outstandingRequestForId[id];
  }
};

/**
 * Sends the result of a requested invocation back to jspr
 * @private
 * @param {string} messageId Message id of the original invocation request
 * @param {string} name Name of method
 * @param {Object} results Result of the call
 * @param {Object} err Error from the call
 */
Router.prototype.sendResult = function(messageId, name, results, err,
  numOutArgs) {
  if (!results) {
    results = new Array(numOutArgs);
  }

  var errorStruct = null;
  if (err !== undefined && err !== null) {
    errorStruct = ErrorConversion.fromNativeValue(err, this._appName,
                                                 name);
  }

  // Clean up the context map.
  var ctx = this._contextMap[messageId];
  if (ctx) {
    ctx.finish();
    delete this._contextMap[messageId];
  }

  var traceResponse = vtrace.response(ctx);

  // Convert any Blessings to JsBlessings
  for (var i = 0; i < results.length; ++i) {
    if (results[i] instanceof Blessings) {
      results[i] = results[i].convertToJsBlessings();
    }
  }
  // If this is a streaming request, queue up the final response after all
  // the other stream requests are done.
  var stream = this._streamMap[messageId];
  if (stream && typeof stream.serverClose === 'function') {
    // We should probably remove the stream from the dictionary, but it's
    // not clear if there is still a reference being held elsewhere.  If there
    // isn't, then GC might prevent this final message from being sent out.
    stream.serverClose(results, errorStruct, traceResponse);
    this._proxy.dequeue(messageId);
  } else {
    var responseData = new ServerRpcReply({
      results: results,
      err: errorStruct,
      traceResponse: traceResponse
    });
    this._proxy.sendRequest(hexVom.encode(responseData), Outgoing.RESPONSE,
                            null, messageId);
  }
};

/**
 * Serves the server under the given name
 * @private
 * @param {string} name Name to serve under
 * @param {Vanadium.Server} server The server who will handle the requests for
 * this name.
 * @param {function} [cb] If provided, the function will be called when
 * serve completes.  The first argument passed in is the error if there
 * was any.
 * @return {Promise} Promise to be called when serve completes or fails.
 */
Router.prototype.serve = function(name, server, cb) {
  vlog.logger.info('Serving under the name: ', name);
  this._servers[server.id] = server;
  // If using a leaf dispatcher, set the IsLeaf ServerOption.
  var isLeaf = server.dispatcher && server.dispatcher._isLeaf;
  if (isLeaf) {
    server.serverOption._opts.isLeaf = true;
  }
  var rpcOpts = server.serverOption._toRpcServerOption();
  return this._controller.serve(this._rootCtx, name, server.id, rpcOpts, cb);
};

/**
 * Sends an addName request to jspr.
 * @private
 * @param {string} name Name to publish
 * @param {function} [cb] If provided, the function will be called on
 * completion. The only argument is an error if there was one.
 * @return {Promise} Promise to be called when operation completes or fails
 */
Router.prototype.addName = function(name, server, cb) {
  return this._controller.addName(this._rootCtx, server.id, name, cb);
};

/**
 * Sends an removeName request to jspr.
 * @private
 * @param {string} name Name to unpublish
 * @param {function} [cb] If provided, the function will be called on
 * completion. The only argument is an error if there was one.
 * @return {Promise} Promise to be called when operation completes or fails
 */
Router.prototype.removeName = function(name, server, cb) {
  // Delete our bind cache entry for that name
  this._proxy.signatureCache.del(name);
  return this._controller.removeName(this._rootCtx, server.id, name, cb);
};

/**
 * Sends a stop server request to jspr.
 * @private
 * @param {Server} server Server object to stop.
 * @param {function} [cb] If provided, the function will be called on
 * completion. The only argument is an error if there was one.
 * @return {Promise} Promise to be called when stop service completes or fails
 */
Router.prototype.stopServer = function(server, cb) {
  var self = this;

  return this._controller.stop(this._rootCtx, server.id)
    .then(function() {
      delete self._servers[server.id];
      if (cb) {
        cb(null);
      }
    }, function(err) {
      if (cb) {
        cb(err);
      }
      return Promise.reject(err);
    });
};

/**
 * Stops all servers managed by this router.
 * @private
 * @param {function} [cb] If provided, the function will be called on
 * completion. The only argument is an error if there was one.
 * @return {Promise} Promise to be called when all servers are stopped.
 */
Router.prototype.cleanup = function(cb) {
  var promises = [];
  var servers = this._servers;
  for (var id in servers) {
    if (servers.hasOwnProperty(id)) {
      promises.push(this.stopServer(servers[id]));
    }
  }
  return Promise.all(promises).then(function() {
    if (cb) {
      cb(null);
    }
  }, function(err) {
    if (cb) {
      cb(err);
    }
  });
};

module.exports = Router;
