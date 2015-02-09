var app = require('../../app'),
    pkg = require('../../package.json'),
    assert = require('assert'),
    api = require('hippie'),
    port = process.env.PORT || 3000,
    baseUrl = 'http://localhost:' + port;

describe('/greeting route tests', function() {
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

  it('should GET /greeting', function (done) {
    api()
        .json()
        .base(baseUrl)
        .get('/greeting')
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .expectBody({ greeting: 'Hello World!' })
        .end(function(err, res, body) {
          done(err);
        });
  });

  it('should GET /greeting/:name', function (done) {
    api()
        .json()
        .base(baseUrl)
        .get('/greeting/nodester')
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .expectBody({ greeting: 'Hello nodester!' })
        .end(function(err, res, body) {
          done(err);
        });
  });

  it ('should POST a message to /greeting/:name', function(done) {
    api()
        .json()
        .base(baseUrl)
        .post('/greeting/nodester')
        .send({ message: 'test message' })
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .expectBody({ greeting: 'Hello nodester!', message: 'test message' })
        .end(function(err, res, body) {
          done(err);
        });
  });

});

