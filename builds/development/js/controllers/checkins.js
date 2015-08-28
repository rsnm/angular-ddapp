/* global myApp, Firebase, console, alert */

myApp.controller('CheckInsController', function(
    $scope, $firebaseArray, FIREBASE_URL, $location, $routeParams){

    "use strict";

    $scope.whichMeeting = $routeParams.mId;
    $scope.whichUser = $routeParams.uId;

    var ref = new Firebase(FIREBASE_URL+'/users/'+$scope.whichUser+
        '/meetings/' + $scope.whichMeeting + '/checkins');

    $scope.checkins = $firebaseArray(ref);

    $scope.addCheckin = function(){
        var checkinsObj = $firebaseArray(ref);
        var myData = {
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            email: $scope.user.email,
            date: Firebase.ServerValue.TIMESTAMP
        };

        checkinsObj.$add(myData).then(function(ref){
            $location.path('/checkins/' + $scope.whichUser + '/' +
            $scope.whichMeeting + '/checkinsList');
        });
    }; //addCheckin

}); //CheckinsController