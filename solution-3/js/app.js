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

        narrowItDown.search = function(searchTerm) {
            if (searchTerm) {
              var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
        
              promise.then(function (response) {
                narrowItDown.found = response;
              })
              .catch(function (error) {
                narrowItDown.found = [];
              });
            } else {
              narrowItDown.found = [];
            }
          };
        
          narrowItDown.removeItem = function(index) {
            narrowItDown.found.splice(index, 1);
          };
    }

    MenuSearchService.$inject = ['$http', '$q', 'ApiBasePath'];
    function MenuSearchService($http, $q, ApiBasePath) {
        var service = this;
        service.getMatchedMenuItems = function (searchTerm) {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
          });

        return response.then(function (result) {
            var foundItems = [];
            var menuItems = result.data.menu_items;
            for (var i = 0; i < menuItems.length; i++) {
                var description = menuItems[i].description.toLowerCase();
                if (description.indexOf(searchTerm.toLowerCase()) !== -1) {
                    foundItems.push(menuItems[i]);
                }
            }
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