angular.module('baabtra').directive('assignmentQuestionViewerEv', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"@"
		},
		templateUrl: 'angularModules/courseElementFields/assignmentQuestionViewerEv/directives/Directive-assignmentQuestionViewerEv.html',
		link: function(scope, element, attrs, fn) {

			if(angular.equals(typeof scope.data, 'string')){
				scope.data = JSON.parse(scope.data)
			}

			// initialising the return variable
			if(angular.equals(scope.result, undefined)){
				scope.result = scope.$parent.result[parseInt(attrs.index)];
				scope.result.data = angular.copy(scope.data);
			}

			scope.questionData={};

			var data = scope.data;
			scope.questionData.value= data.value.question;
			
			// if the question is already answered, set the properties to be shown to the value object of the question
			if(angular.isDefined(data.value.userAnswer)){
				scope.questionData.value.submitStatus = data.value.submitStatus;
				scope.questionData.value.dateOfSubmission = data.value.dateOfSubmission;
				scope.questionData.value.userAnswer = data.value.userAnswer;
				scope.questionData.value.evaluated = data.value.evaluated;
				scope.questionData.value.markScored = data.value.markScored;
				scope.questionData.value.resultStatus = scope.$parent.previewData.status;
			}

			
			
			//updating the mark element when the data is updated in the questionviewerevdirective
			scope.$watch('result.data.markScored', function(newVal, oldVal){


			
				if(!angular.equals(scope.result.data.markScored, undefined)){
				
				
					if(angular.isDefined(oldVal)){
						var markToBeAdded = newVal - oldVal;
					}
					else {
						var markToBeAdded = newVal;
					}

					//scope.$parent.elementMark = 0;				
					scope.$parent.elementMark = scope.$parent.elementMark +  markToBeAdded;
					

				}



			});

			

		}
	};
});
