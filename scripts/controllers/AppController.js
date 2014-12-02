/**
 * Created by Jin Woo Shin on 12/1/2014.
 */
(function() {
    "use strict";
    define([
        'angular',
        'esri/map',
        'esri/layers/ArcGISDynamicMapServiceLayer'
    ], function(angular, Map, ArcGISDynamicMapServiceLayer) {
        function mapConfigs() {
            return {
                basemap: 'streets',
                center: [-118.1704035141802, 34.03597014510993],
                zoom: 4
            };
        }
        function mapGen(elem) {
            return new Map(elem, mapConfigs());
        }
        function AppController($scope) {
            $scope.map = mapGen('map');
            var layer = new ArcGISDynamicMapServiceLayer("http://maps.ngdc.noaa.gov/arcgis/rest/services/hot_springs/MapServer");
            $scope.map.addLayer(layer);
        }
        function init(App) {
            App.controller('AppCtrl', ['$scope', AppController]);
            return AppController;
        }
        return {start: init};
    });
}).call(this);