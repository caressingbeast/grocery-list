(function () {
  'use strict';

  function ListCtrl ($routeParams, $location, ListService) {
    var vm = this;

    vm.formData = {};

    // get list
    ListService.getOne($routeParams.list_id)
      .then(function (res) {
        if (!res.data) {
          $location.url('/');
        }

        vm.list = res.data;
      }, function (err) {
        console.log(err);
      });

    vm.deleteList = function () {
      ListService.delete(vm.list._id)
        .then(function () {
          $location.url('/');
        }, function (err) {
          console.log(err);
        });
    };

    vm.createItem = function () {
      ListService.createItem(vm.list._id, vm.formData)
        .then(function (res) {
          vm.list.items = res.data.items;
          vm.formData = {};
        }, function (err) {
          console.log(err);
        });
    };

    vm.toggleItem = function (itemId, done) {
      ListService.toggleItem(vm.list._id, itemId, { done: done })
        .then(function (res) {
          vm.list.items = res.data.items;
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
  }

  angular
    .module('groceryList')
    .controller('ListCtrl', ListCtrl);
})();
