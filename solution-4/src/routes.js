  
(function () {
    'use strict';
    
    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
        .state('home', {
            url: '/',
            tempalateUrl: 'src/templates/home.template.html'
        })
        .state('categories', {
            url: '/categories',
            tempalateUrl: 'src/templates/categories.template.html',
            controller: 'CategoriesController as categoriesCtrl',
            resolve: {
                categories: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('items', {
            url: '/items/{category}',
            tempalateUrl: 'src/templates/items.template.html',
            controller: 'ItemsController as itemsCtrl',
            resolve: {
                items: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.category)
                }]
            }
        });
    }
})();