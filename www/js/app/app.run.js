
angular.module('providerApp')

.run(function($ionicPlatform, $rootScope, SessionService, $state) {
  $ionicPlatform.ready(function() {

    SessionService.currentUser()
      .then(function(user) {
        $rootScope.user = user;
        $rootScope.$broadcast("current-session");
      });

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $rootScope.$on("signout",function(){
      var jwt = window.location.origin + "-jwt";
      window.localStorage.removeItem(jwt);
      SessionService.currentUser()
      .then(function(user) {
        $rootScope.user = user;
        $state.go("signin");
      }, function(error) {
        console.error(error);
      });
    });
  });
});
