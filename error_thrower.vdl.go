// This file was auto-generated by the veyron vdl tool.
// Source: error_thrower.vdl

package sample

import (
	// The non-user imports are prefixed with "_gen_" to prevent collisions.
	_gen_veyron2 "veyron2"
	_gen_ipc "veyron2/ipc"
	_gen_naming "veyron2/naming"
	_gen_rt "veyron2/rt"
	_gen_vdl "veyron2/vdl"
	_gen_wiretype "veyron2/wiretype"
)

// A testing interface with methods that throw various types of errors
// ErrorThrower is the interface the client binds and uses.
// ErrorThrower_InternalNoTagGetter is the interface without the TagGetter
// and UnresolveStep methods (both framework-added, rathern than user-defined),
// to enable embedding without method collisions.  Not to be used directly by
// clients.
type ErrorThrower_InternalNoTagGetter interface {

	// Throws veyron2/vError.Aborted error
	ThrowAborted(opts ..._gen_ipc.ClientCallOpt) (err error)
	// Throws veyron2/vError.BadArg error
	ThrowBadArg(opts ..._gen_ipc.ClientCallOpt) (err error)
	// Throws veyron2/vError.BadProtocol error
	ThrowBadProtocol(opts ..._gen_ipc.ClientCallOpt) (err error)
	// Throws veyron2/vError.Internal error
	ThrowInternal(opts ..._gen_ipc.ClientCallOpt) (err error)
	// Throws veyron2/vError.NotAuthorized error
	ThrowNotAuthorized(opts ..._gen_ipc.ClientCallOpt) (err error)
	// Throws veyron2/vError.NotFound error
	ThrowNotFound(opts ..._gen_ipc.ClientCallOpt) (err error)
	// Throws veyron2/vError.Unknown error
	ThrowUnknown(opts ..._gen_ipc.ClientCallOpt) (err error)
	// Throws normal Go error
	ThrowGoError(opts ..._gen_ipc.ClientCallOpt) (err error)
	// Throws custom error created by using Standard
	ThrowCustomStandardError(opts ..._gen_ipc.ClientCallOpt) (err error)
	// Lists all errors Ids available in veyron2/verror
	ListAllBuiltInErrorIDs(opts ..._gen_ipc.ClientCallOpt) (reply []string, err error)
}
type ErrorThrower interface {
	_gen_vdl.TagGetter
	// UnresolveStep returns the names for the remote service, rooted at the
	// service's immediate namespace ancestor.
	UnresolveStep(opts ..._gen_ipc.ClientCallOpt) ([]string, error)
	ErrorThrower_InternalNoTagGetter
}

// ErrorThrowerService is the interface the server implements.
type ErrorThrowerService interface {

	// Throws veyron2/vError.Aborted error
	ThrowAborted(context _gen_ipc.Context) (err error)
	// Throws veyron2/vError.BadArg error
	ThrowBadArg(context _gen_ipc.Context) (err error)
	// Throws veyron2/vError.BadProtocol error
	ThrowBadProtocol(context _gen_ipc.Context) (err error)
	// Throws veyron2/vError.Internal error
	ThrowInternal(context _gen_ipc.Context) (err error)
	// Throws veyron2/vError.NotAuthorized error
	ThrowNotAuthorized(context _gen_ipc.Context) (err error)
	// Throws veyron2/vError.NotFound error
	ThrowNotFound(context _gen_ipc.Context) (err error)
	// Throws veyron2/vError.Unknown error
	ThrowUnknown(context _gen_ipc.Context) (err error)
	// Throws normal Go error
	ThrowGoError(context _gen_ipc.Context) (err error)
	// Throws custom error created by using Standard
	ThrowCustomStandardError(context _gen_ipc.Context) (err error)
	// Lists all errors Ids available in veyron2/verror
	ListAllBuiltInErrorIDs(context _gen_ipc.Context) (reply []string, err error)
}

