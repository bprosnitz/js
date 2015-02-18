var test = require('prova');

test('Test event proxy connects to extension', function(assert) {
  // Don't test this in node because there is no extension to talk to.
  if (!require('is-browser')) {
    return assert.end();
  }

  var timeout = 500;
  var ExtensionEventProxy = require('../../src/proxy/event-proxy').ctor;
  var extensionEventProxy = new ExtensionEventProxy(timeout);

  var finished = false;

  extensionEventProxy.once('error', function(err) {
    if (!finished) {
      finished = true;
      assert.fail(err);
      extensionEventProxy.destroy();
      assert.end();
    }
  });

  extensionEventProxy.once('connected', function() {
    if (!finished) {
      finished = true;
      extensionEventProxy.destroy();
      assert.end();
    }
  });
});

// TODO(nlacasse): This test is potentially racey.  It's possible that the
// event proxy might connect to the extension before the 0ms timeout fires
// (although I have not seen it happen).
test('Test event proxy fires error when timeout occurs before connection.',
    function(assert) {
      // Don't test this in node because there is no extension to talk to.
      if (!require('is-browser')) {
        return assert.end();
      }

      var timeout = 0;
      var ExtensionEventProxy = require('../../src/proxy/event-proxy').ctor;
      var extensionEventProxy = new ExtensionEventProxy(timeout);

      var finished = false;

      extensionEventProxy.once('error', function(err) {
        if (!finished) {
          finished = true;
          assert.ok((/timeout/i).test(err.message));
          extensionEventProxy.destroy();
          assert.end();
        }
      });

      extensionEventProxy.once('connected', function() {
        if (!finished) {
          finished = true;
          assert.fail('Expected the event proxy to timeout, but it did not.');
          extensionEventProxy.destroy();
          assert.end();
        }
      });
});
