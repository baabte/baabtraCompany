angular.module('baabtra').directive('interviewQuestion', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			question:"=",
			selectedTab: "="
		},
		templateUrl: 'angularModules/courseElementFields/interviewQuestion/directives/Directive-interviewQuestion.html',
		link: function(scope, element, attrs, fn) {

			// initialising the question object
			scope.question={};	




		}
	};
});
