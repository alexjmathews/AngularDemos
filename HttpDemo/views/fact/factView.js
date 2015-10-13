var factView = angular.module('ngApp.factView', ['ngRoute']);

factView.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	//route to fact
    .when('/factory', {
      templateUrl : 'views/fact/factView.html',
      controller  : 'factViewController'
    });
}]);

factView.factory('testfactory', function(){
  var service = {};
  var name = 'Your Name Here';
  service.message = 'testfactory says hello!';

  service.setName = function(pName) {
    name = pName;
  }

  service.getMessage = function() {
    return name + ', ' + service.message;
  }

  return service;
});

factView.controller('factViewController', function($scope, testfactory) {
  $scope.ctrlMessage = 'Message from testFactoryController.';
  $scope.factMessage = testfactory.message;
  $scope.methodMessage = testfactory.getMessage();
  $scope.formText = '';

  $scope.submit = function() {
    if ($scope.formText) {
      testfactory.setName($scope.formText);
      $scope.formText = '';
      $scope.methodMessage = testfactory.getMessage();
    }
  }
});