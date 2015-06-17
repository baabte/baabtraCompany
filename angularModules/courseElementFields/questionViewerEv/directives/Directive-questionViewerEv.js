angular.module('baabtra').directive('questionViewerEv',['$modal','assignmentFunctions', function($modal, assignmentFunctions) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"=?",
			//added by Anoop to show assignment related options when the question happens to be inside an assignment
			fromAssignment:"=?",
			result:"=?"
		},
		templateUrl: 'angularModules/courseElementFields/questionViewerEv/directives/Directive-questionViewerEv.html',
		link: function(scope, element, attrs, fn) {

			

			if(angular.equals(typeof scope.data ,'string')){

				scope.data = JSON.parse(scope.data);
			}

			

			// initialisisng the return variable
			if(angular.equals(scope.result, undefined)){
				scope.result = scope.$parent.result[parseInt(attrs.index)];
				scope.result.data = angular.copy(scope.data);
			}
			else{

				if(angular.equals(typeof scope.result ,'string')){
					scope.result = JSON.parse(scope.result);
				}
			}

			var timeOut;

			// Anoop . **** these are the things required when the question is appearing inside an assignment
			if(angular.equals(typeof scope.fromAssignment ,'string')){
				scope.fromAssignment = JSON.parse(scope.fromAssignment);
			}

			// creating the preview data object to be shown as answer, the primary answer array is set as the elements property(array) of the preview data object
			scope.answerPreviewData = {};
			scope.answerPreviewData.elements = [];
			if(scope.data.value.userAnswer){
				for(key in scope.data.value.userAnswer[0].primaryAnswer){
				scope.answerPreviewData.elements.push(scope.data.value.userAnswer[0].primaryAnswer[key]);
				}
			} 

			//Anoop , reating an array to show the statuses for questions.
			//an array to hold the unit of the penalty
			scope.questionEvOptions = [{label:"Not Evaluated", value:"not evaluated"},
			{label:"Correct", value:"correct"}
			, {label:"Custom Mark", value:"custom mark"},
			{label:'Ask for Resubmission', value:'to be resubmitted'}];

			
			if(angular.isDefined(scope.result)){			
				if(!angular.isDefined(scope.result.data.value.resultStatus)){
									
					scope.result.data.value.resultStatus = "not evaluated";
				}
			}

			if(angular.isDefined(scope.fromAssignment)){

							// **********************************************************
					scope.fnShowAppliedPenalty = function() {

						if(!angular.equals(scope.penaltyApplicationStatuses.indexOf(scope.result.data.value.resultStatus), -1) && scope.result.data.value.markScored > 0){
							return true;
						}
						else{
							return false;
						}
					}

					scope.$watch('fnShowAppliedPenalty', function(){});
					// **********************************************************
			}
			
			scope.penaltyApplicationStatuses = ["correct", "custom mark" ]

			//function to handle the resultStatus change event
			scope.setMarks=function(){
				
				if(angular.equals(scope.result.data.value.resultStatus,'correct')){
					scope.result.data.value.markScored = scope.result.data.value.mark.totalMark;
					if(angular.isDefined(scope.fromAssignment)){
						scope.applyPenalty();
					}					
				}
				if(angular.equals(scope.penaltyApplicationStatuses.indexOf(scope.result.data.value.resultStatus),-1)){
					scope.result.data.value.markScored = 0;
				}

				// scope.result.data.value.resultStatus = scope.data.value.resultStatus;
				// scope.result.data.value.submitStatus = scope.data.value.resultStatus;
				
			}

			// ***************************************************


			//setting up a watch on the mark scored object to bubble up the change
			scope.$watch(function() {  return scope.result.data.value.markScored; }, function(newVal, oldVal){



				if(angular.isDefined(oldVal)){
					
					if(angular.equals(scope.$parent.elementMark, undefined)){
						scope.$parent.elementMark = oldVal;
					}

					scope.$parent.elementMark = scope.$parent.elementMark - oldVal;
					var markToBeAdded = newVal;;
				}
				else {
					var markToBeAdded = newVal;
				}
				
				if(angular.isDefined(scope.result)){

					scope.result.data.markScored = scope.result.data.value.markScored;
					//scope.result.data.value.markScored = scope.data.value.markScored;
					
					if(angular.equals(scope.$parent.elementMark, undefined)){
						scope.$parent.elementMark = 0;
					}
					
					scope.$parent.elementMark = scope.$parent.elementMark +  markToBeAdded;

				}
			})

			

			// ***************************************************
			// a function to change the result status from not evaluated to custom marks when somebody changes the marks manually
			scope.markChanged = function () {

				if(angular.equals(scope.result.data.value.markScored,scope.result.data.value.mark.totalMark)){
					scope.result.data.value.resultStatus = "correct";
				}
				else {
					scope.result.data.value.resultStatus = "custom mark";
				}
				

				
				if(angular.isDefined(scope.fromAssignment)){

						scope.applyPenalty();
				}	
			}

			//a function to apply the penalty
			scope.applyPenalty = function() {

				if(!angular.equals(scope.result.data.value.markScored, undefined)){	
					
					// applying penalties if any, if the question is inside an assignment with  a time out
				if(timeOut) {clearTimeout(timeOut);}
					timeOut = setTimeout(function(){					
						
						if(angular.isDefined(scope.fromAssignment)){				
							console.log(scope.fromAssignment);
							if(scope.fromAssignment.value.penaltyHistory.length){
								scope.penaltyHistory = scope.fromAssignment.value.penaltyHistory;
								scope.result.data.value.markScored = assignmentFunctions.applyPenalty(scope,  scope.result.data.value.markScored);
								scope.$apply();
							}
						}
					},600);				


				}

			}

			//.End Anoop


			
			


			// //setting up a watch on the markscoredObject of data to update the total marks scored
			// scope.$watch('data.value.markScored', function(){
			// 		alert('hi')
			// 	scope.result.data.markScored = scope.data.value.markScored;

			// });


			// Pre-fetch an external template populated with a custom scope
   			var submitModal = $modal({scope: scope, template: 'angularModules/courseElementFields/assignmentQuestionViewer/modals/showImage.html', show: false,placement:'center'});
 			// Show when some event occurs (use $promise property to ensure the template has been loaded)

			// show the enlarged version of the image in a popup
			scope.showImage = function(mode){	

				
				if (angular.equals(mode,'input')){

					scope.imgToBeShown = scope.fromAssignment.value.inputImage;
				}
				else if (angular.equals(mode,'output')) {
					scope.imgToBeShown = scope.fromAssignment.value.outputImage;
				}
				
				submitModal.$promise.then(submitModal.show);
			}


		// -----------------------------------------------------------------------------------------------------

//function to show or hide the from parameter based on selected values
			scope.fnShowBlockSubmission = function(blockSubmission) {

				if (blockSubmission) {
					return "block submission and ";
				}
				else{
					return "";
				}
			}

// -----------------------------------------------------------------------------------------------------
//if block submission is true, don't show the penalty frequency
			scope.fnShowPenaltyFrequency = function(rule){

				if (rule.blockSubmission) {
					return "";
				}
				else{
					return "for" + rule.penaltyFrequency;
				}
				
			}
// -----------------------------------------------------------------------------------------------------
	//function show by date
			scope.fnShowByDate = function(submissionMode, lateTime,lateTimeUnits){

				if (!angular.equals(submissionMode, 're-submitted')){
					
					return "by " + lateTime + " " + lateTimeUnits
				}
				else{
					return "";
				}
			}
// -----------------------------------------------------------------------------------------------------



		}
	};
}]);
