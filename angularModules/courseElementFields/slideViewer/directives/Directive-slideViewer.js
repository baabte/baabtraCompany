angular.module('baabtra').directive('slideViewer',['$sce',function($sce) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:'='
		},
		templateUrl: 'angularModules/courseElementFields/slideViewer/directives/Directive-slideViewer.html',
		link: function(scope, element, attrs, fn) {

			scope.trustHtml=function(html){
				return $sce.trustAsHtml(html)
			};

		}
	};
}]);