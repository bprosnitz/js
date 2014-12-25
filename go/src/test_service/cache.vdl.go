// This file was auto-generated by the veyron vdl tool.
// Source: cache.vdl

package test_service

import (
	// The non-user imports are prefixed with "__" to prevent collisions.
	__io "io"
	__veyron2 "v.io/veyron/veyron2"
	__context "v.io/veyron/veyron2/context"
	__ipc "v.io/veyron/veyron2/ipc"
	__vdl "v.io/veyron/veyron2/vdl"
	__vdlutil "v.io/veyron/veyron2/vdl/vdlutil"
	__wiretype "v.io/veyron/veyron2/wiretype"
)

// TODO(toddw): Remove this line once the new signature support is done.
// It corrects a bug where __wiretype is unused in VDL pacakges where only
// bootstrap types are used on interfaces.
const _ = __wiretype.TypeIDInvalid

// KeyValuePair is a representation of a cached key and value pair.
type KeyValuePair struct {
	Key   string
	Value __vdlutil.Any
}

func (KeyValuePair) __VDLReflect(struct {
	Name string "test_service.KeyValuePair"
}) {
}

func init() {
	__vdl.Register(KeyValuePair{})
}

// CacheClientMethods is the client interface
// containing Cache methods.
//
// A Cache service mimics the memcache interface.
type CacheClientMethods interface {
	// Set sets a value for a key.
	Set(ctx __context.T, key string, value __vdlutil.Any, opts ...__ipc.CallOpt) error
	// Get returns the value for a key.  If the value is not found, returns
	// a not found error.
	Get(ctx __context.T, key string, opts ...__ipc.CallOpt) (__vdlutil.Any, error)
	// Same as Get, but casts the return argument to an byte.
	GetAsByte(ctx __context.T, key string, opts ...__ipc.CallOpt) (byte, error)
	// Same as Get, but casts the return argument to an int32.
	GetAsInt32(ctx __context.T, key string, opts ...__ipc.CallOpt) (int32, error)
	// Same as Get, but casts the return argument to an int64.
	GetAsInt64(ctx __context.T, key string, opts ...__ipc.CallOpt) (int64, error)
	// Same as Get, but casts the return argument to an uint32.
	GetAsUint32(ctx __context.T, key string, opts ...__ipc.CallOpt) (uint32, error)
	// Same as Get, but casts the return argument to an uint64.
	GetAsUint64(ctx __context.T, key string, opts ...__ipc.CallOpt) (uint64, error)
	// Same as Get, but casts the return argument to an float32.
	GetAsFloat32(ctx __context.T, key string, opts ...__ipc.CallOpt) (float32, error)
	// Same as Get, but casts the return argument to an float64.
	GetAsFloat64(ctx __context.T, key string, opts ...__ipc.CallOpt) (float64, error)
	// Same as Get, but casts the return argument to a string.
	GetAsString(ctx __context.T, key string, opts ...__ipc.CallOpt) (string, error)
	// Same as Get, but casts the return argument to a bool.
	GetAsBool(ctx __context.T, key string, opts ...__ipc.CallOpt) (bool, error)
	// Same as Get, but casts the return argument to an error.
	GetAsError(ctx __context.T, key string, opts ...__ipc.CallOpt) (error, error)
	// AsMap returns the full contents of the cache as a map.
	AsMap(__context.T, ...__ipc.CallOpt) (map[string]__vdlutil.Any, error)
	// KeyValuePairs returns the full contents of the cache as a slice of pairs.
	KeyValuePairs(__context.T, ...__ipc.CallOpt) ([]KeyValuePair, error)
	// MostRecentSet returns the key and value and the timestamp for the most
	// recent set operation
	// TODO(bprosnitz) support type types and change time to native time type
	MostRecentSet(__context.T, ...__ipc.CallOpt) (value KeyValuePair, time int64, err error)
	// KeyPage indexes into the keys (in alphanumerically sorted order) and
	// returns the indexth page of 10 keys.
	KeyPage(ctx __context.T, index int64, opts ...__ipc.CallOpt) ([10]string, error)
	// Size returns the total number of entries in the cache.
	Size(__context.T, ...__ipc.CallOpt) (int64, error)
	// MultiGet sets up a stream that allows fetching multiple keys.
	MultiGet(__context.T, ...__ipc.CallOpt) (CacheMultiGetCall, error)
}

