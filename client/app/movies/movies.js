'use strict';

angular.module('merafilmApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movies', {
        template: '<movies></movies>'
      });
  });
