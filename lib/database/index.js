'use strict';

// require a database library like mongoose and configure it
// var mongoose = require('mongoose');

// instead we'll make a fake database and data to illustrate how to integrate it
// BEGIN fake database/data
var naps = [
  {'id': '1', 'name': 'Best Nap Ever!', 'spot_id': '1'},
  {'id': '2', 'name': 'Second Best Nap Ever!', 'spot_id': '1'},
  {'id': '3', 'name': 'New Nap!', 'spot_id': '2'}
];

var spots = [
  {'id': '1', 'name': 'MC Comfy'},
  {'id': '2', 'name': 'SLC'}
];

var Nap = {
  find: function(params, callback) {
    return callback(null, naps);
  }
};

var Spot = {
  find: function(params, callback) {
    return callback(null, spots);
  }
};

// END fake database/data


// now we'll include our actual database functions,
// which can be consumed by an API

exports.getNaps = function (callback) {
  Nap.find({ example: 1 }, function (err, naps) {
    // in reality you will ALWAYS want to validate
    // your data before sending it to the browser,
    // or before inserting it into the database,
    // to prevent XSS attacks.
    //
    // I recommend something like node-validator:
    // https://github.com/chriso/node-validator/
    return callback(err, naps);
  });
};

exports.getSpots = function (callback) {
  Spot.find({ example: 1 }, function (err, spots) {
    return callback(err, spots);
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


/**
 * in a unit-testing/coverage-testing environment,
 * we can export internal functions for testing too,
 * rather than just what's normally exported in the module.
 */

// a function to demonstrate how you can test internal functions.
// check the test/backend/ directory for an example.
function addSpot (data) {
  var spot = { 'name': 'RCH 301'};

  data.push(spot);
}

// here's where it's used in production, although it's not exported,
// so normally it couldn't be tested.
addSpot(spots);

// export the internal function only in a test environment
if (process.env.NODE_ENV === 'test') {
  exports.addSpot = addSpot;
}
