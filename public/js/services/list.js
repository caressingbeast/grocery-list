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

    service.getList = function (listId) {
      return $http.get('/api/list/' + listId);
    };

    service.addItem = function (listId, formData) {
      return $http.post('/api/list/' + listId, formData);
    };

    service.deleteItem = function (listId, itemId) {
      return $http.delete('/api/list/' + listId + '/' + itemId);
    };
  }

  angular
    .module('groceryList')
    .service('ListService', ListService);
})();
