// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"fmt"
	"strings"

	"v.io/v23"
	"v.io/v23/context"
	"v.io/v23/naming"
	"v.io/v23/rpc"
	"v.io/v23/security"
	"v.io/x/js.core/test_service"
	_ "v.io/x/ref/profiles"
)

// openAuthorizer allows RPCs from all clients.
type openAuthorizer struct{}

func (openAuthorizer) Authorize(*context.T, security.Call) error {
	return nil
}

type testServiceDispatcher struct {
	cache           interface{}
	errorThrower    interface{}
	cancelCollector interface{}
	native          interface{}
	caveatedInvoker interface{}
}

func (sd *testServiceDispatcher) Lookup(suffix string) (interface{}, security.Authorizer, error) {
	authorizer := openAuthorizer{}

	if strings.HasPrefix(suffix, "cache") {
		return rpc.ReflectInvokerOrDie(sd.cache), authorizer, nil
	}

	if strings.HasPrefix(suffix, "errorThrower") {
		return rpc.ReflectInvokerOrDie(sd.errorThrower), authorizer, nil
	}

	if strings.HasPrefix(suffix, "serviceToCancel") {
		return rpc.ReflectInvokerOrDie(sd.cancelCollector), authorizer, nil
	}

	if strings.HasPrefix(suffix, "native") {
		fmt.Println("got call to native")
		return rpc.ReflectInvokerOrDie(sd.native), authorizer, nil
	}

	if strings.HasPrefix(suffix, "caveatedInvoker") {
		return rpc.ReflectInvokerOrDie(sd.caveatedInvoker), authorizer, nil
	}

	return rpc.ReflectInvokerOrDie(sd.cache), authorizer, nil
}

func StartServer(ctx *context.T) (rpc.Server, naming.Endpoint, error) {
	// Create a new server instance.
	s, err := v23.NewServer(ctx)
	if err != nil {
		return nil, nil, fmt.Errorf("failure creating server: %v", err)
	}

	disp := &testServiceDispatcher{
		cache:           test_service.CacheServer(NewCached()),
		errorThrower:    test_service.ErrorThrowerServer(NewErrorThrower()),
		cancelCollector: test_service.CancelCollectorServer(NewCancelCollector()),
		native:          test_service.NativeTestServer(NewNativeTest()),
		caveatedInvoker: test_service.InvokeMethodWithCaveatedIdentityServer(NewInvokeMethodWithCaveatedIdentityServer()),
	}

	// Create an endpoint and begin listening.
	spec := rpc.ListenSpec{Addrs: rpc.ListenAddrs{{"ws", "127.0.0.1:0"}}}
	endpoints, err := s.Listen(spec)
	if err != nil {
		return nil, nil, fmt.Errorf("error listening to service: %v", err)
	}

	// Publish the services. This will register them in the mount table and
	// maintain the registration until StopServing is called.
	if err := s.ServeDispatcher("test_service", disp); err != nil {
		return nil, nil, fmt.Errorf("error publishing service '%s': %v", err)
	}

	return s, endpoints[0], nil
}