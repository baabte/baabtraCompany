(function() {   
    'use strict';

    /**
     * @ngdoc function
     * @name app.directive:uiFullscreen
     * @description
     * # uiFullscreen
     * Directive of the app
     */
    angular.module('baabtra')
      .directive('uiFullscreen', ['$ocLazyLoad', '$document', function($ocLazyLoad, $document) {
        return {
          restrict: 'AC',
          link: function(scope, el, attr) {
            el.addClass('hide');
            $ocLazyLoad.load('vendor/libs/screenfull.min.js').then(function(){
              // disable on ie11
              if (screenfull.enabled) {
                el.removeClass('hide');
              }
              el.bind('click', function(){
                var target;
                if(attr.target) {
                   target = angular.element(attr.target)[0];
                }
                screenfull.toggle(target);
              });

              var body = angular.element($document[0].body);
              $document.on(screenfull.raw.fullscreenchange, function () {
                if(screenfull.isFullscreen){
                  body.addClass('fullscreen');
                }else{
                  body.removeClass('fullscreen');
                }
              });
            });
          }
        };
      }]);
}());