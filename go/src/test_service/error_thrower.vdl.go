// This file was auto-generated by the veyron vdl tool.
// Source: error_thrower.vdl

package test_service

import (
	// The non-user imports are prefixed with "__" to prevent collisions.
	__veyron2 "v.io/veyron/veyron2"
	__context "v.io/veyron/veyron2/context"
	__ipc "v.io/veyron/veyron2/ipc"
	__vdlutil "v.io/veyron/veyron2/vdl/vdlutil"
	__wiretype "v.io/veyron/veyron2/wiretype"
)

// TODO(toddw): Remove this line once the new signature support is done.
// It corrects a bug where __wiretype is unused in VDL pacakges where only
// bootstrap types are used on interfaces.
const _ = __wiretype.TypeIDInvalid

// ErrorThrowerClientMethods is the client interface
// containing ErrorThrower methods.
//
// A testing interface with methods that throw various types of errors
type ErrorThrowerClientMethods interface {
	// Throws veyron2/vError.Aborted error
	ThrowAborted(__context.T, ...__ipc.CallOpt) error
	// Throws veyron2/vError.BadArg error
	ThrowBadArg(__context.T, ...__ipc.CallOpt) error
	// Throws veyron2/vError.BadProtocol error
	ThrowBadProtocol(__context.T, ...__ipc.CallOpt) error
	// Throws veyron2/vError.Internal error
	ThrowInternal(__context.T, ...__ipc.CallOpt) error
	// Throws veyron2/vError.NoAccess error
	ThrowNoAccess(__context.T, ...__ipc.CallOpt) error
	// Throws veyron2/vError.NoExist error
	ThrowNoExist(__context.T, ...__ipc.CallOpt) error
	// Throws veyron2/vError.NoExistOrNoAccess error
	ThrowNoExistOrNoAccess(__context.T, ...__ipc.CallOpt) error
	// Throws veyron2/vError.Unknown error
	ThrowUnknown(__context.T, ...__ipc.CallOpt) error
	// Throws normal Go error
	ThrowGoError(__context.T, ...__ipc.CallOpt) error
	// Throws custom error created by using Standard
	ThrowCustomStandardError(__context.T, ...__ipc.CallOpt) error
	// Lists all errors Ids available in veyron2/verror
	ListAllBuiltInErrorIDs(__context.T, ...__ipc.CallOpt) ([]string, error)
}

// ErrorThrowerClientStub adds universal methods to ErrorThrowerClientMethods.
type ErrorThrowerClientStub interface {
	ErrorThrowerClientMethods
	__ipc.UniversalServiceMethods
}

// ErrorThrowerClient returns a client stub for ErrorThrower.
func ErrorThrowerClient(name string, opts ...__ipc.BindOpt) ErrorThrowerClientStub {
	var client __ipc.Client
	for _, opt := range opts {
		if clientOpt, ok := opt.(__ipc.Client); ok {
			client = clientOpt
		}
	}
	return implErrorThrowerClientStub{name, client}
}

type implErrorThrowerClientStub struct {
	name   string
	client __ipc.Client
}

func (c implErrorThrowerClientStub) c(ctx __context.T) __ipc.Client {
	if c.client != nil {
		return c.client
	}
	return __veyron2.RuntimeFromContext(ctx).Client()
}

