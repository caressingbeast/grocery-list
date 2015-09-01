(function () {
  'use strict';

  function config ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../views/lists.html',
        controller: 'ListsCtrl',
        controllerAs: 'lists'
      })
      .when('/list/:list_id', {
        templateUrl: '../views/list.html',
        controller: 'ListCtrl',
        controllerAs: 'list'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  angular
    .module('groceryList')
    .config(config);
})();