// BindErrorThrower returns the client stub implementing the ErrorThrower
// interface.
//
// If no _gen_ipc.Client is specified, the default _gen_ipc.Client in the
// global Runtime is used.
func BindErrorThrower(name string, opts ..._gen_ipc.BindOpt) (ErrorThrower, error) {
	var client _gen_ipc.Client
	switch len(opts) {
	case 0:
		client = _gen_rt.R().Client()
	case 1:
		switch o := opts[0].(type) {
		case _gen_veyron2.Runtime:
			client = o.Client()
		case _gen_ipc.Client:
			client = o
		default:
			return nil, _gen_vdl.ErrUnrecognizedOption
		}
	default:
		return nil, _gen_vdl.ErrTooManyOptionsToBind
	}
	stub := &clientStubErrorThrower{client: client, name: name}

	return stub, nil
}

// NewServerErrorThrower creates a new server stub.
//
// It takes a regular server implementing the ErrorThrowerService
// interface, and returns a new server stub.
func NewServerErrorThrower(server ErrorThrowerService) interface{} {
	return &ServerStubErrorThrower{
		service: server,
	}
}

// clientStubErrorThrower implements ErrorThrower.
type clientStubErrorThrower struct {
	client _gen_ipc.Client
	name   string
}

func (c *clientStubErrorThrower) GetMethodTags(method string) []interface{} {
	return GetErrorThrowerMethodTags(method)
}

