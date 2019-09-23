(function () {
    "use strict";
    
    angular.module('public')
    .service('MyInfoService', MyInfoService);
    
    
    function MyInfoService() {
      var service = this;
      service.info = {}
    
      service.setInfo = function(data) {
          console.log("setting data:")
        console.log(data);
        service.info = data;
      };
    
      service.getInfo = function() {
          console.log("getting data:")
        console.log(service.info);
        return service.info;
      };
    }
    
})();