// CacheClientStub adds universal methods to CacheClientMethods.
type CacheClientStub interface {
	CacheClientMethods
	__ipc.UniversalServiceMethods
}

// CacheClient returns a client stub for Cache.
func CacheClient(name string, opts ...__ipc.BindOpt) CacheClientStub {
	var client __ipc.Client
	for _, opt := range opts {
		if clientOpt, ok := opt.(__ipc.Client); ok {
			client = clientOpt
		}
	}
	return implCacheClientStub{name, client}
}

type implCacheClientStub struct {
	name   string
	client __ipc.Client
}

func (c implCacheClientStub) c(ctx __context.T) __ipc.Client {
	if c.client != nil {
		return c.client
	}
	return __veyron2.RuntimeFromContext(ctx).Client()
}

func (c implCacheClientStub) Set(ctx __context.T, i0 string, i1 __vdlutil.Any, opts ...__ipc.CallOpt) (err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "Set", []interface{}{i0, i1}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) Get(ctx __context.T, i0 string, opts ...__ipc.CallOpt) (o0 __vdlutil.Any, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "Get", []interface{}{i0}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) GetAsByte(ctx __context.T, i0 string, opts ...__ipc.CallOpt) (o0 byte, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "GetAsByte", []interface{}{i0}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) GetAsInt32(ctx __context.T, i0 string, opts ...__ipc.CallOpt) (o0 int32, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "GetAsInt32", []interface{}{i0}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) GetAsInt64(ctx __context.T, i0 string, opts ...__ipc.CallOpt) (o0 int64, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "GetAsInt64", []interface{}{i0}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) GetAsUint32(ctx __context.T, i0 string, opts ...__ipc.CallOpt) (o0 uint32, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "GetAsUint32", []interface{}{i0}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) GetAsUint64(ctx __context.T, i0 string, opts ...__ipc.CallOpt) (o0 uint64, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "GetAsUint64", []interface{}{i0}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) GetAsFloat32(ctx __context.T, i0 string, opts ...__ipc.CallOpt) (o0 float32, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "GetAsFloat32", []interface{}{i0}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) GetAsFloat64(ctx __context.T, i0 string, opts ...__ipc.CallOpt) (o0 float64, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "GetAsFloat64", []interface{}{i0}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) GetAsString(ctx __context.T, i0 string, opts ...__ipc.CallOpt) (o0 string, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "GetAsString", []interface{}{i0}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) GetAsBool(ctx __context.T, i0 string, opts ...__ipc.CallOpt) (o0 bool, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "GetAsBool", []interface{}{i0}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) GetAsError(ctx __context.T, i0 string, opts ...__ipc.CallOpt) (o0 error, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "GetAsError", []interface{}{i0}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) AsMap(ctx __context.T, opts ...__ipc.CallOpt) (o0 map[string]__vdlutil.Any, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "AsMap", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) KeyValuePairs(ctx __context.T, opts ...__ipc.CallOpt) (o0 []KeyValuePair, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "KeyValuePairs", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) MostRecentSet(ctx __context.T, opts ...__ipc.CallOpt) (o0 KeyValuePair, o1 int64, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "MostRecentSet", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &o1, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) KeyPage(ctx __context.T, i0 int64, opts ...__ipc.CallOpt) (o0 [10]string, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "KeyPage", []interface{}{i0}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) Size(ctx __context.T, opts ...__ipc.CallOpt) (o0 int64, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "Size", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

func (c implCacheClientStub) MultiGet(ctx __context.T, opts ...__ipc.CallOpt) (ocall CacheMultiGetCall, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "MultiGet", nil, opts...); err != nil {
		return
	}
	ocall = &implCacheMultiGetCall{Call: call}
	return
}

