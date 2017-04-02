(function () {
  'use strict';

  function MealService ($http) {
    var service = this;

    service.getAll = function () {
      return $http.get('/api/meals');
    };

    service.saveMeal = function (mealData) {
      return $http.post('/api/meals', mealData);
    };

    service.delete = function (mealId) {
      return $http.delete('/api/meals/' + mealId);
    };
  }

  angular
    .module('groceryList')
    .service('MealService', MealService);
})();
