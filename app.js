var app = require('express')(),
    bodyParser = require('body-parser'),
    debug = require('debug')('app'),
    morgan = require('morgan'),
    path = require('path'),
    routeloader = require('./lib/routeloader'),
    routesDir = path.join(__dirname, 'routes');

module.exports = app;

app.use(morgan('dev'));
app.use(bodyParser.json());
// for other body parsing middleware, see:
// http://expressjs.com/4x/api.html#req.body

routeloader.load(app, routesDir);

