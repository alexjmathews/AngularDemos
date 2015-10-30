var googRegisterView = angular.module('accounts.googRegisterView', ['ngRoute', 'Authentication']);

googRegisterView.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	//route to google register page
    .when('/googRegister', {
      templateUrl : 'views/googRegister/googRegisterView.html',
      controller  : 'googRegisterViewController'
    });
}]);

googRegisterView.controller('googRegisterViewController', function($scope, $http, $rootScope, $window, AuthenticationService) {
  $scope.ctrlMessage = 'Message from loginView controller!';
  $scope.token = $rootScope.googleToken;
  });
