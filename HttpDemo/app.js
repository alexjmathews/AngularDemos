// new Module named httpDemo
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
    }).otherwise({redirectTo:'/'});
});

// create the controller and inject Angular's $scope
httpDemo.controller('mainController', function($scope) {
  // create a message to display in our view
  $scope.message = 'Welcome to an Angular Demo Application!';
});

httpDemo.controller('aboutController', function($scope) {
  $scope.message = 'This was made to practice Basic Angular routing.';
});

