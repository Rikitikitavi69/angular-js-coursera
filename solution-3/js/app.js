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
          var promise = MenuSearchService.getMatchedMenuItems(menuSearch.searchTerm);
    
          promise.then(function (response) {
            menuSearch.found = response;
          }).catch(function (error) { console.log(error); });
        }
    
      menuSearch.removeItem = function(itemIndex) {
        MenuSearchService.removeItem(itemIndex);
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
                var foundItems = [];
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
        return {
            restrict: 'E',
            templateUrl: 'itemsloader.html',
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