(function() {
    'use strict';

    angular
        .module('providerApp.chats')
        .controller('ChatController', ChatController);

    ChatController.$inject = ['$stateParams','ChatsService'];

    /* @ngInject */
    function ChatController($stateParams,ChatsService) {
        var vm = this;

        if($stateParams.chatroom) {
          vm.chatroom = $stateParams.chatroom;
          activate();
        } else if($stateParams.id) {
          ChatsService.getChatroom($stateParams.id)
            .then(function(chatroom) {
              vm.chatroom = chatroom;
              activate();
            }, function(error) {
              console.error(error);
            });
        } else {
          console.log('Nada que buscar');
        }


        function activate() {
          console.log(vm.chatroom);
          for (var i = 0; i < vm.chatroom.messages.length; i++) {
            // user id
            if(vm.chatroom.messages[i].source==='patient') {
              vm.chatroom.user_id = vm.chatroom.messages[i].message.userId;
              console.log('User ID', vm.chatroom.user_id);
            }

            // question
            if(vm.chatroom.messages[i].source==='patient' && vm.chatroom.messages[i].message.qCode==='ask for email') {
              vm.chatroom.question = vm.chatroom.messages[i].message.body.text;
            }

            // symptom
            if(vm.chatroom.messages[i].source==='patient' && vm.chatroom.messages[i].message.qCode==='get symptom') {
              vm.chatroom.symptom = vm.chatroom.messages[i].message.body.text;
            }

            // duration
            if(vm.chatroom.messages[i].source==='patient' && vm.chatroom.messages[i].message.qCode==='get duration') {
              vm.chatroom.duration = vm.chatroom.messages[i].message.body.text;
            }

            // treatment
            if(vm.chatroom.messages[i].source==='patient' && vm.chatroom.messages[i].message.qCode==='get treatment') {
              vm.chatroom.treatment = vm.chatroom.messages[i].message.body.text;
            }
          }

          // replies
          ChatsService.getChatroomReplies(vm.chatroom._id)
          .then(function(replies) {
            for (var i = 0; i < replies.length; i++) {
              if(!replies[i].user) {
                replies[i].user = {name:'Anonymous'};
              }
            }
            vm.replies = replies;
          }, function(error) {
            console.error(error);
          });

          // ChatsService.getUser(chatroom.user_id)
          // .then(function(response) {
          //   console.log(response);
          // });

          vm.chatroom.user = { id: 1, name: "Anonymous", ssn: "58764" };
          vm.chatroom.published = "08/18/2016, 10:23";
          vm.chatroom.read = false;



          // just a text
          var ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

          vm.replies = [
            {
              id: 1,
              user: { id: 1, name: "User Name 2", company: "Company Name 1" },
              published: "8hrs Ago",
              text: ipsum,
              read: false,
              likes: 11
            },{
              id: 2,
              user: { id: 2, name: "User Name 3", company: "Company Name 2" },
              published: "8hrs Ago",
              text: ipsum,
              read: false,
              likes: 10
            },{
              id: 3,
              user: { id: 1, name: "User Name 3", company: "Company Name 2" },
              published: "8hrs Ago",
              text: ipsum,
              read: false,
              likes: 2
            }
          ];


        }
    }
})();
