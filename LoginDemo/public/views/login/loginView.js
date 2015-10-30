var loginView = angular.module('accounts.loginView', ['ngRoute', 'Authentication']);

loginView.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	//route to loginpage
    .when('/login', {
      templateUrl : 'views/login/loginView.html',
      controller  : 'loginViewController'
    });
}]);


loginView.controller('loginViewController', function($scope, $http, $rootScope, $window, AuthenticationService) {
  $scope.ctrlMessage = 'Message from loginView controller!';

  $scope.login = function () {
    $scope.dataLoading = true;
    AuthenticationService.Login($scope.email, $scope.password, function (response) {
      if (response.success) {
        $scope.password = "";
        $rootScope.isGoogleUser = false;
        AuthenticationService.SetCredentials(response.username, response.token, false);
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
    var name = auth2.currentUser.get().getBasicProfile().getName();
    $rootScope.isGoogleUser = true; 
    $rootScope.googleToken = auth2.currentUser.get().getAuthResponse().id_token;
    AuthenticationService.GoogleLogin($rootScope.googleToken, function (response) {
      if (false) {
        console.log("success");
        AuthenticationService.SetCredentials(response.username, response.token, true);
        $window.location.href = '/index.html';
      } else {
        console.log("success");
        $scope.error = response.message;
        $scope.password = "";
        $scope.dataLoading = false;
      }
    });
  });
});
