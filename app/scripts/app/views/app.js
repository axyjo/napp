define([
  'backbone',
  'JST/app',
  'views/searchbox',
  'views/navigation',
  'views/popup',
  'views/addSpot',
  'views/locationSnap',
  'models/currentLocation',
  'collections/spots',
  'jquery',
  'leaflet',
  'underscore'
],

function (Backbone, template, SearchBoxView, NavBoxView, PopupView, AddSpotView, LocationSnapView, CurrentLocation, SpotsCollection, $, L, _) {
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
      this.listenTo(this.model, 'change:latlng', this.onLocationFound);
      //this.listenTo(this.app.collections.people, 'reset', this.populateView);
    },

    render: function render () {
      var self = this;
      this.map = L.map('map');
      L.tileLayer('http://{s}.tile.cloudmade.com/8ee2a50541944fb9bcedded5165f09d9/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
      }).addTo(this.map);


      this.locationSnap = new LocationSnapView({
        map: this.map,
        model: this.model
      });

      var sbView = new SearchBoxView();
      sbView.render(this.map);

      var navView = new NavBoxView();
      navView.render(this.map);

      var collection = new SpotsCollection();
      collection.fetch({
        success: function(collection) {
          collection.each(function(model) {
            new PopupView({
              point: new L.LatLng(model.get('location')[1], model.get('location')[0]),
              currentLocation: self.model,
              map: self.map,
              model: model
            });
          });
        }
      });

      new AddSpotView({
        map: this.map
      });

      return this;
    },

    populateView: function populateView (collection) {
      var data = { names: collection.toJSON() };

      this.$el.html( this.template(data) );
    },

    onLocationFound: function onLocationFound() {
      var e = this.model.get('last_locate_event');
      if (this.map) {
        var radius = Math.round(e.accuracy * 100 / 2)/100;


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

