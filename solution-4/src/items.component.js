(function () {
    'use strict';
    
    angular.module('MenuApp')
    .component('items', {
        templateUrl: 'src/templates/items.component.template.html',
        bindings: {
            items: '<'
        }
    });
    
})();