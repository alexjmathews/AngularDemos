var accounts = angular.module('accounts', 
  ['ngRoute',
    'Authentication',
    'accounts.loginView',
    'accounts.registerView',
    'accounts.googRegisterView',
    'ngCookies', 
    'Authentication'
   ]);

accounts.config(function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
});




function onSignIn(googleUser) {
  var elem = angular.element(document.querySelector('[ng-app]'));
  var injector = elem.injector();
  var $rootScope = injector.get('$rootScope');  
  $rootScope.$apply(function(){
    $rootScope.$broadcast('GoogleLogIn');
  });

}
