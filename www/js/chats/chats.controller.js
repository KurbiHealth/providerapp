(function() {
    'use strict';

    angular
        .module('providerApp.chats')
        .controller('ChatsController', ChatsController);

    ChatsController.$inject = ['$rootScope','ChatsService'];

    /* @ngInject */
    function ChatsController($rootScope,ChatsService) {
        var chats = this;

        if($rootScope.user) {
          activate();
        }

        $rootScope.$on('current-session', function() {
          activate();
        });

        function activate() {

          ChatsService.getUserChats($rootScope.user._id)
            .then(function(response) {
              var items = response.data;
              chats.real = [];
              items.forEach(function(item, idx, array) {

                if(item.owner) {
                  console.log('owner',item);
                } else  {
                  console.log('no tiene owner');
                }


                item.text = '--NONE--';
                if (item.messages) {
                  for (var i = 0; i < item.messages.length; i++) {
                    if(item.messages[i].source==='patient' && item.messages[i].message.qCode==='ask for email') {
                      item.text = item.messages[i].message.body.text;
                    }
                  }
                  chats.real.push(item);
                }

              });
              // $ionicLoading.hide();
            }, function(error) {
              // $ionicLoading.hide();
            });
        }

        // just a text
        var ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

        chats.conversations = [
          { id: 1, date: "8hrs Ago", text: ipsum, read: false },
          { id: 2, date: "8hrs Ago", text: ipsum, read: false },
          { id: 3, date: "11hrs Ago", text: ipsum, read: true },
          { id: 4, date: "13hrs Ago", text: ipsum, read: true }
        ];

        chats.questions = [
          { id: 1, date: "1hrs Ago", text: ipsum, read: false },
          { id: 2, date: "3hrs Ago", text: ipsum, read: false },
          { id: 3, date: "7hrs Ago", text: ipsum, read: true }
        ];

        chats.replies = [
          { id: 1, date: "9hrs Ago", text: ipsum, read: false },
          { id: 2, date: "11hrs Ago", text: ipsum, read: true }
        ];
    }
})();
