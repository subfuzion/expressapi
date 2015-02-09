var app = require('express')(),
    debug = require('debug')('app'),
    morgan = require('morgan');

module.exports = app;

app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('hello');
});


