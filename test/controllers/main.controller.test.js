describe('MainCtrl', function () {

  beforeEach(module('groceryList'));

  // placeholders
  var $controller;
  var $scope;

  // mocks
  var ListService;

  // sample data
  var returnData = {
    data: [
      {
        _id: window.Helpers.generateId(),
        items: [],
        created_at: new Date().toISOString()
      }
    ]
  }

  function generateDfd ($q, customReturn) {
    return function () {
      var dfd = $q.defer();
      dfd.resolve(customReturn || returnData);
      return dfd.promise;
    }
  }

  beforeEach(inject(function(_$controller_, $q, $rootScope) {
    $scope = $rootScope.$new();

    ListService = {
      getAll: generateDfd($q),
      create: generateDfd($q, {
        data: {
          _id: window.Helpers.generateId(),
          items: [],
          created_at: new Date().toISOString()
        }
      })
    };

    spyOn(ListService, 'getAll').and.callThrough();

    $controller = _$controller_('MainCtrl', {
      $scope: $scope,
      ListService: ListService
    });

    $scope.$apply();
  }));

  it('should exist', function () {
    expect($controller).toBeDefined();
  });

  it('should call ListService.getAll on init', function () {
    expect(ListService.getAll).toHaveBeenCalled();
    expect($controller.lists).toEqual(returnData.data);
  });

  describe('.createList()', function () {
    it('should call ListService.create and increment lists length', function () {
      var listLength = $controller.lists.length;

      spyOn(ListService, 'create').and.callThrough();

      $controller.createList();
      $scope.$apply();

      expect(ListService.create).toHaveBeenCalled();
      expect($controller.lists.length).toEqual(listLength + 1);
    });
  });
});
