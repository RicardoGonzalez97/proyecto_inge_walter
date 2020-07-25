'use strict';

/* Controllers */

app
  // Flot Chart controller 
  .controller('FlotChartDemoCtrl', ['$scope','NgMap', function($scope,NgMap) {
      $scope.message = 'You can not hide. :)';
      NgMap.getMap().then(function(map) {
          $scope.map = map;
      });
      $scope.callbackFunc = function(param) {
          console.log('I know where '+ param +' are. ' + $scope.message);
          console.log('You are at' + $scope.map.getCenter());
      };
  }]);

