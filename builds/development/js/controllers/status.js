/* global myApp, Firebase, console, alert */

myApp.controller('StatusController', function(
    $scope, $rootScope, $firebaseAuth, $firebaseObject, FIREBASE_URL, $location, Authentication){

    "use strict";

    var ref = new Firebase(FIREBASE_URL),
        auth = $firebaseAuth(ref);

    $scope.logout = function(){
        Authentication.logout();
        $location.path('/login');
    };

    auth.$onAuth(function (authUser) {
        if(authUser){
            var ref = new Firebase(FIREBASE_URL+'users/'+authUser.uid);
            $rootScope.currentUser = $firebaseObject(ref);
        }else{
            $rootScope.currentUser = null;
        }
    });

}); //StatusController