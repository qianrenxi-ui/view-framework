/**
 * Created by tony on 16-6-13.
 */
(function(){
    'use strict';

    angular.module('qui.viewFramework', ['qui.viewFramework.topbar', 'qui.viewFramework.sidebar','qui.components.resize'])
        .controller('QuiViewFrameworkController', ViewFrameworkController)
        .directive('quiViewFramework', QuiViewFramework);

    function ViewFrameworkController($scope){
        $scope.config = {
            disableNavigation: false,
            hideSidebar: true,
            hideTopbar: false,
            sidebar: 'full' //String:['full', 'mini']
        }
    }
    ViewFrameworkController.$inject = ['$scope'];

    function QuiViewFramework(){
        return {
            restrict: 'AE',
            controller: 'QuiViewFrameworkController',
            controllerAs: 'viewFramework',
            templateUrl: function(element, attrs){
                return attrs.templateUrl || 'qui/templates/view-framework/view-framework.html';
            },
            transclude: true,
            replace: true,
            scope: {
            }
        };
    }
})();