'use strict';

// placeholder for app instance
var app;
exports.use = function (appInstance) {
  app = appInstance;
};

exports.geocode = function (req, res, next) {
  var cloudmade = require('cloudmade-lib'),
    geocoding = cloudmade.geocoding.initialize({
      apikey : '0dee7a590e134699b71a35025bee02d3'
    });

  geocoding.get(req.query.q, function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  });
};

exports.getError = function (req, res, next) {
  app.db.getError(function (err) {
    return next(err);
  });
};




