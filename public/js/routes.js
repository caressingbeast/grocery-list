(function () {
  'use strict';

  function config ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/lists/:list_id', {
        templateUrl: '../views/list.html',
        controller: 'ListCtrl',
        controllerAs: 'list'
      })
      .when('/meals', {
        templateUrl: '../views/meal.html',
        controller: 'MealCtrl',
        controllerAs: 'meal'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  angular
    .module('groceryList')
    .config(config);
})();
