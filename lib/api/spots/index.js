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
    var callback = function (err, spots) {
      if (err) {
        return next(err);
      }

      res.send(spots);
    };

    if (req.query.bottomLeft && req.query.topRight) {
      app.db.getSpotsByBounds(req.query.bottomLeft, req.query.topRight, callback);
    } else {
      app.db.getSpots(callback);
    }
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
