PATH := node_modules/.bin:${VEYRON_ROOT}/environment/cout/node/bin:$(PATH)

GOPATH := $(VEYRON_ROOT)/veyron.js/go
VDLPATH := $(GOPATH)
GOBIN := $(VEYRON_ROOT)/veyron.js/go/bin
VGO := GOPATH="$(GOPATH)" VDLPATH="$(VDLPATH)" veyron go
GO_FILES := $(shell find go/src $(VEYRON_ROOT)/veyron/go/src/veyron.io -name "*.go")

NODE_MODULE_JS_FILES := $(shell find node_modules -name *.js | sed 's/ /\\ /')

SHELL := /bin/bash -e -o pipefail

.DEFAULT_GOAL := all

UNAME := $(shell uname)
BROWSER := chrome

# When running browser tests on non-Darwin machines, set the --headless flag.
# This uses Xvfb underneath the hood (inside prova => browser-launcher =>
# headless), which is not supported on OS X.
# See: https://github.com/kesla/node-headless/
ifndef NOHEADLESS
	ifneq ($(UNAME),Darwin)
		HEADLESS := --headless
	endif
endif

ifdef STOPONFAIL
	STOPONFAIL := --stopOnFirstFailure
endif

ifndef NOTAP
	TAP := --tap
endif

ifndef NOQUIT
	QUIT := --quit
endif

ifdef XUNIT
	TAP := --tap # TAP must be set for xunit to work
	OUTPUT_TRANSFORM := tap-xunit
endif

ifdef NODE_OUTPUT
	NODE_OUTPUT_LOCAL = $(NODE_OUTPUT)
	ifdef OUTPUT_TRANSFORM
		NODE_OUTPUT_LOCAL := >($(OUTPUT_TRANSFORM) --package=javascript.node > $(NODE_OUTPUT_LOCAL))
	endif
	NODE_OUTPUT_LOCAL := | tee $(NODE_OUTPUT_LOCAL)
endif

ifdef BROWSER_OUTPUT
	BROWSER_OUTPUT_LOCAL = $(BROWSER_OUTPUT)
	ifdef OUTPUT_TRANSFORM
		BROWSER_OUTPUT_LOCAL := >($(OUTPUT_TRANSFORM) --package=javascript.browser > $(BROWSER_OUTPUT_LOCAL))
	endif
	BROWSER_OUTPUT_LOCAL := | tee $(BROWSER_OUTPUT_LOCAL)
endif

PROVA_OPTS := --includeFilenameAsPackage $(TAP) $(QUIT) $(STOPONFAIL)

BROWSER_OPTS := --browser --transform envify --launch $(BROWSER) $(HEADLESS)

JS_SRC_FILES = $(shell find src -name "*.js" | sed 's/ /\\ /')

# Common services needed for all integration tests. Must be a comma-seperated
# string with no spaces.
COMMON_SERVICES := "test_serviced"

BROWSERIFY_OPTS := --debug --standalone veyron

all: lint build

build: dist/veyron.js dist/veyron.min.js extension/veyron.crx

dist/veyron.js: src/veyron.js $(JS_SRC_FILES) $(NODE_MODULES_JS_FILES) | node_modules
	mkdir -p dist
	browserify $< $(BROWSERIFY_OPTS) --outfile $@

dist/veyron.min.js: src/veyron.js $(JS_SRC_FILES) $(NODE_MODULES_JS_FILES) | node_modules
	mkdir -p dist
	browserify $< $(BROWSERIFY_OPTS) --plugin [ minifyify --map dist/veyron.js.map --output $@.map ] --outfile $@

extension/veyron.crx:
	$(MAKE) -C extension veyron.crx

test-precheck: gen-vdl node_modules lint dependency-check

test: test-unit test-integration test-vdl

test-vdl: test-vdl-node test-vdl-browser

# This generates the output of the vdl files in src/veyron.io/<package-path>
# The command will generate all the dependent files as well.
gen-vdl:
ifndef NOVDLGEN
	veyron go -novdl run $(VEYRON_ROOT)/veyron/go/src/veyron.io/veyron/veyron2/vdl/vdl/main.go generate -lang=javascript -js_out_dir="$(VEYRON_ROOT)/veyron.js/src" vdltool signature veyron.io/veyron/veyron2/vdl/testdata/... veyron.io/veyron/veyron2/ipc/... veyron.io/veyron/veyron2/vdl/vdlroot/src/...
