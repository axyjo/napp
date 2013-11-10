define([
  'backbone',
],

function (Backbone) {
  'use strict';

  var Nap = Backbone.Model.extend({
    url: '/api/naps'
  });

  return Nap;
});
