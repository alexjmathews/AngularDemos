var loginView = angular.module('ngApp.loginView', ['ngRoute', 'Authentication']);

loginView.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	//route to httpfactory
    .when('/login', {
      templateUrl : 'views/login/loginView.html',
      controller  : 'loginViewController'
    });
}]);

loginView.controller('loginViewController', function($scope, $http, $location, AuthenticationService) {
  AuthenticationService.ClearCredentials();
  $scope.ctrlMessage = 'Message from loginView controller!';
  $scope.username = "";
  $scope.password = "";
  $scope.submit = function() {
    if ($scope.formUsername) {
      $scope.username = $scope.formUsername;
      $scope.password = $scope.formPassword;
      $scope.formUsername = '';
      $scope.formPassword = '';
    }
  }

  $scope.login = function () {
    console.log("testing login function");
    $scope.dataLoading = true;
    AuthenticationService.Login($scope.username, $scope.password, function (response) {
        if (response.success) {
            AuthenticationService.SetCredentials($scope.username, response.token);
            $location.path('/');
        } else {
            $scope.error = response.message;
            $scope.dataLoading = false;
        }
    });
  };
});
