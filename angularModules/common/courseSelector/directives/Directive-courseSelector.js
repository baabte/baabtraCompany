angular.module('baabtra').directive('courseSelector', function() {
	return {
		restrict: 'E,A',
		require :["^?form",'ngModel'],
		scope: {
			courseData:'='
		},
		templateUrl: 'angularModules/common/courseSelector/directives/Directive-courseSelector.html',
		link: function(scope, element, attrs, fn) {
			if(!angular.equals(scope.courseData,undefined)){
				// console.log(scope.courseData)
				if(angular.equals(scope.courseData.batch,undefined)){
					scope.courseData.batch={};
				}
				if(angular.equals(scope.courseData.batch,undefined)){
					scope.courseData.course={};
				}			
			}







		}
	};
});
