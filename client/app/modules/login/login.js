'use strict';

(function(){
  angular
    .module('app.login', [
      'ui.router',
      'restangular',
      'app.login.controller',
      'app.login.values'])
    .config(configureLoginStates);

  //app modules
  require('./login.controller.js');
  require('./login.values.js');

  //function declarations
  configureLoginStates.$inject = ['$stateProvider'];

  function configureLoginStates($stateProvider){
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login/login.template.html',
        controller: 'LoginController as LoginController'
      });
  }
})();

