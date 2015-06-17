angular.module('baabtra').directive('coursElementTitle', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {data:"@data"

		},
		templateUrl: 'angularModules/courseElementFields/courseElementTitle/directives/Directive-coursElementTitle.html',
		link: function(scope, element, attrs, fn) {

			scope.titleObj = JSON.parse(scope.data);			

		}
	};
});
