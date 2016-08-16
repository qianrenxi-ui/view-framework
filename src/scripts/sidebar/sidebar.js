/**
 * Created by tony on 16-6-13.
 */
(function () {
    'use strict';

    angular.module('qui.viewFramework.sidebar', [])
        .controller('QuiSidebarController', SidebarController)
        .directive('quiSidebar', QuiSidebar);

    function SidebarController($scope) {

        $scope.isSidebarFold = $scope.config.sidebar == 'full';

        return {
            toggleFold: toggleFold
        };

        function toggleFold(){
            if($scope.isSidebarFold){
                $scope.config.sidebar = 'mini';
            }else{
                $scope.config.sidebar = 'full';
            }
            $scope.isSidebarFold = !$scope.isSidebarFold;
        }
    }
    SidebarController.$injecte = ['$scope'];

    function QuiSidebar() {
        return {
            restrict: 'AE',
            controller: 'QuiSidebarController',
            controllerAs: 'quiSidebarCtrl',
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'qui/templates/sidebar/sidebar.html';
            },
            transclude: true,
            replace: true
        }
    }
})();