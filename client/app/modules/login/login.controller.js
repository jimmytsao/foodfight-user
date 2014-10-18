'use strict';

(function(){

  angular
    .module('app.login.controller', [])
    .controller('LoginController', LoginController);

  LoginController.$inject = ['LoginApis'];

  function LoginController(LoginApis){
    this.fbLogin = LoginApis.fbLoginRedirect;
  }
})();