func (c implCacheClientStub) Signature(ctx __context.T, opts ...__ipc.CallOpt) (o0 __ipc.ServiceSignature, err error) {
	var call __ipc.Call
	if call, err = c.c(ctx).StartCall(ctx, c.name, "Signature", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&o0, &err); ierr != nil {
		err = ierr
	}
	return
}

// CacheMultiGetClientStream is the client stream for Cache.MultiGet.
type CacheMultiGetClientStream interface {
	// RecvStream returns the receiver side of the Cache.MultiGet client stream.
	RecvStream() interface {
		// Advance stages an item so that it may be retrieved via Value.  Returns
		// true iff there is an item to retrieve.  Advance must be called before
		// Value is called.  May block if an item is not available.
		Advance() bool
		// Value returns the item that was staged by Advance.  May panic if Advance
		// returned false or was not called.  Never blocks.
		Value() __vdlutil.Any
		// Err returns any error encountered by Advance.  Never blocks.
		Err() error
	}
	// SendStream returns the send side of the Cache.MultiGet client stream.
	SendStream() interface {
		// Send places the item onto the output stream.  Returns errors
		// encountered while sending, or if Send is called after Close or
		// the stream has been canceled.  Blocks if there is no buffer
		// space; will unblock when buffer space is available or after
		// the stream has been canceled.
		Send(item string) error
		// Close indicates to the server that no more items will be sent;
		// server Recv calls will receive io.EOF after all sent items.
		// This is an optional call - e.g. a client might call Close if it
		// needs to continue receiving items from the server after it's
		// done sending.  Returns errors encountered while closing, or if
		// Close is called after the stream has been canceled.  Like Send,
		// blocks if there is no buffer space available.
		Close() error
	}
}

// CacheMultiGetCall represents the call returned from Cache.MultiGet.
type CacheMultiGetCall interface {
	CacheMultiGetClientStream
	// Finish performs the equivalent of SendStream().Close, then blocks until
	// the server is done, and returns the positional return values for the call.
	//
	// Finish returns immediately if the call has been canceled; depending on the
	// timing the output could either be an error signaling cancelation, or the
	// valid positional return values from the server.
	//
	// Calling Finish is mandatory for releasing stream resources, unless the call
	// has been canceled or any of the other methods return an error.  Finish should
	// be called at most once.
	Finish() error
}

type implCacheMultiGetCall struct {
	__ipc.Call
	valRecv __vdlutil.Any
	errRecv error
}

func (c *implCacheMultiGetCall) RecvStream() interface {
	Advance() bool
	Value() __vdlutil.Any
	Err() error
} {
	return implCacheMultiGetCallRecv{c}
}

type implCacheMultiGetCallRecv struct {
	c *implCacheMultiGetCall
}

func (c implCacheMultiGetCallRecv) Advance() bool {
	c.c.valRecv = nil
	c.c.errRecv = c.c.Recv(&c.c.valRecv)
	return c.c.errRecv == nil
}
func (c implCacheMultiGetCallRecv) Value() __vdlutil.Any {
	return c.c.valRecv
}
func (c implCacheMultiGetCallRecv) Err() error {
	if c.c.errRecv == __io.EOF {
		return nil
	}
	return c.c.errRecv
}
func (c *implCacheMultiGetCall) SendStream() interface {
	Send(item string) error
	Close() error
} {
	return implCacheMultiGetCallSend{c}
}

type implCacheMultiGetCallSend struct {
	c *implCacheMultiGetCall
}

