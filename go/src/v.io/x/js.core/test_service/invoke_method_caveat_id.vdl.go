// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// This file was auto-generated by the vanadium vdl tool.
// Source: invoke_method_caveat_id.vdl

package test_service

import (
	// VDL system imports
	"v.io/v23"
	"v.io/v23/context"
	"v.io/v23/rpc"
	"v.io/v23/vdl"

	// VDL user imports
	"v.io/v23/security"
	"v.io/v23/uniqueid"
)

type TestCaveatData struct {
	A string
	B *vdl.Value // Use any for value so that we can confirm VDL is being used properly.
}

func (TestCaveatData) __VDLReflect(struct {
	Name string `vdl:"v.io/x/js.core/test_service.TestCaveatData"`
}) {
}

func init() {
	vdl.Register((*TestCaveatData)(nil))
}

var ConditionallyValidatingTestCaveat = security.CaveatDescriptor{
	Id: uniqueid.Id{
		0,
		17,
		34,
		51,
		68,
		85,
		102,
		119,
		136,
		153,
		170,
		187,
		204,
		221,
		238,
		255,
	},
	ParamType: vdl.TypeOf(TestCaveatData{}),
}

// InvokableTestMethodClientMethods is the client interface
// containing InvokableTestMethod methods.
type InvokableTestMethodClientMethods interface {
	AMethod(*context.T, ...rpc.CallOpt) (string, error)
}

// InvokableTestMethodClientStub adds universal methods to InvokableTestMethodClientMethods.
type InvokableTestMethodClientStub interface {
	InvokableTestMethodClientMethods
	rpc.UniversalServiceMethods
}

// InvokableTestMethodClient returns a client stub for InvokableTestMethod.
func InvokableTestMethodClient(name string) InvokableTestMethodClientStub {
	return implInvokableTestMethodClientStub{name}
}

type implInvokableTestMethodClientStub struct {
	name string
}

func (c implInvokableTestMethodClientStub) AMethod(ctx *context.T, opts ...rpc.CallOpt) (o0 string, err error) {
	err = v23.GetClient(ctx).Call(ctx, c.name, "AMethod", nil, []interface{}{&o0}, opts...)
	return
}

// InvokableTestMethodServerMethods is the interface a server writer
// implements for InvokableTestMethod.
type InvokableTestMethodServerMethods interface {
	AMethod(*context.T, rpc.ServerCall) (string, error)
}

// InvokableTestMethodServerStubMethods is the server interface containing
// InvokableTestMethod methods, as expected by rpc.Server.
// There is no difference between this interface and InvokableTestMethodServerMethods
// since there are no streaming methods.
type InvokableTestMethodServerStubMethods InvokableTestMethodServerMethods

// InvokableTestMethodServerStub adds universal methods to InvokableTestMethodServerStubMethods.
type InvokableTestMethodServerStub interface {
	InvokableTestMethodServerStubMethods
	// Describe the InvokableTestMethod interfaces.
	Describe__() []rpc.InterfaceDesc
}

// InvokableTestMethodServer returns a server stub for InvokableTestMethod.
// It converts an implementation of InvokableTestMethodServerMethods into
// an object that may be used by rpc.Server.
func InvokableTestMethodServer(impl InvokableTestMethodServerMethods) InvokableTestMethodServerStub {
	stub := implInvokableTestMethodServerStub{
		impl: impl,
	}
	// Initialize GlobState; always check the stub itself first, to handle the
	// case where the user has the Glob method defined in their VDL source.
	if gs := rpc.NewGlobState(stub); gs != nil {
		stub.gs = gs
	} else if gs := rpc.NewGlobState(impl); gs != nil {
		stub.gs = gs
	}
	return stub
}

type implInvokableTestMethodServerStub struct {
	impl InvokableTestMethodServerMethods
	gs   *rpc.GlobState
}

func (s implInvokableTestMethodServerStub) AMethod(ctx *context.T, call rpc.ServerCall) (string, error) {
	return s.impl.AMethod(ctx, call)
}

func (s implInvokableTestMethodServerStub) Globber() *rpc.GlobState {
	return s.gs
}

func (s implInvokableTestMethodServerStub) Describe__() []rpc.InterfaceDesc {
	return []rpc.InterfaceDesc{InvokableTestMethodDesc}
}

// InvokableTestMethodDesc describes the InvokableTestMethod interface.
var InvokableTestMethodDesc rpc.InterfaceDesc = descInvokableTestMethod

// descInvokableTestMethod hides the desc to keep godoc clean.
var descInvokableTestMethod = rpc.InterfaceDesc{
	Name:    "InvokableTestMethod",
	PkgPath: "v.io/x/js.core/test_service",
	Methods: []rpc.MethodDesc{
		{
			Name: "AMethod",
			OutArgs: []rpc.ArgDesc{
				{"", ``}, // string
			},
		},
	},
}

