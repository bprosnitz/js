// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/*global unescape: true*/
/**
 * @fileoverview Definition of RawVomReader.
 * @private
 */

module.exports = RawVomWriter;

var BigInt = require('../vdl/big-int.js');
var BinaryWriter = require('./binary-writer.js');
var ByteUtil = require('../vdl/byte-util.js');
var versions = require('./versions.js');

/**
 * RawVomWriter writes VOM primitive values (numbers, strings, bools) to a
 * buffer.
 * @param {number} version vom version (e.g. 0x80, 0x81, ...)
 * @constructor
 * @private
 */
function RawVomWriter(version) {
  this._writer = new BinaryWriter();
  if (!version) {
    version = versions.defaultVersion;
  }
  this._version = version;
}

/**
 * Writes a BigInt as a VOM uint.
 * The BigInt must be non-negative.
 * @param {BigInt} v The value
 */
RawVomWriter.prototype._writeBigUint = function(v) {
  if (v.getSign() === -1) {
    throw new Error('Cannot write negative uint');
  }
  if (v.getSign() === 0) {
    this._writer.writeByte(0);
    return;
  }
  if (v.getUintBytes().length > 1 || v.getUintBytes()[0] > 0x7f) {
    this._writer.writeByte(0x100 - v.getUintBytes().length);
  }
  this._writer.writeByteArray(v.getUintBytes());
};

/**
 * Writes a BigInt as a VOM int.
 * @param {BigInt} v The value
 */
RawVomWriter.prototype._writeBigInt = function(v) {
  var copy = new Uint8Array(v.getUintBytes());
  if (v.getSign() === -1) {
    copy = ByteUtil.decrement(copy);
    copy = ByteUtil.shiftLeftOne(copy);
    copy[copy.length - 1] = copy[copy.length - 1] | 0x01;
  } else {
    copy = ByteUtil.shiftLeftOne(copy);
  }
  this._writeBigUint(new BigInt(Math.abs(v.getSign()), copy));
};

/**
 * Writes a value as a VOM uint.
 * @param {number | BigInt} v The value.
 */
RawVomWriter.prototype.writeUint = function(v) {
  if (typeof v === 'number') {
    v = BigInt.fromNativeNumber(v);
  }
  this._writeBigUint(v);
};

/**
 * Writes a value as a VOM int.
 * @param {number | BigInt} v The value.
 */
RawVomWriter.prototype.writeInt = function(v) {
  if (typeof v === 'number') {
    v = BigInt.fromNativeNumber(v);
  }
  this._writeBigInt(v);
};

/**
 * Writes a value as a VOM float.
 * @param {number | BigInt} v The value.
 */
RawVomWriter.prototype.writeFloat = function(v) {
  if (typeof v === 'object') {
    // BigInt.
    v = v.toNativeNumber();
  }
  var buf = new ArrayBuffer(8);
  var dataView = new DataView(buf);
  dataView.setFloat64(0, v, true);
  var bytes = new Uint8Array(buf);
  var sign = 1;
  if (ByteUtil.emptyOrAllZero(bytes)) {
    sign = 0;
  }
  this._writeBigUint(new BigInt(sign, bytes));
};

/**
 * Writes a VOM string.
 * @param {string} v The string.
 */
RawVomWriter.prototype.writeString = function(v) {
  var utf8String = unescape(encodeURIComponent(v));
  this.writeUint(utf8String.length);
  for (var i = 0; i < utf8String.length; i++) {
    this._writer.writeByte(utf8String.charCodeAt(i));
  }
};

/**
 * Writes a VOM boolean.
 * @param {boolean} v The boolean.
 */
RawVomWriter.prototype.writeBool = function(v) {
  if (v) {
    this.writeByte(1);
  } else {
    this.writeByte(0);
  }
};

/**
 * Writes a single VOM byte.
 * This may be written as a uint so that byte flags can be put in its place.
 * (byte lists are not written with this function but rather _writeRawBytes).
 * @param {byte} v The byte.
 */
RawVomWriter.prototype.writeByte = function(v) {
  if (this._version === versions.version80) {
    this._writer.writeByte(v);
  } else {
    this.writeUint(v);
  }
};

/**
 * Writes a single VOM byte for a control code.
 * @param {byte} v The byte.
 */
RawVomWriter.prototype.writeControlByte = function(v) {
  this._writer.writeByte(v);
};

/**
 * Write raw bytes.
 * @param {Uint8Array} bytes The byte array to write.
 */
RawVomWriter.prototype._writeRawBytes = function(bytes) {
  this._writer.writeByteArray(bytes);
};

/**
 * Gets the written bytes.
 * @return {Uint8Array} The buffered bytes.
 */
RawVomWriter.prototype.getBytes = function() {
  return new Uint8Array(this._writer.getBytes());
};

/**
 * Gets position of underlying buffer
 * @return {number} position of buffer
 */
RawVomWriter.prototype.getPos = function() {
  return this._writer.getPos();
};


/**
 * Seeks back to a previous position
 * @param {number} pos the new position.
 */
RawVomWriter.prototype.seekBack = function(pos) {
  return this._writer.seekBack(pos);
};