func (c implCacheMultiGetCallSend) Send(item string) error {
	return c.c.Send(item)
}
func (c implCacheMultiGetCallSend) Close() error {
	return c.c.CloseSend()
}
func (c *implCacheMultiGetCall) Finish() (err error) {
	if ierr := c.Call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

// CacheServerMethods is the interface a server writer
// implements for Cache.
//
// A Cache service mimics the memcache interface.
type CacheServerMethods interface {
	// Set sets a value for a key.
	Set(ctx __ipc.ServerContext, key string, value __vdlutil.Any) error
	// Get returns the value for a key.  If the value is not found, returns
	// a not found error.
	Get(ctx __ipc.ServerContext, key string) (__vdlutil.Any, error)
	// Same as Get, but casts the return argument to an byte.
	GetAsByte(ctx __ipc.ServerContext, key string) (byte, error)
	// Same as Get, but casts the return argument to an int32.
	GetAsInt32(ctx __ipc.ServerContext, key string) (int32, error)
	// Same as Get, but casts the return argument to an int64.
	GetAsInt64(ctx __ipc.ServerContext, key string) (int64, error)
	// Same as Get, but casts the return argument to an uint32.
	GetAsUint32(ctx __ipc.ServerContext, key string) (uint32, error)
	// Same as Get, but casts the return argument to an uint64.
	GetAsUint64(ctx __ipc.ServerContext, key string) (uint64, error)
	// Same as Get, but casts the return argument to an float32.
	GetAsFloat32(ctx __ipc.ServerContext, key string) (float32, error)
	// Same as Get, but casts the return argument to an float64.
	GetAsFloat64(ctx __ipc.ServerContext, key string) (float64, error)
	// Same as Get, but casts the return argument to a string.
	GetAsString(ctx __ipc.ServerContext, key string) (string, error)
	// Same as Get, but casts the return argument to a bool.
	GetAsBool(ctx __ipc.ServerContext, key string) (bool, error)
	// Same as Get, but casts the return argument to an error.
	GetAsError(ctx __ipc.ServerContext, key string) (error, error)
	// AsMap returns the full contents of the cache as a map.
	AsMap(__ipc.ServerContext) (map[string]__vdlutil.Any, error)
	// KeyValuePairs returns the full contents of the cache as a slice of pairs.
	KeyValuePairs(__ipc.ServerContext) ([]KeyValuePair, error)
	// MostRecentSet returns the key and value and the timestamp for the most
	// recent set operation
	// TODO(bprosnitz) support type types and change time to native time type
	MostRecentSet(__ipc.ServerContext) (value KeyValuePair, time int64, err error)
	// KeyPage indexes into the keys (in alphanumerically sorted order) and
	// returns the indexth page of 10 keys.
	KeyPage(ctx __ipc.ServerContext, index int64) ([10]string, error)
	// Size returns the total number of entries in the cache.
	Size(__ipc.ServerContext) (int64, error)
	// MultiGet sets up a stream that allows fetching multiple keys.
	MultiGet(CacheMultiGetContext) error
}

// CacheServerStubMethods is the server interface containing
// Cache methods, as expected by ipc.Server.
// The only difference between this interface and CacheServerMethods
// is the streaming methods.
type CacheServerStubMethods interface {
	// Set sets a value for a key.
	Set(ctx __ipc.ServerContext, key string, value __vdlutil.Any) error
	// Get returns the value for a key.  If the value is not found, returns
	// a not found error.
	Get(ctx __ipc.ServerContext, key string) (__vdlutil.Any, error)
	// Same as Get, but casts the return argument to an byte.
	GetAsByte(ctx __ipc.ServerContext, key string) (byte, error)
	// Same as Get, but casts the return argument to an int32.
	GetAsInt32(ctx __ipc.ServerContext, key string) (int32, error)
	// Same as Get, but casts the return argument to an int64.
	GetAsInt64(ctx __ipc.ServerContext, key string) (int64, error)
	// Same as Get, but casts the return argument to an uint32.
	GetAsUint32(ctx __ipc.ServerContext, key string) (uint32, error)
	// Same as Get, but casts the return argument to an uint64.
	GetAsUint64(ctx __ipc.ServerContext, key string) (uint64, error)
	// Same as Get, but casts the return argument to an float32.
	GetAsFloat32(ctx __ipc.ServerContext, key string) (float32, error)
	// Same as Get, but casts the return argument to an float64.
	GetAsFloat64(ctx __ipc.ServerContext, key string) (float64, error)
	// Same as Get, but casts the return argument to a string.
	GetAsString(ctx __ipc.ServerContext, key string) (string, error)
	// Same as Get, but casts the return argument to a bool.
	GetAsBool(ctx __ipc.ServerContext, key string) (bool, error)
	// Same as Get, but casts the return argument to an error.
	GetAsError(ctx __ipc.ServerContext, key string) (error, error)
	// AsMap returns the full contents of the cache as a map.
	AsMap(__ipc.ServerContext) (map[string]__vdlutil.Any, error)
	// KeyValuePairs returns the full contents of the cache as a slice of pairs.
	KeyValuePairs(__ipc.ServerContext) ([]KeyValuePair, error)
	// MostRecentSet returns the key and value and the timestamp for the most
	// recent set operation
	// TODO(bprosnitz) support type types and change time to native time type
	MostRecentSet(__ipc.ServerContext) (value KeyValuePair, time int64, err error)
	// KeyPage indexes into the keys (in alphanumerically sorted order) and
	// returns the indexth page of 10 keys.
	KeyPage(ctx __ipc.ServerContext, index int64) ([10]string, error)
	// Size returns the total number of entries in the cache.
	Size(__ipc.ServerContext) (int64, error)
	// MultiGet sets up a stream that allows fetching multiple keys.
	MultiGet(*CacheMultiGetContextStub) error
}

// CacheServerStub adds universal methods to CacheServerStubMethods.
type CacheServerStub interface {
	CacheServerStubMethods
	// Describe the Cache interfaces.
	Describe__() []__ipc.InterfaceDesc
	// Signature will be replaced with Describe__.
	Signature(ctx __ipc.ServerContext) (__ipc.ServiceSignature, error)
}

// CacheServer returns a server stub for Cache.
// It converts an implementation of CacheServerMethods into
// an object that may be used by ipc.Server.
func CacheServer(impl CacheServerMethods) CacheServerStub {
	stub := implCacheServerStub{
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

type implCacheServerStub struct {
	impl CacheServerMethods
	gs   *__ipc.GlobState
}

func (s implCacheServerStub) Set(ctx __ipc.ServerContext, i0 string, i1 __vdlutil.Any) error {
	return s.impl.Set(ctx, i0, i1)
}

func (s implCacheServerStub) Get(ctx __ipc.ServerContext, i0 string) (__vdlutil.Any, error) {
	return s.impl.Get(ctx, i0)
}

func (s implCacheServerStub) GetAsByte(ctx __ipc.ServerContext, i0 string) (byte, error) {
	return s.impl.GetAsByte(ctx, i0)
}

func (s implCacheServerStub) GetAsInt32(ctx __ipc.ServerContext, i0 string) (int32, error) {
	return s.impl.GetAsInt32(ctx, i0)
}

func (s implCacheServerStub) GetAsInt64(ctx __ipc.ServerContext, i0 string) (int64, error) {
	return s.impl.GetAsInt64(ctx, i0)
}

func (s implCacheServerStub) GetAsUint32(ctx __ipc.ServerContext, i0 string) (uint32, error) {
	return s.impl.GetAsUint32(ctx, i0)
}

func (s implCacheServerStub) GetAsUint64(ctx __ipc.ServerContext, i0 string) (uint64, error) {
	return s.impl.GetAsUint64(ctx, i0)
}

func (s implCacheServerStub) GetAsFloat32(ctx __ipc.ServerContext, i0 string) (float32, error) {
	return s.impl.GetAsFloat32(ctx, i0)
}

func (s implCacheServerStub) GetAsFloat64(ctx __ipc.ServerContext, i0 string) (float64, error) {
	return s.impl.GetAsFloat64(ctx, i0)
}

func (s implCacheServerStub) GetAsString(ctx __ipc.ServerContext, i0 string) (string, error) {
	return s.impl.GetAsString(ctx, i0)
}

func (s implCacheServerStub) GetAsBool(ctx __ipc.ServerContext, i0 string) (bool, error) {
	return s.impl.GetAsBool(ctx, i0)
}

func (s implCacheServerStub) GetAsError(ctx __ipc.ServerContext, i0 string) (error, error) {
	return s.impl.GetAsError(ctx, i0)
}

func (s implCacheServerStub) AsMap(ctx __ipc.ServerContext) (map[string]__vdlutil.Any, error) {
	return s.impl.AsMap(ctx)
}

func (s implCacheServerStub) KeyValuePairs(ctx __ipc.ServerContext) ([]KeyValuePair, error) {
	return s.impl.KeyValuePairs(ctx)
}

func (s implCacheServerStub) MostRecentSet(ctx __ipc.ServerContext) (KeyValuePair, int64, error) {
	return s.impl.MostRecentSet(ctx)
}

func (s implCacheServerStub) KeyPage(ctx __ipc.ServerContext, i0 int64) ([10]string, error) {
	return s.impl.KeyPage(ctx, i0)
}

func (s implCacheServerStub) Size(ctx __ipc.ServerContext) (int64, error) {
	return s.impl.Size(ctx)
}

func (s implCacheServerStub) MultiGet(ctx *CacheMultiGetContextStub) error {
	return s.impl.MultiGet(ctx)
}

func (s implCacheServerStub) Globber() *__ipc.GlobState {
	return s.gs
}

func (s implCacheServerStub) Describe__() []__ipc.InterfaceDesc {
	return []__ipc.InterfaceDesc{CacheDesc}
}

// CacheDesc describes the Cache interface.
var CacheDesc __ipc.InterfaceDesc = descCache

// descCache hides the desc to keep godoc clean.
var descCache = __ipc.InterfaceDesc{
	Name:    "Cache",
	PkgPath: "test_service",
	Doc:     "// A Cache service mimics the memcache interface.",
	Methods: []__ipc.MethodDesc{
		{
			Name: "Set",
			Doc:  "// Set sets a value for a key.",
			InArgs: []__ipc.ArgDesc{
				{"key", ``},   // string
				{"value", ``}, // __vdlutil.Any
			},
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // error
			},
		},
		{
			Name: "Get",
			Doc:  "// Get returns the value for a key.  If the value is not found, returns\n// a not found error.",
			InArgs: []__ipc.ArgDesc{
				{"key", ``}, // string
			},
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // __vdlutil.Any
				{"", ``}, // error
			},
		},
		{
			Name: "GetAsByte",
			Doc:  "// Same as Get, but casts the return argument to an byte.",
			InArgs: []__ipc.ArgDesc{
				{"key", ``}, // string
			},
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // byte
				{"", ``}, // error
			},
		},
		{
			Name: "GetAsInt32",
			Doc:  "// Same as Get, but casts the return argument to an int32.",
			InArgs: []__ipc.ArgDesc{
				{"key", ``}, // string
			},
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // int32
				{"", ``}, // error
			},
		},
		{
			Name: "GetAsInt64",
			Doc:  "// Same as Get, but casts the return argument to an int64.",
			InArgs: []__ipc.ArgDesc{
				{"key", ``}, // string
			},
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // int64
				{"", ``}, // error
			},
		},
		{
			Name: "GetAsUint32",
			Doc:  "// Same as Get, but casts the return argument to an uint32.",
			InArgs: []__ipc.ArgDesc{
				{"key", ``}, // string
			},
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // uint32
				{"", ``}, // error
			},
		},
		{
			Name: "GetAsUint64",
			Doc:  "// Same as Get, but casts the return argument to an uint64.",
			InArgs: []__ipc.ArgDesc{
				{"key", ``}, // string
			},
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // uint64
				{"", ``}, // error
			},
		},
		{
			Name: "GetAsFloat32",
			Doc:  "// Same as Get, but casts the return argument to an float32.",
			InArgs: []__ipc.ArgDesc{
				{"key", ``}, // string
			},
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // float32
				{"", ``}, // error
			},
		},
		{
			Name: "GetAsFloat64",
			Doc:  "// Same as Get, but casts the return argument to an float64.",
			InArgs: []__ipc.ArgDesc{
				{"key", ``}, // string
			},
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // float64
				{"", ``}, // error
			},
		},
		{
			Name: "GetAsString",
			Doc:  "// Same as Get, but casts the return argument to a string.",
			InArgs: []__ipc.ArgDesc{
				{"key", ``}, // string
			},
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // string
				{"", ``}, // error
			},
		},
		{
			Name: "GetAsBool",
			Doc:  "// Same as Get, but casts the return argument to a bool.",
			InArgs: []__ipc.ArgDesc{
				{"key", ``}, // string
			},
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // bool
				{"", ``}, // error
			},
		},
		{
			Name: "GetAsError",
			Doc:  "// Same as Get, but casts the return argument to an error.",
			InArgs: []__ipc.ArgDesc{
				{"key", ``}, // string
			},
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // error
				{"", ``}, // error
			},
		},
		{
			Name: "AsMap",
			Doc:  "// AsMap returns the full contents of the cache as a map.",
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // map[string]__vdlutil.Any
				{"", ``}, // error
			},
		},
		{
			Name: "KeyValuePairs",
			Doc:  "// KeyValuePairs returns the full contents of the cache as a slice of pairs.",
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // []KeyValuePair
				{"", ``}, // error
			},
		},
		{
			Name: "MostRecentSet",
			Doc:  "// MostRecentSet returns the key and value and the timestamp for the most\n// recent set operation\n// TODO(bprosnitz) support type types and change time to native time type",
			OutArgs: []__ipc.ArgDesc{
				{"value", ``}, // KeyValuePair
				{"time", ``},  // int64
				{"err", ``},   // error
			},
		},
		{
			Name: "KeyPage",
			Doc:  "// KeyPage indexes into the keys (in alphanumerically sorted order) and\n// returns the indexth page of 10 keys.",
			InArgs: []__ipc.ArgDesc{
				{"index", ``}, // int64
			},
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // [10]string
				{"", ``}, // error
			},
		},
		{
			Name: "Size",
			Doc:  "// Size returns the total number of entries in the cache.",
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // int64
				{"", ``}, // error
			},
		},
		{
			Name: "MultiGet",
			Doc:  "// MultiGet sets up a stream that allows fetching multiple keys.",
			OutArgs: []__ipc.ArgDesc{
				{"", ``}, // error
			},
		},
	},
}

