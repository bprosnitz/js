// This file was auto-generated by the vanadium vdl tool.
var vdl = require('../../../../../../vdl');





var security = require('./../../../../v23/security');

module.exports = {};



// Types:
var _type1 = new vdl.Type();
var _typeBlessingRootResponse = new vdl.Type();
_type1.kind = vdl.Kind.LIST;
_type1.name = "";
_type1.elem = vdl.Types.STRING;
_typeBlessingRootResponse.kind = vdl.Kind.STRUCT;
_typeBlessingRootResponse.name = "v.io/x/ref/services/identity.BlessingRootResponse";
_typeBlessingRootResponse.fields = [{name: "Names", type: _type1}, {name: "PublicKey", type: vdl.Types.STRING}];
_type1.freeze();
_typeBlessingRootResponse.freeze();
module.exports.BlessingRootResponse = (vdl.Registry.lookupOrCreateConstructor(_typeBlessingRootResponse));




// Consts:



// Errors:



// Services:

  
    
function OAuthBlesser(){}
module.exports.OAuthBlesser = OAuthBlesser

    
      
OAuthBlesser.prototype.blessUsingAccessToken = function(ctx, token) {
  throw new Error('Method BlessUsingAccessToken not implemented');
};
     

    
OAuthBlesser.prototype._serviceDescription = {
  name: 'OAuthBlesser',
  pkgPath: 'v.io/x/ref/services/identity',
  doc: "// OAuthBlesser exchanges OAuth access tokens for\n// an email address from an OAuth-based identity provider and uses the email\n// address obtained to bless the client.\n//\n// OAuth is described in RFC 6749 (http://tools.ietf.org/html/rfc6749),\n// though the Google implementation also has informative documentation at\n// https://developers.google.com/accounts/docs/OAuth2\n//\n// WARNING: There is no binding between the channel over which the access token\n// was obtained (typically https) and the channel used to make the RPC (a\n// vanadium virtual circuit).\n// Thus, if Mallory possesses the access token associated with Alice's account,\n// she may be able to obtain a blessing with Alice's name on it.",
  embeds: [],
  methods: [
    
      
    {
    name: 'BlessUsingAccessToken',
    doc: "// BlessUsingAccessToken uses the provided access token to obtain the email\n// address and returns a blessing along with the email address.",
    inArgs: [{
      name: 'token',
      doc: "",
      type: vdl.Types.STRING
    },
    ],
    outArgs: [{
      name: 'blessing',
      doc: "",
      type: new security.WireBlessings()._type
    },
    {
      name: 'email',
      doc: "",
      type: vdl.Types.STRING
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
     
  ]
};

  
    
function MacaroonBlesser(){}
module.exports.MacaroonBlesser = MacaroonBlesser

    
      
MacaroonBlesser.prototype.bless = function(ctx, macaroon) {
  throw new Error('Method Bless not implemented');
};
     

    
MacaroonBlesser.prototype._serviceDescription = {
  name: 'MacaroonBlesser',
  pkgPath: 'v.io/x/ref/services/identity',
  doc: "// MacaroonBlesser returns a blessing given the provided macaroon string.",
  embeds: [],
  methods: [
    
      
    {
    name: 'Bless',
    doc: "// Bless uses the provided macaroon (which contains email and caveats)\n// to return a blessing for the client.",
    inArgs: [{
      name: 'macaroon',
      doc: "",
      type: vdl.Types.STRING
    },
    ],
    outArgs: [{
      name: 'blessing',
      doc: "",
      type: new security.WireBlessings()._type
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
     
  ]
};

   
 


