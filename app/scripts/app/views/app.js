define([
  'backbone',
  'JST/app',
  'views/searchbox',
  'views/navigation',
  'jquery',
  'leaflet',
  'underscore'
],

function (Backbone, template, SearchBoxView, NavBoxView, $, L, _) {
  'use strict';

  var AppView = Backbone.View.extend({
    el: '.content',
    template: template,

    events: {
      'click': 'handleClick',
    },

    initialize: function initialize (options) {
      this.app = options.app;

      this.addListeners();
    },

    addListeners: function addListeners () {
      //this.listenTo(this.app.collections.people, 'reset', this.populateView);
    },

    render: function render () {
      this.map = L.map('map').setView([43.4689, -80.5400], 18);
      L.tileLayer('http://{s}.tile.cloudmade.com/8ee2a50541944fb9bcedded5165f09d9/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
      }).addTo(this.map);
      this.map.on('locationfound', _.bind(this.onLocationFound, this));

      this.map.locate({setView: true, maxZoom: 15});


      var sbView = new SearchBoxView();
      sbView.initialize();
      sbView.render(this.map);

      var navView = new NavBoxView();
      navView.initialize();
      navView.render(this.map);

      return this;
    },

    populateView: function populateView (collection) {
      var data = { names: collection.toJSON() };

      this.$el.html( this.template(data) );
    },

    onLocationFound: function onLocationFound(e) {
      if (this.map) {
        console.log(e);
        var radius = Math.round(e.accuracy * 100 / 2)/100;

        L.marker(e.latlng).addTo(this.map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(this.map);
      }
    },

    handleClick: function handleClick (evt) {
      'console' in window && console.log(evt);
    },
  });

  return AppView;
});