func (s implCacheServerStub) Signature(ctx __ipc.ServerContext) (__ipc.ServiceSignature, error) {
	// TODO(toddw): Replace with new Describe__ implementation.
	result := __ipc.ServiceSignature{Methods: make(map[string]__ipc.MethodSignature)}
	result.Methods["AsMap"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 68},
			{Name: "", Type: 66},
		},
	}
	result.Methods["Get"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 65},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsBool"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 2},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsByte"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 67},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsError"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 66},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsFloat32"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 25},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsFloat64"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 26},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsInt32"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 36},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsInt64"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 37},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsString"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 3},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsUint32"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 52},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsUint64"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 53},
			{Name: "", Type: 66},
		},
	}
	result.Methods["KeyPage"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{
			{Name: "index", Type: 37},
		},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 71},
			{Name: "", Type: 66},
		},
	}
	result.Methods["KeyValuePairs"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 70},
			{Name: "", Type: 66},
		},
	}
	result.Methods["MostRecentSet"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "value", Type: 69},
			{Name: "time", Type: 37},
			{Name: "err", Type: 66},
		},
	}
	result.Methods["MultiGet"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 66},
		},
		InStream:  3,
		OutStream: 65,
	}
	result.Methods["Set"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{
			{Name: "key", Type: 3},
			{Name: "value", Type: 65},
		},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 66},
		},
	}
	result.Methods["Size"] = __ipc.MethodSignature{
		InArgs: []__ipc.MethodArgument{},
		OutArgs: []__ipc.MethodArgument{
			{Name: "", Type: 37},
			{Name: "", Type: 66},
		},
	}

	result.TypeDefs = []__vdlutil.Any{
		__wiretype.NamedPrimitiveType{Type: 0x1, Name: "anydata", Tags: []string(nil)}, __wiretype.NamedPrimitiveType{Type: 0x1, Name: "error", Tags: []string(nil)}, __wiretype.NamedPrimitiveType{Type: 0x32, Name: "byte", Tags: []string(nil)}, __wiretype.MapType{Key: 0x3, Elem: 0x41, Name: "", Tags: []string(nil)}, __wiretype.StructType{
			[]__wiretype.FieldType{
				__wiretype.FieldType{Type: 0x3, Name: "Key"},
				__wiretype.FieldType{Type: 0x41, Name: "Value"},
			},
			"test_service.KeyValuePair", []string(nil)},
		__wiretype.SliceType{Elem: 0x45, Name: "", Tags: []string(nil)}, __wiretype.ArrayType{Elem: 0x3, Len: 0xa, Name: "", Tags: []string(nil)}}

	return result, nil
}

