(function(){
    "use strict";
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', foundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    
    function foundItemsDirective() {
        var items_directive = {
            templateUrl: 'itemsloader.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'ctrl',
            bindToController: true
        };
        return items_directive;
    }



    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.found = [];

        ctrl.search = function() {
            ctrl.found = [];

            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
            .then(function(result) {
                ctrl.found = result;
            }
            ).catch(function(error) { 
                console.log(error); 
            });
        };

        ctrl.removeItem = function(index) {
            ctrl.found.splice(index, 1);
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
            response.then(function (result) {
                found = [];        
                var menuItems = result.data.menu_items;
                for (var i = 0; i < menuItems.length; i++) {
                    var description = menuItems[i].description.toLowerCase();
                    if (description.indexOf(searchTerm.toLowerCase()) != -1) {
                        found.push(menuItems[i]);
                    }
                }
                return found;    
            });
        };
    }
    
})();