// InvokeMethodWithCaveatedIdentityClientMethods is the client interface
// containing InvokeMethodWithCaveatedIdentity methods.
type InvokeMethodWithCaveatedIdentityClientMethods interface {
	Invoke(ctx *context.T, name string, cavDesc security.CaveatDescriptor, cavParam *vdl.Value, opts ...rpc.CallOpt) error
}

// InvokeMethodWithCaveatedIdentityClientStub adds universal methods to InvokeMethodWithCaveatedIdentityClientMethods.
type InvokeMethodWithCaveatedIdentityClientStub interface {
	InvokeMethodWithCaveatedIdentityClientMethods
	rpc.UniversalServiceMethods
}

// InvokeMethodWithCaveatedIdentityClient returns a client stub for InvokeMethodWithCaveatedIdentity.
func InvokeMethodWithCaveatedIdentityClient(name string) InvokeMethodWithCaveatedIdentityClientStub {
	return implInvokeMethodWithCaveatedIdentityClientStub{name}
}

type implInvokeMethodWithCaveatedIdentityClientStub struct {
	name string
}

func (c implInvokeMethodWithCaveatedIdentityClientStub) Invoke(ctx *context.T, i0 string, i1 security.CaveatDescriptor, i2 *vdl.Value, opts ...rpc.CallOpt) (err error) {
	err = v23.GetClient(ctx).Call(ctx, c.name, "Invoke", []interface{}{i0, i1, i2}, nil, opts...)
	return
}

// InvokeMethodWithCaveatedIdentityServerMethods is the interface a server writer
// implements for InvokeMethodWithCaveatedIdentity.
type InvokeMethodWithCaveatedIdentityServerMethods interface {
	Invoke(ctx *context.T, call rpc.ServerCall, name string, cavDesc security.CaveatDescriptor, cavParam *vdl.Value) error
}

// InvokeMethodWithCaveatedIdentityServerStubMethods is the server interface containing
// InvokeMethodWithCaveatedIdentity methods, as expected by rpc.Server.
// There is no difference between this interface and InvokeMethodWithCaveatedIdentityServerMethods
// since there are no streaming methods.
type InvokeMethodWithCaveatedIdentityServerStubMethods InvokeMethodWithCaveatedIdentityServerMethods

// InvokeMethodWithCaveatedIdentityServerStub adds universal methods to InvokeMethodWithCaveatedIdentityServerStubMethods.
type InvokeMethodWithCaveatedIdentityServerStub interface {
	InvokeMethodWithCaveatedIdentityServerStubMethods
	// Describe the InvokeMethodWithCaveatedIdentity interfaces.
	Describe__() []rpc.InterfaceDesc
}

// InvokeMethodWithCaveatedIdentityServer returns a server stub for InvokeMethodWithCaveatedIdentity.
// It converts an implementation of InvokeMethodWithCaveatedIdentityServerMethods into
// an object that may be used by rpc.Server.
func InvokeMethodWithCaveatedIdentityServer(impl InvokeMethodWithCaveatedIdentityServerMethods) InvokeMethodWithCaveatedIdentityServerStub {
	stub := implInvokeMethodWithCaveatedIdentityServerStub{
		impl: impl,
	}
	// Initialize GlobState; always check the stub itself first, to handle the
	// case where the user has the Glob method defined in their VDL source.
	if gs := rpc.NewGlobState(stub); gs != nil {
		stub.gs = gs
	} else if gs := rpc.NewGlobState(impl); gs != nil {
		stub.gs = gs
	}
	return stub
}

type implInvokeMethodWithCaveatedIdentityServerStub struct {
	impl InvokeMethodWithCaveatedIdentityServerMethods
	gs   *rpc.GlobState
}

func (s implInvokeMethodWithCaveatedIdentityServerStub) Invoke(ctx *context.T, call rpc.ServerCall, i0 string, i1 security.CaveatDescriptor, i2 *vdl.Value) error {
	return s.impl.Invoke(ctx, call, i0, i1, i2)
}

func (s implInvokeMethodWithCaveatedIdentityServerStub) Globber() *rpc.GlobState {
	return s.gs
}

func (s implInvokeMethodWithCaveatedIdentityServerStub) Describe__() []rpc.InterfaceDesc {
	return []rpc.InterfaceDesc{InvokeMethodWithCaveatedIdentityDesc}
}

// InvokeMethodWithCaveatedIdentityDesc describes the InvokeMethodWithCaveatedIdentity interface.
var InvokeMethodWithCaveatedIdentityDesc rpc.InterfaceDesc = descInvokeMethodWithCaveatedIdentity

// descInvokeMethodWithCaveatedIdentity hides the desc to keep godoc clean.
var descInvokeMethodWithCaveatedIdentity = rpc.InterfaceDesc{
	Name:    "InvokeMethodWithCaveatedIdentity",
	PkgPath: "v.io/x/js.core/test_service",
	Methods: []rpc.MethodDesc{
		{
			Name: "Invoke",
			InArgs: []rpc.ArgDesc{
				{"name", ``},     // string
				{"cavDesc", ``},  // security.CaveatDescriptor
				{"cavParam", ``}, // *vdl.Value
			},
		},
	},
}
