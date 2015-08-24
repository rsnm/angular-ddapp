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
            console.log("authUser: ", authUser);
            var user = $firebaseObject(ref);

            user.$loaded().then(function (data) {
                console.log("data: ", data);
                $rootScope.currentUser = user;
            }).catch(function(error) {
                console.log("error: ", error);
            });
            //user.$loaded().then(function () {
            //    $rootScope.currentUser = user;
            //});
        }else{
            $rootScope.currentUser = null;
        }
    });

}); //StatusController