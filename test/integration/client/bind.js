/**
 * @fileoverview Integration test for binding through WSPR.
 *
 * This is not tested in the client beforeEach test sections, so this
 * is useful for identifying when binding is the cause of the
 * beforeEach failures.
 */
var Veyron = require('../../../src/veyron');
var TestHelper = require('../../test_helper');
describe('client/bind.js:', function() {
  var client;
  beforeEach(function() {
    var veyron = new Veyron(TestHelper.veyronConfig);
    client = veyron.newClient();
  });

  it('Should be able to bind', function(done) {
    var absoluteVeyronName =
        '/' + testconfig['SAMPLE_VEYRON_GO_SERVICE_ENDPOINT'] + '/cache';
    client.bindTo(absoluteVeyronName).then(function() {
      done();
    }).catch(done);
  });
});
