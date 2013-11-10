define([
  'backbone',
  'models/spot',
],

function (Backbone, Spot) {
  'use strict';

  var SpotsCollection = Backbone.Collection.extend({
    url: '/api/spots',
    model: Spot,
  });

  return SpotsCollection;
});
