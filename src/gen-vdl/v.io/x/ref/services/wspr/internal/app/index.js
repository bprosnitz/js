// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// This file was auto-generated by the vanadium vdl tool.
var vdl = require('../../../../../../../../vdl');





var signature = require('./../../../../../../v23/vdlroot/signature');
var time = require('./../../../../../../v23/vdlroot/time');
var security = require('./../../../../../../v23/security');
var vtrace = require('./../../../../../../v23/vtrace');
var principal = require('./../principal');

module.exports = {};



// Types:
var _type1 = new vdl.Type();
var _type2 = new vdl.Type();
var _type3 = new vdl.Type();
var _type4 = new vdl.Type();
var _type5 = new vdl.Type();
var _type6 = new vdl.Type();
var _type7 = new vdl.Type();
var _typeRpcCallOption = new vdl.Type();
var _typeRpcRequest = new vdl.Type();
var _typeRpcResponse = new vdl.Type();
_type1.kind = vdl.Kind.LIST;
_type1.name = "";
_type1.elem = _typeRpcCallOption;
_type2.kind = vdl.Kind.LIST;
_type2.name = "";
_type2.elem = new security.BlessingPattern()._type;
_type3.kind = vdl.Kind.LIST;
_type3.name = "";
_type3.elem = vdl.Types.ANY;
_type4.kind = vdl.Kind.LIST;
_type4.name = "";
_type4.elem = new security.Caveat()._type;
_type5.kind = vdl.Kind.OPTIONAL;
_type5.name = "";
_type5.elem = new principal.JsBlessings()._type;
_type6.kind = vdl.Kind.LIST;
_type6.name = "";
_type6.elem = vdl.Types.STRING;
_type7.kind = vdl.Kind.LIST;
_type7.name = "";
_type7.elem = new signature.Interface()._type;
_typeRpcCallOption.kind = vdl.Kind.UNION;
_typeRpcCallOption.name = "v.io/x/ref/services/wspr/internal/app.RpcCallOption";
_typeRpcCallOption.fields = [{name: "AllowedServersPolicy", type: _type2}, {name: "RetryTimeout", type: new time.Duration()._type}];
_typeRpcRequest.kind = vdl.Kind.STRUCT;
_typeRpcRequest.name = "v.io/x/ref/services/wspr/internal/app.RpcRequest";
_typeRpcRequest.fields = [{name: "Name", type: vdl.Types.STRING}, {name: "Method", type: vdl.Types.STRING}, {name: "NumInArgs", type: vdl.Types.INT32}, {name: "NumOutArgs", type: vdl.Types.INT32}, {name: "IsStreaming", type: vdl.Types.BOOL}, {name: "Deadline", type: new time.WireDeadline()._type}, {name: "TraceRequest", type: new vtrace.Request()._type}, {name: "CallOptions", type: _type1}];
_typeRpcResponse.kind = vdl.Kind.STRUCT;
_typeRpcResponse.name = "v.io/x/ref/services/wspr/internal/app.RpcResponse";
_typeRpcResponse.fields = [{name: "OutArgs", type: _type3}, {name: "TraceResponse", type: new vtrace.Response()._type}];
_type1.freeze();
_type2.freeze();
_type3.freeze();
_type4.freeze();
_type5.freeze();
_type6.freeze();
_type7.freeze();
_typeRpcCallOption.freeze();
_typeRpcRequest.freeze();
_typeRpcResponse.freeze();
module.exports.RpcCallOption = (vdl.Registry.lookupOrCreateConstructor(_typeRpcCallOption));
module.exports.RpcRequest = (vdl.Registry.lookupOrCreateConstructor(_typeRpcRequest));
module.exports.RpcResponse = (vdl.Registry.lookupOrCreateConstructor(_typeRpcResponse));




// Consts:



// Errors:



// Services:

   

  
    
function Controller(){}
module.exports.Controller = Controller

    
      
