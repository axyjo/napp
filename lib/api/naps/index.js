'use strict';

// placeholder for app instance
var app;
exports.use = function (appInstance) {
  app = appInstance;
};

exports.getAll = function (req, res, next) {
  app.db.getNaps(function (err, spots) {
    if (err) {
      return next(err);
    }

    res.send(spots);
  });
};

exports.getError = function (req, res, next) {
  app.db.getError(function (err) {
    return next(err);
  });
};
