var registerView = angular.module('accounts.registerView', ['ngRoute','Authentication']);

registerView.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	//route to home
    .when('/register', {
      templateUrl : 'views/register/registerView.html',
      controller  : 'registerViewController'
    });
}]);


registerView.controller('registerViewController', function($scope, $http, $rootScope, $window, AuthenticationService) {
  // create a message to display in our view
   $scope.ctrlMessage = 'Message from loginView controller!';

  $scope.register = function () {
    $scope.dataLoading = true;

      AuthenticationService.Register($scope.username, $scope.email, $scope.password, function (regResponse) {
        if (regResponse.success) {
          AuthenticationService.Login($scope.email, $scope.password, function (response) {
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

      } else {
        $scope.error = regResponse.message;
        $scope.password = "";
        $scope.dataLoading = false;
      }
    });

  };
});
