(function() {
    'use strict';
    
    angular.module('data')
      .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http']
    function MenuDataService($http) {
        var service = this;

        this.getAllCategories = function () {
            return $http({
                method: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/categories.json'
            }).then(function(response) {
                return response.data;
            });
        }

        this.getItemsForCategory = function(categoryShortName) {
            return $http({
                method: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
                params: {category: categoryShortName}
            }).then(function(response) {
                return response.data;
            });
        }
    }
})();