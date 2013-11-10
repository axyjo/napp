define([
  'backbone',
  'jquery',
  'leaflet',
  'underscore'
],

function (Backbone, $, L, _) {
  'use strict';

  var LocationSnapView = Backbone.View.extend({
    refresh: true,
    refreshInterval: 30000,

    initialize: function initialize (options) {
      options = options || {};
      this.map = options.map;
      this.model = options.model;
      this.addListeners();
      this.createControl();
    },

    addListeners: function addListeners () {
      this.timer = setInterval(_.bind(this.locate, this), 3000);
      this.map.on('locationfound', _.bind(this.onLocate, this));
      this.map.on('mousedown', _.bind(this.suspendRefresh, this));
      this.locate();
    },

    createControl: function() {
      if (this.control) {
        return;
      }

      var self = this;
      L.Control.Snap = L.Control.extend({
          options: {
            position: 'bottomleft',
          },

          onAdd: function () {
            var controlDiv = L.DomUtil.create('div', 'leaflet-control-command');
            L.DomEvent.addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
              .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
              .addListener(controlDiv, 'click', function () { self.resumeRefresh(); });

            var controlUI = L.DomUtil.create('div', 'leaflet-control-command-snap', controlDiv);
            controlUI.title = 'Snap';
            return controlDiv;
          }
        });



      this.control = new L.Control.Snap({
        position: 'bottomleft'
      });
    },

    showControl: function() {
      this.control.addTo(this.map);
    },

    hideControl: function() {
      this.control.removeFrom(this.map);
    },

    render: function render(options) {
      options = options || {};
      return this;
    },

    locate: function() {
      this.map.locate({setView: this.refresh});
    },

    onLocate: function(e) {
      this.model.set({
        'latlng': e.latlng,
        'last_locate_event': e
      }, {silent: !this.refresh});
    },

    suspendRefresh: function () {
      if (this.refresh) {
        this.showControl();
        this.refresh = false;
      }
    },

    resumeRefresh: function() {
      this.model.trigger('change:latlng');
      this.hideControl();
      this.refresh = true;
    }
  });


  return LocationSnapView;
});
