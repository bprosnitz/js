// Command test_serviced is an implementation of the test_service service.
package main

import (
	"fmt"
	"log"

	"v.io/veyron/veyron/lib/signals"
	_ "v.io/veyron/veyron/profiles"
	"v.io/veyron/veyron2/rt"
	"v.io/veyron/veyron2/vlog"
)

func main() {
	// Create the runtime
	r, err := rt.New()
	if err != nil {
		vlog.Fatalf("Could not initialize runtime: %s", err)
	}
	defer r.Cleanup()

	s, endpoint, err := StartServer(r)
	if err != nil {
		log.Fatal("", err)
	}
	defer s.Stop()

	fmt.Printf("Listening at: %v\n", endpoint)
	<-signals.ShutdownOnSignals(r)
}
