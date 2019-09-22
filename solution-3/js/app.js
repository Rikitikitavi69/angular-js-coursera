(function(){
    "use strict";
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    
    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'itemsloader.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;
      }


      NarrowItDownController.$inject = ['MenuSearchService']
      function NarrowItDownController(MenuSearchService) {
          var narrow = this;
          var check = false;
          narrow.searchTerm = "";
          narrow.found = []
          narrow.updatefound = function () {
              check = true;
  
              var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
              promise.then(function (result) {
                  narrow.found = result;
              }).catch(function (error) { console.log(error); })
  
          }
          narrow.removeItem = function (itemIndex) {
              MenuSearchService.removeItem(itemIndex);
  
          }
          narrow.noItemsFound = function () {
              return (narrow.found.length == 0 || narrow.searchTerm === "") && check;
          }
      }
  


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var foundItems = [];
        var check = false;
        service.getMatchedMenuItems = function (searchTerm) {
            if (searchTerm === "")
                return Promise.resolve([]);
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
            });

            return response.then(function (result) {
                foundItems = [];
                for (var i = 0; i < result.data.menu_items.length; i++) {

                    var description = result.data.menu_items[i].description;
                    if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
                        foundItems.push(result.data.menu_items[i]);
                    }
                }

                return foundItems;
            });
        };
        service.removeItem = function (itemIndex) {
            foundItems.splice(itemIndex, 1);
        };
    }
    
})();