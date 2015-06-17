angular.module('baabtra').directive('physicalTestViewerEv', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"="
		},
		templateUrl: 'angularModules/courseElementFields/physicalTestViewerEv/directives/Directive-physicalTestViewerEv.html',
		link: function(scope, element, attrs, fn) {

//__INITIALISING AND PREPARING DATA_______________________________________________________________________________________________
			


			// initialisisng the return variable
			if(angular.equals(scope.result, undefined)){
				scope.result = scope.$parent.result[parseInt(attrs.index)];
				scope.result.data = angular.copy(scope.data);
			}

			// initialising an array to hold the genders			
			scope.genders = [{label:"Male", value:"Male"}
			, {label:"Female", value:"Female"}];

			//array to hold the categorization
			scope.categorizations = [
			{label:"age", value:"age"},
			{label:"height", value:"height"},
			{label:"weight", value:"weight"}];

			//array to hold the pass/fail statuses
			scope.passStatuses = [
			{label:"pass", value:"pass"},
			{label:"fail", value:"fail"}];


			//array to hold the time units
			scope.timeUnits = [
			{label:"seconds", value:"seconds"},
			{label:"minutes", value:"minutes"},			
			{label:"hours", value:"hours"},
			{label:"days", value:"days"}];

			//array to hold the length units
			scope.distanceArray = ['Height','Length'];
			scope.lengthUnits = [
			{label:"centimeters", value:"centimeters"},
			{label:"meters", value:"meters"},
			{label:"kilometers", value:"kilometers"}];

			

//_____________________________________________________________________________________________________
// manipulating the data to build a more consise object to show to the user

			// Initialising an array to hold the pass criteria objects
			var passCriteriaArray = [];

			//taking the test object into an array
			scope.tests = scope.result.data.value.tests;			

			// looping through tests to build an array to get the screens for evaluation
			scope.evaluateArray = [];//this array will only have the data relevant to the added type and data present in it			
			var currentType = {};
			var currentCriteria = {};
			
			//looping through the outer object
			for (var i in scope.tests){

				// an object to hold the real details of the candidate which has to be validated against the pass criteria of each type
				scope.tests[i].candidate = {};

				scope.tests[i].passStatus = 'fail';

				currentType = angular.copy(scope.tests[i]);

				//looping through the pass criteria objects in the current test object to build the data
				var categorizationArray = [];
				var addedCategories = [];
				var genderArray = [];
				var evalUnitsArray = [];
				var perTimeUnitArray = [];
				var checkCategory = false;
				var categoryFree = false;
				var checkGender  = false;
				var genderFree = false;
				var checkPer = false;
				var perFree = false;
			// =============================================
				for (var j in currentType.passCriteria) {
				
					currentCriteria = currentType.passCriteria[j];

					
					if(currentCriteria.checkCategory){
						checkCategory = true;
						
						if(angular.equals(addedCategories.indexOf(currentCriteria.categorization), -1)){

							addedCategories.push(currentCriteria.categorization);

							categorizationArray.push({category:currentCriteria.categorization})
							
						}
					}
					

					if(currentCriteria.checkGender){
						checkGender = true;

						if(angular.equals(genderArray.indexOf(currentCriteria.gender), -1)){
							genderArray.push(currentCriteria.gender)
						}

					}
					else{
						genderFree = true;
						scope.tests[i].candidate.genderFree = true;
					}

					//checking the per {{minutes}} option
					if(currentCriteria.per){
						checkPer = true;

						if(angular.equals(perTimeUnitArray.indexOf(currentCriteria.perTimeUnit), -1)){
							perTimeUnitArray.push(currentCriteria.perTimeUnit)
						}

					}
					else{
						perFree = true;
						scope.tests[i].candidate.perFree = true;
					}


					if(angular.equals(evalUnitsArray.indexOf(currentCriteria.evalUnit), -1)){
							evalUnitsArray.push(currentCriteria.evalUnit)
					}

					

				} //. for currentType.passCriteria
			// =============================================

			// building the gender object
			if(genderArray.length){
				var genderOptions = [];
				for(var k in genderArray){
					// initialising an array to hold the genders			
					genderOptions.push({label:genderArray[k], value:genderArray[k]});			
				}
				scope.tests[i].candidate.gender = genderArray[0];
			}

			// building the categirization object
			if(perTimeUnitArray.length){
				var perTimeUnitsOptions = [];
				for(var k in perTimeUnitArray){
					// initialising an array to hold the genders			
					perTimeUnitsOptions.push({label:perTimeUnitArray[k], value:perTimeUnitArray[k]});
					
				}
				scope.tests[i].candidate.perTimeUnit = perTimeUnitArray[0];
			}

			// // building the categirization object
			// if(categorizationArray.length){
			// 	var categorizationOptions = [];
			// 	for(var k in categorizationArray){
			// 		// initialising an array to hold the genders			
			// 		categorizationOptions.push({label:categorizationArray[k], value:categorizationArray[k]});
					
			// 	}
			// 	scope.tests[i].candidate.categorization = categorizationArray[0];
			// }

			// building the evalUnits object
			if(evalUnitsArray.length){
				var evalUnitsOptions = [];
				for(var k in evalUnitsArray){
					// initialising an array to hold the genders			
					evalUnitsOptions.push({label:evalUnitsArray[k], value:evalUnitsArray[k]});
			
				}
				scope.tests[i].candidate.evalUnit = evalUnitsArray[0];
				
			}

			// attaching these values to the current type
			
				scope.tests[i].candidate.categorizationArray = categorizationArray;
			

			if(!genderFree){
				currentType.genderArray = genderOptions;
			}
			else{
				currentType.genderArray = scope.genders;
				scope.tests[i].candidate.gender = 'Male';
			}

			if(!perFree){
				currentType.perTimeUnitArray = perTimeUnitsOptions;
			}
			else{
				currentType.perTimeUnitArray = scope.timeUnits;
				scope.tests[i].candidate.perTimeUnit = 'minutes';
			}



			currentType.evalUnitsArray = evalUnitsOptions;
			currentType.checkCategory = checkCategory;
			currentType.checkGender  = checkGender;
			currentType.checkPer  = checkPer;

			scope.tests[i].candidate.timeUnit = 'minutes';
			scope.tests[i].candidate.lengthUnit = 'meters';

			scope.evaluateArray.push(currentType);

			}//for. tests

//_____________________________________________________________________________________

		// function to check whether the candidate is passed or failed
		scope.validate = function(testType){

			var candidate = testType.candidate;
			var passCriteria = testType.passCriteria;

			var equateArray = ['',undefined, null];


			// looping in test object to evaluate a candidate
			var criteriaArray = [];
			var checkCriteria = {};

			//building up the criteria array to check
			for(var i in passCriteria){
				checkCriteria = passCriteria[i];

						if(angular.equals(candidate.gender, checkCriteria.gender)){
							
						if(candidate.categorizationArray.length) {	
							for(var j in candidate.categorizationArray){
								var currentCategorization = candidate.categorizationArray[j];
								if(angular.equals(currentCategorization.category,checkCriteria.categorization)){
									if(currentCategorization.value>=checkCriteria.minLimit && currentCategorization.value<=checkCriteria.maxLimit) {	
											criteriaArray.push(checkCriteria);
										}
								}
							}
						  }
						  else{
						  	criteriaArray.push(checkCriteria);
						  }
						}				

				}
			

			
			if(criteriaArray.length){
				

				//looping in the criteria array to find out the status
				for(var i in criteriaArray){
					
					checkCriteria = criteriaArray[i];

					var valueToCheck;

					if(checkCriteria.per && !angular.equals(candidate.performedTime, undefined) && angular.equals(checkCriteria.perTimeUnit,candidate.perTimeUnit)){

						valueToCheck = candidate.performedUnits/candidate.performedTime;

					}else{
						valueToCheck = angular.copy(candidate.performedUnits);
					}



					//quitting the function if value to check is undefined
					if(angular.equals(valueToCheck, undefined)){
						return;
					}

					testType.passStatus = 'fail';

					//setting the pass status to true if the candidate's performance is fine
						if(angular.equals(checkCriteria.equate,'less than')){
						
							if(parseInt(valueToCheck) < parseInt(checkCriteria.passLimit)){
								testType.passStatus = 'pass';
								return;
							}
						}	
						else if(angular.equals(checkCriteria.equate, 'less than or equal to')){
							if(parseInt(valueToCheck)<=parseInt(checkCriteria.passLimit)){
								testType.passStatus = 'pass';
								return;
							}
						}
						else if(angular.equals(checkCriteria.equate, 'greater than' )){
							if(parseInt(valueToCheck)>parseInt(checkCriteria.passLimit)){
								testType.passStatus = 'pass';
								return;
							}
						}
						else if(angular.equals(checkCriteria.equate, 'greater than or equal to' )){
							if(parseInt(valueToCheck)>=parseInt(checkCriteria.passLimit)){
								testType.passStatus = 'pass';
								return;
							}
						}
						else if(angular.equals(checkCriteria.equate, 'equal to' )){
							if(parseInt(valueToCheck)==parseInt(checkCriteria.passLimit)){
								testType.passStatus = 'pass';
								return;
							}
						}


				}




			}
			else{
							// $alert({title:'Sorry',content:'Sorry we, could not find a suitable criteria for evaluation, please update the pass or fail status yourself.', placement:'top-right', duration:'4', animation:'am-fade-and-slide-bottom', type:'warning', show:true});

			}
			


		}
//_____________________________________________________________________________________

		scope.buildCriteria = function(passCriteria){

			var strCriteria = '';

			if(passCriteria.checkGender && passCriteria.checkCategory){
				strCriteria = passCriteria.gender + 's whose ' +  passCriteria.categorization + ' is between ' + passCriteria.minLimit + ' and ' + passCriteria.maxLimit;

				if(angular.equals(passCriteria.categorization,"age")){
				strCriteria  = strCriteria + ' years ';
				}
				else if(angular.equals(passCriteria.categorization,"height")){
					strCriteria  = strCriteria + ' cm ';
				}
				else if(angular.equals(passCriteria.categorization,"weight")){
					strCriteria  = strCriteria + ' Kg ';
				}
			}
			else if (!passCriteria.checkGender && passCriteria.checkCategory){
				strCriteria = 'People whose ' + passCriteria.categorization + ' is between ' +  passCriteria.minLimit + ' and ' + passCriteria.maxLimit;

				if(angular.equals(passCriteria.categorization,"age")){
				strCriteria  = strCriteria + ' years ';
				}
				else if(angular.equals(passCriteria.categorization,"height")){
					strCriteria  = strCriteria + ' cm ';
				}
				else if(angular.equals(passCriteria.categorization,"weight")){
					strCriteria  = strCriteria + ' Kg ';
				}
			}
			else if (passCriteria.checkGender && !passCriteria.checkCategory){
				strCriteria = passCriteria.gender + 's '
			}

			

			 strCriteria  = strCriteria + 'pass the test if '; 

			 strCriteria  = strCriteria + passCriteria.evalUnit + ' is ' + passCriteria.equate + ' ' +  passCriteria.passLimit;

			 if(!angular.equals(scope.distanceArray.indexOf(passCriteria.evalUnit), -1)){
			 	strCriteria = strCriteria + ' ' + passCriteria.lengthUnit;
			 }
			 else if (angular.equals(passCriteria.evalUnit, 'Time')) {

			 	strCriteria = strCriteria + ' ' + passCriteria.timeUnit;

			 }


			 if(passCriteria.per){
			 	strCriteria = strCriteria + ' per ' + passCriteria.perTimeUnit;
			 }

			 return strCriteria;
		}	


//_____________________________________________________________________________________




		}//End. link
	};
});
