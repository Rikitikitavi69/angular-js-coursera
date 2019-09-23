  
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
        .state('categoryList', {
            url: '/category-list',
            tempalateUrl: 'src/templates/category-list.template.html',
            controller: 'CategoriesController as categoriesCtrl',
            resolve: {
                items: ['MenuDataService', function(MenuDataService) {
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