define([
  'backbone',
  'jquery',
  'JST/popup',
  'models/nap',
  'leaflet',
  'underscore'
],

function (Backbone, $, template, Nap, L, _) {
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
      this.listenTo(this.currentLocation, 'change:latlng', this.render);
    },

    render: function render(options) {
      options = options || {};
      var self = this, old;
      if (this.marker) {
        old = this.marker;
      }

      _.extend(this.model.attributes, {
        distance: this._calculateDistance(),
        assetUrl: '/api/spots/' + this.model.id + '/asset/' + this.model.get('assets')[0]
      });

      var $tplContent = $(template(this.model.attributes));
      this.marker = L.marker(this.point);

      $tplContent.find('.btn-lg').on('click', function(e) {
        var $el = $(e.target);
        var model = new Nap();
        model.set('location', self.model.id);
        if ($el.hasClass('btn-danger')) {
          model.set('rating', 0);
        } else if ($el.hasClass('btn-success')) {
          model.set('rating', 10);
        }

        if (model.get('rating') === 0 || model.get('rating')) {
          model.save();
          self.marker.closePopup();
        }
      });

      if (old) {
        this.map.removeLayer(old);
      }
      this.marker.addTo(this.map).bindPopup($tplContent[0]);

      return this;
    },

    dispose: function() {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.remove();
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

