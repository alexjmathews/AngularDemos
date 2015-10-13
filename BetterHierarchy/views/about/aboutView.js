var aboutView = angular.module('ngApp.aboutView', []);

// aboutView.config(['$routeProvider', function($routeProvider) {
//   $routeProvider
//     // route for the about page
//     .when('/about', {
//       templateUrl : 'views/about/about-view.html',
//       controller  : 'aboutViewController'
//     });
// }]);

aboutView.controller('aboutViewController', function($scope) {
  // create a message to display in our view
  $scope.message = 'This is the About Page!';
});