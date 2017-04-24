(function() {
    'use strict';

    angular
        .module('providerApp.chats')
        .controller('ChatController', ChatController);

    ChatController.$inject = ['$scope','$rootScope','$stateParams','ChatsService','$ionicModal','$timeout'];

    /* @ngInject */
    function ChatController($scope,$rootScope,$stateParams,ChatsService,$ionicModal,$timeout) {
        var vm = this;
        var anonymous = { id: 1, name: "anonymous", displayName: "Anonymous", ssn: "00000" };

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

        $ionicModal.fromTemplateUrl('js/chats/reply.modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          vm.replyModal = modal;
        });

        function activate() {
          vm.loadingReplies = true;

          // for (var i = 0; i < vm.chatroom.messages.length; i++) {
          //   if(vm.chatroom.messages[i].source==='patient') {
          //     vm.chatroom.user_id = vm.chatroom.messages[i].message.userId;
          //   }
          //
          //   if(vm.chatroom.messages[i].source==='patient' && vm.chatroom.messages[i].message.qCode==='ask for email') {
          //     vm.chatroom.question = vm.chatroom.messages[i].message.body.text;
          //   }
          //
          //   if(vm.chatroom.messages[i].source==='patient' && vm.chatroom.messages[i].message.qCode==='get symptom') {
          //     vm.chatroom.symptom = vm.chatroom.messages[i].message.body.text;
          //   }
          //
          //   if(vm.chatroom.messages[i].source==='patient' && vm.chatroom.messages[i].message.qCode==='get duration') {
          //     vm.chatroom.duration = vm.chatroom.messages[i].message.body.text;
          //   }
          //
          //   if(vm.chatroom.messages[i].source==='patient' && vm.chatroom.messages[i].message.qCode==='get treatment') {
          //     vm.chatroom.treatment = vm.chatroom.messages[i].message.body.text;
          //   }
          // }

          // replies
          ChatsService.getChatroomReplies(vm.chatroom.id)
          .then(function(replies) {
            vm.replies = [];
            vm.loadingReplies = false;

            if(!replies.length) {
              vm.noReplies = true;
            } else {
              angular.forEach(replies, function(reply, key) {
                reply.key = key;
                if(reply.owner) {
                  Stamplay.User.get({ _id : reply.owner })
                  .then(function(res) {
                    reply.user = res.data[0];
                    $rootScope.$apply(function(){
                      vm.replies.push(reply);
                    });
                  }, function(err) {
                    $rootScope.$apply(function(){
                      vm.replies.push(reply);
                    });
                  });
                } else {
                  reply.user = anonymous;
                  vm.replies.push(reply);
                }
              }, []);
            }
          }, function(error) {
            console.error(error);
          });

          vm.chatroom.user = anonymous;
          vm.chatroom.published = "08/18/2016, 10:23";
          vm.chatroom.read = false;
        }

        vm.sendReply = function() {
          var reply = {
            chatRoomId: vm.chatroom.id,
            replyText: vm.replytext
          };
          if(vm.chatroom.userVariables && vm.chatroom.userVariables.email) {
            reply.recipient = vm.chatroom.userVariables.email;
          }
          ChatsService.postChatroomReply(reply)
          .then(function(reply) {
            reply.user = $rootScope.user;
            reply.key = vm.replies.length;
            vm.noReplies = false;
            $timeout(function() {
              $scope.$apply(function(){
                vm.replies.push(reply);
              });
            });
          }, function(error) {
            console.error(error);
          });
          vm.replyModal.hide();
        }

        vm.openReplyModal = function() {
          vm.replytext = '';
          vm.replyModal.show();
        };
        vm.closeReplyModal = function() {
          vm.replyModal.hide();
        };

        vm.removeReply = function(reply,index) {
          ChatsService.removeChatroomReply(reply.id)
          .then(function(response) {
            vm.replies.splice(index,1);
            if(!vm.replies.length) {
              vm.noReplies = true;
            }
          }, function(error) {
            console.error(error);
          });
        }

    }
})();
