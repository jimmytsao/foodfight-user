'use strict';

(function(){

  angular
    .module('app.login.controller', [])
    .controller('LoginController', LoginController);

  LoginController.$inject = ['LoginApis', 'fbAuth'];

  function LoginController(LoginApis, fbAuth){
    this.fbLogin = processFbLogin;

    function processFbLogin(){
      return fbAuth.login()
      .then(fbAuth.sendAuthCode);
    }
  }
})();