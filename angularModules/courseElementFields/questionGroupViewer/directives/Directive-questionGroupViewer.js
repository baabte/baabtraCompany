angular.module('baabtra').directive('questionGroupViewer',['$rootScope','$modal','bbConfig','$state','testRelated',function($rootScope,$modal,bbConfig,$state,testRelated) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:'@',
			index:'=',
			courseElement:'='
		},
		templateUrl: 'angularModules/courseElementFields/questionGroupViewer/directives/Directive-questionGroupViewer.html',
		link: function(scope, element, attrs, fn) {

			var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId; // Role id of logged user
			var userLoginId;
			var courseMappingId;
			var innerIndex=scope.index;
			var outerIndex=scope.courseElement.index;
			var tlPointInmins=scope.courseElement.tlPointInMinute;
			var keyName=scope.courseElement.Name;
			var evStatus=0;
			var isDescriptive=false;
			scope.isMentee=false;
			scope.start=0;
			scope.questionAnswer=[];
			scope.totalMark=scope.courseElement.elements[outerIndex].value.mark;
			scope.examFinished=false;
			scope.timeObj={};
			scope.startSubmit=false;
			
			
			//if user is mentee copying all required datas 
			if(roleId===bbConfig.MURID){
				userLoginId=$rootScope.userinfo.userLoginId;
				courseMappingId=$state.params.courseMappingId;
				scope.isMentee=true;
				if(scope.courseElement.testStartTime){
					scope.startTest=true;
				}
				if(scope.courseElement.dateOfSubmission){
					// console.log(scope.courseElement);
					scope.isMentee=false;
				 	scope.examFinished=true;

				}
			}
			if(roleId===bbConfig.CURID){
				scope.startTest=true;
			}

			scope.dataValue= JSON.parse(scope.data);
			scope.noOfQuestions=scope.dataValue.value.testModel.length;
			

			if (angular.equals(scope.questionAnswer.length,0)){
			for(var index in scope.dataValue.value.testModel){
				var tempObj={};
				scope.questionAnswer.push(tempObj);
			}

			}
			if(angular.equals(scope.dataValue.value.questionView.mode,'multiple')){
				scope.questionPerPage=scope.dataValue.value.questionView.questionPerPage;
				scope.stop=scope.questionPerPage;

			}
			else{
				scope.questionPerPage=scope.noOfQuestions;
				scope.stop=scope.questionPerPage;
			}

			scope.startTimer=function(){
				var time=(new Date()).getTime();

				var StartTimeObj={courseMappingId:courseMappingId,userLoginId:userLoginId,keyName:keyName,tlPointInmins:tlPointInmins,outerIndex:outerIndex,innerIndex:innerIndex,timeObj:{key:'testStartTime',value:time}};

				var FnSaveTestStartTimeCallBack= testRelated.FnSaveTestStartTime(StartTimeObj);

				FnSaveTestStartTimeCallBack.then(function(data){

					 var result=angular.fromJson(JSON.parse(data.data));
					 scope.startTest=true;

					scope.countdown();
					scope.timerFunction();							
				
				});

			};


			// Pre-fetch an external template populated with a custom scope
            var timeOutModal = $modal({scope: scope, template: 'angularModules/courseElementFields/questionGroupViewer/Modal/timeOutModal.html', show: false,placement:'center'});
            // Show when some event occurs (use $promise property to ensure the template has been loaded)
            scope.timeOutModalshowModal = function() {
              timeOutModal.$promise.then(timeOutModal.show);
            };
         
			
			// Pre-fetch an external template populated with a custom scope
            var submitModal = $modal({scope: scope, template: 'angularModules/courseElementFields/questionGroupViewer/Modal/submitModal.html', show: false,placement:'center'});
            // Show when some event occurs (use $promise property to ensure the template has been loaded)

            scope.submitModalshowModal = function() {
              submitModal.$promise.then(submitModal.show);
            };
            
         
            scope.countdown=function(){

            	var FnTestTimeReCheckCallBack= testRelated.FnTestTimeReCheck({courseMappingId:courseMappingId,keyName:keyName,tlPointInmins:tlPointInmins,outerIndex:outerIndex,innerIndex:innerIndex});

				FnTestTimeReCheckCallBack.then(function(data){
				scope.timeObj=angular.fromJson(JSON.parse(data.data));

				scope.countDownTime=(scope.timeObj.startTime+scope.timeObj.timeDetails.actualDuration)-(new Date()).getTime();
				scope.countDownTime=Math.ceil(scope.countDownTime/1000);
				});

            };

			scope.timerFunction=function(){
				setInterval(function(){
				 if(angular.equals(scope.examFinished,false)&&angular.equals(scope.startTest,true)&&angular.equals(scope.isMentee,true)){
				 	var FnTestTimeReCheckCallBack= testRelated.FnTestTimeReCheck({courseMappingId:courseMappingId,keyName:keyName,tlPointInmins:tlPointInmins,outerIndex:outerIndex,innerIndex:innerIndex});

					FnTestTimeReCheckCallBack.then(function(data){
					scope.timeObj=angular.fromJson(JSON.parse(data.data));
					 
						if(!angular.equals(scope.timeObj.startTime,undefined)){
							var timeNow=(new Date()).getTime();
							var timeDiff=timeNow-scope.timeObj.startTime;
							if(timeDiff>=scope.timeObj.timeDetails.actualDuration){
								 scope.timeOutModalshowModal();
								 scope.submitTest();
							}							
						}
					});
				
				 }
				 },10000);

			};

			if(angular.equals(scope.examFinished,false)&&angular.equals(scope.startTest,true)){
					scope.countdown();
					scope.timerFunction();	
				
			}


			scope.submitTest=function(){
				scope.startSubmit=true;
				// console.log(scope.questionAnswer);
				var time=(new Date()).getTime();
				var totalMarkScored=0;
				for(var index in scope.questionAnswer){
					if(!angular.equals(scope.questionAnswer[index].markScored,undefined)){
					totalMarkScored+=scope.questionAnswer[index].markScored*1;
					}
				}

				
				var SubmitTestObj={courseMappingId:courseMappingId,userLoginId:userLoginId,keyName:keyName,tlPointInmins:tlPointInmins,outerIndex:outerIndex,innerIndex:innerIndex,totalMarkScored:totalMarkScored,timeObj:{key:'dateOfSubmission',value:time},userAnswers:scope.questionAnswer};
				
				console.log(SubmitTestObj);

				var FnSubmitTestCallBack= testRelated.FnSubmitTest(SubmitTestObj);

				FnSubmitTestCallBack.then(function(data){
					
				 var result=angular.fromJson(JSON.parse(data.data));
				
				 scope.isMentee=false;
				 scope.examFinished=true;
				 location.reload();

				

				});


			};

			
			//this function is used to format the date from milliseconds
			scope.convertDate=function (millisec) {
				var date=new Date(millisec);
				return {day:date.toDateString(),time:date.toTimeString()};
			};


			//for pagination next button
			scope.questionChangeNext=function(start,stop){
				scope.start=stop;
				scope.stop+=scope.questionPerPage;
				if (scope.stop>scope.noOfQuestions) {
					scope.stop=scope.noOfQuestions;
				}
			};

			//for pagination previous button
			scope.questionChangePrevious=function(start,stop){
				scope.stop=start;
				scope.start-=scope.questionPerPage;
				
				if (scope.stop>scope.noOfQuestions) {
					scope.stop=scope.noOfQuestions;
				}
			};

			 scope.fnFormatObj=function (question) {
            	return JSON.stringify({value:question});
            };
            


		}
	};
}]);
