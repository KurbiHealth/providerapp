(function() {
    'use strict';

    angular
        .module('providerApp.posts')
        .service('PostsService', PostsService);

    PostsService.$inject = ['$q'];

    /* @ngInject */
    function PostsService($q) {
      var postsService = {
        getPosts: getPosts,
        getPostById: getPostById
      };

      return postsService;

      function getPosts() {
        var deffered = $q.defer();
        Stamplay.Object('articles')
        .get({
          per_page: 250
        })
        .then(function(response) {
          deffered.resolve(response.data);
        }, function(err) {
          deffered.reject(err);
        })
        return deffered.promise;
      }

      function getPostById(id) {
        var deffered = $q.defer();
        Stamplay.Object("articles").get({ _id : id })
        .then(function(response) {
          deffered.resolve(response.data[0])
        }, function(error) {
          deffered.reject(err);
        })
        return deffered.promise;
      }
    }
})();
