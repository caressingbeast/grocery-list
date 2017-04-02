(function () {
  'use strict';

  function MealCtrl (ListService, MealService) {
    var vm = this;

    vm.addMealVisible = false;
    vm.meals = [];

    // get all lists
    MealService.getAll()
      .then(function (res) {
        vm.meals = res.data;
      }, function (err) {
        console.log(err);
      });

    vm.createPlan = function () {
    };

    vm.addMeal = function () {
      vm.addMealVisible = true;
    };

    vm.cancelMeal = function () {
      vm.addMealVisible = false;
      vm.mealData.name = '';
      vm.mealData.ingredients = '';
    };

    vm.saveMeal = function () {
      var mealData = {
        name: vm.mealData.name,
        ingredients: vm.mealData.ingredients.split('\n')
      };

      MealService.saveMeal(mealData)
        .then(function (res) {
          vm.meals.push(res.data);
          vm.cancelMeal();
        }, function (err) {
          console.log(err);
        });
    };

    vm.deleteMeal = function (mealId) {
      MealService.delete(mealId)
        .then(function (res) {
          vm.meals = res.data;
        }, function (err) {
          console.log(err);
        });
    };
  }

  angular
    .module('groceryList')
    .controller('MealCtrl', MealCtrl);
})();
