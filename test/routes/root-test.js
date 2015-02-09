var app = require('../../app'),
    pkg = require('../../package.json'),
    assert = require('assert'),
    api = require('hippie'),
    port = process.env.PORT || 3000;
    baseUrl = 'http://localhost:' + port;

describe('/ route tests', function() {
  before(function (done) {
    app.set('port', port);
    var server = app.listen(app.get('port'), function () {
      console.log('test server started on port %s', server.address().port);
      app.set('server', server);
      done();
    });
  });

  after(function (done) {
    var server = app.get('server');
    server.close(function (err) {
      console.log('test server stopped');
      done(err);
    });
  });

  it('should GET /', function (done) {
    api()
        .json()
        .base(baseUrl)
        .get('/')
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .expectBody({service: pkg.name})
        .end(function(err, res, body) {
          done(err);
        });
  });
});


