/* global myApp, Firebase, console, alert */

myApp.controller('MeetingsController',
    function($scope, $rootScope, $firebaseArray,
             $firebaseObject, $firebaseAuth, FIREBASE_URL){

    "use strict";

    var refUser = new Firebase(FIREBASE_URL),
        auth = $firebaseAuth(refUser);

    auth.$onAuth(function (authUser) {

        if(authUser !== null){
            var ref = new Firebase(FIREBASE_URL+'/users/'+authUser.uid+'/meetings'),
                meetingsArray = $firebaseArray(ref),
                meetingsObj = $firebaseObject(ref);

            meetingsObj.$loaded().then(function(){
                $scope.meetings = meetingsObj;
            });

            meetingsArray.$loaded().then(function(){
                $rootScope.howManyMeetings = meetingsArray.length;
            });

            meetingsArray.$watch(function(event){
                $rootScope.howManyMeetings = meetingsArray.length;
            });

            $scope.addMeeting = function(){
                meetingsArray.$add({
                    name: $scope.meetingname,
                    date: Firebase.ServerValue.TIMESTAMP
                }).then(function(){
                    $scope.meetingname = '';
                });
            };//addmeeting

            $scope.deleteMeeting = function(key){
                meetingsArray.$remove(meetingsArray.$getRecord(key)).then(function(ref){
                    console.log(ref);
                });
            }; //deletemeeting
        }//if authUser
    }); //onAuth
});//MeetingsController