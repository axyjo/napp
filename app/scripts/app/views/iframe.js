define([
  'backbone',
  'jquery',
  'JST/iframe',
  'leaflet'
],

function (Backbone, $, iframeTpl, L) {
  'use strict';

  var IframeView = Backbone.View.extend({
    initialize: function initialize (options) {
      this.map = options.map;
      this.addListeners();
    },

    addListeners: function addListeners () {
    },

    render: function render() {
      var self = this;

      $("body").append(this.$el);
      console.log(iframeTpl());
      this.$el.html(iframeTpl());

      this.$el.hide();

      L.Control.IFrame = L.Control.extend({
        options: {
          position: 'bottomleft',
        },

        onAdd: function () {
          var controlDiv = L.DomUtil.create('div', 'leaflet-control-command');
          L.DomEvent.addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
            .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
            .addListener(controlDiv, 'click', function () { self.populateView(); });

          var controlUI = L.DomUtil.create('div', 'fa leaflet-control-command-addSpot fa-clock-o fa-2x', controlDiv);
          controlUI.title = 'Sleepyti.me';
          controlUI.text = 'asdf';
          return controlDiv;
        }
      });

      this.control = new L.Control.IFrame();
      this.control.addTo(this.map);
      return this;


    },

    populateView: function populateView () {
      require(['bootstrap-modal'], function() {
        $('#myModal').modal();
      });
    },

  });

  return IframeView;
});