endif

test-vdl-node: gen-vdl test-precheck
	prova test/vdl/test-*.js $(PROVA_OPTS) $(NODE_OUTPUT_LOCAL)

test-vdl-browser: gen-vdl test-precheck
	prova test/vdl/test-*.js $(PROVA_OPTS) $(BROWSER_OPTS) $(BROWSER_OUTPUT_LOCAL)

test-unit: test-unit-node test-unit-browser

test-unit-node: test-precheck
	prova test/unit/test-*.js $(PROVA_OPTS) $(NODE_OUTPUT_LOCAL)

test-unit-browser: test-precheck
	prova test/unit/test-*.js $(PROVA_OPTS) $(BROWSER_OPTS) $(BROWSER_OUTPUT_LOCAL)

test-integration: lint test-integration-node test-integration-browser

test-integration-node: test-precheck go/bin
	node test/integration/runner.js --services=$(COMMON_SERVICES) -- \
	prova test/integration/test-*.js $(PROVA_OPTS) $(NODE_OUTPUT_LOCAL)

test-integration-browser: test-precheck go/bin
	node test/integration/runner.js --services=$(COMMON_SERVICES) -- \
	make test-integration-browser-runner

# The EXTENSION_SETTINGS env variable is used by the extension to set the
# default settings variables.
test-integration-browser-runner: export EXTENSION_SETTINGS := {"namespaceRoot": "$(NAMESPACE_ROOT)", "proxy": "test/proxy"}
test-integration-browser-runner: BROWSER_OPTS := --options="--load-extension=$(PWD)/extension/build-test/,--enable-logging=stderr" $(BROWSER_OPTS)
test-integration-browser-runner:
	@$(RM) -fr extension/build-test
	$(MAKE) -C extension build-test
	prova test/integration/test-*.js --log=./tmp/chrome.log $(PROVA_OPTS) $(BROWSER_OPTS) $(BROWSER_OUTPUT_LOCAL)

go/bin: $(GO_FILES)
	@$(VGO) build -o $(GOBIN)/principal veyron.io/veyron/veyron/tools/principal
	@$(VGO) build -o $(GOBIN)/servicerunner veyron.io/veyron/veyron/tools/servicerunner
	@$(VGO) build -o $(GOBIN)/test_serviced test_service/test_serviced

lint: node_modules
ifndef NOLINT
	jshint .
	$(MAKE) -C extension lint
endif

dependency-check: node_modules
	dependency-check package.json --entry src/veyron.js

clean:
	@$(RM) -fr dist/*
	@$(RM) -fr docs/*
	@$(RM) -fr go/bin
	@$(RM) -fr go/pkg
	@$(RM) -fr node_modules
	@$(RM) -fr npm-debug.log
	@$(RM) -fr tmp
	@$(RM) -fr xunit.xml
	$(MAKE) -C extension clean

docs: $(JS_SRC_FILES) | node_modules
	jsdoc $^ --template node_modules/ink-docstrap/template --destination $@

node_modules: package.json  check-that-npm-is-in-path | node_modules/vom/lib/index.js
ifndef NONPMUPDATE
	@npm prune
	@npm install --quiet
	@touch node_modules
endif

node_modules/vom/lib/index.js:
ifndef NONPMUPDATE
	cd "$(VEYRON_ROOT)/veyron/javascript/vom" && npm link
	:;npm link vom
endif

check-that-npm-is-in-path:
	@which npm > /dev/null || { echo "npm is not in the path. Did you remember to run 'veyron profile setup web'?"; exit 1; }

.PHONY: all build clean dependency-check lint test
.PHONY: test-integration test-integration-node test-integration-browser
.PHONY: test-unit test-unit-node test-unit-browser
.PHONY: check-that-npm-is-in-path
.PHONY: gen-vdl

# Prevent the tests from running in parallel, which causes problems because it
# starts multiple instances of the services at once, and also because it
# interleaves the test output.
.NOTPARALLEL: test-integration test-integration-browser test-integration-node
.NOTPARALLEL: test-unit test-unit-node test-unit-browser
.NOTPARALLEL: test-vdl test-vdl-node test-vdl-browser
