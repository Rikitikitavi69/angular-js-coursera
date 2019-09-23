(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['MenuService', 'MyInfoService', 'menuItems'];    
    function SignUpController(MenuService, MyInfoService, menuItems) {
      var $ctrl = this;
      var shortNames = [];
      for (var i = 0; i < menuItems.menu_items.length; i++) {
        shortNames.push(menuItems.menu_items[i].short_name.toLowerCase() + "");
      }
    
      $ctrl.submit = function() {
        MenuService.getMenuItemByShortName($ctrl.info.favorite).then(function(result) {
          $ctrl.invalidDish = false;
          $ctrl.info.favouiteMenuItem = result;
          MyInfoService.setInfo($ctrl.info);
          $ctrl.saved = true;
        }, function(error) {
          $ctrl.invalidDish = true;
          $ctrl.saved = false;
        });
      };
    }
    
    })();
    