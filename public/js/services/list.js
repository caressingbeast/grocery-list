(function () {
  'use strict';

  function ListService ($http) {
    var service = this;

    service.getAll = function () {
      return $http.get('/api/lists');
    };

    service.create = function () {
      return $http.post('/api/lists');
    };

    service.getOne = function (listId) {
      return $http.get('/api/lists/' + listId);
    };

    service.delete = function (listId) {
      return $http.delete('/api/lists/' + listId);
    };

    service.createItem = function (listId, formData) {
      return $http.post('/api/lists/' + listId + '/items', formData);
    };

    service.deleteItem = function (listId, itemId) {
      return $http.delete('/api/lists/' + listId + '/items/' + itemId);
    };

    service.toggleItem = function (listId, itemId, done) {
      return $http.put('/api/lists/' + listId + '/items/' + itemId, done);
    };
  }

  angular
    .module('groceryList')
    .service('ListService', ListService);
})();
