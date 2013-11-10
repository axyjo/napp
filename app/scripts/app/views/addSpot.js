define([
  'backbone',
  'jquery',
  'leaflet',
  'underscore',
  'JST/spotConfirm',
  'models/spot'
],

function (Backbone, $, L, _, template, Spot) {
  'use strict';

  var AddSpotView = Backbone.View.extend({

    initialize: function initialize (options) {
      options = options || {};
      this.map = options.map;
      this.addListeners();
      this.createControl();
    },

    addListeners: function addListeners () {

    },

    createControl: function() {
      if (this.control) {
        return;
      }

      var self = this;
      L.Control.AddSpot = L.Control.extend({
          options: {
            position: 'bottomleft',
          },

          onAdd: function () {
            var controlDiv = L.DomUtil.create('div', 'leaflet-control-command');
            L.DomEvent.addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
              .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
              .addListener(controlDiv, 'click', function () { self.clickHandler(); });

            var controlUI = L.DomUtil.create('div', 'leaflet-control-command-addSpot', controlDiv);
            controlUI.title = 'Add Spot';
            controlUI.text = 'asdf';
            return controlDiv;
          }
        });

      this.control = new L.Control.AddSpot();
      this.control.addTo(this.map);
    },

    clickHandler: function() {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      var self = this,
        $popupContents = $(template());

      this.marker = L.marker(this.map.getCenter(), {draggable: true}).addTo(this.map);
      $popupContents.find('.btn').on('click', function(e) {
        var $el = $(e.target);
        if ($el.hasClass('btn-danger')) {
          self.map.removeLayer(self.marker);
        }

        if ($el.hasClass('btn-primary')) {
          $el.parents('.spotConfirm').find('.section').toggle();
        }

        if ($el.hasClass('btn-default')) {
          e.preventDefault();
          var latlng = self.marker.getLatLng().wrap();
          var model = new Spot({
            name: $el.parents('.spotConfirm').find('input[name=name]').val(),
            location: [latlng.lng, latlng.lat]
          });
          model.save(null, {
            success: function() {
              self.map.removeLayer(self.marker);
            }
          });
        }
      });
      this.marker.on('dragend', function() {
        this.popup = this.bindPopup($popupContents[0]).openPopup();
      });

      this.marker.on('popupclose', function() {
        self.map.removeLayer(self.marker);
      });
    },

    render: function render(options) {
      options = options || {};
      return this;
    }
  });


  return AddSpotView;
});
