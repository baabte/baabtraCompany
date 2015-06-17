angular.module('baabtra').controller('BatchattendanceCtrl',['$scope','$rootScope','viewBatches','$stateParams','$alert','$filter',function($scope,$rootScope,viewBatches,$stateParams,$alert,$filter){

	$scope.batchObj={}; //mainObject

	$scope.durationTypes = {0:{id: "1",name: "Year(s)",mFactor:(1/525600),show:true},
                        1:{id: "2",name: "Month(s)",mFactor:(1/43200),show:true},
                        2:{id: "3",name: "Week(s)",mFactor:(1/10080),show:true},
                        3:{id: "4",name: "Day(s)",mFactor:(1/1440),show:true},
                        4:{id: "5",name: "Hour(s)",mFactor:1/60,show:true},
                        5:{id: "6",name: "Minute(s)",mFactor:1,show:true}};//mFactor is multiplication factor

	$rootScope.$watch('userinfo',function(){ //watch for getting the basic details from rootscope
		$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		$scope.batchMappingId=$stateParams.batchMappingId;
		loadCourseMaterialsDDl=viewBatches.loadCourseMaterials4batchAtt($scope);
		var selectedDuration=1;
		loadCourseMaterialsDDl.then(function(response){ //promise for batch load
		
			var outcomeObj=angular.fromJson(JSON.parse(response.data));
			selectedDuration=outcomeObj.courseBatchObj.selectedDuration;
			$scope.selectedDurationName=$scope.durationTypes[selectedDuration-1].name.replace('(s)','');
			if(!angular.equals(outcomeObj.result,'notfound')){
					$scope.batchObj.batchDetails=outcomeObj.courseBatchObj;
					$scope.batchObj.materialList=outcomeObj.userCourseElementlist;
					var keyList=Object.keys(outcomeObj.courseBatchObj.courseTimeline);
					$scope.batchObj.courseTimeline=[];
					// loping through timeline elements to check if there have any elements with AttendenceTrack flag
					// added by lijin on 14-4-2015
					for(var key in keyList){
						var gotAnElemWithAttendenceTrack=false;
						var tmpArrKeyList=Object.keys(outcomeObj.courseBatchObj.courseTimeline[keyList[key]]);
						for(elemIndex in tmpArrKeyList){
							var elemArray=outcomeObj.courseBatchObj.courseTimeline[keyList[key]][tmpArrKeyList[elemIndex]];
							for(elemKey in elemArray){
								if(elemArray[elemKey].attendenceTrack){
									gotAnElemWithAttendenceTrack=true;
								}
							}
						}
						if(gotAnElemWithAttendenceTrack){
							var Name=$scope.durationTypes[selectedDuration-1].name.replace('(s)','')+' '+(((keyList[key]-1)*$scope.durationTypes[selectedDuration-1].mFactor)+1);
							$scope.batchObj.courseTimeline.push({tlpoint:keyList[key],Name:Name});
						}
					}
					// end of looping
					$scope.status=true;
			}
			else{
					$scope.batchObj.batchDetails=outcomeObj.courseBatchObj;

					$scope.status=false;
			}

			$scope.$watch('batchObj.selectedTlPoint',function (argument) {
				$scope.filteredMeterials=$filter('filter')($scope.batchObj.materialList, function (value,index) {
					return value.tlpoint==$scope.batchObj.selectedTlPoint[0].tlpoint;
				}
				// {tlPointInMinute:$scope.batchObj.selectedTlPoint.Name}
				);
			});
		});
	});


}]);