// CacheMultiGetServerStream is the server stream for Cache.MultiGet.
type CacheMultiGetServerStream interface {
	// RecvStream returns the receiver side of the Cache.MultiGet server stream.
	RecvStream() interface {
		// Advance stages an item so that it may be retrieved via Value.  Returns
		// true iff there is an item to retrieve.  Advance must be called before
		// Value is called.  May block if an item is not available.
		Advance() bool
		// Value returns the item that was staged by Advance.  May panic if Advance
		// returned false or was not called.  Never blocks.
		Value() string
		// Err returns any error encountered by Advance.  Never blocks.
		Err() error
	}
	// SendStream returns the send side of the Cache.MultiGet server stream.
	SendStream() interface {
		// Send places the item onto the output stream.  Returns errors encountered
		// while sending.  Blocks if there is no buffer space; will unblock when
		// buffer space is available.
		Send(item __vdlutil.Any) error
	}
}

// CacheMultiGetContext represents the context passed to Cache.MultiGet.
type CacheMultiGetContext interface {
	__ipc.ServerContext
	CacheMultiGetServerStream
}

// CacheMultiGetContextStub is a wrapper that converts ipc.ServerCall into
// a typesafe stub that implements CacheMultiGetContext.
type CacheMultiGetContextStub struct {
	__ipc.ServerCall
	valRecv string
	errRecv error
}

