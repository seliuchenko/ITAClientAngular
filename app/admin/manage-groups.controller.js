/**
 * Created by marian on 04.10.16.
 */
(function() {
    'use strict';

    angular.module('app.admin', [])

        .controller('groupsListController',function($http, $window){
            var vm = this;
            vm.groupsList = [];
            $http({
                method: 'GET',
                url: 'http://localhost:8080/groups'
            }).then(function(response){
                var groupsArray = response.data._embedded.iTAGroups;
                for(var i=0; i<groupsArray.length; i++){
                    vm.groupsList.push(groupsArray[i]);
                }
            }, function(response){
                $window.alert('Can not download the list of groups: '+response.status+' - '+response.statusText);
            });

            vm.showForm = function() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'create-edit-group-dialog.html',
                    controller: 'CreateGroupFormInstanceController',
                    scope: $scope
                });
            }
        })
        .controller('CreateGroupFormInstanceController', function($scope, $window, $uibModalInstance, $http){
            $uibModalInstance.opened.then(function(){
                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/users'
                }).then(function(response){
                    var teachers = response.data._embedded.users;
                    for(var i=0; i<teachers.length; i++){
                        $scope.allTeachers.push(teachers[i].fullName);
                        $scope.selectedTeacher = $scope.allTeachers[0];
                    }
                }, function(response){
                    //$window.alert('Can not download the list of users: '+response.status);
                });
            });
            //====================== Students Number ==========================
            $scope.value = 1;
            $scope.MAX_VALUE = 100;
            $scope.MIN_VALUE = 1;

            $scope.incrementValue = function(){
                if($scope.value<MAX_VALUE){
                    $scope.value += 1;


                }
            }
            $scope.decrementValue = function(){
                if($scope.value>MIN_VALUE){
                    $scope.value -= 1;
                }
            }
            //=======================Date pickers ==============================
            $scope.startDate = new Date();
            $scope.endDate = new Date();
            $scope.currentDate = new Date();
            $scope.startPicker = {
                opened: false,
            }
            $scope.endPicker = {
                opened: false
            }
            $scope.popupStartPicker = function(){
                $scope.startPicker.opened=true;
            }
            $scope.popupEndPicker = function(){
                $scope.endPicker.opened=true;
            }
            //===================== Teachers List ==============================
            $scope.selectedTeacher = null;
            $scope.allTeachers = [];
            $scope.addedTeachersList = [];
            $scope.addTeacherToTheList = function(){
                $scope.addedTeachersList.push($scope.selectedTeacher);
            }
            $scope.removeTeacherFromTheList = function(index){
                $scope.addedTeachersList.splice(index,1);
            }
            //==================== Create/Cancel Buttons ========================
            $scope.createGroup = function(){
                $window.alert("Sending JSON Request To server!");
            }
            $scope.cancelCreation = function(){
                $uibModalInstance.close();
            }

        });

})();
