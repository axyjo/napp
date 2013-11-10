'use strict';

// placeholder for app instance
var app;
exports.use = function (appInstance) {
  app = appInstance;
};

exports.create = function (req, res, next) {
  app.db.createNap(req.body, function(err, nap) {
    if (err) {
      return next(err);
    }

    res.send(nap);
  });
};

exports.read = function (req, res, next) {
  var id = req.params.id;
  if (id) {
    app.db.getNap(id, function(err, nap) {
      if (err) {
        return next(err);
      }

      res.send(nap);
    });
  } else {
    app.db.getNaps(function (err, naps) {
      if (err) {
        return next(err);
      }

      res.send(naps);
    });
  }

};

exports.update = function (req, res, next) {
  app.db.updateNap(req.body, function(err, nap) {
    if (err) {
      return next(err);
    }

    res.send(nap);
  });
};

exports.delete = function (req, res, next) {
  app.db.deleteNap(req.params, function(err, nap) {
    if (err) {
      return next(err);
    }

    res.send(nap);
  });
};



exports.getError = function (req, res, next) {
  app.db.getError(function (err) {
    return next(err);
  });
};
