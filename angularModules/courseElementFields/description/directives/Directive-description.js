angular.module('baabtra').directive('description', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"@data",
			courseElement:"@"
		},
		templateUrl: 'angularModules/courseElementFields/description/directives/Directive-description.html',
		link: function(scope, element, attrs, fn) {


			scope.docObj = JSON.parse(scope.data);
			scope.docObjParent = scope.courseElement;

		}
	};
});
