angular.module('providerApp', ['ionic', 'angularMoment', 'providerApp.session', 'providerApp.chats','providerApp.posts','providerApp.util'])
.constant('ProjectSettings', {
  url: 'http://theedge.ai/api/v2',
  localStorageSessionVar: 'providerKurbiAppCurrentUserSession',
  localStorageSettingsVar:  'providerKurbiAppDefaultSettings'
})
.constant('$ionicLoadingConfig', {
  template: "<ion-spinner></ion-spinner>",
  hideOnStateChange : false
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('signup', {
    url: '/signup',
    templateUrl: 'js/user/signup.template.html',
    controller: 'SessionController as vm'
  })

  .state('signin', {
    url: '/signin',
    templateUrl: 'js/user/signin.template.html',
    controller: 'SessionController as vm'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'js/app/menu.html',
    controller: 'AppCtrl as vm'
  })

  .state('app.chats', {
    url: '/chats',
    views: {
      'menuContent': {
        templateUrl: 'js/chats/chats.html',
        controller: 'ChatsController as chats'
      }
    }
  })

  .state('app.viewchat', {
    url: '/viewchat/:id',
    params: {
      chatroom: null
    },
    views: {
      'menuContent': {
        templateUrl: 'js/chats/chat.html',
        controller: 'ChatController as vm'
      }
    }
  })

  .state('app.posts', {
    url: '/posts',
    views: {
      'menuContent': {
        templateUrl: 'js/posts/posts.html',
        controller: 'PostsController as vm'
      }
    }
  });

  // default state is:
  $urlRouterProvider.otherwise('/app/chats');

});

angular.module('providerApp.chats', []);
angular.module('providerApp.posts', []);
angular.module('providerApp.util', []);
