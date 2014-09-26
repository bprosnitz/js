# FortuneJS
FortuneJS is the JavaScript implementation of the fortune application.

It consists of two parts:
* Server which exposes methods to get a random fortune or add a new one.
* Client which talks to the fortune server using the exposed methods.

Both client and server can run in NodeJS or browser.  For instance, one can run
the fortune server in the browser and have two clients one in NodeJS and one in
the browser using the service.

## Environment Setup

You will need to run three services to get a fortune: mountabled, proxyd, and
wspr.  In addition, we will need to connect to the identitd server running on
envyor.

These commands all expect that $VEYRON_ROOT/veyron/go/bin is in your path, and
that you have installed all the veyron services.  See the "Developing Veyron"
document for instructions on how to do this.

### Mountabled

The mountable is where your fortune service will be mounted. It's kind of like DNS.

We'll start it on port 9002.

    $ mounttabled --address=:9002

### Proxyd

The proxyd allows nodes to communicate regardless of network topology.

We have to pass it the location of the mountable in an environment variable
called NAMESPACE_ROOT.

    $ NAMESPACE_ROOT=/localhost:9002 proxyd --address=:9001

### WSPR

The WSPR proxy allows javascript to make Veyron RPC calls, and manages
identities in a secure manner.

We must tell WSPRD about the mountable using the NAMESPACE_ROOT env variable,
and we pass in the location of the proxy with the '--vproxy' flag.

In addition, WSPR needs to talk to an identity server.  These arn't easy to run
yourself, as they require some OAuth credentials, so we'll just use one running
at /proxy.envyor.com:8101/identity/veyron-test/google.

Lastly, WSPR needs an initial identity.  You can generate one of these with:

    $ identity seekblessing > ~/identity

Putting it all together, you start WSPR like so:

    $ NAMESPACE_ROOT=/localhost:9002 \
      VEYRON_IDENTITY=~/identity \
      wsprd --v=1 --alsologtostderr=true \
        -vproxy :9001 --port 8124 \
        --identd "/proxy.envyor.com:8101/identity/veyron-test/google"


## Running in NodeJS

Run the server:

    $ node ./lib/server.js

Run the Client:

    $ node ./lib/client.js

This should display a random fortune.  You can add a new fortune with:

    $ node ./lib/client.js --add "When one door closes, another opens."


## Browser

### Veyron Extension

Before you can run the server or client in a browser, you will first need to
install the Veyron Chrome Extension.  The extension lives in the
veyron-extension repo, and you can download it here:

https://github.com/veyron/veyron.js/raw/master/extension/veyron.crx


### Browserify

The fortune example uses browserify to bundle the client and server code with
the veyron javascript runtime.

You can build these bundles with:

    # Install browserify and other dependencies in ../../node_modules
    $ npm install

    # Bundle client.js into public/client/bundle.js
    $ ../../node_modules/.bin/browserify lib/client.js --debug --outfile public/client/bundle.js

    # Bundle server.js into public/server/bundle.js
    $ ../../node_modules/.bin/browserify lib/server.js --debug --outfile public/server/bundle.js

### Serving the files

We need to run a simple http server to serve the bundled js, in addition to
html files, images, and css.

We'll use the 'static' http server which was installed when you did 'npm
install'.  The following line starts the 'static' http server and tells it to
server all the content inside ./public/.

    $ ../../node_mobules/.bin/static public

You can now visit the following URLs to see the fortune client and server running in the browser:

    * http://localhost:8080/server/
    * http://localhost:8080/client/

### Shortcut with Make

You can build the bundled JS and serve it all in one command, with:

    $ make run