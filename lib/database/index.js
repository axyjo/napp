'use strict';

var mongoose = require('mongoose'),
  Grid = require('gridfs-stream'),
  dbUrl = 'mongodb://' + (process.env.DBHOST || 'localhost')  + '/' + (process.env.DBNAME || 'napp');
require('mongoose-query-paginate');

mongoose.connect(dbUrl);

// Define schema for Napp objects.
var Schema = mongoose.Schema,
  schemata = {};

schemata.Nap = new Schema({
  author: Schema.ObjectId,
  assets: [Schema.ObjectId],
  location: Schema.ObjectId,
  rating: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: [{
    body: String,
    author: Schema.ObjectId,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  deleted: {
    type: Boolean,
    default: false
  }
});

schemata.Nap.path('rating').validate(function(value) {
  var integer = parseInt(value, 10) === value;
  var range = Math.max(0, Math.min(10, value)) === value;
  return integer && range;
});

schemata.Spot = new Schema({
  author: Schema.ObjectId,
  name: {
    type: String,
    required: true
  },
  location: {
    type: [Number],
    index: '2dsphere'
  },
  naps: [schemata.Nap],
  deleted: {
    type: Boolean,
    default: false
  }
});

schemata.Spot.path('location').validate(function(value) {
  var length = value.length === 2;
  var nan = isNaN(value[0]) || isNaN(value[1]);
  var longRange = Math.min(180, Math.max(-180, value[0])) === value[0];
  var latRange = Math.min(90, Math.max(-90, value[1])) === value[1];

  return length && !nan && longRange && latRange;
});

// now we'll include our actual database functions,
// which can be consumed by an API

function crudify(modelName, exports) {
  var model = mongoose.model(modelName, schemata[modelName]);

  exports['get' + modelName + 's'] = function(callback) {
    var model = mongoose.model(modelName, schemata[modelName]);
    model.find({'deleted': false}).exec(callback);
  };

  exports['get' + modelName] = function(id, callback) {

    model.findById(id).exec(callback);
  };

  exports['create' + modelName] = function(params, callback) {
    model.create(params, function(err, obj) {
      if (err) {
        callback(err);
      }
      callback(null, obj);
    });
  };

  exports['update' + modelName] = function(params, callback) {
    model.findOneAndUpdate({_id: params.id}, params, callback);
  };

  exports['rawUpdate' + modelName] = function(id, params, callback) {
    model.findOneAndUpdate({_id: id}, params, callback);
  };

  exports['delete' + modelName] = function(params, callback) {
    model.findOneAndUpdate({_id: params.id}, {'deleted': true}, callback);
  };
}

crudify('Nap', exports);
crudify('Spot', exports);

exports.createNapAsset = function(image, nap, callback) {
  var conn = mongoose.createConnection(dbUrl);
  conn.once('open', function () {
    var gfs = new Grid(conn.db, mongoose.mongo);
    var writestream = gfs.createWriteStream({
      filename: image.name
    });
    writestream.on('close', function(file) {
      callback(null, file);
    });

    require('fs').createReadStream(image.path).pipe(writestream);
  });
};

// demonstrating what effect an error would produce
exports.getError = function (callback) {
  var error = new Error('database error');

  // 504 Gateway Timeout
  // The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
  error.status = 504;

  return callback(error);
};
