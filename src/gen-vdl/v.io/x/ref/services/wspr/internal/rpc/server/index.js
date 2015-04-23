// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// This file was auto-generated by the vanadium vdl tool.
var vdl = require('../../../../../../../../../vdl');
var makeError = require('../../../../../../../../../verror/make-errors');
var actions = require('../../../../../../../../../verror/actions');





var time = require('./../../../../../../../v23/vdlroot/time');
var security = require('./../../../../../../../v23/security');
var vtrace = require('./../../../../../../../v23/vtrace');
var principal = require('./../../principal');

module.exports = {};



// Types:
var _type1 = new vdl.Type();
var _type2 = new vdl.Type();
var _type3 = new vdl.Type();
var _type4 = new vdl.Type();
var _type5 = new vdl.Type();
var _type6 = new vdl.Type();
var _typeCaveatValidationRequest = new vdl.Type();
var _typeCaveatValidationResponse = new vdl.Type();
var _typeSecurityCall = new vdl.Type();
var _typeServerRpcRequest = new vdl.Type();
var _typeServerRpcRequestCall = new vdl.Type();
_type1.kind = vdl.kind.LIST;
_type1.name = "";
_type1.elem = vdl.types.ANY;
_type2.kind = vdl.kind.LIST;
_type2.name = "";
_type2.elem = vdl.types.STRING;
_type3.kind = vdl.kind.LIST;
_type3.name = "";
_type3.elem = _type4;
_type4.kind = vdl.kind.LIST;
_type4.name = "";
_type4.elem = new security.Caveat()._type;
_type5.kind = vdl.kind.LIST;
_type5.name = "";
_type5.elem = vdl.types.ERROR;
_type6.kind = vdl.kind.OPTIONAL;
_type6.name = "";
_type6.elem = new principal.JsBlessings()._type;
_typeCaveatValidationRequest.kind = vdl.kind.STRUCT;
_typeCaveatValidationRequest.name = "v.io/x/ref/services/wspr/internal/rpc/server.CaveatValidationRequest";
_typeCaveatValidationRequest.fields = [{name: "Call", type: _typeSecurityCall}, {name: "Cavs", type: _type3}];
_typeCaveatValidationResponse.kind = vdl.kind.STRUCT;
_typeCaveatValidationResponse.name = "v.io/x/ref/services/wspr/internal/rpc/server.CaveatValidationResponse";
_typeCaveatValidationResponse.fields = [{name: "Results", type: _type5}];
_typeSecurityCall.kind = vdl.kind.STRUCT;
_typeSecurityCall.name = "v.io/x/ref/services/wspr/internal/rpc/server.SecurityCall";
_typeSecurityCall.fields = [{name: "Method", type: vdl.types.STRING}, {name: "Suffix", type: vdl.types.STRING}, {name: "MethodTags", type: _type1}, {name: "LocalBlessings", type: new principal.JsBlessings()._type}, {name: "LocalBlessingStrings", type: _type2}, {name: "RemoteBlessings", type: new principal.JsBlessings()._type}, {name: "RemoteBlessingStrings", type: _type2}, {name: "LocalEndpoint", type: vdl.types.STRING}, {name: "RemoteEndpoint", type: vdl.types.STRING}];
_typeServerRpcRequest.kind = vdl.kind.STRUCT;
_typeServerRpcRequest.name = "v.io/x/ref/services/wspr/internal/rpc/server.ServerRpcRequest";
_typeServerRpcRequest.fields = [{name: "ServerId", type: vdl.types.UINT32}, {name: "Handle", type: vdl.types.INT32}, {name: "Method", type: vdl.types.STRING}, {name: "Args", type: _type1}, {name: "Call", type: _typeServerRpcRequestCall}];
_typeServerRpcRequestCall.kind = vdl.kind.STRUCT;
_typeServerRpcRequestCall.name = "v.io/x/ref/services/wspr/internal/rpc/server.ServerRpcRequestCall";
_typeServerRpcRequestCall.fields = [{name: "SecurityCall", type: _typeSecurityCall}, {name: "Deadline", type: new time.WireDeadline()._type}, {name: "TraceRequest", type: new vtrace.Request()._type}, {name: "GrantedBlessings", type: _type6}];
_type1.freeze();
_type2.freeze();
_type3.freeze();
_type4.freeze();
_type5.freeze();
_type6.freeze();
_typeCaveatValidationRequest.freeze();
_typeCaveatValidationResponse.freeze();
_typeSecurityCall.freeze();
_typeServerRpcRequest.freeze();
_typeServerRpcRequestCall.freeze();
module.exports.CaveatValidationRequest = (vdl.registry.lookupOrCreateConstructor(_typeCaveatValidationRequest));
module.exports.CaveatValidationResponse = (vdl.registry.lookupOrCreateConstructor(_typeCaveatValidationResponse));
module.exports.SecurityCall = (vdl.registry.lookupOrCreateConstructor(_typeSecurityCall));
module.exports.ServerRpcRequest = (vdl.registry.lookupOrCreateConstructor(_typeServerRpcRequest));
module.exports.ServerRpcRequestCall = (vdl.registry.lookupOrCreateConstructor(_typeServerRpcRequestCall));




// Consts:



// Errors:

module.exports.CaveatValidationTimeoutError = makeError('v.io/x/ref/services/wspr/internal/rpc/server.CaveatValidationTimeout', actions.NO_RETRY, {
  'en': '{1:}{2:} Caveat validation has timed out',
}, [
]);


module.exports.InvalidValidationResponseFromJavascriptError = makeError('v.io/x/ref/services/wspr/internal/rpc/server.InvalidValidationResponseFromJavascript', actions.NO_RETRY, {
  'en': '{1:}{2:} Invalid validation response from javascript',
}, [
]);


module.exports.ServerStoppedError = makeError('v.io/x/ref/services/wspr/internal/rpc/server.ServerStopped', actions.RETRY_BACKOFF, {
  'en': '{1:}{2:} Server has been stopped',
}, [
]);




// Services:

   
 


