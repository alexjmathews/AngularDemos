// create the module and name it htmlDemo
var httpDemo = angular.module('httpDemo', ['ngRoute']);

// configure our routes
httpDemo.config(function($routeProvider) {
  $routeProvider

    // route for the home page
    .when('/', {
      templateUrl : 'templates/home.html',
      controller  : 'mainController'
    })

    // route for the about page
    .when('/about', {
      templateUrl : 'templates/about.html',
      controller  : 'aboutController'
    });
});

// create the controller and inject Angular's $scope
httpDemo.controller('mainController', function($scope) {
  // create a message to display in our view
  $scope.message = 'This is the Home Page!';
});

httpDemo.controller('aboutController', function($scope) {
  $scope.message = 'This is an About Page.';
});
