// create the module and name it htmlDemo
var angularApp = angular.module('angularApp', 
  ['ngRoute', 
   'ngApp.aboutView',
   'ngApp.homeView', 
   'ngApp.loginView',
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




