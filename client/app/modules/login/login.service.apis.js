'use strict';

(function(){

  angular
    .module('app.login.service.apis', [])
    .factory('LoginApis', LoginApisService);


  LoginApisService.$inject = ['Restangular'];
  
  function LoginApisService(Restangular){

  }
})();