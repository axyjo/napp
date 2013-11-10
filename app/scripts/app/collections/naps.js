define([
  'backbone',
  'models/nap',
],

function (Backbone, Nap) {
  'use strict';

  var NapsCollection = Backbone.Collection.extend({
    url: '/api/naps',
    model: Nap,
  });

  return NapsCollection;
});
