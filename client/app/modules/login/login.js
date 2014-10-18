'use strict';

(function(){
  angular
    .module('app.login', [
      'ui.router',
      'restangular',
      'app.login.controller',
      'app.login.values',
      'app.login.service.apis'])
    .config(configureLoginStates);

  //app modules
  require('./login.controller.js');
  require('./login.values.js');
  require('./login.service.apis.js');

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

