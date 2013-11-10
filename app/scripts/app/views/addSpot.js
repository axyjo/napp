define([
  'backbone',
  'jquery',
  'leaflet',
  'underscore',
  'JST/spotConfirm',
  'models/spot',
  'bootstrap-fileinput'
],

function (Backbone, $, L, _, template, Spot) {
  'use strict';

  var AddSpotView = Backbone.View.extend({

    initialize: function initialize (options) {
      options = options || {};
      this.map = options.map;
      this.parent = options.parent;
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

            var controlUI = L.DomUtil.create('div', 'fa leaflet-control-command-addSpot fa-location-arrow fa-2x', controlDiv);
            controlUI.title = 'Add Spot';
            controlUI.text = 'asdf';
            return controlDiv;
          }
        });

      this.control = new L.Control.AddSpot();
      this.control.addTo(this.map);
    },

    saveImage: function(model, collection, image) {
      if (image && image.name && model) {
        var data = new FormData(),
        url = '/api/spots/' + model.id + '/asset';

        data.append('image', image);
        $.ajax({
          url: url,
          type: 'POST',
          data: data,
          processData: false,
          contentType: false,
          success: function(resp) {
            var assets = model.get('assets');
            assets.push(resp._id);
            model.set('assets', assets);
            collection.remove(model);
            collection.add(model);
          }
        });
      }
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
          var image = $el.parents('.spotConfirm').find('input[name=image]').get(0).files[0];
          var model = new Spot({
            name: $el.parents('.spotConfirm').find('input[name=name]').val(),
            description: $el.parents('.spotConfirm').find('input[name=description]').val(),
            location: [latlng.lng, latlng.lat]
          });
          model.save(null, {
            success: function() {
              self.saveImage(model, self.parent.collection, image);
              self.parent.collection.add(model);
              self.marker.off('popupclose');
              self.map.removeLayer(self.marker);
            }
          });
        }
      });
      $popupContents.find('.fileinput').fileinput();

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
