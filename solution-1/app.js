(function () {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController ($scope) {
        $scope.checkDishes = function  () {
            var num = countDishes($scope.dishes);
            $scope.message = getMessage(num);
        }
    }
    function countDishes(dishes) {
        if (dishes === undefined) {
            return 0
        }
        return dishes.split(',').length;
    }   

    function getMessage(num) {
        
        if (num === 0) {
            return "Please enter data first";
        } else if (num > 3) {
            return "Too much!";
        } else {
            return "Enjoy!";
        }
    }

})();