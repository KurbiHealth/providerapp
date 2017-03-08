(function() {
    'use strict';

    angular
    .module('providerApp.chats')
    .directive('chatlist', chatlist);

    /* @ngInject */
    function chatlist() {
        var directive = {
            restrict: 'E',
            templateUrl: 'js/chats/chatlist.html',
            scope: {},
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: {
              items: '=',
              title: '@',
              filter: '=',
              linkToAll: '='
            }
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    Controller.$inject = ['$state'];

    /* @ngInject */
    function Controller($state) {
        var vm = this;

        activate();

        function activate() {
          vm.unread = 0;
          for (var i = 0; i < vm.items.length; i++) {
            if(!vm.items[i].read) vm.unread++;
          }
        }

        vm.goChat = function(chatroom) {
          $state.go('app.viewchat',{id: chatroom._id, chatroom: chatroom});
        }
    }
})();
