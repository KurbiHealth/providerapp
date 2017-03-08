(function() {
    'use strict';

    angular
        .module('providerApp.session')
        .controller('SessionController', SessionController);

    SessionController.$inject = ["SessionService", "$rootScope", '$state','$ionicLoading', '$ionicPopup'];

    /* @ngInject */
    function SessionController(SessionService, $rootScope, $state, $ionicLoading, $ionicPopup) {
        var vm = this;
        vm.user = {};

        $ionicLoading.hide();

        var errorHandler = function(options) {
          var errorAlert = $ionicPopup.alert({
            title: options.title,
            okType : 'button-assertive',
            okText : "Try Again"
          });
        }

        vm.login = function() {
          $ionicLoading.show();
          Stamplay.User.login(vm.user)
          .then(function(user) {
            $ionicLoading.hide();
            $rootScope.user = user;
            $state.go("app.chats");
          }, function(error) {
            $ionicLoading.hide();
            errorHandler({
              title : "<h4 class='center-align'>Incorrect Username or Password</h4>"
            })
          });
        };

        vm.signup = function() {
          $ionicLoading.show();
          Stamplay.User.signup(vm.user)
          .then(function(user) {
            $rootScope.user = user;
            $state.go("tasks");
          }, function(error) {
            errorHandler({
              title : "<h4 class='center-align'>A Valid Email and Password is Required</h4>"
            })
            $ionicLoading.hide();
          })
        }

        vm.logout = function() {
          $ionicLoading.show();
          var jwt = window.location.origin + "-jwt";
          window.localStorage.removeItem(jwt);
          SessionService.currentUser()
          .then(function(user) {
            $rootScope.user = user;
            $ionicLoading.hide();
          }, function(error) {
            console.error(error);
            $ionicLoading.hide();
          })
        }

    }
})();
