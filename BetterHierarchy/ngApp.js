// create the module and name it htmlDemo
var ngApp = angular.module('ngApp', ['ngRoute', 'ngApp.homeView', 'ngApp.aboutView']);

// configure our routes
ngApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider

    // route for the home page
    .when('/', {
      templateUrl : 'views/home/home-view.html',
      controller  : 'homeViewController'
    })

    //route for about page
    .when('/about', {
      templateUrl : 'views/about/about-view.html',
      controller  : 'aboutViewController'
    });
}]);
