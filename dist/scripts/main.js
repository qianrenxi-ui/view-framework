/**
 * Created by tony on 16-6-12.
 */

/**
 * Created by tony on 16-7-23.
 */

(function(){
    'use strict';

    angular.module("qui.components.resize",[])
        .controller('QuiResizeController', QuiResizeController)
        .directive('quiResize', QuiResize);

    function QuiResizeController($scope){


    }
    QuiResizeController.$injecte = ['$scope'];

    function QuiResize(){
        return {
            restrict: 'A',
            //scope: {},
            controller: 'QuiResizeController',
            controllerAs: 'quiResizeCtrl',
            //template: '<div class="col-resize-handle"></div>',
            link: function(scope, elem, attrs){
                var rbox = angular.element(elem[0]);
                var rhandle = angular.element('<div class="col-resize-handle"></div>');
                rbox.append(rhandle);

                var start = false;
                var startX = 0;
                var elemWidth = elem[0].offsetWidth;
                rhandle.on("mousedown", function(event){
                    start = true;
                    startX = event.clientX;
                    elemWidth = elem[0].offsetWidth;
                });
                angular.element(window).on("mousemove", function(event){
                    if(start){
                        var moveX = event.clientX - startX;
                        var rWidth = elemWidth + moveX;
                        elem[0].style.width = rWidth+"px";
                    }
                });
                angular.element(window).on("mouseup", function(){
                    start = false;
                    startX = 0;
                    elemWidth = elem[0].offsetWidth;
                });
            }
        }
    }
})();
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
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'qui/templates/topbar/topbar.html';
            },
            transclude: true,
            replace: true
        }
    }
})();
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
(function(module) {
try {
  module = angular.module('qui.viewFramework.sidebar');
} catch (e) {
  module = angular.module('qui.viewFramework.sidebar', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('qui/templates/sidebar/sidebar.html',
    '<div class="viewFramework-sidebar">\n' +
    '    <div class="sidebar-fold" ng-click="quiSidebarCtrl.toggleFold()"><i class="fa fa-reorder" ng-class="{\'fa-rotate-90\': isSidebarFold}"></i></div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('qui.viewFramework.topbar');
} catch (e) {
  module = angular.module('qui.viewFramework.topbar', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('qui/templates/topbar/topbar.html',
    '<div class="viewFramework-topbar">\n' +
    '\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('qui.viewFramework');
} catch (e) {
  module = angular.module('qui.viewFramework', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('qui/templates/view-framework/view-framework.html',
    '<div class="viewFramework">\n' +
    '    <qui-topbar></qui-topbar>\n' +
    '    <div class="viewFramework-body"\n' +
    '         ng-class="{\'viewFramework-sidebar-mini\':(!config.disableNavigation && !config.hideSidebar) && config.sidebar == \'mini\',\'viewFramework-sidebar-full\': (!config.disableNavigation && !config.hideSidebar) && config.sidebar == \'full\',\'viewFramework-topbar-hide\':config.disableNavigation || config.hideTopbar}">\n' +
    '        <qui-sidebar></qui-sidebar>\n' +
    '        <div class="viewFramework-workspace workspace" ng-transclude></div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();
