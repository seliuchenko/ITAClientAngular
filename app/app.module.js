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
      //templateUrl: 'admin/manage-calendar/dashboard-calendar.html'
      templateUrl: 'dashboard-calendar.html'
    }).state('groupsList', {
      url: '/groupsList',
      //templateUrl: 'admin/manage-groups/dashboard-groups-list.html',
      templateUrl: 'admin/dashboard-groups-list.html',
      controller: 'groupsListController',
      controllerAs: 'vm'


    }).state('teachersList', {
      url: '/teachersList',
      templateUrl: 'admin/dashboard-teachers-list.html'
    }).state('roomsList', {
      url: '/roomsList',
      templateUrl: 'admin/dashboard-rooms-list.html'
    })
  });

})();
