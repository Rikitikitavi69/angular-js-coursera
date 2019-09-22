(function(){
    "use strict";
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', foundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var narrowItDown = this;
      narrowItDown.searchTerm = "";
      narrowItDown.found = [];
      narrowItDown.search = function() {
        if (narrowItDown.searchTerm === "") {
            narrowItDown.found = [];
            return;
          }
          var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);
    
          promise.then(function(response) {
            narrowItDown.found = response;
          }).catch(function (error) { console.log(error); });
        }
    
      narrowItDown.removeItem = function(itemIndex) {
        MenuSearchService.removeItem(itemIndex);
      };

      narrowItDown.removeItem = function(index) {
        controller.items.splice(index, 1);
      };
    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var foundItems = [];
        service.getMatchedMenuItems = function (searchTerm) {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
            });

            return response.then(function (result) {
                foundItems = [];
                var menuItems = result.data.menu_items;
                for (var i = 0; i < menuItems.length; i++) {
                    var description = menuItems[i].description;
                    if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
                        foundItems.push(menuItems[i]);
                    }
                }
                return foundItems;
            });
        };
        service.removeItem = function (itemIndex) {
            foundItems.splice(itemIndex, 1);
        };
    }
    

    function foundItemsDirective() {
        var items_directive = {
            templateUrl: 'itemsloader.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'list',
            bindToController: true
        };
        return items_directive;
    }

})();