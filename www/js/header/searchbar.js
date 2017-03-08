(function() {
    'use strict';

    angular
    .module('providerApp')
    .directive('searchbar', searchbar);

    /* @ngInject */
    function searchbar() {
        var directive = {
            restrict: 'EA',
            scope: {
            },
            link: linkFunc,
            // controller: Controller,
            // controllerAs: 'vm',
            // bindToController: true,
            template:
              `<div class="list list-inset searchbar">
                <label class="item item-input">
                  <i class="icon ion-search placeholder-icon"></i>
                  <input type="text" placeholder="search by name, title, date, tag">
                </label>
              </div>`
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    // Controller.$inject = [''];
    //
    // /* @ngInject */
    // function Controller() {
    //     var vm = this;
    //
    //     activate();
    //
    //     function activate() {
    //
    //     }
    // }
})();
