'use strict';

(function(){

  angular
    .module('app.login.service.apis', [])
    .factory('LoginApis', LoginApisService);


  LoginApisService.$inject = ['Restangular', '$window', 'loginEndPoints', 'checkCordova'];

  function LoginApisService(Restangular, $window, loginEndPoints, checkCordova){

    var service = {
      fbLoginRedirect: fbLoginRedirect,
    };

    return service;

    function fbLoginRedirect (){
      if (checkCordova.isCordovaDevice){
        fbLoginRedirectCordova();
      } else {
        fbLoginRedirectNonCordova();
      }
    }

    function fbLoginRedirectNonCordova(){
      $window.location.href = loginEndPoints.fbLoginRedirectNonCordova;
    }

    function fbLoginRedirectCordova(){
      $window.location.href = loginEndPoints.fbLoginRedirectCordova;
    }
  }
})();
