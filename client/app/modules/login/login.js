'use strict';

(function(){
  angular
    .module('app.login', [
      'ui.router'])
    .config(['$stateProvider', configureLoginStates]);


  //function declarations
  function configureLoginStates($stateProvider){
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login/login.template.html'
      });
  }
})();

