// create the module and name it htmlDemo
var httpDemo = angular.module('httpDemo', ['ngRoute']);

// testfactory 

httpDemo.factory('testfactory', function(){
  var service = {};
  var name = 'Default';
  service.message = 'testfactory says hello!';

  service.setName = function(pName) {
    name = pName;
  }

  service.getMessage = function() {
    return name + ', ' + service.message;
  }

  return service;
});

// http factory
httpDemo.factory('httpFactory', function($http) {
  var service = {};
  service.message = 'httpFactory is functional!';
  service.fetchUsers = function($http) {
    var users = {};
    $http.get("http://0.0.0.0:3000").success(function(response){
      angular.copy(response, users);
    });
    console.log("factory fetch through resolve!");
    return users;
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

    // route for the http factory page
    .when('/httpfactory', {
      templateUrl : 'templates/httpFact.html',
      controller  : 'httpFactController',
      resolve     : {
                    resolvedUsers: function(httpFactory, $http) {
                      return httpFactory.fetchUsers($http);
                    }
      }
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


httpDemo.controller('httpFactController', function($scope, $http, httpFactory, resolvedUsers) {
  $scope.ctrlMessage = 'Message from httpFactController!';
  $scope.factMessage = httpFactory.message;
  $scope.resUsers = resolvedUsers;
  $scope.users = {};

  $scope.fetch = function() {
    $http.get("http://0.0.0.0:3000").success(function(response){
      angular.copy(response, $scope.users);
    });
    console.log("help");
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
