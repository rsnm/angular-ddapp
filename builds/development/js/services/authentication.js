/* global myApp, Firebase, alert, console */

myApp.factory('Authentication', function($firebaseArray, $rootScope, $firebaseAuth, $location, FIREBASE_URL){
    "use strict";

    var ref = new Firebase(FIREBASE_URL),
        simpleLogin = $firebaseAuth(ref),
        obj;

    obj =  {
        login: function (user) {
            return simpleLogin.$authWithPassword({
                email: user.email,
                password: user.password
            }).then(function(authData){
                $rootScope.$broadcast('$firebaseAuth:authWithPassword',authData);
                return authData;
            });
        }, //login
        register: function (user) {
            return simpleLogin.$createUser({
                email: user.email,
                password: user.password
            }).then(function(regUser){
                console.log("reguser: ", regUser);
                var ref = new Firebase(FIREBASE_URL+'users/'+regUser.uid);
                var firebaseUsers = $firebaseArray(ref);
                var userInfo = {
                    date: Firebase.ServerValue.TIMESTAMP,
                    regUser: regUser.uid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                };
                ref.set(userInfo);
            });//promise
        }, //register
        logout: function(){
            return simpleLogin.$unauth();
        }
    }; //obj

    return obj;
});