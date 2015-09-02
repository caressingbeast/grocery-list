(function () {
  'use strict';

  function ListsCtrl (ListService) {
    var vm = this;

    // get lists
    ListService.getLists()
      .then(function (res) {
        vm.lists = res.data;
      }, function (err) {
        console.log(err);
      });

    vm.createList = function () {
      ListService.create()
        .then(function (res) {
          vm.lists.push(res.data);
        }, function (err) {
          console.log(err);
        });
    };

    vm.deleteList = function (listId) {
      ListService.delete(listId)
        .then(function (res) {
          vm.lists = res.data;
        }, function (err) {
          console.log(err);
        });
    };
  }

  angular
    .module('groceryList')
    .controller('ListsCtrl', ListsCtrl);
})();
