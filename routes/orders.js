var router = require('express').Router(),
    hippie = require('hippie'),
    ordersServiceUrl = process.env.ORDERS_SERVICE_URL || 'http://localhost:3001';

module.exports = router;

router.get('/:id', function(req, res) {
  var id = req.params.id;

  hippie()
      .json()
      .base(ordersServiceUrl)
      .get('/orders/' + id)
      .end(function(req_, res_, body_) {
        res.json(body_);
      });
});

router.post('/', function(req, res) {
  var body = req.body;

  hippie()
      .json()
      .base(ordersServiceUrl)
      .post('/orders')
      .send(body)
      .end(function(req_, res_, body_) {
        res.json(body_);
      });
});
