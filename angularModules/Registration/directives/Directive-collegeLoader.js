angular.module('baabtra').directive('collegeLoader',['collegeServices','$rootScope', function(collegeServices,$rootScope) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			outModel:"="
		},
		templateUrl: 'angularModules/Registration/directives/Directive-collegeLoader.html',
		link: function(scope, element, attrs, fn) {


			// console.log($rootScope)




		}
	};
}]);
