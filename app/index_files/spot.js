define([
  'backbone',
],

function (Backbone) {
  'use strict';

  var Spot = Backbone.Model.extend({
    url: '/api/spots'
  });

  return Spot;
});
