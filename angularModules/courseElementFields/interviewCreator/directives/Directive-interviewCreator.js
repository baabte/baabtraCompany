
angular.module('baabtra').directive('interviewCreator',['interviewFunctions', '$rootScope' ,'$alert', function(interviewFunctions, $rootScope, $alert) {

	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/courseElementFields/interviewCreator/directives/Directive-interviewCreator.html',
		link: function(scope, element, attrs, fn) {


			// initialising the object to be returned
			if(angular.equals(scope.ngModel, undefined)) {
				scope.ngModel = {};
			}

			//variable to controm the selected tab in the question object
			scope.selectedTab = 'question';

			// initialising the question selection object
			scope.ngModel.questionSelection = {};
			scope.ngModel.questionSelection.type = 'manual';

			//configuring default values for the no. of random questions and the passcriteria
			scope.ngModel.passCriteria = 70;
			scope.ngModel.questionSelection.noOfQuestions = 10;
			

			//setting the question edit mode to false to show only the add question button at the beginning
			scope.questionEditMode = false;

			//initialising a question object
			scope.questionObj = {};



			//function to add a question 
			scope.addQuestion = function (questionObj){


				// checking whether the object is null or the question field is empty
				var equateArray = [null,undefined,""];		

				if(angular.equals(questionObj,{}) || !angular.equals(equateArray.indexOf(questionObj.question), -1) ){
					return;
				}

				// initialising the question array object
				if(angular.equals(scope.ngModel.questionArray,undefined)){
					scope.ngModel.questionArray = [];
				}

				scope.ngModel.questionArray.push(questionObj);
				scope.addToQuestionBank(questionObj);

				scope.questionObj = {}; 
				scope.selectedTab = 'question';

			}

			//function to remove rule
			scope.removeQuestion = function(questionObj,index) {
				scope.deleteFromQuestionBank(questionObj);
				scope.ngModel.questionArray.splice(index,1);				
			}
			
			//function to edit rule
			scope.editQuestion = function(question) {
				scope.questionObj = question;
				scope.questionEditMode = true;
			}

			//function to edit rule
			scope.updateQuestion = function(questionObj) {
				scope.questionObj = {};
				scope.selectedTab = 'question';
				scope.questionEditMode = false;
				scope.addToQuestionBank(questionObj);

				scope.questionObj = {}; 
				scope.selectedTab = 'question';
			}


//--------------------------------------------------------------------------------
	//function to add the question to the question bank

	scope.addToQuestionBank = function(questionObj){

		var cmp_id = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;

		questionObj.companyId = cmp_id;
		if (questionObj._id){
			if (questionObj._id.$oid){
				questionObj._id = questionObj._id.$oid;
			}
		}

		var response = interviewFunctions.fnAddToQuestionBank(questionObj);     
     	response.then(function(response){

	     	response = angular.fromJson(JSON.parse(response.data));

	     	if(response.str){
	     		questionObj._id = response.str;
			$alert({title:'Success',content:'The question has been added to the question bank', placement:'top-right', duration:'4', animation:'am-fade-and-slide-bottom', type:'success', show:true});

	     	}


			});
     	}

//--------------------------------------------------------------------------------

//function to delete question from the question bank

	scope.deleteFromQuestionBank = function(questionObj){



			if (questionObj._id){
				if (questionObj._id.$oid){
					questionObj._id = questionObj._id.$oid;
				}




				var response = interviewFunctions.fnDeleteFromQuestionBank(questionObj._id);     
	     			response.then(function(response){

		     			response = angular.fromJson(JSON.parse(response.data));

		     			if(angular.equals(response.result,'success')){
							$alert({title:'Success',content:'The question has been removed from the question bank', placement:'top-right', duration:'4', animation:'am-fade-and-slide-bottom', type:'success', show:true});
		     				questionObj._id = response.str;
		     			}

				});
			}

     	}

//--------------------------------------------------------------------------------


		} //. End link
	};
}]);

