'use strict';

angular.module('mwNav', [])

  .directive('mwSubNav', function () {
    return {
      restrict: 'A',
      scope: {
        justified: '='
      },
      replace:true,
      transclude: true,
      template: '<div class="mw-nav"><ul class="nav nav-pills" ng-class="{\'nav-justified\':justified}" ng-transclude></ul></div>'
    };
  })

  .directive('mwSubNavPill', function ($location) {
    return {
      restrict: 'A',
      scope: {
        url: '@mwSubNavPill'
      },
      transclude: true,
      replace: true,
      template: '<li><a ng-href="{{url}}" ng-transclude></a></li>',
      link: function (scope, elm) {
        if($location.$$path === scope.url.slice(1)){
          elm.addClass('active');
        }
      }

    };
  });