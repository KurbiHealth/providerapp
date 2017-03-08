(function() {
    'use strict';

    angular
        .module('providerApp')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$rootScope','$ionicSideMenuDelegate','$ionicLoading','$state'];

    /* @ngInject */
    function AppCtrl($rootScope,$ionicSideMenuDelegate,$ionicLoading,$state) {
        var vm = this;

        activate();

        function activate() {
          if (ionic.Platform.isAndroid() ||
              ionic.Platform.isIOS() ||
              ionic.Platform.isWindowsPhone() ||
              ionic.Platform.isIPad() ||
              ionic.Platform.isEdge()) {

            $rootScope.mobile = true;
          } else {
            $rootScope.web = true;
          }

          $ionicLoading.show();
        }

        vm.toggleSideMenu = function() {
          if($rootScope.mobile) {
            $ionicSideMenuDelegate.toggleLeft();
          }
        }

        vm.signout = function() {
          $rootScope.$broadcast("signout");
        }

        $rootScope.$on('current-session', function() {
          if($rootScope.user) {
            $ionicLoading.hide();
          } else {
            $state.go("signin");
          }
        });
    }
})();