// Init initializes CacheMultiGetContextStub from ipc.ServerCall.
func (s *CacheMultiGetContextStub) Init(call __ipc.ServerCall) {
	s.ServerCall = call
}

// RecvStream returns the receiver side of the Cache.MultiGet server stream.
func (s *CacheMultiGetContextStub) RecvStream() interface {
	Advance() bool
	Value() string
	Err() error
} {
	return implCacheMultiGetContextRecv{s}
}

type implCacheMultiGetContextRecv struct {
	s *CacheMultiGetContextStub
}

func (s implCacheMultiGetContextRecv) Advance() bool {
	s.s.errRecv = s.s.Recv(&s.s.valRecv)
	return s.s.errRecv == nil
}
func (s implCacheMultiGetContextRecv) Value() string {
	return s.s.valRecv
}
func (s implCacheMultiGetContextRecv) Err() error {
	if s.s.errRecv == __io.EOF {
		return nil
	}
	return s.s.errRecv
}

// SendStream returns the send side of the Cache.MultiGet server stream.
func (s *CacheMultiGetContextStub) SendStream() interface {
	Send(item __vdlutil.Any) error
} {
	return implCacheMultiGetContextSend{s}
}

type implCacheMultiGetContextSend struct {
	s *CacheMultiGetContextStub
}

func (s implCacheMultiGetContextSend) Send(item __vdlutil.Any) error {
	return s.s.Send(item)
}
