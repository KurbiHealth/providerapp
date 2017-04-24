(function() {
    'use strict';

    angular
        .module('providerApp.chats')
        .controller('ChatsController', ChatsController);

    ChatsController.$inject = ['$rootScope','ChatsService'];

    /* @ngInject */
    function ChatsController($rootScope,ChatsService) {
        var vm = this;

        if($rootScope.user) {
          activate();
        }

        $rootScope.$on('current-session', function() {
          activate();
        });

        function activate() {
          ChatsService.getConversations()
          .then(function(response) {
            console.log('ya');
            vm.conversations = response.conversations;
            vm.size = response.size;
          }, function(error) {
            console.error(error);
          });

          // ChatsService.getUserChats($rootScope.user._id)
          //   .then(function(response) {
          //     var items = response.data;
          //     vm.conversations = [];
          //     items.forEach(function(item, idx, array) {
          //
          //       if(item.owner) {
          //         console.log('owner',item);
          //       } else  {
          //         console.log('no tiene owner');
          //       }
          //
          //
          //       item.text = '--NONE--';
          //       if (item.messages) {
          //         for (var i = 0; i < item.messages.length; i++) {
          //           if(item.messages[i].source==='patient' && item.messages[i].message.qCode==='ask for email') {
          //             item.text = item.messages[i].message.body.text;
          //           }
          //         }
          //         vm.conversations.push(item);
          //       }
          //
          //     });
          //     // $ionicLoading.hide();
          //   }, function(error) {
          //     // $ionicLoading.hide();
          //   });
        }
    }
})();
