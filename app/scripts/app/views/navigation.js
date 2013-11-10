define([
  'backbone',
  'jquery',
  'JST/modal',
  'leaflet'
],

function (Backbone, $, modalTpl, L) {
  'use strict';

  var NavBoxView = Backbone.View.extend({
    className: 'navbar navbar-default',

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
            position: 'topright'
          },

          onAdd: function (map) {
            // create the control container with a particular class name
            var container = L.DomUtil.create('div', 'my-custom-control');
            $(container).append(self.el);
            // ... initialize other DOM elements, add listeners, etc.
            var modal = modalTpl({
              title: 'Sign in',
              body: 'foobar'
            })
            self.$el.append('<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Sign In</button>' );
            $('body').append(modal);

            return container;
          }
        });

      map.addControl(new MyControl());
      return this;
    },

    populateView: function populateView (collection) {
    },

    handleClick: function handleClick (evt) {
      var self = this;
      require(['bootstrap-modal'], function() {
        self.$('#myModal').modal();
      });    
    },
  });

  return NavBoxView;
});