Controller.prototype.serve = function(ctx, name, serverId) {
  throw new Error('Method Serve not implemented');
};
    
      
Controller.prototype.stop = function(ctx, serverId) {
  throw new Error('Method Stop not implemented');
};
    
      
Controller.prototype.addName = function(ctx, serverId, name) {
  throw new Error('Method AddName not implemented');
};
    
      
Controller.prototype.removeName = function(ctx, serverId, name) {
  throw new Error('Method RemoveName not implemented');
};
    
      
Controller.prototype.unlinkBlessings = function(ctx, handle) {
  throw new Error('Method UnlinkBlessings not implemented');
};
    
      
Controller.prototype.bless = function(ctx, publicKey, blessingHandle, extension, caveat) {
  throw new Error('Method Bless not implemented');
};
    
      
Controller.prototype.blessSelf = function(ctx, name, caveats) {
  throw new Error('Method BlessSelf not implemented');
};
    
      
Controller.prototype.putToBlessingStore = function(ctx, blessingHandle, pattern) {
  throw new Error('Method PutToBlessingStore not implemented');
};
    
      
Controller.prototype.remoteBlessings = function(ctx, name, method) {
  throw new Error('Method RemoteBlessings not implemented');
};
    
      
Controller.prototype.signature = function(ctx, name) {
  throw new Error('Method Signature not implemented');
};
    
      
Controller.prototype.getDefaultBlessings = function(ctx) {
  throw new Error('Method GetDefaultBlessings not implemented');
};
     

    
Controller.prototype._serviceDescription = {
  name: 'Controller',
  pkgPath: 'v.io/x/ref/services/wspr/internal/app',
  doc: "",
  embeds: [],
  methods: [
    
      
    {
    name: 'Serve',
    doc: "// Serve instructs WSPR to start listening for calls on behalf\n// of a javascript server.",
    inArgs: [{
      name: 'name',
      doc: "",
      type: vdl.Types.STRING
    },
    {
      name: 'serverId',
      doc: "",
      type: vdl.Types.UINT32
    },
    ],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Stop',
    doc: "// Stop instructs WSPR to stop listening for calls for the\n// given javascript server.",
    inArgs: [{
      name: 'serverId',
      doc: "",
      type: vdl.Types.UINT32
    },
    ],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'AddName',
    doc: "// AddName adds a published name to an existing server.",
    inArgs: [{
      name: 'serverId',
      doc: "",
      type: vdl.Types.UINT32
    },
    {
      name: 'name',
      doc: "",
      type: vdl.Types.STRING
    },
    ],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'RemoveName',
    doc: "// RemoveName removes a published name from an existing server.",
    inArgs: [{
      name: 'serverId',
      doc: "",
      type: vdl.Types.UINT32
    },
    {
      name: 'name',
      doc: "",
      type: vdl.Types.STRING
    },
    ],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'UnlinkBlessings',
    doc: "// UnlinkBlessings removes the given blessings from the blessings store.",
    inArgs: [{
      name: 'handle',
      doc: "",
      type: new principal.BlessingsHandle()._type
    },
    ],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Bless',
    doc: "// Bless binds extensions of blessings held by this principal to\n// another principal (represented by its public key).",
    inArgs: [{
      name: 'publicKey',
      doc: "",
      type: vdl.Types.STRING
    },
    {
      name: 'blessingHandle',
      doc: "",
      type: new principal.BlessingsHandle()._type
    },
    {
      name: 'extension',
      doc: "",
      type: vdl.Types.STRING
    },
    {
      name: 'caveat',
      doc: "",
      type: _type4
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.STRING
    },
    {
      name: '',
      doc: "",
      type: new principal.BlessingsHandle()._type
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'BlessSelf',
    doc: "// BlessSelf creates a blessing with the provided name for this principal.",
    inArgs: [{
      name: 'name',
      doc: "",
      type: vdl.Types.STRING
    },
    {
      name: 'caveats',
      doc: "",
      type: _type4
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.STRING
    },
    {
      name: '',
      doc: "",
      type: new principal.BlessingsHandle()._type
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'PutToBlessingStore',
    doc: "// PutToBlessingStore puts the specified blessing to the blessing store under the provided pattern.",
    inArgs: [{
      name: 'blessingHandle',
      doc: "",
      type: new principal.BlessingsHandle()._type
    },
    {
      name: 'pattern',
      doc: "",
      type: new security.BlessingPattern()._type
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type5
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'RemoteBlessings',
    doc: "// RemoteBlessings fetches the remote blessings for a given name and method.",
    inArgs: [{
      name: 'name',
      doc: "",
      type: vdl.Types.STRING
    },
    {
      name: 'method',
      doc: "",
      type: vdl.Types.STRING
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type6
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Signature',
    doc: "// Signature fetches the signature for a given name.",
    inArgs: [{
      name: 'name',
      doc: "",
      type: vdl.Types.STRING
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type7
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'GetDefaultBlessings',
    doc: "// GetDefaultBlessings fetches the default blessings for the principal of the controller.",
    inArgs: [],
    outArgs: [{
      name: '',
      doc: "",
      type: _type5
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
     
  ]
};

   
 


