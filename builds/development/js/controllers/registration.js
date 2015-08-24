/* global myApp, Firebase, alert, console */

myApp.controller('RegistrationController', function($scope, FIREBASE_URL,$firebaseAuth,
                                                    $location, Authentication){
"use strict";

    var ref = new Firebase(FIREBASE_URL);

    $scope.login = function(){
        Authentication.login($scope.user)
            .then(function (user) {
                $location.path('/meetings');
            }, function(error){
                $scope.message = error.toString()
            });
    }; //login

    $scope.register = function(){
        Authentication.register($scope.user)
            .then(function (user) {
                Authentication.login($scope.user);
                $location.path('/meetings');
            }, function(error){
                $scope.message = error.toString()
            });
    }; //register

});//RegistrationController