func (c implErrorThrowerClientStub) ThrowAborted(ctx __context.T, opts ...__ipc.CallOpt) (err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "ThrowAborted", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (c implErrorThrowerClientStub) ThrowBadArg(ctx __context.T, opts ...__ipc.CallOpt) (err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "ThrowBadArg", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (c implErrorThrowerClientStub) ThrowBadProtocol(ctx __context.T, opts ...__ipc.CallOpt) (err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "ThrowBadProtocol", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (c implErrorThrowerClientStub) ThrowInternal(ctx __context.T, opts ...__ipc.CallOpt) (err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "ThrowInternal", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (c implErrorThrowerClientStub) ThrowNoAccess(ctx __context.T, opts ...__ipc.CallOpt) (err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "ThrowNoAccess", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (c implErrorThrowerClientStub) ThrowNoExist(ctx __context.T, opts ...__ipc.CallOpt) (err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "ThrowNoExist", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (c implErrorThrowerClientStub) ThrowNoExistOrNoAccess(ctx __context.T, opts ...__ipc.CallOpt) (err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "ThrowNoExistOrNoAccess", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (c implErrorThrowerClientStub) ThrowUnknown(ctx __context.T, opts ...__ipc.CallOpt) (err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "ThrowUnknown", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (c implErrorThrowerClientStub) ThrowGoError(ctx __context.T, opts ...__ipc.CallOpt) (err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "ThrowGoError", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (c implErrorThrowerClientStub) ThrowCustomStandardError(ctx __context.T, opts ...__ipc.CallOpt) (err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "ThrowCustomStandardError", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (c implErrorThrowerClientStub) ListAllBuiltInErrorIDs(ctx __context.T, opts ...__ipc.CallOpt) (o0 []string, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "ListAllBuiltInErrorIDs", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implErrorThrowerClientStub) Signature(ctx __context.T, opts ...__ipc.CallOpt) (o0 __ipc.ServiceSignature, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "Signature", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

// ErrorThrowerServerMethods is the interface a server writer
// implements for ErrorThrower.
//
// A testing interface with methods that throw various types of errors
type ErrorThrowerServerMethods interface {
	// Throws veyron2/vError.Aborted error
	ThrowAborted(__ipc.ServerContext) error
	// Throws veyron2/vError.BadArg error
	ThrowBadArg(__ipc.ServerContext) error
	// Throws veyron2/vError.BadProtocol error
	ThrowBadProtocol(__ipc.ServerContext) error
	// Throws veyron2/vError.Internal error
	ThrowInternal(__ipc.ServerContext) error
	// Throws veyron2/vError.NoAccess error
	ThrowNoAccess(__ipc.ServerContext) error
	// Throws veyron2/vError.NoExist error
	ThrowNoExist(__ipc.ServerContext) error
	// Throws veyron2/vError.NoExistOrNoAccess error
	ThrowNoExistOrNoAccess(__ipc.ServerContext) error
	// Throws veyron2/vError.Unknown error
	ThrowUnknown(__ipc.ServerContext) error
	// Throws normal Go error
	ThrowGoError(__ipc.ServerContext) error
	// Throws custom error created by using Standard
	ThrowCustomStandardError(__ipc.ServerContext) error
	// Lists all errors Ids available in veyron2/verror
	ListAllBuiltInErrorIDs(__ipc.ServerContext) ([]string, error)
}

// ErrorThrowerServerStubMethods is the server interface containing
// ErrorThrower methods, as expected by ipc.Server.
// There is no difference between this interface and ErrorThrowerServerMethods
// since there are no streaming methods.
type ErrorThrowerServerStubMethods ErrorThrowerServerMethods

// ErrorThrowerServerStub adds universal methods to ErrorThrowerServerStubMethods.
type ErrorThrowerServerStub interface {
	ErrorThrowerServerStubMethods
	// Describe the ErrorThrower interfaces.
	Describe__() []__ipc.InterfaceDesc
	// Signature will be replaced with Describe__.
	Signature(ctx __ipc.ServerContext) (__ipc.ServiceSignature, error)
}

// ErrorThrowerServer returns a server stub for ErrorThrower.
// It converts an implementation of ErrorThrowerServerMethods into
// an object that may be used by ipc.Server.
func ErrorThrowerServer(impl ErrorThrowerServerMethods) ErrorThrowerServerStub {
	stub := implErrorThrowerServerStub{
		impl: impl,
	}
	// Initialize GlobState; always check the stub itself first, to handle the
	// case where the user has the Glob method defined in their VDL source.
	if gs := __ipc.NewGlobState(stub); gs != nil {
		stub.gs = gs
	} else if gs := __ipc.NewGlobState(impl); gs != nil {
		stub.gs = gs
	}
	return stub
}

type implErrorThrowerServerStub struct {
	impl ErrorThrowerServerMethods
	gs   *__ipc.GlobState
}

func (s implErrorThrowerServerStub) ThrowAborted(ctx __ipc.ServerContext) error {
	return s.impl.ThrowAborted(ctx)
}

func (s implErrorThrowerServerStub) ThrowBadArg(ctx __ipc.ServerContext) error {
	return s.impl.ThrowBadArg(ctx)
}

func (s implErrorThrowerServerStub) ThrowBadProtocol(ctx __ipc.ServerContext) error {
	return s.impl.ThrowBadProtocol(ctx)
}

func (s implErrorThrowerServerStub) ThrowInternal(ctx __ipc.ServerContext) error {
	return s.impl.ThrowInternal(ctx)
}

func (s implErrorThrowerServerStub) ThrowNoAccess(ctx __ipc.ServerContext) error {
	return s.impl.ThrowNoAccess(ctx)
}

func (s implErrorThrowerServerStub) ThrowNoExist(ctx __ipc.ServerContext) error {
	return s.impl.ThrowNoExist(ctx)
}

func (s implErrorThrowerServerStub) ThrowNoExistOrNoAccess(ctx __ipc.ServerContext) error {
	return s.impl.ThrowNoExistOrNoAccess(ctx)
}

func (s implErrorThrowerServerStub) ThrowUnknown(ctx __ipc.ServerContext) error {
	return s.impl.ThrowUnknown(ctx)
}

func (s implErrorThrowerServerStub) ThrowGoError(ctx __ipc.ServerContext) error {
	return s.impl.ThrowGoError(ctx)
}

func (s implErrorThrowerServerStub) ThrowCustomStandardError(ctx __ipc.ServerContext) error {
	return s.impl.ThrowCustomStandardError(ctx)
}

func (s implErrorThrowerServerStub) ListAllBuiltInErrorIDs(ctx __ipc.ServerContext) ([]string, error) {
	return s.impl.ListAllBuiltInErrorIDs(ctx)
}

func (s implErrorThrowerServerStub) Globber() *__ipc.GlobState {
	return s.gs
}

func (s implErrorThrowerServerStub) Describe__() []__ipc.InterfaceDesc {
	return []__ipc.InterfaceDesc{ErrorThrowerDesc}
}

// ErrorThrowerDesc describes the ErrorThrower interface.
var ErrorThrowerDesc __ipc.InterfaceDesc = descErrorThrower

// descErrorThrower hides the desc to keep godoc clean.
var descErrorThrower = __ipc.InterfaceDesc{
	Name:    "ErrorThrower",
	PkgPath: "test_service",
	Doc:     "// A testing interface with methods that throw various types of errors",
	Methods: []__ipc.MethodDesc{
		{
			Name: "ThrowAborted",
			Doc:  "// Throws veyron2/vError.Aborted error",
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // error
			},
		},
		{
			Name: "ThrowBadArg",
			Doc:  "// Throws veyron2/vError.BadArg error",
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // error
			},
		},
		{
			Name: "ThrowBadProtocol",
			Doc:  "// Throws veyron2/vError.BadProtocol error",
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // error
			},
		},
		{
			Name: "ThrowInternal",
			Doc:  "// Throws veyron2/vError.Internal error",
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // error
			},
		},
		{
			Name: "ThrowNoAccess",
			Doc:  "// Throws veyron2/vError.NoAccess error",
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // error
			},
		},
		{
			Name: "ThrowNoExist",
			Doc:  "// Throws veyron2/vError.NoExist error",
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // error
			},
		},
		{
			Name: "ThrowNoExistOrNoAccess",
			Doc:  "// Throws veyron2/vError.NoExistOrNoAccess error",
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // error
			},
		},
		{
			Name: "ThrowUnknown",
			Doc:  "// Throws veyron2/vError.Unknown error",
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // error
			},
		},
		{
			Name: "ThrowGoError",
			Doc:  "// Throws normal Go error",
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // error
			},
		},
		{
			Name: "ThrowCustomStandardError",
			Doc:  "// Throws custom error created by using Standard",
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // error
			},
		},
		{
			Name: "ListAllBuiltInErrorIDs",
			Doc:  "// Lists all errors Ids available in veyron2/verror",
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // []string
				{"", ``}, // error
			},
		},
	},
}

func (s implErrorThrowerServerStub) Signature(ctx __ipc.ServerContext) (__ipc.ServiceSignature, error) {
	// TODO(toddw): Replace with new Describe__ implementation.
	result := __ipc.ServiceSignature{Methods: make(map[string]__ipc.MethodSignature)}
	result.Methods["ListAllBuiltInErrorIDs"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 61},
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowAborted"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowBadArg"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowBadProtocol"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowCustomStandardError"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowGoError"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowInternal"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowNoAccess"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowNoExist"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowNoExistOrNoAccess"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}
	result.Methods["ThrowUnknown"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 65},
		},
	}

	result.TypeDefs = []__vdlutil.Any{
		__wiretype.NamedPrimitiveType{Type: 0x1, Name: "error", Tags: []string(nil)}}

	return result, nil
}
