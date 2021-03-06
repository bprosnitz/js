// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var ByteArrayMessageReader = require('./byte-array-message-reader');
var Decoder = require('./decoder');

module.exports = decode;
/**
 * Decode VOM-decodes the given data into the provided value using a new
 * instance of a VOM decoder.
 *
 * @param  {Uint8Array} bytes    VOM-encoded bytes
 * @param  {boolean} [deepWrap=false] true if the values on the object should
 * remain wrapped with type information deeply, false (default) to strip
 * deep type information and obtain a more usage-friendly value
 * @param {module:vanadium.vom.TypeDecoder} typeDecoder The type decoder to
 * use.  This can be null.
 * @param  {module:vanadium.vom.decode~cb} cb
 * @return {Promise<*>} decoded value
 * @memberof module:vanadium.vom
 */
function decode(bytes, deepWrap, typeDecoder, cb) {
  var reader = new ByteArrayMessageReader(bytes);
  var decoder = new Decoder(reader, deepWrap, typeDecoder);
  return decoder.decode(cb);
}
