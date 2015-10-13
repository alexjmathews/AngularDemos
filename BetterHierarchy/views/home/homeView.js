var homeView = angular.module('ngApp.homeView', ['ngRoute']);

homeView.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	//default route to home
  	.when('/', {
      templateUrl : 'views/home/home-view.html',
      controller  : 'homeViewController'
    })
    // route for the home page
    .when('/home', {
      templateUrl : 'views/home/home-view.html',
      controller  : 'homeViewController'
    });
}]);

homeView.controller('homeViewController', function($scope) {
  // create a message to display in our view
  $scope.message = 'This is the Home Page!';
});