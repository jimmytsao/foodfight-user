'use strict';

(function(){

  angular
    .module('app.common.service.checkCordova', [])
    .factory('checkCordova', checkCordovaService);

    checkCordovaService.$inject = [];

    function checkCordovaService(){

      var service = {
        isCordovaDevice: false
      };

      document.addEventListener('deviceready', devicereadyCallback, false);

      return service;
     
      function devicereadyCallback (){
        console.log('device ready is true');
        service.isCordovaDevice = true;
      }
    }
})();