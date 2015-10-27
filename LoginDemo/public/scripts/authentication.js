var authentication = angular.module('Authentication', []);

authentication.factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope', '$timeout',
    function ($http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.Login = function (username, password, callback) {
            var req = {
                method: 'POST',
                url: 'http://localhost:8080/api/authenticate',
                data: { username: username, password: password }
            }
            $http(req).then(function successCallback(response) {
                console.log(response.data);
                callback(response.data);
            }, function errorCallback(err) {
                console.log("error occured");
                var response = {success : false, message: "Server Error."};
                callback(response);
            });
        };

        service.SetCredentials = function (username, token, isGoogleUser) {
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
