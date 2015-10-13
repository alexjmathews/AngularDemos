var homeView = angular.module('ngApp.homeView', []);

homeView.controller('homeViewController', function($scope) {
  // create a message to display in our view
  $scope.message = 'This is the Home Page!';
});