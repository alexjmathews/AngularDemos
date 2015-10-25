var homeView = angular.module('ngApp.homeView', ['ngRoute']);

homeView.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	//route to home
    .when('/', {
      templateUrl : 'views/home/homeView.html',
      controller  : 'homeViewController'
    });
}]);


homeView.controller('homeViewController', function($scope, $rootScope) {
  // create a message to display in our view
  $scope.message = 'This is the Home Page!';
  if($rootScope.globals.currentUser) {

  	$scope.username = $rootScope.globals.currentUser.username;
  	$scope.token = $rootScope.globals.currentUser.token;
  }
  
});