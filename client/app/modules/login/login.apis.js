'use strict';

(function(){

  angular
    .module('app.login.apis', [])
    .service('LoginApis', ['Restangular', LoginApisService]);

  function LoginApisService(Restangular){

  }
})()