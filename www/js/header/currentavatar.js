(function() {
    'use strict';

    angular
    .module('providerApp')
    .directive('currentavatar', currentavatar);

    /* @ngInject */
    function currentavatar() {
        var directive = {
            restrict: 'EA',
            scope: {},
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            template:
            `<a class="item item-icon-left currentavatar" href="#">
              <img src="img/avatar-2.png">
              <span class="item-note" ng-show="$root.web">{{vm.username}}</span>
            </a>`
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    Controller.$inject = ['$rootScope'];

    /* @ngInject */
    function Controller($rootScope) {
        var vm = this;
        vm.username = '';

        $rootScope.$on('current-session', function() {
          vm.username = $rootScope.user.displayName;
        });
    }
})();
