var router = require('express').Router(),
    pkg = require('../package.json');

module.exports = router;

router.get('/', function(req, res) {
  res.json({ service: pkg.name });
});

