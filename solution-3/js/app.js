(function(){
    "use strict";
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', foundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var menuSearch = this;
      menuSearch.searchTerm = "";
      menuSearch.found = [];
      menuSearch.search = function() {
        if (menuSearch.searchTerm === "") {
            menuSearch.found = [];
            return;
          }
          var promise = MenuSearchService.getMatchedMenuItems(menuSearch.searchTerm);
    
          promise.then(function(response) {
            menuSearch.found = response;
          }).catch(function (error) { console.log(error); });
        }
    
      menuSearch.removeItem = function(itemIndex) {
        MenuSearchService.removeItem(itemIndex);
      };

      menuSearch.removeItem = function(index) {
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
            controllerAs: 'ctrl',
            bindToController: true
        };
        return items_directive;
    }

})();