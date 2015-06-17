angular.module('baabtra').directive('questionViewer',['bbConfig','addCourseService','$compile','questionAnsweringSrv','$rootScope','$state', '$modal','commonSrv', function(bbConfig,addCourseService,$compile,questionAnsweringSrv,$rootScope,$state,$modal,commonSrv) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:'@',
			index:'=',
			courseElement:'=',
			multiAnswer:'=',
			courseId:'=',
			//added by Anoop to hide the individual submit button when appearing inside a test, assignment or stuff like that
			showSubmitButton:'@',
			thisScope:"=",
			//added by Anoop show assignment related options when the question happens to be inside an assignment
			fromAssignment:"="
		},
		templateUrl: 'angularModules/courseElementFields/questionViewer/directives/Directive-questionViewer.html',
		link: function(scope, element, attrs, fn) {
			
			//Anoop. building the previewData object to pass to the sub element directive
			scope.previewData = scope.courseElement;

			// Anoop . **** these are the things required when the question is appearing inside an assignment
			if(angular.isDefined(scope.fromAssignment)){
				scope.fromAssignment = JSON.parse(scope.fromAssignment);
			}

			//JSON-ifying the data object :)
			scope.data = JSON.parse(scope.data)
			

			// End. Anoop . **** these are the things required when the question is appearing inside an assignment


			var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId; // Role id of logged user
			var userLoginId;
			var courseId;
			var innerIndex=scope.index;
			var outerIndex=scope.courseElement.index;
			var tlPointInmins=scope.courseElement.tlPointInMinute;
			var keyName=scope.courseElement.Name;
			var evStatus=0;
			var isDescriptive=false;
			scope.isMentee=false;

			//if user is mentee copying all required datas 
			if(roleId===bbConfig.MURID){
				userLoginId=$rootScope.userinfo.userLoginId;
				courseId=scope.courseId;
				scope.isMentee=true;
			}

			scope.saveAnswer=function (argKeys) {
				
				var time=(new Date()).getTime();


				//there have different methods to save to database according to the question type
				if(isDescriptive){

					scope.answerToDb=[];
					scope.answerToDb[0]={primaryAnswer:{},secondaryAnswer:{}};
					scope.createPrimaryAnswer('candidateAnswers');
					scope.createSecondaryAnswer('candidateAnswers');
					var dbSaverUnbind=scope.$watch(function() { return scope.ItsTimeToSavePrimaryToDB+''+scope.ItsTimeToSaveSecondaryToDB; },function(){
						// alert(scope.ItsTimeToSavePrimaryToDB+''+scope.ItsTimeToSaveSecondaryToDB);
						if(scope.ItsTimeToSavePrimaryToDB && scope.ItsTimeToSaveSecondaryToDB){
			

								//Edited by ANOOP - if the function has an argument specified, the key value pairs in the answer object should be replaced with the key value pairs in the argument. This is to make this work with elements in which a question comes as a sub element, for eg. assignment, test etc. So the status or any key can be controlled by the directive which calls this function
								var ansObj = {userAnswer:scope.answerToDb,markScored:scope.mark,evaluated:evStatus,dateOfSubmission:time, submitStatus:'submitted'};

								if(!angular.equals(argKeys, undefined)){
									for (var key in argKeys){										
										ansObj[key] = argKeys[key];
									}
								}
								//.End

								//building a status history object for the question element
						 		var statusHistory = [];

			 					if(!angular.equals(ansObj.statusHistory, undefined) && !angular.equals(ansObj.statusHistory, null)){
							     	
							     	statusHistory = angular.copy(ansObj.statusHistory);
							     }

							     var date = new Date();
							     statusHistory.push({changedFrom:scope.data.status, changedTo:ansObj.submitStatus, changedBy:$rootScope.userinfo.ActiveUserData.roleMappingObj._id.$oid, changedOn:date});

							     ansObj.statusHistory = statusHistory;
							     // ****************************************************

								var promise = questionAnsweringSrv.saveAnswer(courseId,userLoginId,keyName,tlPointInmins,outerIndex,innerIndex,ansObj);
									promise.then(function (data) {
										console.log(angular.fromJson(JSON.parse(data.data)));
										if(!angular.equals(typeof data, 'Object')) {
											data=angular.fromJson(JSON.parse(data.data));
										}
										if(data.success){
											scope.question.userAnswer=scope.answerToDb;
											scope.dbAnswer=scope.answerToDb;
											scope.question.markScored=scope.mark;
											scope.question.evaluated=evStatus;
											scope.question.dateOfSubmission=time;
										}
									});
								


							dbSaverUnbind();

						}
							
					});
					
				}
				else{
					var promise=questionAnsweringSrv.saveAnswer(courseId,userLoginId,keyName,tlPointInmins,outerIndex,innerIndex,{userAnswer:scope.userAnswer,markScored:scope.mark,evaluated:evStatus,dateOfSubmission:time});
						promise.then(function (data) {
							if(!angular.equals(typeof data, 'Object')) {
								data=angular.fromJson(JSON.parse(data.data));
							}
							if(data.success){
								scope.question.userAnswer=scope.userAnswer;
								scope.dbAnswer=scope.userAnswer;
								scope.question.markScored=scope.mark;
								scope.question.evaluated=evStatus;
								scope.question.dateOfSubmission=time;
							}
						});	
				}
				
			};
			

			//this function is used to format the date from milliseconds
			scope.convertDate=function (millisec) {
				var date=new Date(millisec);
				return {day:date.toDateString(),time:date.toTimeString()};
			};


			//For creating element with unique ID
			scope.randomKey=Math.floor(Math.random()*1000000);

			
			//initializing mark
			scope.mark=0;

			//this is to format the data attribute of this directive into JSON object
			var unbind=scope.$watch('data',function (argument) {
			

				//added by Anoop to hide the individual submit button when appearing inside a test, assignment or stuff like that
			if(!angular.equals(scope.showSubmitButton, undefined)){

				if(angular.equals(scope.showSubmitButton, 'false')){
					scope.showSubmitButton = false;
				}

			}
			else{
				scope.showSubmitButton = true;
			}

			//.End
		

				if(!(scope.data instanceof Object)){
					if(!angular.equals(typeof data, 'Object')) {
						scope.data=JSON.parse(scope.data);
					}					
				}
				scope.question=scope.data.value;

			
				{
					if(scope.question.userAnswer){

						scope.dbAnswer=scope.question.userAnswer;
					}
				

						scope.userAnswer=[];
				
				//Creating directive elements according to type of question
				var answerArea=$('#answers'+scope.randomKey);
				if(scope.question.type=='objective'){
					evStatus=1;
					var optionsElem=$('<objective-options>');
					    optionsElem.attr('options',"question.options");
					    optionsElem.attr('answer-type',"question.answerType");
					    optionsElem.attr('answer',"question.answer");
					    optionsElem.attr('mark-scored','mark');
					    optionsElem.attr('user-answer','userAnswer');
					    optionsElem.attr('db-answer','dbAnswer');
					    optionsElem.attr('mark-obj',JSON.stringify(scope.question.mark));
					answerArea.html(optionsElem);
					$compile(optionsElem)(scope);
					
				}
				else if(scope.question.type=='descriptive'){
					isDescriptive=true;

					scope.primaryForm={};
					scope.secondaryForm={};
					scope.primaryForm.fields=[];
					scope.secondaryForm.fields=[];
					scope.markScored=0;
					var primaryLoop=0;
					var secondaryLoop=0;

					//these loops are used to format the form schema of descriptive answer
					for(primaryLoop;primaryLoop<scope.question.primaryAnswer.length;primaryLoop++){

						var debugVal=JSON.parse(scope.question.primaryAnswer[primaryLoop].Debug);

						if(!angular.equals(scope.dbAnswer,undefined)){
							if (!scope.dbAnswer.length==0) {
								 //this code is for re-binding the users answer from db
								if(scope.dbAnswer[0].primaryAnswer[debugVal.name]){
									debugVal.value=scope.dbAnswer[0].primaryAnswer[debugVal.name].value;
								}
							}
						}

						scope.primaryForm.fields.push(debugVal);
					}

					for(secondaryLoop;secondaryLoop<scope.question.secondaryAnswer.length;secondaryLoop++){

						var debugVal=JSON.parse(scope.question.secondaryAnswer[secondaryLoop].Debug);

						if(!angular.equals(scope.dbAnswer,undefined)){
							if (!scope.dbAnswer.length==0) {
								if(scope.dbAnswer[0].secondaryAnswer[debugVal.name]){
									debugVal.value=scope.dbAnswer[0].secondaryAnswer[debugVal.name].value;

								}
							}
						}

						scope.secondaryForm.fields.push(debugVal);
					}
					evStatus=0;
					var descriptiveElem=$('<descriptive-answer>');
						descriptiveElem.attr('primary','primaryForm');
						descriptiveElem.attr('secondary','secondaryForm');
						descriptiveElem.attr('user-answer','userAnswer');
						descriptiveElem.attr('mark-scored','mark');
						descriptiveElem.attr('db-answer','dbAnswer');
					answerArea.html(descriptiveElem);
					$compile(descriptiveElem)(scope);
				}
				
				}
			},true);



		scope.createPrimaryAnswer=function (path) {
            scope.ItsTimeToSavePrimaryToDB=false; // check for object built successfully or not
            scope.weHaveGotAprimaryFile=false;
            var fieldsTraversedCount=0;
            var totalFields=scope.primaryForm.fields.length;
            var temp = {}; // temp object for storing each elements in a course element
                    
               angular.forEach(scope.primaryForm.fields,function(item){ // looping through item template
                    fieldsTraversedCount++;
                    if(!angular.equals(item.customlist,undefined)) //checking if it is having a custom attrib or not
                    {
                        temp[item.name]={}; // each elements in a course element will be stored like this (Ex: Title, file ..etc.)
                        var loopCounter=0; // a counter for all loops comes inside custom list of properties
                        var maxLoopValue=item.customlist.length;
                        var weHaveGotPreviewKey=false;
                        angular.forEach(item.customlist,function(customProperty){
                            loopCounter++;
                            // here we build object to store into db and to push into timeline
                            if(angular.equals(customProperty.value,'previewkey')){ // checking is there have a value for previewkey
                                weHaveGotPreviewKey=true;
                                // console.log(scope.userAnswer[0].primaryAnswer[item.name]);
                                temp[item.name].value=scope.userAnswer[0].primaryAnswer[item.name];
                                temp[item.name].type=customProperty.text;


                                if(angular.equals(customProperty.text,"doc-viewer")){ // if it is a file, it should be stored in server to show preview through

                                if(!angular.equals(temp[item.name].value, undefined))  {
                                    scope.weHaveGotAprimaryFile=true;
                                    var promise=commonSrv.fnFileUpload(temp[item.name].value, path); // uploading file to the server
                                    promise.then(function(data){ // call back function for the fileupload
                                          temp[item.name].fileType = temp[item.name].value.type;
                                          temp[item.name].value='http://docs.google.com/gview?url='+bbConfig.BWS+'files/'+path+'/'+data.data.replace('"','').replace('"','')+'&embedded=true';
                                          temp[item.name].url=bbConfig.BWS+'files/'+path+'/'+data.data.replace('"','').replace('"','');
                                          scope.ItsTimeToSavePrimaryToDB=true;
                                    });

                                  }
                                    
                                }

                        }
                            else{

                                if((loopCounter==maxLoopValue)&&!weHaveGotPreviewKey){ // when count meets length of custom list and still
                                    temp[item.name]=scope.userAnswer[0].primaryAnswer[item.name];
                                }

                            }
                        });
                        
                        
                    }
                    else{
                        temp[item.name]=scope.userAnswer[0].primaryAnswer[item.name];
                    }
                    if(!scope.weHaveGotAprimaryFile&&(fieldsTraversedCount==totalFields)){
                                    scope.ItsTimeToSavePrimaryToDB=true;
                                }

                    scope.answerToDb[0].primaryAnswer[item.name]=temp[item.name];
                    
                });

                    
        };

    	scope.createSecondaryAnswer=function (path) {
            scope.ItsTimeToSaveSecondaryToDB=false; // check for object built successfully or not
            scope.weHaveGotASecondaryFile=false;
            var fieldsTraversedCount=0;
            var totalFields=scope.secondaryForm.fields.length;
            var temp = {}; // temp object for storing each elements in a course element
                    
               angular.forEach(scope.secondaryForm.fields,function(item){ // looping through item template
                    fieldsTraversedCount++;
                    if(!angular.equals(item.customlist,undefined)) //checking if it is having a custom attrib or not
                    {
                        temp[item.name]={}; // each elements in a course element will be stored like this (Ex: Title, file ..etc.)
                        var loopCounter=0; // a counter for all loops comes inside custom list of properties
                        var maxLoopValue=item.customlist.length;
                        var weHaveGotPreviewKey=false;
                        angular.forEach(item.customlist,function(customProperty){
                            loopCounter++;
                            // here we build object to store into db and to push into timeline
                            if(angular.equals(customProperty.value,'previewkey')){ // checking is there have a value for previewkey
                                weHaveGotPreviewKey=true;
                                temp[item.name].value=scope.userAnswer[0].secondaryAnswer[item.name];
                                temp[item.name].type=customProperty.text;
                                if(angular.equals(customProperty.text,"doc-viewer")){ // if it is a file, it should be stored in server to show preview through
                                                                                     // google doc preview

                                     if (angular.equals(temp[item.name].value,undefined)) {
                                     	delete temp[item.name];
                                     	return;
                                     }
                                    scope.weHaveGotASecondaryFile=true;
                                    var promise=addCourseService.fnCourseFileUpload(temp[item.name].value, path); // uploading file to the server
                                    promise.then(function(data){ // call back function for the fileupload
                                          temp[item.name].fileType = temp[item.name].value.type;
                                          temp[item.name].value='http://docs.google.com/gview?url='+bbConfig.BWS+'files/'+path+'/'+data.data.replace('"','').replace('"','')+'&embedded=true';
                                          temp[item.name].url=bbConfig.BWS+'files/'+path+'/'+data.data.replace('"','').replace('"','');
                                          scope.ItsTimeToSaveSecondaryToDB=true;
                                    });
                                }

                        }
                            else{

                                if((loopCounter==maxLoopValue)&&!weHaveGotPreviewKey){ // when count meets length of custom list and still
                                    temp[item.name]=scope.userAnswer[0].secondaryAnswer[item.name];
                                }

                            }
                        });
                        
                        
                    }
                    else{
                        temp[item.name]=scope.userAnswer[0].secondaryAnswer[item.name];
                    }
                    if(!scope.weHaveGotASecondaryFile&&(fieldsTraversedCount==totalFields)){
                                    scope.ItsTimeToSaveSecondaryToDB=true;
                                }

                    scope.answerToDb[0].secondaryAnswer[item.name]=temp[item.name];
                    
                });
				if(fieldsTraversedCount===0){
					 scope.ItsTimeToSaveSecondaryToDB=true;
				}
                    
        };

        scope.thisScope = scope;

        	// Pre-fetch an external template populated with a custom scope
   			var submitModal = $modal({scope: scope, template: 'angularModules/courseElementFields/assignmentQuestionViewer/modals/showImage.html', show: false,placement:'center'});
 			// Show when some event occurs (use $promise property to ensure the template has been loaded)

			// show the enlarged version of hthe image in a popup
			scope.showImage = function(mode){			

				if (angular.equals(mode,'input')){

					scope.imgToBeShown = scope.fromAssignment.value.inputImage;
				}
				else if (angular.equals(mode,'output')) {
					scope.imgToBeShown = scope.fromAssignment.value.outputImage;
				}
				
				submitModal.$promise.then(submitModal.show);
			}
			
		}
	};
}]);
