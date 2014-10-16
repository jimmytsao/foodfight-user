'use strict';

(function(){
  
  angular
    .module('app', [
      'ionic',
      'restangular',
      'app.login'])
    .config(['$urlRouterProvider', configureDefaultRoute])
    .run(['$ionicPlatform', configureIonicComponents]);

  //app modules
  require('./modules/templateCache.js');
  require('./modules/login/login.js');

  //library modules
  window._ = require('lodash');
  require('restangular');

  //function declarations
  function configureDefaultRoute($urlRouterProvider){
    $urlRouterProvider.otherwise('/login');
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

