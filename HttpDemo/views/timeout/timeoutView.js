var timeoutView = angular.module('ngApp.timeoutView', ['ngRoute']);

timeoutView.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	//route to timeout
    .when('/timeout', {
      templateUrl : 'views/timeout/timeoutView.html',
      controller  : 'timeoutViewController'
    });
}]);


timeoutView.controller('timeoutViewController', function($scope) {
  // create a message to display in our view
  $scope.message = 'This is the Home Page!';
});

timeoutView.controller('timeoutViewController', function($scope) {
  // create a message to display in our view
  $scope.message = "Waiting 2000ms for update";
    
    setTimeout(function () {
        $scope.$apply(function () {
            $scope.message = "Timeout called!";
        });
    }, 2000);
});