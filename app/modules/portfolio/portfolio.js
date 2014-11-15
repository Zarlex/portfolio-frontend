(function () {
  'use strict';

  angular.module('Portfolio', [
    'ngRoute',
    'ngAnimate',
    'Portfolio.Start'
  ])

    .config(['$provide', '$httpProvider','$routeProvider', function ($provide, $httpProvider,$routeProvider) {

      $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
      $httpProvider.defaults.headers.common.Accept = 'application/json';
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

      $provide.factory('requestInterceptor', ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
        return {
          request: function (request) {
            /* Do Stuff before request */
            return request;
          },
          responseError: function (response) {
            /* Do Stuff on error */
            return $q.reject(response);
          },
          response: function (response) {
            /* Do stuff on success */
            return response || $q.when(response);
          }
        };
      }]);

      $httpProvider.interceptors.push('requestInterceptor');

      $routeProvider.otherwise({redirectTo: '/start'});

      Backbone.$ = angular.element;

    }])

    .run([
      '$rootScope',
      '$location',
      '$http',
      '$timeout',
      function ($rootScope, $location, $http, $timeout, config) {
        $rootScope.goTo = function (path, params) {
          if (params) {
            $location.search(params).path(path);
          } else {
            $location.path(path);
          }
        };

        $rootScope.$on('$routeChangeStart', function (event, current) {
          /* Do Stuff on route change start */
        });

      }
    ]);

}());