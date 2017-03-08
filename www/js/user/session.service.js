(function() {
  'use strict';

  angular
  .module('providerApp.session')
  .factory('SessionService', Session);

  Session.$inject = ['$q', '$http','ProjectSettings'];

  /* @ngInject */
  function Session($q, $http, ProjectSettings) {
    var sessionService = {
      currentUser: currentUser,
      updateUserProfile: updateUserProfile
    };

    return sessionService;

    function currentUser() {
      var def = $q.defer();
      Stamplay.User.currentUser()
      .then(function(response) {
        if(response.user === undefined) {
          def.resolve(false);
        } else {
          def.resolve(response.user);
        }
      }, function(error) {
        def.reject();
      }
    )
    return def.promise;
  }

  function updateUserProfile(profile) {
    return $http.put(ProjectSettings.url + '/users', profile)
    .then(function(response) {
      return response.data.data;
    }, function(error) {
      console.error(error);
      return error;
    });
  }


}

})();
