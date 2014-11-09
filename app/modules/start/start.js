(function(){
  'use strict';

  angular.module('Portfolio.Start', [])

    .config(function ($routeProvider) {

      $routeProvider.when('/start', {
        templateUrl: 'modules/start/template/start.html',
        controller: 'StartController',
        cssClasses: 'start'
      });

    });
}());