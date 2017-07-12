describe('MealCtrl', function () {

  beforeEach(module('groceryList'));

  // placeholders
  var $controller;
  var $scope;

  // mocks
  var ListService;
  var MealService;

  // sample data
  var listData = { data: [] };
  var mealData = {
    data: [
      {
        _id: window.Helpers.generateId(),
        ingredients: [],
        name: window.Helpers.generateId()
      }
    ]
};

  function generateDfd ($q, customReturn) {
    return function () {
      var dfd = $q.defer();
      dfd.resolve(customReturn || {});
      return dfd.promise;
    }
  }

  beforeEach(inject(function(_$controller_, $q, $rootScope) {
    $scope = $rootScope.$new();

    ListService = {
      getAll: generateDfd($q, listData)
    };

    MealService = {
      getAll: generateDfd($q, mealData),
      createMeal: generateDfd($q, mealData)
    };

    spyOn(ListService, 'getAll').and.callThrough();
    spyOn(MealService, 'getAll').and.callThrough();

    $controller = _$controller_('MealCtrl', {
      $scope: $scope,
      ListService: ListService,
      MealService: MealService
    });

    $scope.$apply();
  }));

  it('should exist', function () {
    expect($controller).toBeDefined();
    expect($controller.addMealVisible).toEqual(false);
    expect($controller.createPlanVisible).toEqual(false);
  });

  it('should call MealService.getAll and ListService.getAll on init', function () {
    expect(MealService.getAll).toHaveBeenCalled();
    expect(ListService.getAll).toHaveBeenCalled();
    expect($controller.meals).toEqual(mealData.data);
  });

  describe('.addMeal()', function () {
    it('should set addMealVisible to true', function () {
      $controller.addMeal();
      expect($controller.addMealVisible).toEqual(true);
    });
  });

  describe('.cancelMeal()', function () {
    it('should set addMealVisible to false and clear form fields', function () {
      $controller.mealData = {
        name: 'Test meal',
        ingredients: 'Test ingredient'
      };

      $controller.cancelMeal();
      expect($controller.addMealVisible).toEqual(false);
      Object.keys($controller.mealData).forEach(function (k) {
        expect($controller.mealData[k]).toEqual('');
      });
    });
  });

  describe('.createMeal()', function () {
    it('should do nothing if required fields empty', function () {
      spyOn(MealService, 'createMeal');

      $controller.createMeal();
      expect(MealService.createMeal).not.toHaveBeenCalled();
    });

    it('should call MealService.createMeal if required fields not empty', function () {
      spyOn(MealService, 'createMeal').and.callThrough();

      $controller.mealData = {
        name: 'Test meal',
        ingredients: 'Test ingredient'
      };

      $controller.createMeal();
      expect(MealService.createMeal).toHaveBeenCalled();
      expect($controller.meals.length).toEqual(1);
    });
  });

  describe('.editMeal()', function () {
    it('should do nothing if not a valid meal', function () {
      $controller.editMeal();
      expect($controller.addMealVisible).toEqual(false);
    });

    it('should show meal form with data if valid meal', function () {
      var meal = {
        id: window.Helpers.generateId(),
        ingredients: '',
        name: window.Helpers.generateId()
      };

      $controller.meals.push(meal);
      $controller.editMeal(meal.id);

      expect($controller.addMealVisible).toEqual(true);
      Object.keys($controller.mealData).forEach(function (k) {
        expect($controller.mealData[k]).toEqual(meal[k]);
      });
    });
  });
});
