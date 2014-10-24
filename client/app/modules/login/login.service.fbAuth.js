'use strict';

(function(){
 
  angular
    .module('app.login.service.fbAuth', [])
    .factory('fbAuth',facebookAuthService);

  facebookAuthService.$inject =  ['$window', '$q', 'loginEndPoints'];

  function facebookAuthService ($window, $q, loginEndPoints){

    var newBrowserWindow,
        deferred,
        service;

    $window._app.oauthCallback = oauthCallback;
    
    service = {
      login: login,
      sendAuthCode: sendAuthCode
    };

    return service;

    function oauthCallback(url) {
      console.log('oauthCallback');
      deferred.resolve(url);
    }

    function login(){
      deferred = $q.defer();
      newBrowserWindow = $window.open(loginEndPoints.fbLoginRedirectNonCordova, '_blank', 'location=no');
      
      return deferred.promise;
    }

    function sendAuthCode(url){
      var code = url.split('code=')[1];
      console.log('code: ',code);
    }
  }
})();

