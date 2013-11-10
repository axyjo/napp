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

exports.createAsset = function (req, res, next) {
  var id = req.params.id;
  app.db.getNap(id, function(err, nap) {
    if (err) {
      return next(err);
    }

    app.db.createNapAsset(req.files.image, nap, function(err, asset) {
      if (err) {
        return next(err);
      }
      app.db.rawUpdateNap(nap._id, {'$push': {'assets': asset._id}}, function(err) {
        if (err) {
          return next(err);
        }
        res.send(asset);
      });
    });
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
