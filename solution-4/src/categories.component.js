(function() {
    'use strict';
    
    angular.module('MenuApp')
    .component('categories', {
        templateUrl: 'src/categories.component.template.html',
        bindings: {
            items: '<'
        }
    });
    
})();
