(function() {
    'use strict';

    angular
        .module('providerApp.util')
        .directive('listfilter', listfilter);

    /* @ngInject */
    function listfilter() {
        var directive = {
            restrict: 'EA',
            scope: {
            },
            link: linkFunc,
            // controller: Controller,
            // controllerAs: 'vm',
            // bindToController: true
            template:
            `<label class="item item-input item-select">
              <div class="input-label item-label">SORT:</div>
              <select class="item-value">
                <option selected>NEWEST TO OLDEST</option>
                <option>OLDEST TO NEWEST</option>
                <option>UNREAD FIRST</option>
              </select>
            </label>`
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    // Controller.$inject = ['dependencies'];
    //
    // /* @ngInject */
    // function Controller(dependencies) {
    //     var vm = this;
    //
    //     activate();
    //
    //     function activate() {
    //
    //     }
    // }
})();
