// create the module and name it htmlDemo
var ngApp = angular.module('ngApp', 
  ['ngRoute', 
   'ngApp.aboutView',
   'ngApp.httpFactView',
   'ngApp.homeView', 
   'ngApp.loginView',
    'ngRoute',
    'ngCookies', 
    'Authentication'
   ]);

// configure our routes
ngApp.config(function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
});

ngApp.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            console.log($rootScope.globals.currentUser.username);
            console.log($rootScope.globals.currentUser.token);
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                //$location.path('/login');
            }
        });
    }]);

ngApp.controller('navigationController', function($scope, $rootScope, AuthenticationService) {
  // create a message to display in our view
  $scope.message = "hello";
  if($rootScope.globals.currentUser) {

  	$scope.username = $rootScope.globals.currentUser.username;
  	$scope.token = $rootScope.globals.currentUser.token;
  }
  
});



