angular.module('baabtra').directive('testQuestionView',['bbConfig','addCourseService','$compile','questionAnsweringSrv','$rootScope','$state', function(bbConfig,addCourseService,$compile,questionAnsweringSrv,$rootScope,$state) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:'@',
			index:'=',
			courseElement:'=',
			multiAnswer:'=',
			questionResponse:'='
		},
		templateUrl: 'angularModules/courseElementFields/testQuestionView/directives/Directive-testQuestionView.html',
		link: function(scope, element, attrs, fn) {
			
			

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
				courseId=$state.params.courseId;
				scope.isMentee=true;
			}

			




			//this function is used to format the date from milliseconds
			scope.convertDate=function (millisec) {
				var date=new Date(millisec);
				return {day:date.toDateString(),time:date.toTimeString()};
			};



			//For creating element with unique ID
			scope.randomKey=Math.floor(Math.random()*1000000);

			
			//initializing mark
			scope.questionResponse.markScored=0;

			//this is to format the data attribute of this directive into JSON object
			var unbind=scope.$watch('data',function (argument) {
				if(!(scope.data instanceof Object)){
					scope.data=JSON.parse(scope.data);					
				}
				scope.question=scope.data.value;
				
			
				{
					if(scope.question.userAnswer){
						scope.dbAnswer=scope.question.userAnswer;
					}
				
					
			 				scope.questionResponse.userAnswer=[];		
				
				//Creating directive elements according to type of question
				var answerArea=$('#answers'+scope.randomKey);

				if(scope.question.type=='objective'){
					evStatus=1;
					var optionsElem=$('<objective-options>');
					    optionsElem.attr('options',"question.options");
					    optionsElem.attr('answer-type',"question.answerType");
					    optionsElem.attr('answer',"question.answer");
					    optionsElem.attr('mark-scored','questionResponse.markScored');
					    optionsElem.attr('user-answer','questionResponse.userAnswer');
					    optionsElem.attr('db-answer','dbAnswer');
					    optionsElem.attr('mark-obj',JSON.stringify(scope.question.mark));
					answerArea.html(optionsElem);
					$compile(optionsElem)(scope);
					
				}
			 if(scope.question.type=='descriptive'){
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
									debugVal.value=scope.dbAnswer[0].primaryAnswer[debugVal.name];
									//edited by arun to show answer 
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
									debugVal.value=scope.dbAnswer[0].secondaryAnswer[debugVal.name];

								}
							}
						}

						scope.secondaryForm.fields.push(debugVal);
					}
					evStatus=0;
					scope.questionResponse.evaluated=evStatus;
					var descriptiveElem=$('<descriptive-answer>');
						descriptiveElem.attr('primary','primaryForm');
						descriptiveElem.attr('secondary','secondaryForm');
						descriptiveElem.attr('user-answer','questionResponse.userAnswer');
						descriptiveElem.attr('mark-scored','questionResponse.markScored');
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
                                temp[item.name].value=scope.questionResponse.userAnswer[0].primaryAnswer[item.name];
                                temp[item.name].type=customProperty.text;
                                if(angular.equals(customProperty.text,"doc-viewer")){ // if it is a file, it should be stored in server to show preview through
                                                                                      // google doc preview
                                    scope.weHaveGotAprimaryFile=true;
                                    var promise=addCourseService.fnCourseFileUpload(temp[item.name].value, path); // uploading file to the server
                                    promise.then(function(data){ // call back function for the fileupload
                                          temp[item.name].fileType = temp[item.name].value.type;
                                          temp[item.name].value='http://docs.google.com/gview?url='+bbConfig.BWS+'files/'+path+'/'+data.data.replace('"','').replace('"','')+'&embedded=true';
                                          temp[item.name].url=bbConfig.BWS+'files/'+path+'/'+data.data.replace('"','').replace('"','');
                                          scope.ItsTimeToSavePrimaryToDB=true;
                                    });
                                }

                        }
                            else{

                                if((loopCounter==maxLoopValue)&&!weHaveGotPreviewKey){ // when count meets length of custom list and still
                                    temp[item.name]=scope.questionResponse.userAnswer[0].primaryAnswer[item.name];
                                }

                            }
                        });
                        
                        
                    }
                    else{
                        temp[item.name]=scope.questionResponse.userAnswer[0].primaryAnswer[item.name];
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
                                temp[item.name].value=scope.questionResponse.userAnswer[0].secondaryAnswer[item.name];
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
                                    temp[item.name]=scope.questionResponse.userAnswer[0].secondaryAnswer[item.name];
                                }

                            }
                        });
                        
                        
                    }
                    else{
                        temp[item.name]=scope.questionResponse.userAnswer[0].secondaryAnswer[item.name];
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
			
		}
	};
}]);
