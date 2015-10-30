//var auth2 = gapi.auth2.getAuthInstance();
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
}

// create the module and name it htmlDemo
var angularApp = angular.module('angularApp', 
  ['ngRoute', 
   'angularApp.aboutView',
   'angularApp.homeView', 
    'ngRoute',
    'ngCookies', 
    'Authentication'
   ]);

// configure our routes
angularApp.config(function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
});

angularApp.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; 
        }
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                //$location.path('/login');
            }
        });
    }]);

angularApp.controller('navigationController', function($scope, $rootScope, AuthenticationService) {
  // create a message to display in our view
  $scope.message = "hello";
  if($rootScope.globals.currentUser) {
  	$scope.loggedIn = true;
  	$scope.username = $rootScope.globals.currentUser.username;
  	$scope.token = $rootScope.globals.currentUser.token;
  }
  gapi.load('auth2', function() {
	  auth2 = gapi.auth2.init({
	    client_id: '568058566806-gtuof6s75rvk1me0jljdql521prt5nmc.apps.googleusercontent.com'
	  });
	});

  

  $scope.logout = function() {
    $scope.loggedIn = false;
    if ($rootScope.globals.currentUser.isGoogleUser) {
    	var auth2 = gapi.auth2.getAuthInstance();
    	auth2.signOut().then(function () {
	      console.log('Google User signed out.');
	    });
    }
    AuthenticationService.ClearCredentials();

  }

});
