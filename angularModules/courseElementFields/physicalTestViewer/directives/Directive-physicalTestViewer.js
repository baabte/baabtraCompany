angular.module('baabtra').directive('physicalTestViewer', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"="
		},
		templateUrl: 'angularModules/courseElementFields/physicalTestViewer/directives/Directive-physicalTestViewer.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
