var homeView = angular.module('angularApp.homeView', ['ngRoute']);

homeView.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	//route to home
    .when('/', {
      templateUrl : 'views/home/homeView.html',
      controller  : 'homeViewController'
    });
}]);


homeView.controller('homeViewController', function($scope,$location, $rootScope) {
  // create a message to display in our view
  $scope.message = 'This is the Home Page!';
  if($rootScope.globals.currentUser) {
    $scope.isGoogleUser = $rootScope.globals.currentUser.isGoogleUser;
  	$scope.username = $rootScope.globals.currentUser.username;
  	$scope.token = $rootScope.globals.currentUser.token;
  }
});