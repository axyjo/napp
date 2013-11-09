'use strict';

require.config({
  paths: {
    json3: '../../bower_components/json3/lib/json3',
    jquery: '../../bower_components/jquery/jquery',
    // needed for precompiled templates
    handlebars: '../../bower_components/handlebars/handlebars.runtime',
    JST: 'templates',
    underscore: '../../bower_components/lodash/dist/lodash.compat',
    backbone: '../../bower_components/backbone/backbone',
    'bootstrap-affix': '../../bower_components/sass-bootstrap/js/affix',
    'bootstrap-alert': '../../bower_components/sass-bootstrap/js/alert',
    'bootstrap-button': '../../bower_components/sass-bootstrap/js/button',
    'bootstrap-carousel': '../../bower_components/sass-bootstrap/js/carousel',
    'bootstrap-collapse': '../../bower_components/sass-bootstrap/js/collapse',
    'bootstrap-dropdown': '../../bower_components/sass-bootstrap/js/dropdown',
    'bootstrap-modal': '../../bower_components/sass-bootstrap/js/modal',
    'bootstrap-popover': '../../bower_components/sass-bootstrap/js/popover',
    'bootstrap-scrollspy': '../../bower_components/sass-bootstrap/js/scrollspy',
    'bootstrap-tab': '../../bower_components/sass-bootstrap/js/tab',
    'bootstrap-tooltip': '../../bower_components/sass-bootstrap/js/tooltip',
    'bootstrap-transition': '../../bower_components/sass-bootstrap/js/transition'
  },
  shim: {
    handlebars: {
      deps: [],
      exports: 'Handlebars',
    },
    underscore: {
      deps: [],
      exports: '_',
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone',
    },
  },
});

require(['main'], function () {});
