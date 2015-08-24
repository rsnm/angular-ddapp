/* global myApp, Firebase */

myApp.controller('MeetingsController', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
    "use strict";

    var ref = new Firebase('https://ngattendance.firebaseio.com/meetings'),
        meetings = $firebaseArray(ref);

    $scope.meetings = meetings;

    $scope.addMeeting = function(){
        meetings.$add({
            name: $scope.meetingname,
            date: Firebase.ServerValue.TIMESTAMP
        }).then(function(){
            $scope.meetingname = '';
        });
    };//addmeeting

    $scope.deleteMeeting = function(key){
        meetings.$remove(key);
    }; //deletemeeting
}]);//MeetingsController