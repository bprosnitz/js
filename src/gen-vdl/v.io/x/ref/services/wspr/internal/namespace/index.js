// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// This file was auto-generated by the vanadium vdl tool.
var vdl = require('../../../../../../../../vdl');





var time = require('./../../../../../../v23/vdlroot/time');
var naming = require('./../../../../../../v23/naming');
var access = require('./../../../../../../v23/security/access');

module.exports = {};



// Types:
var _type1 = new vdl.Type();
_type1.kind = vdl.kind.LIST;
_type1.name = "";
_type1.elem = vdl.types.STRING;
_type1.freeze();




// Consts:



// Errors:



// Services:

  
    
function Namespace(){}
module.exports.Namespace = Namespace;

    
      
Namespace.prototype.glob = function(ctx, serverCall, pattern) {
  throw new Error('Method Glob not implemented');
};
    
      
Namespace.prototype.mount = function(ctx, serverCall, name, server, ttl, replace) {
  throw new Error('Method Mount not implemented');
};
    
      
Namespace.prototype.unmount = function(ctx, serverCall, name, server) {
  throw new Error('Method Unmount not implemented');
};
    
      
Namespace.prototype.resolve = function(ctx, serverCall, name) {
  throw new Error('Method Resolve not implemented');
};
    
      
Namespace.prototype.resolveToMountTable = function(ctx, serverCall, name) {
  throw new Error('Method ResolveToMountTable not implemented');
};
    
      
Namespace.prototype.shallowResolve = function(ctx, serverCall, name) {
  throw new Error('Method ShallowResolve not implemented');
};
    
      
Namespace.prototype.flushCacheEntry = function(ctx, serverCall, name) {
  throw new Error('Method FlushCacheEntry not implemented');
};
    
      
Namespace.prototype.disableCache = function(ctx, serverCall, disable) {
  throw new Error('Method DisableCache not implemented');
};
    
      
Namespace.prototype.roots = function(ctx, serverCall) {
  throw new Error('Method Roots not implemented');
};
    
      
Namespace.prototype.setRoots = function(ctx, serverCall, roots) {
  throw new Error('Method SetRoots not implemented');
};
    
      
Namespace.prototype.setPermissions = function(ctx, serverCall, name, perms, version) {
  throw new Error('Method SetPermissions not implemented');
};
    
      
Namespace.prototype.getPermissions = function(ctx, serverCall, name) {
  throw new Error('Method GetPermissions not implemented');
};
    
      
Namespace.prototype.delete = function(ctx, serverCall, name, deleteSubtree) {
  throw new Error('Method Delete not implemented');
};
     

    
Namespace.prototype._serviceDescription = {
  name: 'Namespace',
  pkgPath: 'v.io/x/ref/services/wspr/internal/namespace',
  doc: "",
  embeds: [],
  methods: [
    
      
    {
    name: 'Glob',
    doc: "// Run a glob query and stream the results.",
    inArgs: [{
      name: 'pattern',
      doc: "",
      type: vdl.types.STRING
    },
    ],
    outArgs: [],
    inStream: null,
    outStream: {
      name: '',
      doc: '',
      type: new naming.GlobReply()._type
    },
    tags: []
  },
    
      
    {
    name: 'Mount',
    doc: "// Mount mounts a server under the given name.",
    inArgs: [{
      name: 'name',
      doc: "",
      type: vdl.types.STRING
    },
    {
      name: 'server',
      doc: "",
      type: vdl.types.STRING
    },
    {
      name: 'ttl',
      doc: "",
      type: new time.Duration()._type
    },
    {
      name: 'replace',
      doc: "",
      type: vdl.types.BOOL
    },
    ],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Unmount',
    doc: "// Unmount removes an existing mount point.",
    inArgs: [{
      name: 'name',
      doc: "",
      type: vdl.types.STRING
    },
    {
      name: 'server',
      doc: "",
      type: vdl.types.STRING
    },
    ],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Resolve',
    doc: "// Resolve resolves a name to an address.",
    inArgs: [{
      name: 'name',
      doc: "",
      type: vdl.types.STRING
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type1
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'ResolveToMountTable',
    doc: "// ResolveToMountTable resolves a name to the address of the mounttable\n// directly hosting it.",
    inArgs: [{
      name: 'name',
      doc: "",
      type: vdl.types.STRING
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type1
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'ShallowResolve',
    doc: "// ShallowResolve resolves the object name into its mounted servers.  It is the same\n// as Resolve except when mounttables are stacked below the same mount point.  For example,\n// if service D is mounted onto /MTA/a/b and /MTA/a/b is mounted onto /MTB/x/y then\n// Resolve(/MTB/x/y) will return a pointer to D while ShallowResolve(/MTB/x/y) will\n// return a pointer to /MTA/a/b.",
    inArgs: [{
      name: 'name',
      doc: "",
      type: vdl.types.STRING
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type1
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'FlushCacheEntry',
    doc: "// FlushCacheEntry removes the namespace cache entry for a given name.",
    inArgs: [{
      name: 'name',
      doc: "",
      type: vdl.types.STRING
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.types.BOOL
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'DisableCache',
    doc: "// DisableCache disables the naming cache.",
    inArgs: [{
      name: 'disable',
      doc: "",
      type: vdl.types.BOOL
    },
    ],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Roots',
    doc: "// Roots returns the addresses of the current mounttable roots.",
    inArgs: [],
    outArgs: [{
      name: '',
      doc: "",
      type: _type1
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'SetRoots',
    doc: "// SetRoots sets the current mounttable roots.",
    inArgs: [{
      name: 'roots',
      doc: "",
      type: _type1
    },
    ],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'SetPermissions',
    doc: "// SetPermissions sets the AccessList in a node in a mount table.",
    inArgs: [{
      name: 'name',
      doc: "",
      type: vdl.types.STRING
    },
    {
      name: 'perms',
      doc: "",
      type: new access.Permissions()._type
    },
    {
      name: 'version',
      doc: "",
      type: vdl.types.STRING
    },
    ],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'GetPermissions',
    doc: "// GetPermissions returns the AccessList in a node in a mount table.",
    inArgs: [{
      name: 'name',
      doc: "",
      type: vdl.types.STRING
    },
    ],
    outArgs: [{
      name: 'perms',
      doc: "",
      type: new access.Permissions()._type
    },
    {
      name: 'version',
      doc: "",
      type: vdl.types.STRING
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Delete',
    doc: "// Delete deletes the name from the mounttable and, if requested, any subtree.",
    inArgs: [{
      name: 'name',
      doc: "",
      type: vdl.types.STRING
    },
    {
      name: 'deleteSubtree',
      doc: "",
      type: vdl.types.BOOL
    },
    ],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: []
  },
     
  ]
};

   
 


