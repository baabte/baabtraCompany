angular.module('baabtra').directive('subElementsPreview', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
				data:"=",
				previewData:"=",
				courseId:'='
		},
		templateUrl: 'angularModules/courseElementPreview/directives/Directive-subElementsPreview.html',
		link: function(scope, element, attrs, fn) {

			
			var subElementsArray = angular.copy(scope.data.subElems);

			// taking off the parentElementId in from the subElems array as it will noit render in courseElementPreview otherwise
			for (var i in subElementsArray){
				delete subElementsArray[i].parentElementId;
			}

			// generating a subset of the previewElement with only the sub elements array as elements

			scope.subElementsPreview = angular.copy(scope.previewData);

			scope.subElementsPreview.elements = subElementsArray;


		}
	};
});
