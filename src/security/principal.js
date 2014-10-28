/**
 * @fileoverview Principal stub for veyron principals
 */

var Deferred = require('../lib/deferred');
var SimpleHandler = require('../proxy/simple_handler');
var Blessings = require('./blessings');
var MessageType = require('../proxy/message_type');

/**
 * Principal represents an entity capable of making or receiving RPCs.
 */
function Principal(proxy) {
  this._proxy = proxy;
}

/*
 * Blesses the blessee's public key with the given caveats.
 * @param {Blessings} blessee: a blessing on the public key to bless.
 * @param {String} name: the extension for the blessing.
 * @param {Number} duration: the duration of the blessing in milliseconds.
 * @param {Array} caveats: an array of Cavaeats to restrict the blessing.
 * @papram {function} cb an optional callback that will return the blessing
 * @return {Promise} a promise that will be resolved with the blessing
 */

Principal.prototype.bless = function(blessee, name, duration, caveats, cb) {
  var def = new Deferred(cb);
  if (!(blessee instanceof Blessings)) {
    def.reject(new Error('blessee should be of type Blessings'));
    return def.promise;
  }

  var message = JSON.stringify({
    handle: blessee._id,
    name: name,
    durationMs: duration,
    caveats: caveats
  });
  var id = this._proxy.nextId();
  var handler = new SimpleHandler(def, this._proxy, id);
  this._proxy.sendRequest(message, MessageType.BLESS_PUBLICKEY, handler, id);
  var self = this._proxy;
  return def.promise.then(function(message) {
    var id = new Blessings(message.handle, message.publicKey, self._proxy);
    return id;
  });
};

module.exports = Principal;
