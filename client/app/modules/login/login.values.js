'use strict';

(function(){

  angular
    .module('app.login.values', [])
    .value('loginEndPoints',{
      signIn: 'http://localhost:8000/'
    });
})();