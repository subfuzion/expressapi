var debug = require('debug')('app'),
    fs = require('fs'),
    path = require('path');

exports.load = function(app, routesDir) {
  var routes = fs.readdirSync(routesDir);

  routes.forEach(function(r) {
    var f = path.join(routesDir, r),
        name = path.basename(f, '.js'),
        ext = path.extname(f),
        route = name === 'root' ? '/' : '/' + name,
        m;

    if (ext === '.js') {
      m = require(f);
      app.use(route, m);
    }
  });
};

