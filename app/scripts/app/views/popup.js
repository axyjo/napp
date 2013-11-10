define([
  'backbone',
  'jquery',
  'JST/popup',
  'leaflet'
],

function (Backbone, $, template, L) {
  'use strict';

  var PopupView = Backbone.View.extend({
    initialize: function initialize (options) {
      options = options || {};
      this.point = options.point;
      this.currentLocation = options.currentLocation;
      this.map = options.map;
      this.model = options.model || {};
      this.addListeners();
    },

    addListeners: function addListeners () {
      this.currentLocation.on('change:latlng', this.render, this);
    },

    render: function render(options) {
      options = options || {};
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }

      _.extend(this.model.attributes, {distance: this._calculateDistance()});
      this.marker = L.marker(this.point).addTo(this.map)
          .bindPopup(template(this.model.attributes));

      return this;
    },

    /**
     * Returns distance from point to current location in km, two decimal places.
     * @param  {L.Point} point
     * @return {Number}
     */
    _calculateDistance: function() {
      return Math.round(this.currentLocation.get('latlng').distanceTo(this.point)/10)/100;
    },
  });

  return PopupView;
});

