/**
 * Created by Jin Woo Shin on 11/24/2014.
 */
var app = angular.module('wcDocker.demo', ['ui.bootstrap']);
app.controller('wcDockerCtrl', function($scope) {
    var myDocker = new wcDocker('.dockerContainer');

    myDocker.registerPanelType('Right Panel', {
        onCreate: function (myPanel) {
           // myPanel.layout().$table.css('padding', '10px');
            myPanel.initSize(500, 120);
            myPanel.minSize(500, 120);
            myPanel.maxSize(Infinity, 120);
            myPanel.title("Map");
            myPanel.moveable(false);
            myPanel.closeable(false);

            myPanel.layout().addItem($('<div>Map Contents</div>'));
        }
    });
    myDocker.addPanel('Right Panel', wcDocker.DOCK_RIGHT);
    $scope.dockerIndex = 0;
    $scope.addPanel = function() {
        myDocker.registerPanelType('Right Panel_'+$scope.dockerIndex, {
            onCreate: function(myPanel) {
                myPanel.initSize(300, 120);
                myPanel.minSize(100,120);
                myPanel.maxSize(Infinity,120);
                myPanel.title("Info_"+$scope.dockerIndex);
                myPanel.moveable(true);
                myPanel.closeable(true);
                myPanel.layout().addItem($('<div>Additional Info</div>'));
            }
        });
        myDocker.addPanel('Right Panel_'+$scope.dockerIndex, wcDocker.DOCK_RIGHT);
        $scope.dockerIndex++;
    };
});
