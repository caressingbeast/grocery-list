describe('ListCtrl', function () {

  beforeEach(module('groceryList'));

  // placeholders
  var $controller;
  var $scope;

  // mocks
  var ListService;

  // sample data
  var formData = {};
  var returnData = {
    data: {
      _id: window.Helpers.generateId(),
      items: [],
      created_at: new Date().toISOString()
    }
  }

  function generateDfd ($q) {
    return function () {
      var dfd = $q.defer();
      dfd.resolve(returnData);
      return dfd.promise;
    }
  }

  beforeEach(inject(function(_$controller_, $q, $rootScope) {
    $scope = $rootScope.$new();

    ListService = {
      getOne: generateDfd($q),
      delete: generateDfd($q),
      createItem: generateDfd($q),
      toggleItem: generateDfd($q),
      deleteItem: generateDfd($q)
    };

    spyOn(ListService, 'getOne').and.callThrough();

    $controller = _$controller_('ListCtrl', {
      $scope: $scope,
      ListService: ListService
    });

    $controller.formData = formData;
    $scope.$apply();
  }));

  it('should exist', function () {
    expect($controller).toBeDefined();
  });

  it('should call ListService.getOne on init', function () {
    expect(ListService.getOne).toHaveBeenCalled();
    expect($controller.list).toEqual(returnData.data);
  });

  describe('.deleteList()', function () {
    it('should call ListService.delete', function () {
      spyOn(ListService, 'delete').and.callThrough();
      $controller.deleteList();
      expect(ListService.delete).toHaveBeenCalledWith(returnData.data._id);
    });
  });

  describe('.createList()', function () {
    it('should call ListService.createItem', function () {
      spyOn(ListService, 'createItem').and.callThrough();

      $controller.createItem();
      expect(ListService.createItem).toHaveBeenCalledWith(returnData.data._id, formData);
      expect($controller.formData).toEqual({});
    });
  });

  describe('.toggleItem()', function () {
    it('should call ListService.toggleItem', function () {
      var itemId = window.Helpers.generateId();
      var itemDone = false;

      spyOn(ListService, 'toggleItem').and.callThrough();

      $controller.toggleItem(itemId, itemDone);
      expect(ListService.toggleItem).toHaveBeenCalledWith(returnData.data._id, itemId, { done: itemDone });
    });
  });

  describe('.deleteItem()', function () {
    it('should call ListService.deleteItem', function () {
      var itemId = window.Helpers.generateId();

      spyOn(ListService, 'deleteItem').and.callThrough();

      $controller.deleteItem(itemId);
      expect(ListService.deleteItem).toHaveBeenCalledWith(returnData.data._id, itemId);
    });
  });
});
