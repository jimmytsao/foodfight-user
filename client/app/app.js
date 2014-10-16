'use strict';

(function(){
  
  angular
    .module('app', [
      'ionic',
      'restangular'])
    .config(['$urlRouterProvider', configureDefaultRoute])
    .run(['$ionicPlatform', configureIonicComponents]);

  //library modules
  window._ = require('lodash');
  require('restangular');

  function configureDefaultRoute($urlRouterProvider){
    $urlRouterProvider.otherwise('/');
  }

  function configureIonicComponents($ionicPlatform){
   $ionicPlatform.ready(function(){
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }
})();

