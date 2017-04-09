(function () {
  'use strict';

  function MealCtrl (ListService, MealService, $q) {
    var vm = this;

    vm.addMealVisible = false;
    vm.createPlanVisible = false;
    vm.mealData = {};
    vm.meals = [];

    // get all meals
    MealService.getAll()
      .then(function (res) {
        vm.meals = res.data;
      }, function (err) {
        console.log(err);
      });

    // get all lists
    ListService.getAll()
      .then(function (res) {
        vm.lists = res.data;
      }, function (err) {
        console.log(err);
      });

    function findMeal (mealId) {
      return vm.meals.filter(function (m) {
        return m._id === mealId;
      })[0];
    }

    function formatData () {
      var ingredientData = vm.mealData.ingredients;

      var data = {
        name: vm.mealData.name,
        ingredients: ingredientData ? vm.mealData.ingredients.split('\n') : []
      };

      if (vm.mealData.id) {
        data.id = vm.mealData.id;
      }

      return data;
    }

    vm.createPlan = function () {
      var mealList = vm.meals.slice(0);
      var meals = [];

      if (!mealList.length) {
        return;
      }

      for (var i = 0; i < 3; i++) {
        var index = Math.floor(Math.random() * mealList.length);
        var meal = mealList[index];
        meal.selected = true;
        meals.push(meal);
        mealList.splice(index, 1);
      }

      vm.planMeals = meals;
      vm.createPlanVisible = true;
    };

    vm.addMealToPlan = function (mealId) {
      var meal = vm.meals.filter(function (m) {
        return m._id === mealId;
      })[0];

      if (!mealId || !meal) {
        return false;
      }

      meal.selected = true;

      if (Array.isArray(vm.planMeals)) {
        var isDuplicate = vm.planMeals.filter(function (m) {
          return m._id === mealId;
        }).length;

        if (!isDuplicate) {
          vm.planMeals.push(meal);
        }
      } else {
        vm.planMeals = [meal];
      }

      vm.createPlanVisible = true;
    };

    vm.importMeals = function () {
      var selected = vm.planMeals.filter(function (m) {
        return m.selected;
      });

      if (!selected.length || !vm.importList) {
        return;
      }

      var ingredients = [];
      var promises = [];

      selected.forEach(function (m) {
        m.ingredients.forEach(function (i) {
          if (ingredients.indexOf(i) === -1) {
            ingredients.push(i);
            promises.push(ListService.createItem(vm.importList, { text: i }));
          }
        });
      });

      $q.all(promises)
        .then(function () {
          vm.cancelPlan();
        }, function (err) {
          console.log(err);
        });
    };

    vm.cancelPlan = function () {
      vm.createPlanVisible = false;
      vm.planMeals = [];
    };

    vm.addMeal = function () {
      vm.addMealVisible = true;
    };

    vm.cancelMeal = function () {
      vm.addMealVisible = false;

      Object.keys(vm.mealData).forEach(function (k) {
        vm.mealData[k] = '';
      });
    };

    vm.createMeal = function () {
      var mealData = formatData();

      if (!mealData.name || !mealData.ingredients.length) {
        return;
      }

      MealService.createMeal(mealData)
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

    vm.editMeal = function (mealId) {
      var meal = findMeal(mealId);

      if (!meal) {
        return;
      }

      vm.mealData.id = mealId;
      vm.mealData.name = meal.name;
      vm.mealData.ingredients = meal.ingredients.join('\n');
      vm.addMealVisible = true;
    };

    vm.saveMeal = function () {
      var mealData = formatData();

      if (!mealData.name || !mealData.ingredients.length) {
        return;
      }

      MealService.saveMeal(mealData)
        .then(function (res) {
          var meal = vm.meals.filter(function (m) {
            if (m._id === mealData.id) {
              return m;
            }
          })[0];

          meal.name = res.data.name;
          meal.ingredients = res.data.ingredients;

          vm.cancelMeal();
        }, function (err) {
          console.log(err);
        });
    };
  }

  angular
    .module('groceryList')
    .controller('MealCtrl', MealCtrl);
})();
