'use strict';

(function(){

  angular
    .module('app.login.controller', [])
    .controller('LoginController', [LoginController]);

  function LoginController(){
    console.log('Login Controller');
  }
})();