'use strict';

(function(){

  angular
    .module('app.login.values', [])
    .value('loginEndPoints',{
      fbLoginRedirectCordova: 'http://localhost:8000/auth/fb/login/cordova',
      fbLoginRedirectNonCordova: 'http://localhost:8000/auth/fb/login/noncordova'
    });
})();