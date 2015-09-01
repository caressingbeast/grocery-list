(function () {
  'use strict';

  function ListCtrl (ListService, $routeParams) {
    var vm = this;

    vm.formData = {};

    // get list
    ListService.getList($routeParams.list_id)
      .then(function (res) {
        vm.list = res.data;
      }, function (err) {
        console.log(err);
      });

    vm.addItem = function () {
      ListService.addItem(vm.list._id, vm.formData)
        .then(function (res) {
          vm.list.items = res.data.items;
          vm.formData = {};
        }, function (err) {
          console.log(err);
        });
    };

    vm.deleteItem = function (itemId) {
      ListService.deleteItem(vm.list._id, itemId)
        .then(function (res) {
          vm.list.items = res.data.items;
        }, function (err) {
          console.log(err);
        });
    };

    vm.toggleItem = function (itemId, $index, done) {
      ListService.toggle(itemId, { done: done })
        .then(function () {
          vm.list.items[$index].done = done;
        }, function (err) {
          console.log(err);
        });
    };
  }

  angular
    .module('groceryList')
    .controller('ListCtrl', ListCtrl);
})();
