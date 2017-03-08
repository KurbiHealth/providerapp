(function() {
    'use strict';

    angular
        .module('informer.session')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$state', '$filter', 'UI', 'Session', '$ionicHistory'];

    /* @ngInject */
    function SignupController($state, $filter, UI, Session, $ionicHistory) {
        var vm = this;

        vm.signupData = {};
        vm.signuperror = false;

        // Setting 'application_name' parameter between Android, iOS or WebApp
        var application_name = '';
        if (ionic.Platform.isAndroid()) {
          application_name = 'informerly_android';
        } else if(ionic.Platform.isIOS()) {
          application_name = 'informerly_ios';
        } else {
          application_name = 'informerly_web_app';
        }

        vm.signup = function() {
          vm.signupData.email = $filter('lowercase')(vm.signupData.email);
          vm.signupData.application_name = application_name;

          Session.signup(vm.signupData)
          .then(function(response){

            if(response.status==201) {
              var user = response.data.data.attributes.user;

              // go to app controller (with user signed in will redirect automatically to feed page)
              $ionicHistory.clearCache();

              // redirecting to onboard (user interests) page
              $state.go('onboard');

            } else {
              vm.signuperror = true;
              if(response.data.errors.length) {
                vm.signup_errors = response.data.errors;
              }
            }

          }, function(error) {
              UI.toast("Oops.. we're having some unknow problem. Please contact your Informer trough The Edge's website!");
              console.error(error);
          });

        };
    }
})();
