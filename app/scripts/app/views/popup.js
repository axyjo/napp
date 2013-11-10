define([
  'backbone',
  'jquery',
  'JST/popup',
  'leaflet'
],

function (Backbone, $, template, L) {
  'use strict';

  var PopupView = Backbone.View.extend({
    events: {
      'click': 'handleClick',
    },

    initialize: function initialize (options) {
      options = options || {};
      this.distance = options.distance;
      this.latlng = options.latlng;
      this.addListeners();
    },

    addListeners: function addListeners () {
    },

    render: function render (map) {
      L.marker(this.latlng).addTo(map)
          .bindPopup(template(this)).openPopup();

      L.circle(this.latlng, this.distane).addTo(map);
      return this;
    },

    populateView: function populateView (collection) {
    },

    handleClick: function handleClick (evt) {
      'console' in window && console.log(evt);
    },
  });

  return PopupView;
});

