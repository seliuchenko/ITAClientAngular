(function() {
  'use strict';

  angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'app.admin'
  ])
    .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/calendar');
    $stateProvider.state('calendar', {
      url: '/calendar',
      templateUrl: 'admin/manage-calendar/dashboard-calendar.html'
    }).state('groupsDashboard', {
      url: '/groupsDashboard',
      //templateUrl: 'admin/manage-groups/dashboard-groups-list.html',
      templateUrl: 'admin/manage-groups/dashboard-groups.html',
      //controller: 'groupsListController',
      //controllerAs: 'vm'


    }).state('teachersList', {
      url: '/teachersList',
      templateUrl: 'admin/manage-teachers/dashboard-teachers-list.html'
    }).state('roomsList', {
      url: '/roomsList',
      templateUrl: 'admin/manager-rooms/dashboard-rooms-list.html'
    }).state('groupsDashboard.createGroup', {
      url: '/createGroup',
      //templateUrl: 'admin/manage-groups/dashboard-groups-list.html',
      templateUrl: 'admin/manage-groups/create-edit-group-dialog.html',
      controller: 'CreateGroupFormInstanceController',
      controllerAs: 'vm',
      params: {"groupObject":null}
    }).state('groupsDashboard.listGroups', {
      url: '/listGroups',
      //templateUrl: 'admin/manage-groups/dashboard-groups-list.html',
      templateUrl: 'admin/manage-groups/dashboard-groups-list.html',
      controller: 'groupsListController',
      controllerAs: 'vm'
    })
  });

})();
