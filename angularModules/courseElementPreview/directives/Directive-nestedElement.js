angular.module('baabtra').directive('nestedElement', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"="
		},
		templateUrl: 'angularModules/courseElementPreview/directives/Directive-nestedElement.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
