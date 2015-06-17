angular.module('baabtra').directive('physicalTestCreator', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel: "="
		},
		templateUrl: 'angularModules/courseElementFields/physicalTestCreator/directives/Directive-physicalTestCreator.html',
		link: function(scope, element, attrs, fn) {

			//initiating the return object
			if(angular.equals(scope.ngModel, undefined)) {
				scope.ngModel = {};
				//initiatialising an array of tests including pass criteria
				scope.ngModel.tests = [];
			}

					

			//initiating a blank physical test object
			scope.physicalTest = {};
			

			// initialising an array to hold the genders			
			scope.genders = [{label:"Men", value:"Male"}
			, {label:"Women", value:"Female"}];

			// initialising an array to hold the units for evaluation						
			scope.evalUnits = [{label:"Time", value:"Time"}
			, {label:"Number", value:"Number"}
			, {label:"Height", value:"Height"}
			, {label:"Length", value:"Length"}];

			//array to hold the time units
			scope.timeUnits = [
			{label:"seconds", value:"seconds"},
			{label:"minutes", value:"minutes"},
			{label:"hours", value:"hours"},
			{label:"days", value:"days"}
			];

			//array to hold the length units
			scope.distanceArray = ['Height','Length'];
			scope.lengthUnits = [
			{label:"centimeters", value:"centimeters"},
			{label:"meters", value:"meters"},
			{label:"kilometers", value:"kilometers"}];

			//array to hold the categorization
			scope.categorizations = [
			{label:"age", value:"age"},
			{label:"height", value:"height"},
			{label:"weight", value:"weight"}];

			// initialising an array to hold the equaltes			
			scope.equates = [{label:"less than", value:"less than"}
			, {label:"less than or equal to", value:"less than or equal to"}
			, {label:"greater than", value:"greater than"}
			, {label:"greater than or equal to", value:"greater than or equal to"}
			, {label:"equal to", value:"equal to"}];


			// initialising an object with initial data
			scope.passCriteriaObj = {
				gender:'Male',
				evalUnit:'Number',
				equate:'greater than',
				timeUnit:'minutes',
				perTimeUnit:'minutes',
				categorization:'age',
				lengthUnit:'meters'

			};


// FUNCTIONS //

//-------------------------------------------------------------------------------------

			//function to add a physical test object to the list in the returning object
			scope.addTest = function(testObj) {
				// checking whether the object is null or the question field is empty
				var equateArray = [null,undefined,""];		

				if(angular.equals(testObj,{}) || !angular.equals(equateArray.indexOf(testObj.type), -1) ){
					return;
				}

				//pushing a pass criteria object with initial values to show the fields for adding the criteria
				testObj.passCriteriaObj = angular.copy(scope.passCriteriaObj);
				testObj.passCriteria = [];
				testObj.showGender = true;
				testObj.showCategory = true;
				testObj.showGenderDD = true;
				testObj.showCategoryDD = true;
				scope.ngModel.tests.push(angular.copy(testObj));
				testObj = {};
			}

//-------------------------------------------------------------------------------------

			//function to add a criteria to a test type
			scope.addCriteria = function(testType){
				
				var equateArray = [null,undefined,""];	

				//we have to only check the pass limit parameter as it is the only value that dicides the pass/fail of a candidate in a particular test type
				if(!angular.equals(equateArray.indexOf(testType.passCriteriaObj.passLimit), -1)){					
					return;
				}

				testType.passCriteria.push(angular.copy(testType.passCriteriaObj));
				fnShowGenderCheckBox(testType);
				testType.passCriteriaObj = angular.copy(testType.passCriteriaObj);
				
			}

//-------------------------------------------------------------------------------------		//function to build and show the criteria for passing the test

			//function to update criteria
			scope.updateCriteria  = function(testType, passCriteriaObj){
				testType.criteriaEditMode = false;

				fnShowGenderCheckBox(testType);
				testType.passCriteriaObj = angular.copy(testType.passCriteriaObj);
									
			}


//-------------------------------------------------------------------------------------		//function to build and show the criteria for passing the test
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

//-------------------------------------------------------------------------------------	//function to remove rule
			scope.removeCriteria = function(testType, index) {
				
				testType.passCriteria.splice(index,1);
				fnShowGenderCheckBox(testType);

			}
//-------------------------------------------------------------------------------------	//function to remove rule
			
			//function to edit rule
			scope.editCriteria = function(testType, criteria) {
				testType.passCriteriaObj = criteria;
				testType.criteriaEditMode = true;
			}
//-------------------------------------------------------------------------------------	//function to remove  a type
			scope.removeType = function(index) {
				scope.ngModel.tests.splice(index,1);
			}

//-------------------------------------------------------------------------------------	//function to remove  a type
			// function to check whether the check gender check box should be shown
			var fnShowGenderCheckBox = function(test){

			
			 	
			 	var countGender = 0;
			 	var countCategory = 0;
			 	var genderFreeCount = 0;
			 	var categoryFreeCount = 0;

				for (var i in test.passCriteria){
					if(test.passCriteria[i].checkGender){
						countGender = countGender+1;
					}
					else{
						genderFreeCount = genderFreeCount + 1;
					}

					if(test.passCriteria[i].checkCategory){
						countCategory = countCategory+1;
					}
					else{
						categoryFreeCount = categoryFreeCount + 1;
					}

				}

			 	if(countGender > 0){
			 		test.showGender = false;
				}
				else{
					test.showGender = true;
				}

				if(countCategory > 0){
			 		test.showCategory = false;
				}
				else{
					test.showCategory = true;
				}

				if(genderFreeCount > 0){
			 		test.showGenderDD = false;
				}
				else{
					test.showGenderDD = true;
				}

				if(categoryFreeCount > 0){
			 		test.showCategoryDD = false;
				}
				else{
					test.showCategoryDD = true;
				}

			}
//-------------------------------------------------------------------------------------	//function to remove  a type

		}//End. link
	};
});
