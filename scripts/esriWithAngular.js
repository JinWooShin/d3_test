/**
 * Created by jwshin on 11/30/2014.
 */
(function(define, angular) {
    'use strict';
    require(['esri/map'], function(Map) {
        var esriMap = angular.module('esri.map', []);

        esriMap.directive('esriMap', function() {
            return {
                restrict: 'EA',
                controller: 'MapController',
                link: function(scope, element, attrs, ctrl) {
                    ctrl.init(element);
                }
            };
        });

        esriMap.controller('MapController', ['$rootScope', '$scope', '$attrs', function($rootScope, $scope, $attrs) {
            var self = this;
            var mapDiv, layers = [];

            this.init = function(element) {
                if(!$attrs.id) {
                    throw new Error('\'id\' is required for a map.');
                }
                self.$element = element;
                self.createDiv();
                self.createMap();
            };
            this.createDiv = function() {
                mapDiv = document.createElement('div');
                mapDiv.setAttribute('id', $attrs.id);
                self.$element.removeAttr('id');
                self.$element.append(mapDiv);
            };
            this.createMap = function() {
                var options = {
                    center: $attrs.center ? JSON.parse($attrs.center):[-56.046, 38.485],
                    zoom: $attrs.zoom ? parseInt($attrs.zoom):3,
                    basemap: $attrs.basemap ? $attrs.basemap:'street'
                };
                $scope.map = new Map($attrs.id, options);
                $scope.map.on('load', function() {
                    $rootScope.$broadcast('map-click');
                });
                $scope.map.on('click', function(e) {
                    $rootScope.$broadcast('map-click', e);
                });
                if (layers.length > 0) {
                    $scope.map.addLayers(layers);
                    layers = [];
                }
            };
            $scope.addLayer = function(layer) {
                if($scope.map) {
                    $scope.map.addLayer(layer);
                } else {
                    layers.push(layer);
                }
            };
        }]);
    });
}(window.define, window.angular));