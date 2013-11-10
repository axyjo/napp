define([
  'backbone',
  'JST/app',
  'views/searchbox',
  'views/navigation',
  'views/popup',
  'models/currentLocation',
  'jquery',
  'leaflet',
  'underscore'
],

function (Backbone, template, SearchBoxView, NavBoxView, PopupView, CurrentLocation, $, L, _) {
  'use strict';

  var AppView = Backbone.View.extend({
    el: '.content',
    template: template,
    model: new CurrentLocation(),

    initialize: function initialize (options) {
      this.app = options.app;

      this.addListeners();
    },

    addListeners: function addListeners () {
      //this.listenTo(this.app.collections.people, 'reset', this.populateView);
    },



    render: function render () {
      this.model.once('change:latlng', function() {
        this.map.setView(this.model.get('latlng'), 18);
      }, this);
      this.map = L.map('map');
      L.tileLayer('http://{s}.tile.cloudmade.com/8ee2a50541944fb9bcedded5165f09d9/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
      }).addTo(this.map);
      this.map.on('locationfound', _.bind(this.onLocationFound, this));

      this.map.locate({setView: true, maxZoom: 15});
      setInterval(_.bind(function() {
        console.log('firing');
        this.map.locate({setView: true, maxZoom: 15});
      }, this), 3000);

      var sbView = new SearchBoxView();
      sbView.render(this.map);

      var navView = new NavBoxView();
      navView.render(this.map);

      new PopupView({
        point: new L.LatLng(43.467, -80.5400),
        currentLocation: this.model,
        map: this.map
      });

      return this;
    },

    populateView: function populateView (collection) {
      var data = { names: collection.toJSON() };

      this.$el.html( this.template(data) );
    },

    onLocationFound: function onLocationFound(e) {
      if (this.map) {
        var radius = Math.round(e.accuracy * 100 / 2)/100;
        this.model.set('latlng', e.latlng);

        if (this.marker && this.markerCircle) {
          this.marker.setLatLng(e.latlng);
          this.markerCircle.setLatLng(e.latlng);
          this.markerCircle.setRadius(radius);
        } else {
          this.marker = L.marker(e.latlng).addTo(this.map).bindPopup('You are here!').openPopup();
          this.markerCircle = L.circle(e.latlng, radius).addTo(this.map);
        }
      }
    }
  });

  return AppView;
});

