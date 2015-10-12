// create the module and name it htmlDemo
var httpDemo = angular.module('httpDemo', ['ngRoute']);

// testfactory 

httpDemo.factory('testfactory', function(){
  var service = {};
  var name = 'default';
  service.message = 'from Factory';

  service.setName = function(pName) {
    name = pName;
  }

  service.getMessage = function() {
    return 'Hello ' + name + ' ' + service.message;
  }

  return service;
});

// configure our routes
httpDemo.config(function($routeProvider) {
  $routeProvider

    // route for the home page
    .when('/', {
      templateUrl : 'templates/home.html',
      controller  : 'mainController'
    })

    //trying a timeout thing
    .when('/timeout', {
      templateUrl : 'templates/timeout.html',
      controller  : 'timeoutCtrl'
    })

    // route for the test factory page
    .when('/factory', {
      templateUrl : 'templates/factory.html',
      controller  : 'testFactoryController'
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

httpDemo.controller('testFactoryController', function($scope, testfactory) {
  $scope.ctrlMessage = 'Message from controller.';
  $scope.factMessage = testfactory.message;
  testfactory.setName('Alex');
  $scope.methodMessage = testfactory.getMessage();
  $scope.formText = '';

  $scope.submit = function() {
    if ($scope.formText) {
      testfactory.setName($scope.formText);
      $scope.formText = '';
      $scope.methodMessage = testfactory.getMessage();
      $scope.apply(function () {
        $scope.factMessage = 'hello';
      });
    }
  }
});

httpDemo.controller('timeoutCtrl', function($scope) {
  // create a message to display in our view
  $scope.message = "Waiting 2000ms for update";
    
    setTimeout(function () {
        $scope.$apply(function () {
            $scope.message = "Timeout called!";
        });
    }, 2000);
});



httpDemo.controller('aboutController', function($scope) {
  $scope.message = 'This is an About Page.';
});
