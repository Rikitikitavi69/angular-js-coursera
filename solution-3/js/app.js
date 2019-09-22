(function(){
    "use strict";
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', foundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    
    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'itemsloader.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'items',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController() {
        var items = this;
    
        items.isEmpty = function() {
          return items.found != undefined && items.found.length === 0;
        }
      }


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = "";
        ctrl.search = function() {
            if (ctrl.searchTerm === "") {
                ctrl.items = [];
                return;
            }
            var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
            promise.then(function(response) {
                ctrl.items = response;
            }).catch(function(error) {
                console.log("Something went wrong", error);
            });
        };  
        ctrl.removeItem = function(index) {
            ctrl.items.splice(index, 1);
        };
    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
              method: 'GET',
              url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
            }).then(function (result) {
                var items = result.data.menu_items;
                var foundItems = [];
                for (var i = 0; i < items.length; i++) {
                    if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
                        foundItems.push(items[i]);
                    }
                }
            return foundItems;
          });
        };
      }
    
})();