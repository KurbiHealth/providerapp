(function() {
    'use strict';

    angular
        .module('providerApp.posts')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['PostsService'];

    /* @ngInject */
    function PostsController(PostsService) {
        var vm = this;

        activate();

        function activate() {

          PostsService.getPosts().then(function(posts){
            vm.posts = posts;
          });

        }
    }
})();
