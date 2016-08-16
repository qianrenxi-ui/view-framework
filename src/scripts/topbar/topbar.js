/**
 * Created by tony on 16-6-13.
 */
(function () {
    'use strict';

    angular.module('qui.viewFramework.topbar', [])
        .controller('QuiTopbarController', TopbarController)
        .directive('quiTopbar', QuiTopbar);

    function TopbarController() {
    }

    function QuiTopbar() {
        return {
            restrict: 'AE',
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'qui/templates/topbar/topbar.html';
            },
            transclude: true,
            replace: true
        }
    }
})();