func (__gen_c *clientStubErrorThrower) ThrowAborted(opts ..._gen_ipc.ClientCallOpt) (err error) {
	var call _gen_ipc.ClientCall
	if call, err = __gen_c.client.StartCall(__gen_c.name, "ThrowAborted", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubErrorThrower) ThrowBadArg(opts ..._gen_ipc.ClientCallOpt) (err error) {
	var call _gen_ipc.ClientCall
	if call, err = __gen_c.client.StartCall(__gen_c.name, "ThrowBadArg", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubErrorThrower) ThrowBadProtocol(opts ..._gen_ipc.ClientCallOpt) (err error) {
	var call _gen_ipc.ClientCall
	if call, err = __gen_c.client.StartCall(__gen_c.name, "ThrowBadProtocol", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubErrorThrower) ThrowInternal(opts ..._gen_ipc.ClientCallOpt) (err error) {
	var call _gen_ipc.ClientCall
	if call, err = __gen_c.client.StartCall(__gen_c.name, "ThrowInternal", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubErrorThrower) ThrowNotAuthorized(opts ..._gen_ipc.ClientCallOpt) (err error) {
	var call _gen_ipc.ClientCall
	if call, err = __gen_c.client.StartCall(__gen_c.name, "ThrowNotAuthorized", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubErrorThrower) ThrowNotFound(opts ..._gen_ipc.ClientCallOpt) (err error) {
	var call _gen_ipc.ClientCall
	if call, err = __gen_c.client.StartCall(__gen_c.name, "ThrowNotFound", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubErrorThrower) ThrowUnknown(opts ..._gen_ipc.ClientCallOpt) (err error) {
	var call _gen_ipc.ClientCall
	if call, err = __gen_c.client.StartCall(__gen_c.name, "ThrowUnknown", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubErrorThrower) ThrowGoError(opts ..._gen_ipc.ClientCallOpt) (err error) {
	var call _gen_ipc.ClientCall
	if call, err = __gen_c.client.StartCall(__gen_c.name, "ThrowGoError", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubErrorThrower) ThrowCustomStandardError(opts ..._gen_ipc.ClientCallOpt) (err error) {
	var call _gen_ipc.ClientCall
	if call, err = __gen_c.client.StartCall(__gen_c.name, "ThrowCustomStandardError", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubErrorThrower) ListAllBuiltInErrorIDs(opts ..._gen_ipc.ClientCallOpt) (reply []string, err error) {
	var call _gen_ipc.ClientCall
	if call, err = __gen_c.client.StartCall(__gen_c.name, "ListAllBuiltInErrorIDs", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c *clientStubErrorThrower) UnresolveStep(opts ..._gen_ipc.ClientCallOpt) (reply []string, err error) {
	var call _gen_ipc.ClientCall
	if call, err = c.client.StartCall(c.name, "UnresolveStep", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

// ServerStubErrorThrower wraps a server that implements
// ErrorThrowerService and provides an object that satisfies
// the requirements of veyron2/ipc.ReflectInvoker.
type ServerStubErrorThrower struct {
	service ErrorThrowerService
}

func (s *ServerStubErrorThrower) GetMethodTags(method string) []interface{} {
	return GetErrorThrowerMethodTags(method)
}

func (s *ServerStubErrorThrower) Signature(call _gen_ipc.ServerCall) (_gen_ipc.ServiceSignature, error) {
	result := _gen_ipc.ServiceSignature{Methods: make(map[string]_gen_ipc.MethodSignature)}
	result.Methods["ListAllBuiltInErrorIDs"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 61},
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowAborted"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowBadArg"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowBadProtocol"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowCustomStandardError"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowGoError"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowInternal"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowNotAuthorized"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowNotFound"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowUnknown"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}

	result.TypeDefs = []_gen_vdl.Any{
		_gen_wiretype.NamedPrimitiveType{Type: 0x1, Name: "error", Tags: []string(nil)}}

	return result, nil
}

func (s *ServerStubErrorThrower) UnresolveStep(call _gen_ipc.ServerCall) (reply []string, err error) {
	if unresolver, ok := s.service.(_gen_ipc.Unresolver); ok {
		return unresolver.UnresolveStep(call)
	}
	if call.Server() == nil {
		return
	}
	var published []string
	if published, err = call.Server().Published(); err != nil || published == nil {
		return
	}
	reply = make([]string, len(published))
	for i, p := range published {
		reply[i] = _gen_naming.Join(p, call.Name())
	}
	return
}

func (__gen_s *ServerStubErrorThrower) ThrowAborted(call _gen_ipc.ServerCall) (err error) {
	err = __gen_s.service.ThrowAborted(call)
	return
}

func (__gen_s *ServerStubErrorThrower) ThrowBadArg(call _gen_ipc.ServerCall) (err error) {
	err = __gen_s.service.ThrowBadArg(call)
	return
}

func (__gen_s *ServerStubErrorThrower) ThrowBadProtocol(call _gen_ipc.ServerCall) (err error) {
	err = __gen_s.service.ThrowBadProtocol(call)
	return
}

func (__gen_s *ServerStubErrorThrower) ThrowInternal(call _gen_ipc.ServerCall) (err error) {
	err = __gen_s.service.ThrowInternal(call)
	return
}

func (__gen_s *ServerStubErrorThrower) ThrowNotAuthorized(call _gen_ipc.ServerCall) (err error) {
	err = __gen_s.service.ThrowNotAuthorized(call)
	return
}

func (__gen_s *ServerStubErrorThrower) ThrowNotFound(call _gen_ipc.ServerCall) (err error) {
	err = __gen_s.service.ThrowNotFound(call)
	return
}

func (__gen_s *ServerStubErrorThrower) ThrowUnknown(call _gen_ipc.ServerCall) (err error) {
	err = __gen_s.service.ThrowUnknown(call)
	return
}

func (__gen_s *ServerStubErrorThrower) ThrowGoError(call _gen_ipc.ServerCall) (err error) {
	err = __gen_s.service.ThrowGoError(call)
	return
}

func (__gen_s *ServerStubErrorThrower) ThrowCustomStandardError(call _gen_ipc.ServerCall) (err error) {
	err = __gen_s.service.ThrowCustomStandardError(call)
	return
}

func (__gen_s *ServerStubErrorThrower) ListAllBuiltInErrorIDs(call _gen_ipc.ServerCall) (reply []string, err error) {
	reply, err = __gen_s.service.ListAllBuiltInErrorIDs(call)
	return
}

func GetErrorThrowerMethodTags(method string) []interface{} {
	switch method {
	case "ThrowAborted":
		return []interface{}{}
	case "ThrowBadArg":
		return []interface{}{}
	case "ThrowBadProtocol":
		return []interface{}{}
	case "ThrowInternal":
		return []interface{}{}
	case "ThrowNotAuthorized":
		return []interface{}{}
	case "ThrowNotFound":
		return []interface{}{}
	case "ThrowUnknown":
		return []interface{}{}
	case "ThrowGoError":
		return []interface{}{}
	case "ThrowCustomStandardError":
		return []interface{}{}
	case "ListAllBuiltInErrorIDs":
		return []interface{}{}
	default:
		return nil
	}
}
