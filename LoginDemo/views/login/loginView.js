var loginView = angular.module('ngApp.loginView', ['ngRoute', 'Authentication']);

loginView.controller('loginViewController', function($scope, $http, $location, $rootScope, $window, AuthenticationService) {
  $scope.ctrlMessage = 'Message from loginView controller!';
  if($rootScope.globals.currentUser) {
    $scope.loggedIn = true;
    $scope.username = $rootScope.globals.currentUser.username;
    $scope.token = $rootScope.globals.currentUser.token;
  }

  $scope.logout = function() {
    $scope.loggedIn = false;
    AuthenticationService.ClearCredentials();
  }

  $scope.login = function () {
    $scope.dataLoading = true;
    AuthenticationService.Login($scope.username, $scope.password, function (response) {
        if (response.success) {
            $scope.password = "";
            $scope.loggedIn = true;
            AuthenticationService.SetCredentials($scope.username, response.token);
            $scope.username = $rootScope.globals.currentUser.username;
            $scope.token = $rootScope.globals.currentUser.token;
            $window.location.href = '/index.html';
        } else {
            $scope.error = response.message;
            $scope.password = "";
            $scope.dataLoading = false;
        }
    });
  };
});
