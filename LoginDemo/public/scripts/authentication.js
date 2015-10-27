var authentication = angular.module('Authentication', []);

authentication.factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope', '$timeout',
    function ($http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.Login = function (username, password, callback) {
            /* Use this for real authentication
             ----------------------------------------------*/
            $http.post('http://localhost:8080/api/authenticate', { username: username, password: password })
               .success(function (response) {
                   callback(response);
               });

        };

        service.SetCredentials = function (username, token, isGoogleUser) {
            var token = token;

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    token: token,
                    isGoogleUser: isGoogleUser
                }
            };

            //$http.defaults.headers.common['Authorization'] = 'Basic ' + token; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };

        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            console.log("credentials cleared");
            //$http.defaults.headers.common.Authorization = 'Basic ';
        };

        return service;
    }]);
