'use strict';

// placeholder for app instance
var app;
exports.use = function (appInstance) {
  app = appInstance;
};

exports.create = function (req, res, next) {
  app.db.createSpot(req.body, function(err, spot) {
    if (err) {
      return next(err);
    }

    res.send(spot);
  });
};

exports.read = function (req, res, next) {
  var id = req.params.id;
  if (id) {
    app.db.getSpot(id, function(err, spot) {
      if (err) {
        return next(err);
      }

      res.send(spot);
    });
  } else {
    app.db.getSpots(function (err, spots) {
      if (err) {
        return next(err);
      }

      res.send(spots);
    });
  }

};

exports.update = function (req, res, next) {
  app.db.updateSpot(req.body, function(err, spot) {
    if (err) {
      return next(err);
    }

    res.send(spot);
  });
};

exports.delete = function (req, res, next) {
  app.db.deleteSpot(req.params, function(err, spot) {
    if (err) {
      return next(err);
    }

    res.send(spot);
  });
};



exports.getError = function (req, res, next) {
  app.db.getError(function (err) {
    return next(err);
  });
};
