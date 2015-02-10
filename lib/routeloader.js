var debug = require('debug')('app'),
    fs = require('fs'),
    path = require('path');

exports.load = function(app, routesDir) {
  var routes = fs.readdirSync(routesDir);

  routes.forEach(function(filename) {
    var modulePath = path.join(routesDir, filename),
        name = path.basename(modulePath, '.js'),
        ext = path.extname(modulePath),
        route = name === 'root' ? '/' : '/' + name,
        routerModule;

    if (ext === '.js') {
      routerModule = require(modulePath);
      app.use(route, routerModule);
    }
  });
};

