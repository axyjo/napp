'use strict';

var spots = exports.spots = require('./spots'),
    naps = exports.naps = require('./naps');

// placeholder for app instance
var app;
exports.use = function (appInstance) {
  app = appInstance;

  spots.use(app);
  naps.use(app);
};
