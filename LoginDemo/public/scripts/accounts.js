var loginView = angular.module('accounts', 
  ['Authentication',
    'ngCookies', 
    'Authentication'
   ]);

loginView.controller('loginViewController', function($scope, $http, $rootScope, $window, AuthenticationService) {
  $scope.ctrlMessage = 'Message from loginView controller!';

  $scope.login = function () {
    $scope.dataLoading = true;
    AuthenticationService.Login($scope.username, $scope.password, function (response) {
      if (response.success) {
        $scope.password = "";
        $rootScope.isGoogleUser = false;
        AuthenticationService.SetCredentials($scope.username, response.token, false);
        $window.location.href = '/index.html';
      } else {
        $scope.error = response.message;
        $scope.password = "";
        $scope.dataLoading = false;
      }
    });
  };

  $scope.$on('GoogleLogIn', function(event) { 
    console.log("Google Log In Event Registered Registered"); 
    var auth2 = gapi.auth2.getAuthInstance();
    name = auth2.currentUser.get().getBasicProfile().getName();
    AuthenticationService.SetCredentials(name, "response.token",true);
    $rootScope.isGoogleUser = true;
    $window.location.href = '/index.html';
  });
});



function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  var elem = angular.element(document.querySelector('[ng-app]'));
  var injector = elem.injector();
  var $rootScope = injector.get('$rootScope');  
  $rootScope.$apply(function(){
    $rootScope.$broadcast('GoogleLogIn');
  });

}
