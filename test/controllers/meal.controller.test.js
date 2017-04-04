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
      getAll: generateDfd($q, mealData)
    }

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
        name: 'Test mea',
        ingredients: 'Test ingredient'
      };

      $controller.cancelMeal();
      expect($controller.addMealVisible).toEqual(false);
      Object.keys($controller.mealData).forEach(function (k) {
        expect($controller.mealData[k]).toEqual('');
      });
    });
  });
});
