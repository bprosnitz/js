// This file was auto-generated by the veyron vdl tool.
var vom = require('../../../../../.././vom/vom');
// TODO(bjornick): Remove unused imports.
var Types = vom.Types;
var Type = vom.Type;
var Kind = vom.Kind;
var BigInt = vom.BigInt;
var Complex = vom.Complex;
var Builtins = vom.Builtins;
var Registry = vom.Registry;





module.exports = {};



// Types:
var _typeCaveat = new Type();
_typeCaveat.kind = Kind.STRUCT;
_typeCaveat.name = "v.io/wspr/veyron/services/wsprd/account.Caveat";
_typeCaveat.fields = [{name: "Type", type: Types.STRING}, {name: "Args", type: Types.STRING}];
module.exports.Caveat = (Registry.lookupOrCreateConstructor(_typeCaveat));




// Consts:



// Errors:



function NotImplementedMethod(name) {
  throw new Error('Method ' + name + ' not implemented');
}


// Services:

   
 

