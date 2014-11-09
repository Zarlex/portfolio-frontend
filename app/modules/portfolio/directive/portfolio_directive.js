(function(){
  'use strict';

  angular.module('Portfolio')

    .directive('appendClassAccordingToRoute', function () {
      return {
        link: function (scope, el) {
          scope.$on('$routeChangeSuccess', function (event, current) {
            el.addClass(current.cssClasses);
          });
        }
      };
    });

}());
