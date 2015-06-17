angular.module('baabtra').directive('assignmentQuestionViewer',['$modal', function($modal) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:'@',
			courseElement:'=',
			courseId:'=',
			showSubmitButton:'@',
			thisScope:'=?',
			index:'='
		},
		templateUrl: 'angularModules/courseElementFields/assignmentQuestionViewer/directives/Directive-assignmentQuestionViewer.html',
		link: function(scope, element, attrs, fn) {
			scope.questionData={};

			var data = JSON.parse(scope.data);
			scope.questionData.value= data.value.question;
			
			// if the question is already answered, set the properties to be shown to the value object of the question
			if(angular.isDefined(data.value.userAnswer)){
				scope.questionData.value.submitStatus = data.value.submitStatus;
				scope.questionData.value.dateOfSubmission = data.value.dateOfSubmission;
				scope.questionData.value.userAnswer = data.value.userAnswer;
				scope.questionData.value.evaluated = data.value.evaluated;
				scope.questionData.value.markScored = data.value.markScored;

			}


				scope.qs={};
			

			
			scope.$watch('qs.scope.userAnswer', function(){				
				scope.thisScope=scope.qs.scope;		
			},true);	
					
		}
	};
}]);
