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
    
      menuSearch.search = function(searchTerm) {
        if (searchTerm) {
          var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
    
          promise.then(function (response) {
            menuSearch.found = response;
          })
          .catch(function (error) {
            menuSearch.found = [];
          });
        } else {
          menuSearch.found = [];
        }
      };
    
      menuSearch.removeItem = function(index) {
        menuSearch.found.splice(index, 1);
      };
    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
    var service = this;
    service.getMatchedMenuItems = function (searchTerm) {
        var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
        });

        return response.then(function (result) {
            // process result and only keep items that match
            var foundItems = [];
            var menuItems = result.data.menu_items;
            for (var i = 0; i < menuItems.length; i++) {
            var description = menuItems[i].description.toLowerCase();
            if (description.indexOf(searchTerm.toLowerCase()) !== -1) {
                foundItems.push(menuItems[i]);
            }
            }

            // return processed items
            return foundItems;
        });
    };
    }
    

    function foundItemsDirective() {
        return {
            restrict: 'E',
            templateUrl: 'loader/itemsloaderindicator.template.html',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'narrowItDown',
            bindToController: true
        };
    }

})();