// This file was auto-generated by the vanadium vdl tool.
var vdl = require('../../../../../../../vdl');





var vtrace = require('./../../../../../v23/vtrace');

module.exports = {};



// Types:
var _type1 = new vdl.Type();
var _typeServerRpcReply = new vdl.Type();
_type1.kind = vdl.Kind.LIST;
_type1.name = "";
_type1.elem = vdl.Types.ANY;
_typeServerRpcReply.kind = vdl.Kind.STRUCT;
_typeServerRpcReply.name = "v.io/x/ref/services/wsprd/lib.ServerRpcReply";
_typeServerRpcReply.fields = [{name: "Results", type: _type1}, {name: "Err", type: vdl.Types.ERROR}, {name: "TraceResponse", type: new vtrace.Response()._type}];
_type1.freeze();
_typeServerRpcReply.freeze();
module.exports.ServerRpcReply = (vdl.Registry.lookupOrCreateConstructor(_typeServerRpcReply));




// Consts:



// Errors:



// Services:

   
 


