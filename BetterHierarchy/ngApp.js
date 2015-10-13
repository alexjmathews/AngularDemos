// create the module and name it htmlDemo
var ngApp = angular.module('ngApp', 
	['ngRoute', 
	 'ngApp.homeView', 
	 'ngApp.aboutView']);

// configure our routes
ngApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
