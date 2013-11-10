define([
  'backbone',
  'jquery',
  'leaflet'
],

function (Backbone, $, L) {
  'use strict';

  var SearchboxView = Backbone.View.extend({
    tagName: 'input',
    className: 'searchBox form-control',

    events: {
      'click': 'handleClick',
    },

    initialize: function initialize (options) {

      this.addListeners();
    },

    addListeners: function addListeners () {
    },

    render: function render (map) {
      var self = this,
        MyControl = L.Control.extend({
          options: {
            position: 'topleft'
          },

          onAdd: function (map) {
            // create the control container with a particular class name
            var container = L.DomUtil.create('div', 'my-custom-control');
            $(container).append(self.el);
            // ... initialize other DOM elements, add listeners, etc.

            return container;
          }
        });

      map.addControl(new MyControl());
      return this;
    },

    populateView: function populateView (collection) {
    },

    handleClick: function handleClick (evt) {
      'console' in window && console.log(evt);
    },
  });

  return SearchboxView;
});

