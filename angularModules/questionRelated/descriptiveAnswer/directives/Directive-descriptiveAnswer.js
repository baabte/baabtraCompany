angular.module('baabtra').directive('descriptiveAnswer', function() {
	return {
		restrict: 'E',
		scope: {
			primary:'=',
			secondary:'=',
			userAnswer:'=',
			markScored:'=',
			dbAnswer:'='
		},
		templateUrl: 'angularModules/questionRelated/descriptiveAnswer/directives/Directive-descriptiveAnswer.html',
		link: function(scope, element, attrs, fn) {
			scope.enteredAnswer={};
			scope.enteredAnswer.primaryAnswer={};
			scope.enteredAnswer.secondaryAnswer={};		

			scope.$watch('enteredAnswer',function (oldval,newval) {

				if(angular.equals(scope.enteredAnswer,undefined)){
					return 0;
				}
		
				scope.userAnswer[0]=scope.enteredAnswer;
				
			},true);


		}
	};
});