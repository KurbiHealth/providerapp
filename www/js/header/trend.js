(function() {
    'use strict';

    angular
    .module('providerApp')
    .directive('trend', trend);

    /* @ngInject */
    function trend() {
        var directive = {
            restrict: 'EA',
            scope: {},
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            template:
            `<div class="trend">
              <button class="button button-icon icon ion-android-menu" ng-show="$root.mobile" ng-click="vm.toggleLeftSideMenu()"></button>
              <span class="trend-name" ng-show="$root.web">Kurbi</div>
            </div>`
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    Controller.$inject = ['$rootScope','$ionicSideMenuDelegate'];

    /* @ngInject */
    function Controller($rootScope,$ionicSideMenuDelegate) {
        var vm = this;

        activate();

        function activate() {

        }

        vm.toggleLeftSideMenu = function() {
          $ionicSideMenuDelegate.toggleLeft();
        };
    }
})();
