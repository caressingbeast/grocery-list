(function () {
  'use strict';

  function ListService ($http) {
    var service = this;

    service.getLists = function () {
      return $http.get('/api/lists');
    };

    service.create = function () {
      return $http.post('/api/list');
    };

    service.delete = function (listId) {
      return $http.delete('/api/list/' + listId);
    };

    service.getList = function (listId) {
      return $http.get('/api/list/' + listId);
    };

    service.addItem = function (listId, formData) {
      return $http.post('/api/list/' + listId, formData);
    };

    service.deleteItem = function (listId, itemId) {
      return $http.delete('/api/list/' + listId + '/' + itemId);
    };

    service.toggle = function (itemId, done) {
      return $http.put('/api/item/' + itemId, done);
    };
  }

  angular
    .module('groceryList')
    .service('ListService', ListService);
})();
