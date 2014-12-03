/**
 * Created by Jin Woo Shin on 12/1/2014.
 */
(function() {
    "use strict";
    define([
        'angular',
        'controllers/AppController'
    ], function(angular, AppController) {
       function init() {
           var app = angular.module('app', ['ui.bootstrap']);
           AppController.start(app);
           angular.bootstrap(document.body, ['app']);
           return app;
       }
        return {start: init};
    });
}).call(this);