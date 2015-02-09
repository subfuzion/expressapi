var app = require('../../app'),
    pkg = require('../../package.json'),
    assert = require('assert'),
    api = require('hippie'),
    port = process.env.PORT || 3000,
    baseUrl = 'http://localhost:' + port,
    ordersServiceUrl = process.env.ORDERS_SERVICE_URL || 'http://localhost:3001',
    nock = require('nock');

describe('/orders route tests', function () {
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

  describe('GET orders', function() {
    // set up mock service to respond to our orders API
    var orders1body = {
      _id: '1',
      name: 'widget',
      quantity: 1,
      customer: 'nodester'
    };

    nock(ordersServiceUrl)
        .get('/orders/1')
        .reply(200, orders1body);

    it('should GET /orders/1', function (done) {
      api()
          .json()
          .base(baseUrl)
          .get('/orders/1')
          .expectStatus(200)
          .expectHeader('Content-Type', 'application/json; charset=utf-8')
          .expectBody(orders1body)
          .end(function (err, res, body) {
            done(err);
          });
    });
  });


  describe('POST new order', function() {
    // set up mock service to respond to our orders API
    var orders2body = {
      _id: '2',
      name: 'widget',
      quantity: 2,
      customer: 'nodester'
    };

    nock(ordersServiceUrl)
        .post('/orders')
        .reply(200, orders2body);

    it('should POST /orders', function (done) {
      api()
          .json()
          .base(baseUrl)
          .post('/orders')
          .send({ name: 'widget', quantity: 2, customer: 'nodester' })
          .expectStatus(200)
          .expectHeader('Content-Type', 'application/json; charset=utf-8')
          .expectBody(orders2body)
          .end(function (err, res, body) {
            done(err);
          });
    });
  });

});

