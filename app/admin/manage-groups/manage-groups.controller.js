/**
 * Created by marian on 04.10.16.
 */
(function() {
    'use strict';

    angular.module('app.admin', [])

        .controller('groupsListController',function($http, $window, $state){
            var vm = this;
            vm.groupsList = [];
            $http({
                method: 'GET',
                url: 'http://localhost:8080/groups?projection=groupItem',
            }).then(function(response){
                var groupsArray = response.data._embedded.iTAGroups;
                for(var i=0; i<groupsArray.length; i++){
                    vm.groupsList.push(groupsArray[i]);
                }
                //$window.alert(JSON.stringify(vm.groupsList[0]));
            }, function(response){
                $window.alert('Can not download the list of groups: '+response.status+' - '+response.statusText);
            });

            vm.deleteGroup = function(index){
                $http({
                   url: 'http://localhost:8080/groups/'+index,
                   method: 'DELETE'
                }).success(function(data,status,headers,config){
                    $window.alert("User has been DELETED!");
                }).error(function(data,status){
                    $window.alert("Error deleting user:"+status+', '+JSON.stringify(data.statusText));
                });
            }

            vm.createGroup = function(){
                $state.go('groupsDashboard.createGroup',{"groupObject": null});
            }

            vm.editGroup = function(index){
                if(index>=0 && index<(vm.groupsList.length-1)){
                    $state.go('groupsDashboard.createGroup',{"groupObject": vm.groupsList[index]});
                }

            }
        })
        .controller('CreateGroupFormInstanceController', function($window, $http, $filter, $state, $stateParams, uibDateParser){
            var vm = this;
            vm.passedGroupObject = $stateParams.groupObject;
            //======================== Initializing lists of teachers ==============================
            vm.allTeachers = [];
            vm

            $http({
                method: 'GET',
                url: 'http://localhost:8080/users'
            }).then(function(response){
                var teachers = response.data._embedded.users;
                for(var i=0; i<teachers.length; i++){
                    vm.allTeachers.push(teachers[i].fullName);
                }
                vm.selectedTeacher = vm.allTeachers[0];
            }, function(response){
                //$window.alert('Can not download the list of users: '+response.status);
            });
            //============== If the passed object is null, then the form should be prepared for creation
            this.format = "yyyy-MM-dd";
            vm.addedTeachersList = [];

            if(vm.passedGroupObject!=null){
                vm.groupTitle = vm.passedGroupObject.title;
                vm.value = vm.passedGroupObject.studentsCount;
                vm.startDate = uibDateParser.parse(vm.passedGroupObject.startDate, this.format);
                vm.endDate = uibDateParser.parse(vm.passedGroupObject.endDate, this.format);
                for(var i=0; i<vm.passedGroupObject.users.length; i++){
                    vm.addedTeachersList.push(vm.passedGroupObject.users[i].fullName);
                }
                //$window.alert(vm.startDate);
            }else{
                vm.groupTitle = '';
                vm.value = 7;
                vm.startDate = new Date();
                vm.endDate = new Date();
            }


            //====================== Students Number ==========================
            vm.MAX_VALUE = 100;
            vm.MIN_VALUE = 1;

            vm.incrementValue = function(){
                if(vm.value<vm.MAX_VALUE){
                    vm.value += 1;


                }
            }
            vm.decrementValue = function(){
                if(vm.value>vm.MIN_VALUE){
                    vm.value -= 1;
                }
            }
            //=======================Date pickers ==============================

            vm.currentDate = new Date();
            vm.startPicker = {
                opened: false,
            }
            vm.endPicker = {
                opened: false
            }
            vm.popupStartPicker = function(){
                vm.startPicker.opened=true;
            }
            vm.popupEndPicker = function(){
                vm.endPicker.opened=true;
            }
            //===================== Teachers List ==============================
            vm.selectedTeacher = null;
            vm.addTeacherToTheList = function(){
                if (vm.addedTeachersList.indexOf(vm.selectedTeacher)>-1){
                    return;
                }
                vm.addedTeachersList.push(vm.selectedTeacher);
            }
            vm.removeTeacherFromTheList = function(index){
                vm.addedTeachersList.splice(index,1);
            }
            //==================== Create/Cancel Buttons ========================
            vm.createGroup = function(){
                if(vm.addedTeachersList.length<1 ||
                   vm.groupTitle.length<1        ||
                   vm.endDate<vm.startDate       ||
                   vm.startDate<vm.currentDate){
                        $window.alert("Form is not complete!");
                        return;
                }

                vm.newGroup = {
                    "title": vm.groupTitle,
                    "studentsCount": vm.studentsCount,
                    "startDate": $filter('date')(vm.startDate, 'yyyy-MM-dd'),
                    "endDate": $filter('date')(vm.endDate, 'yyyy-MM-dd'),
                    "active": true
                }
                $http({
                    url: 'http://localhost:8080/groups',
                    method: 'POST',
                    data: JSON.stringify(vm.newGroup),
                    headers: {'Content-Type':'application/json'}

                }).success(function(data,status,headers,config){
                    $window.alert("User has been successfully created!");
                    $state.go('groupsDashboard.listGroups');
                }).error(function(data,status,headers,config){
                    $window.alert(status);
                })


            }
            vm.cancelCreation = function(){
                //$uibModalInstance.close();
            }

        });

})();
