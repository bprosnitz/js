var test = require('prova');

var extnUtils = require('../../src/lib/extension-utils');
var leafDispatcher = require('../../src/ipc/leaf-dispatcher');
var serve = require('./serve');

// Test serving and making an RPC call.
// name is the name of the service to serve and cb is called after completion.
function validateCommunication(t, name, cb) {
  var response = 5;

  var dispatcher = leafDispatcher({
    anRpc: function(context, cb) {
      cb(null, response);
    }
  });

  serve(name, dispatcher, function(err, res) {
    if (err) {
      return cb(err);
    }

    res.service.anRpc(res.runtime.getContext(), function(err, result) {
      t.error(err, 'Err expected to be null');
      t.equal(result, response, 'Expected different response from anRpc()');
      cb(null, res.end, res.runtime);
    });
  });
}

test('Test recovery from nacl plugin crash', function(t) {
  if (!require('is-browser')) {
    return t.end();
  }

  var eventProxy = require('../../src/proxy/event-proxy');

  // validate comunication first, partially because this initializes the
  // nacl plugin.
  validateCommunication(t, 'test/name1', function(err, close1, runtime) {
    if (err) {
      return t.end(err);
    }

    // Handle the crash.
    runtime.once('crash', function(err) {
      t.ok(err instanceof extnUtils.ExtensionCrashError,
        'Receive ExtensionCrashError object.');

      // Perform another communication validation.
      validateCommunication(t, 'test/name2', function(err, close2) {
        if (err) {
          t.error(err);
          return close1(t.end);
        }

        close1(function(err1) {
          close2(function(err2) {
            t.end(err1 && err2);
          });
        });
      });
    });

    // Send a message triggering a nacl plug-in crash.
    eventProxy.send('intentionallyPanic');
  });
});
