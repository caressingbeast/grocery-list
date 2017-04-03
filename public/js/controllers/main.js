(function () {
  'use strict';

  function MainCtrl (ListService) {
    var vm = this;

    // get all lists
    ListService.getAll()
      .then(function (res) {
        vm.lists = res.data;
      }, function (err) {
        console.log(err);
      });

    vm.createList = function () {
      ListService.create()
        .then(function (res) {
          console.log(res.data);
          vm.lists.push(res.data);
        }, function (err) {
          console.log(err);
        });
    };
  }

  angular
    .module('groceryList')
    .controller('MainCtrl', MainCtrl);
})();
