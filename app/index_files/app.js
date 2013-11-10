define([
  'backbone',
  'views/app',
  'core/config',
  'core/eventHandlers',
  'underscore',
  'leaflet'
],

function (Backbone, AppView, appConfig, appEventHandlers, _, L) {
  'use strict';

  var App = function() {
    this.eventHandlers = appEventHandlers(this);

    this.initializeData();
    this.addListeners();
    this.createViews();

    if (window.bootstrap) {
      this.resetData(window.bootstrap);
    }
  };

  App.prototype = {
    views: {},
    models: {},
    collections: {},

    initializeData: function initializeData () {
      /*
       * Instantiate empty global models and collections that other,
       * local collections, and views, will reference once populated
       */
    },

    addListeners: function addListeners () {
    },

    createViews: function createViews () {
      /*
       * Create empty views
       */
      this.views.app = new AppView({ app: this });
      this.views.app.render();
    },

    resetData: function resetData (data) {
      this.collections.people.reset(data);
    },
  };

  _.extend(App.prototype, Backbone.Events);

  return App;
});
