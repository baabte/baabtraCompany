(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.directive:uiNav
     * @description
     * # uiScroll
     * Directive of the app
     */
    angular.module('baabtra')
      .directive('uiNav', ['$timeout', function($timeout) {
        return {
          restrict: 'AC',
          link: function(scope, el, attr) {
            el.find('a').bind('click', function(e) {
              var li = angular.element(this).parent();
              li.parent().find('li').removeClass('active');
              li.toggleClass('active');
              if(li.find('ul')) {
                (scope.app.asideCollapse = false);
              }
            });
          }
        };
      }]);
}());