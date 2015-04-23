// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// This file was auto-generated by the vanadium vdl tool.
var vdl = require('../../../../../../../../../../src/vdl');






module.exports = {};



// Types:
var _typeWireAll = new vdl.Type();
var _typeWireMapStringInt = new vdl.Type();
var _typeWireMultiImport = new vdl.Type();
var _typeWireSamePkg = new vdl.Type();
var _typeWireString = new vdl.Type();
var _typeWireTime = new vdl.Type();
var _typeignoreme = new vdl.Type();
_typeWireAll.kind = vdl.kind.STRUCT;
_typeWireAll.name = "v.io/x/ref/lib/vdl/testdata/nativetest.WireAll";
_typeWireAll.fields = [{name: "A", type: _typeWireString}, {name: "B", type: _typeWireMapStringInt}, {name: "C", type: _typeWireTime}, {name: "D", type: _typeWireSamePkg}, {name: "E", type: _typeWireMultiImport}];
_typeWireMapStringInt.kind = vdl.kind.INT32;
_typeWireMapStringInt.name = "v.io/x/ref/lib/vdl/testdata/nativetest.WireMapStringInt";
_typeWireMultiImport.kind = vdl.kind.INT32;
_typeWireMultiImport.name = "v.io/x/ref/lib/vdl/testdata/nativetest.WireMultiImport";
_typeWireSamePkg.kind = vdl.kind.INT32;
_typeWireSamePkg.name = "v.io/x/ref/lib/vdl/testdata/nativetest.WireSamePkg";
_typeWireString.kind = vdl.kind.INT32;
_typeWireString.name = "v.io/x/ref/lib/vdl/testdata/nativetest.WireString";
_typeWireTime.kind = vdl.kind.INT32;
_typeWireTime.name = "v.io/x/ref/lib/vdl/testdata/nativetest.WireTime";
_typeignoreme.kind = vdl.kind.STRING;
_typeignoreme.name = "v.io/x/ref/lib/vdl/testdata/nativetest.ignoreme";
_typeWireAll.freeze();
_typeWireMapStringInt.freeze();
_typeWireMultiImport.freeze();
_typeWireSamePkg.freeze();
_typeWireString.freeze();
_typeWireTime.freeze();
_typeignoreme.freeze();
module.exports.WireAll = (vdl.registry.lookupOrCreateConstructor(_typeWireAll));
module.exports.WireMapStringInt = (vdl.registry.lookupOrCreateConstructor(_typeWireMapStringInt));
module.exports.WireMultiImport = (vdl.registry.lookupOrCreateConstructor(_typeWireMultiImport));
module.exports.WireSamePkg = (vdl.registry.lookupOrCreateConstructor(_typeWireSamePkg));
module.exports.WireString = (vdl.registry.lookupOrCreateConstructor(_typeWireString));
module.exports.WireTime = (vdl.registry.lookupOrCreateConstructor(_typeWireTime));
module.exports.ignoreme = (vdl.registry.lookupOrCreateConstructor(_typeignoreme));




// Consts:



// Errors:



// Services:

   

   
 


