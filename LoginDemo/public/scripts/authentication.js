var authentication = angular.module('Authentication', []);

authentication.factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope', '$timeout',
    function ($http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.Login = function (username, password, callback) {
            var req = {
                method: 'POST',
                url: 'http://localhost:8080/api/authenticate',
                data: { email: username, password: password }
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

        service.GoogleLogin = function (token, callback) {
            var req = {
                method: 'POST',
                url: 'http://localhost:8080/api/google-authenticate',
                data: { googToken: token}
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

        service.Register = function (username, email, password, callback) {
            var req = {
                method: 'POST',
                url: 'http://localhost:8080/register',
                data: { username: username, email: email, password: password }
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

        service.GoogleRegister = function (username, token, callback) {
            var req = {
                method: 'POST',
                url: 'http://localhost:8080/register',
                data: { username: username, googToken:token }
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

            //need to figure out http Headers!!!
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + token; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };

        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            console.log("credentials cleared");
            //need to figure out http Headers!!!
            //$http.defaults.headers.common.Authorization = 'Basic ';
        };

        return service;
    }]);
