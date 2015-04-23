// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// This file was auto-generated by the vanadium vdl tool.
var vdl = require('../../../../vdl');
var canonicalize = require('../../../../vdl/canonicalize');





var time = require('./../vdlroot/time');
var uniqueid = require('./../uniqueid');

module.exports = {};



// Types:
var _type1 = new vdl.Type();
var _type2 = new vdl.Type();
var _typeAnnotation = new vdl.Type();
var _typeRequest = new vdl.Type();
var _typeResponse = new vdl.Type();
var _typeSpanRecord = new vdl.Type();
var _typeTraceFlags = new vdl.Type();
var _typeTraceRecord = new vdl.Type();
_type1.kind = vdl.kind.LIST;
_type1.name = "";
_type1.elem = _typeSpanRecord;
_type2.kind = vdl.kind.LIST;
_type2.name = "";
_type2.elem = _typeAnnotation;
_typeAnnotation.kind = vdl.kind.STRUCT;
_typeAnnotation.name = "v.io/v23/vtrace.Annotation";
_typeAnnotation.fields = [{name: "When", type: new time.Time()._type}, {name: "Message", type: vdl.types.STRING}];
_typeRequest.kind = vdl.kind.STRUCT;
_typeRequest.name = "v.io/v23/vtrace.Request";
_typeRequest.fields = [{name: "SpanId", type: new uniqueid.Id()._type}, {name: "TraceId", type: new uniqueid.Id()._type}, {name: "Flags", type: _typeTraceFlags}];
_typeResponse.kind = vdl.kind.STRUCT;
_typeResponse.name = "v.io/v23/vtrace.Response";
_typeResponse.fields = [{name: "Flags", type: _typeTraceFlags}, {name: "Trace", type: _typeTraceRecord}];
_typeSpanRecord.kind = vdl.kind.STRUCT;
_typeSpanRecord.name = "v.io/v23/vtrace.SpanRecord";
_typeSpanRecord.fields = [{name: "Id", type: new uniqueid.Id()._type}, {name: "Parent", type: new uniqueid.Id()._type}, {name: "Name", type: vdl.types.STRING}, {name: "Start", type: new time.Time()._type}, {name: "End", type: new time.Time()._type}, {name: "Annotations", type: _type2}];
_typeTraceFlags.kind = vdl.kind.INT32;
_typeTraceFlags.name = "v.io/v23/vtrace.TraceFlags";
_typeTraceRecord.kind = vdl.kind.STRUCT;
_typeTraceRecord.name = "v.io/v23/vtrace.TraceRecord";
_typeTraceRecord.fields = [{name: "Id", type: new uniqueid.Id()._type}, {name: "Spans", type: _type1}];
_type1.freeze();
_type2.freeze();
_typeAnnotation.freeze();
_typeRequest.freeze();
_typeResponse.freeze();
_typeSpanRecord.freeze();
_typeTraceFlags.freeze();
_typeTraceRecord.freeze();
module.exports.Annotation = (vdl.registry.lookupOrCreateConstructor(_typeAnnotation));
module.exports.Request = (vdl.registry.lookupOrCreateConstructor(_typeRequest));
module.exports.Response = (vdl.registry.lookupOrCreateConstructor(_typeResponse));
module.exports.SpanRecord = (vdl.registry.lookupOrCreateConstructor(_typeSpanRecord));
module.exports.TraceFlags = (vdl.registry.lookupOrCreateConstructor(_typeTraceFlags));
module.exports.TraceRecord = (vdl.registry.lookupOrCreateConstructor(_typeTraceRecord));




// Consts:

  module.exports.Empty = canonicalize.reduce(new (vdl.registry.lookupOrCreateConstructor(_typeTraceFlags))(0, true), _typeTraceFlags);

  module.exports.CollectInMemory = canonicalize.reduce(new (vdl.registry.lookupOrCreateConstructor(_typeTraceFlags))(1, true), _typeTraceFlags);



// Errors:



// Services:

   
 


