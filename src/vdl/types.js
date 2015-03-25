// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * @fileoverview Utilities for manipulating types.
 * @private
 */

var Type = require('./type.js');
var Kind = require('./kind.js');

// TODO(bprosnitz) Should we add other helpers? Or is it better just to directly
// create the types in js?

/**
 * Namespace of pre-defined VDL Types
 * @namespace
 * @memberof module:vanadium.vdl
 */
var Types = {
  /**
   * @const
   */
  ANY: primitiveType(Kind.ANY),
  /**
   * @const
   */
  BOOL: primitiveType(Kind.BOOL),
  /**
   * @const
   */
  BYTE: primitiveType(Kind.BYTE),
  /**
   * @const
   */
  UINT16: primitiveType(Kind.UINT16),
  /**
   * @const
   */
  UINT32: primitiveType(Kind.UINT32),
  /**
   * @const
   */
  UINT64: primitiveType(Kind.UINT64),
  /**
   * @const
   */
  INT16: primitiveType(Kind.INT16),
  /**
   * @const
   */
  INT32: primitiveType(Kind.INT32),
  /**
   * @const
   */
  INT64: primitiveType(Kind.INT64),
  /**
   * @const
   */
  FLOAT32: primitiveType(Kind.FLOAT32),
  /**
   * @const
   */
  FLOAT64: primitiveType(Kind.FLOAT64),
  /**
   * @const
   */
  COMPLEX64: primitiveType(Kind.COMPLEX64),
  /**
   * @const
   */
  COMPLEX128: primitiveType(Kind.COMPLEX128),
  /**
   * @const
   */
  STRING: primitiveType(Kind.STRING),
  /**
   * @const
   */
  TYPEOBJECT: Type.prototype._type // So that === works for Types.TypeObject
};
/**
 * Defines the wire error format
 * @const
 */
Types.ERROR = defineOptionalErrorType();

/**
 * @const
 */
Types.JSVALUE = defineJSValueType();

module.exports = Types;

function defineOptionalErrorType() {
  var nilErrorType = new Type();

  // TODO(bprosnitz) Should we add an error constructor so error objects have
  // the same prototype? (this will be the case once this is generated by VDL as
  // well)
  var retryCodeType = new Type();
  retryCodeType.name = '';
  retryCodeType.kind = Kind.ENUM;
  retryCodeType.labels = [
    'NoRetry',
    'RetryConnection',
    'RetryRefetch',
    'RetryBackoff'
  ];
  var paramListType = new Type();
  paramListType.name = '';
  paramListType.kind = Kind.LIST;
  paramListType.elem = Types.ANY;

  var errorType = new Type();
  errorType.name = 'error';
  errorType.kind = Kind.STRUCT;
  errorType.fields = [
    {
      name: 'Id',
      type: Types.STRING
    },
    {
      name: 'RetryCode',
      type: retryCodeType
    },
    {
      name: 'Msg',
      type: Types.STRING
    },
    {
      name: 'ParamList',
      type: paramListType
    }
  ];
  nilErrorType.name = '';
  nilErrorType.kind = Kind.OPTIONAL;
  nilErrorType.elem = errorType;

  return nilErrorType;
}

// The JSValueType is a special type for JavaScript. Services will default to
// sending and receiving this type when they do not specify a type in their
// service signature.
// TODO(alexfandrianto): We are still use Types.ANY instead of Types.JSVALUE.
// TODO(alexfandrianto): We should consider moving this type into VDL.
// See the issue: https://github.com/veyron/release-issues/issues/760
// Warning: In the rare case that someone defines their own JSValue, they will
// not have the expected behavior in encode/decode/canonicalize because JSValue
// is heavily special-cased.
function defineJSValueType() {
  var JSValueType = new Type();
  var EmptyStruct = new Type();
  var ByteList = new Type();
  var JSValueList = new Type();
  var JSKeyValueList = new Type();
  var JSKeyValuePair = new Type();
  var JSStringValueList = new Type();
  var JSStringValuePair = new Type();

  // Fill JSValue
  JSValueType.name = 'JSValue';
  JSValueType.kind = Kind.UNION;
  JSValueType.fields = [
    {
      name: 'Null',
      type: EmptyStruct
    },
    {
      name: 'Boolean',
      type: Types.BOOL
    },
    {
      name: 'Number',
      type: Types.FLOAT64
    },
    {
      name: 'String',
      type: Types.STRING
    },
    {
      name: 'Bytes',
      type: ByteList
    },
    {
      name: 'List',
      type: JSValueList
    },
    {
      name: 'Set',
      type: JSValueList
    },
    {
      name: 'Map',
      type: JSKeyValueList
    },
    {
      name: 'Object',
      type: JSStringValueList
    }
  ];

  // Define the rest of EmptyStruct
  EmptyStruct.kind = Kind.STRUCT;
  EmptyStruct.fields = [];

  // Define the rest of ByteList
  ByteList.kind = Kind.LIST;
  ByteList.elem = Types.BYTE;

  // Define the rest of JSValueList
  JSValueList.kind = Kind.LIST;
  JSValueList.elem = Types.ANY;

  // Define the rest of JSKeyValueList
  JSKeyValueList.kind = Kind.LIST;
  JSKeyValueList.elem = JSKeyValuePair;

  // Define the rest of JSKeyValuePair
  JSKeyValuePair.kind = Kind.STRUCT;
  JSKeyValuePair.fields = [
    {
      name: 'Key',
      type: Types.ANY
    },
    {
      name: 'Value',
      type: Types.ANY
    }
  ];

  // Define the rest of JSStringValueList
  JSStringValueList.kind = Kind.LIST;
  JSStringValueList.elem = JSStringValuePair;

  // Define the rest of JSStringValuePair
  JSStringValuePair.kind = Kind.STRUCT;
  JSStringValuePair.fields = [
    {
      name: 'Key',
      type: Types.STRING
    },
    {
      name: 'Value',
      type: Types.ANY
    }
  ];

  return JSValueType;
}

// Primitive types only need a kind. They have an empty name by default.
function primitiveType(kind) {
  var prim = new Type();
  prim.kind = kind;
  return prim;
}
