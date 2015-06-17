angular.module('baabtra').directive('assignmentQuestionCreator',['bbConfig','commonSrv','$http', function(bbConfig,commonSrv,$http) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/formGenFields/assignmentQuestionCreator/directives/Directive-assignmentQuestionCreator.html',
		link: function(scope, element, attrs, fn) {

			if(angular.equals(scope.ngModel, undefined)){
				scope.ngModel={};
				
				//initialising a question object
				scope.ngModel.question = {};				
			}

// **********************************************************************************************************************
			// function for change input/output image
			scope.imageChanged = function($files, mode){		

					if(angular.equals(mode, 'input')){
								  //this function remove old course image
								  if(!angular.equals(scope.ngModel.inputImage,undefined)){			  	
								    var fileRemoveResponse = commonSrv.fnRemoveFileFromServer(scope.ngModel.inputImage);
								    
								  }
								  //function for upload course Image  
								  var courseImageUploadResponse = commonSrv.fnFileUpload($files[0],"courseElements/assignment/inOut");
								  courseImageUploadResponse.then(function(response){			  	
									    

											scope.ngModel.inputImage = bbConfig.BWS+'files/courseElements/assignment/inOut/'+response.data.replace('"','').replace('"','');
											
									 });
					}
					else {
								 //this function remove old course image
								  if(!angular.equals(scope.ngModel.outputImage,undefined)){			  	
								    var fileRemoveResponse = commonSrv.fnRemoveFileFromServer(scope.ngModel.outputImage);
								   
								  }
								  //function for upload course Image  
								  var courseImageUploadResponse = commonSrv.fnFileUpload($files[0],"courseElements/assignment/inOut");
								  courseImageUploadResponse.then(function(response){			  	
						    

								scope.ngModel.outputImage = bbConfig.BWS+'files/courseElements/assignment/inOut/'+response.data.replace('"','').replace('"','');
								
							 });
						
					}			    
			 
			};

// **********************************************************************************************************************

//setting up a watch on the total marks of question so that the total marks of the assignment gets set
scope.$watch(function (){ return scope.ngModel.question.mark; }, function(){
	
	scope.ngModel.mark = scope.ngModel.question.mark;
	
}, true);



		}
	};
}]);
