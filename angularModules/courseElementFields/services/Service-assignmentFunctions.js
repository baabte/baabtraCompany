angular.module('baabtra').service('assignmentFunctions',['$http', 'bbConfig',function ($http, bbConfig) {

	this.fnSubmitAssignment = function (objToBeSaved){
		var promise = $http({
			url: bbConfig.BWS+'fnSubmitAssignment/',
			data: {"objToBeSaved":objToBeSaved},
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	});
	 	return promise;
	 };

// _______________________________________________________________________________________
	 //function to check for the penalty
	 // a metrics for the calculation in accordance with the late time units 
	var calculationMetrics = {hours:3600000,
							  days:86400000,
							  months:2592000000};	

	 this.checkForPenalty = function(scope) {



				var duration = scope.data.value.duration.duration * calculationMetrics[scope.data.value.duration.durationUnit];					
					
		
				//checking if there is an assigned date
				if(!angular.equals(scope.$parent.previewData.assignedDate,undefined)){		

					var assignedDate = new Date(scope.$parent.previewData.assignedDate);
					assignedDate = assignedDate.getTime();
					
					var sumbittedDate = new Date();
					sumbittedDate = sumbittedDate.getTime();
					if(sumbittedDate > (assignedDate + duration)){
						scope.checkAndApplyPenalty = true;
						scope.timeDiff = Math.abs(sumbittedDate - (assignedDate + duration));
					}
																																																											
				
				
				} else{


					
					var sumbittedDate = new Date();
					sumbittedDate = sumbittedDate.getTime();
					
					var courseAssignedDate = new Date(scope.$parent.previewData.courseAssignedDate);
					courseAssignedDate = courseAssignedDate.getTime();
					
					var tlPoint = parseInt(scope.$parent.previewData.tlPointInMinute)*60*1000;
					
					if(sumbittedDate > (courseAssignedDate + tlPoint + duration)){						
						scope.checkAndApplyPenalty = true;
						scope.timeDiff = Math.abs(sumbittedDate - (courseAssignedDate + tlPoint + duration));	
						
				}
					
			}			
				
	}


// _______________________________________________________________________________________

	//function to check for the penalties which are applicable to the specific submit cases
	this.findPenalty = function(scope, element) {	

	scope.penaltyHistory = [];    
	
	var penaltyArray = scope.data.value.penaltyArray;
				


	

	//an object to push hold the eligible penalty object, for eg. if there are objects of late time 5 and 10 respectively and submission is late by 11 days only the object with latetime 10 is to be pushed
	var objTobePushed = {};

	//finding out the applicable penalty obj
	for (var i in penaltyArray){
		currentPenaltyObj =penaltyArray [i];
		

		var currentDuration = parseInt(currentPenaltyObj.lateTime)*(calculationMetrics[currentPenaltyObj.lateTimeUnits]);

		if(angular.equals(element.resultStatus,"to be resubmitted")){

			
			if (!angular.equals(element.penaltyHistory,undefined) && !angular.equals(element.penaltyHistory,null)){
					scope.penaltyHistory = angular.copy(element.penaltyHistory);
			}

			if(angular.equals(currentPenaltyObj.submissionMode,"re-submitted")){
				//pushing the penalty object into the penalty array
				currentPenaltyObj.delayInMilliSeconds = scope.timeDiff
				scope.penaltyHistory.push(currentPenaltyObj);
			}

			if(angular.equals(currentPenaltyObj.submissionMode,"re-submission is late")){
				if(scope.timeDiff>currentDuration){
						//pushing the penalty object into the penalty array
						currentPenaltyObj.delayInMilliSeconds = scope.timeDiff
						scope.penaltyHistory.push(currentPenaltyObj);
				}
			}			

			return;
		}


		if(scope.timeDiff > currentDuration){

			// if object to be pushed is empty blindly push the current object
			if(angular.equals(objTobePushed,{})){
				objTobePushed = angular.copy(currentPenaltyObj);
			}
			//if objecttobepushed is not empty, check whether the current latetime is greater than the latetime inside object to be pushed and if that is true replace object to be pushed with current penalty
			else if (currentDuration > parseInt(objTobePushed.lateTime)*(calculationMetrics[objTobePushed.lateTimeUnits])){
				objTobePushed = angular.copy(currentPenaltyObj);
			}			
			
		}
	}

	//pushing the penalty object into the penalty array
	objTobePushed.delayInMilliSeconds = scope.timeDiff
	scope.penaltyHistory.push(objTobePushed);

	return;
			
}

// _______________________________________________________________________________________

// function to apply the penalties
this.applyPenalty = function(scope, totalMarks){
	
	
	//calculating the reduction marks
	var reduce = 0;

	for (var i in scope.penaltyHistory){
	

	var currentPenalty = scope.penaltyHistory[i];

		//if an exemption is set manually for applying the  skip that object
    	if(!angular.equals(currentPenalty.exemptRule, undefined)){
			if(currentPenalty.exemptRule){
				continue;
			}
		}

		if(currentPenalty.blockSubmission){
			scope.blockSubmission = true;
		}

		

		if(angular.equals(currentPenalty.penaltyCalculationUnit,"% of marks")){		
			reduce = parseInt(totalMarks)*(currentPenalty.reductionUnits/100);

		}
		else if (angular.equals(currentPenalty.penaltyCalculationUnit,"times of marks")){
			
			reduce = parseInt(totalMarks)*currentPenalty.reductionUnits;

		}
		else if (angular.equals(currentPenalty.penaltyCalculationUnit,"marks")){
			
			reduce = currentPenalty.reductionUnits;

		}

		

		//multiplying the reduction marks with the frequency
		if(angular.equals(currentPenalty.penaltyCalculationUnit,"each day delayed")){
			var diffDays = Math.ceil(currentPenalty.delayInMilliSeconds / (1000 * 3600 * 60 * 24));
			reduce = reduce*diffDays;
		}

		totalMarks = parseInt(totalMarks) - reduce;
	}
	
 	
	return totalMarks;	

}

// _______________________________________________________________________________________


}]);