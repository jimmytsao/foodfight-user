'use strict';

(function(){

  angular
    .module('app.common', [
      'ionic',
      'app.common.service.checkCordova']);

  require('./services/isCordovaDevice.js');
})();