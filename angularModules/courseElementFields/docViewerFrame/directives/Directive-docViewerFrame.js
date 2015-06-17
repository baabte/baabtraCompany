angular.module('baabtra').directive('docViewerFrame', ['$sce',function($sce) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"@data",
			courseElement:"@"
		},
		templateUrl: 'angularModules/courseElementFields/docViewerFrame/directives/Directive-docViewerFrame.html',
		link: function(scope, element, attrs, fn) {
			scope.trustSrc = function(src) {
					return $sce.trustAsResourceUrl(src);
				};

			scope.$watch('data',function () {
				scope.newData=angular.fromJson(JSON.parse(scope.data));
			},true);
			

		}
	};
}]);
