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