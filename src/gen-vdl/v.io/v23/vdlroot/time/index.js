// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// This file was auto-generated by the vanadium vdl tool.
var vdl = require('../../../../../vdl');






module.exports = {};



// Types:
var _typeDuration = new vdl.Type();
var _typeTime = new vdl.Type();
var _typeWireDeadline = new vdl.Type();
_typeDuration.kind = vdl.Kind.STRUCT;
_typeDuration.name = "time.Duration";
_typeDuration.fields = [{name: "Seconds", type: vdl.Types.INT64}, {name: "Nanos", type: vdl.Types.INT32}];
_typeTime.kind = vdl.Kind.STRUCT;
_typeTime.name = "time.Time";
_typeTime.fields = [{name: "Seconds", type: vdl.Types.INT64}, {name: "Nanos", type: vdl.Types.INT32}];
_typeWireDeadline.kind = vdl.Kind.STRUCT;
_typeWireDeadline.name = "time.WireDeadline";
_typeWireDeadline.fields = [{name: "FromNow", type: _typeDuration}, {name: "NoDeadline", type: vdl.Types.BOOL}];
_typeDuration.freeze();
_typeTime.freeze();
_typeWireDeadline.freeze();
module.exports.Duration = (vdl.Registry.lookupOrCreateConstructor(_typeDuration));
module.exports.Time = (vdl.Registry.lookupOrCreateConstructor(_typeTime));
module.exports.WireDeadline = (vdl.Registry.lookupOrCreateConstructor(_typeWireDeadline));




// Consts:



// Errors:



// Services:

   
 


