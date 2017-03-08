(function() {
    'use strict';

    angular
        .module('providerApp.chats')
        .service('ChatsService', ChatsService);

    ChatsService.$inject = ['$q'];

    /* @ngInject */
    function ChatsService($q) {
      var chatService = {
        getUserChats: getUserChats,
        getChatroom: getChatroom,
        getUser: getUser,
        getChatroomReplies: getChatroomReplies
      };

      return chatService;

      function getUserChats(id) {
        var deffered = $q.defer();

        // Stamplay.Object("chatroom")
        // .get({ owner : id })
        // .then(function(res) {
        //   deffered.resolve(res)
        // }, function(err) {
        //   deffered.reject(err);
        // })

        // Stamplay.Object('chatroom')
        // .findByCurrentUser('owner')
        // .then(function(response) {
        //   deffered.resolve(response)
        // }, function(err) {
        //   deffered.reject(err);
        // })

        Stamplay.Object('chatroom')
        .get({
          per_page: 250
        })
        .then(function(response) {
          deffered.resolve(response)
        }, function(err) {
          deffered.reject(err);
        })

        return deffered.promise;
      }

      function getChatroom(id) {
        var deffered = $q.defer();
        Stamplay.Object("chatroom").get({ _id : id })
        .then(function(response) {
          deffered.resolve(response.data[0])
        }, function(error) {
          deffered.reject(err);
        })
        return deffered.promise;
      }

      function getUser(user_id) {
        Stamplay.User.get({ _id : user_id })
        .then(function(res) {
          console.log(res);
        }, function(err) {
          console.error(err);
        })
      }

      function getChatroomReplies(chatroom_id) {
        var deffered = $q.defer();
        Stamplay.Object("chatroomreplies").get({ chatRoomId : chatroom_id })
        .then(function(response) {
          deffered.resolve(response.data);
        }, function(error) {
          deffered.reject(err);
        })
        return deffered.promise;
      }
    }
})();
