// This file was auto-generated by the veyron vdl tool.
var vom = require('../../../../../.././vom/vom');





var nativetest = require('./../nativetest/nativetest');

module.exports = {};



// Types:
var _typeAll = new vom.Type();
_typeAll.kind = vom.Kind.STRUCT;
_typeAll.name = "v.io/core/veyron2/vdl/testdata/nativedep.All";
_typeAll.fields = [{name: "A", type: new nativetest.WireString()._type}, {name: "B", type: new nativetest.WireMapStringInt()._type}, {name: "C", type: new nativetest.WireTime()._type}, {name: "D", type: new nativetest.WireSamePkg()._type}, {name: "E", type: new nativetest.WireMultiImport()._type}];
module.exports.All = (vom.Registry.lookupOrCreateConstructor(_typeAll));




// Consts:



// Errors:



// Services:

   
 

