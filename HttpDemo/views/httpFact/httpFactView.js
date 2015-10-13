var httpFactView = angular.module('ngApp.httpFactView', ['ngRoute']);

httpFactView.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	//route to httpfactory
    .when('/httpfactory', {
      templateUrl : 'views/httpFact/httpFactView.html',
      controller  : 'httpFactViewController',
      resolve     : {
                    resolvedUsers: function(httpFactory, $http) {
                      return httpFactory.fetchUsers($http);
                    }
      }
    });
}]);

httpFactView.factory('httpFactory', function($http) {
  var service = {};
  service.message = 'httpFactory is functional!';
  service.fetchUsers = function($http) {
    var users = {};
    $http.get("http://0.0.0.0:3000").success(function(response){
      angular.copy(response, users);
    });
    console.log("Runing fetch by resolving factory ahead of time!");
    return users;
  }
  return service;
});

httpFactView.controller('httpFactViewController', function($scope, $http, httpFactory, resolvedUsers) {
  $scope.ctrlMessage = 'Message from httpFactViewController!';
  $scope.factMessage = httpFactory.message;
  $scope.resUsers = resolvedUsers;
  $scope.users = {};

  $scope.fetch = function() {
    $http.get("http://0.0.0.0:3000").success(function(response){
      angular.copy(response, $scope.users);
    });
    console.log("Runing fetch method from controller!");
  }
});
