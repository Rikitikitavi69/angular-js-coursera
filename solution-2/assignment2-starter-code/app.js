(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService ) {
        this.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
        this.bought = function(index) {
            ShoppingListCheckOffService.buyItem(index);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        this.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var toBuyItems = [
            {name: "pasta", quantity: 1},
            {name: "milk", quantity: 2},
            {name: "juice", quantity: 3},
            {name: "soda", quantity: 4},
            {name: "salsa", quantity: 5}
        ];
        var boughtItems = [];

        this.buyItem = function(index) {
            boughtItems.push(toBuyItems[index]);
            toBuyItems.splice(index, 1);
        }

        this.getToBuyItems = function() {
            return toBuyItems;
        }

        this.getBoughtItems = function() {
            return boughtItems;
        }
    }
})();