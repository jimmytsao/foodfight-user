'use strict';

(function(){

  require('./setup.js');
  
  angular
    .module('app', [
      'ionic',
      'app.login'])
    .config(configureDefaultRoute)
    .run(configureIonicComponents);

  //app modules
  require('./modules/templateCache.js');
  require('./modules/login/login.js');

  //function declarations
  configureDefaultRoute.$inject = ['$urlRouterProvider'];
  
  function configureDefaultRoute($urlRouterProvider){
    $urlRouterProvider.otherwise('/login');
  }

  configureIonicComponents.$inject = ['$ionicPlatform'];
  function configureIonicComponents($ionicPlatform){
   // $ionicPlatform.ready(function(){
   //    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
   //    // for form inputs)
   //    if(window.cordova && window.cordova.plugins.Keyboard) {
   //      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
   //    }
   //    if(window.StatusBar) {
   //      StatusBar.styleDefault();
   //    }
   //  });
  }
})();

