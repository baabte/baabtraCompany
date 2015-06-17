angular.module('baabtra').directive('attendanceAlertConfig',['globalSettings','$rootScope','$alert', function(globalSettings,$rootScope,$alert) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			courseObj:"="
		},
		templateUrl: 'angularModules/globalSettings/directives/Directive-attendanceAlertConfig.html',
		link: function($scope, element, attrs, fn) {

			console.log($scope.courseObj);
			companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
			userLoginId=$rootScope.userinfo.userLoginId;

			$scope.sendingIntervals=[{"time":"Daily"},{"time":"weekly"},{"time":"monthly"}];
			$scope.days=[{id:'Sunday',text:'S'},{id:'Monday',text:'M'},{id:'Tuesday',text:'T'},{id:'Wednesday',text:'W'},{id:'Thursday',text:'Th'},{id:'Friday',text:'F'},{id:'Saturday',text:'S'}];
			var num=100;
			$scope.percentageNum=[];
			for(var i=0;i<=num;i++){
				$scope.percentageNum[i]=i;
			}
			$scope.actions=["First Warning","Second Warning","Final Warning"];
			// $scope.incrementTypes=[{"Name":"<i class='fa fa-sort-numeric-asc p-xs'></i>Number","value":"Number"},{"Name":"<i class='ti-uppercase p-xs'></i>Alphabetics(In Capital Letter)","value":"Alphabetics(C)"},{"Name":"<i class='ti-smallcap p-xs'></i>Alphabetics(In Small Letter)","value":"Alphabetics(s)"}];
			$scope.alertPointsArray=[]; //orinal declaration
			$scope.alert=[{"Name":"E-Mail","value":"E-Mail"},{"Name":"SMS","value":"SMS"}];
			$scope.setaletcriteriapopup=true;
			$scope.whenAlert="Absense";


			// $scope.percentageValueValidation=function(value,type){
			// 			if(angular.equals(type,'start')){
			// 				if(!angular.equals($scope.endPointPercentage,undefined)){
			// 					if(value*1>=$scope.endPointPercentage*1){
			// 						$scope.notifications("Warning","Start Point value  Must be lesser than End Point value","warning");
			// 						$scope.startPointPercentage=undefined;
			// 					}
			// 				}

			// 			}
			// 			else{
			// 				if(!angular.equals($scope.startPointPercentage,undefined)){
			// 					if($scope.startPointPercentage*1>=value*1)
			// 					{
			// 						$scope.notifications("Warning","End Point value Must Greater than Start Point value","warning");
			// 						$scope.endPointPercentage=undefined;
			// 					}
			// 				}
			// 			}
			// 	}

				// function for add a new alert point
				$scope.addAlertPoint=function(){
					// $scope.alertPointsArray=[];
					var alertPoint={};
					alertPoint.endPoint=$scope.endPointPercentage*1;
					alertPoint.todoAction=$scope.todoAction;
					alertPoint.alertTrough=[];
					for(var alert in $scope.selectalert){
						alertPoint.alertTrough.push($scope.selectalert[alert].value);
					}
					alertPoint.message=$scope.message;
					$scope.alertPointsArray.push(alertPoint);
					// $scope.percentageNum=[];
					// for(var i=$scope.endPointPercentage*1+1,counter=0;i<=num;i++){
					// 	$scope.percentageNum[counter]=i;
					// 	counter++;
					// }
					$scope.actions.splice($scope.todoAction,1);
					$scope.message=$scope.endPointPercentage=$scope.todoAction=undefined;
					$scope.setCriteriaForm.$setPristine();
					$scope.selectalert=[];
			
				};

				//function for delete an existing alert point
				$scope.deleteAlertPoint=function(index){
					 // for(var i=$scope.alertPointsArray[index].startPoint;i<=$scope.alertPointsArray[index].endPoint;i++){
					 // 		$scope.percentageNum.push(i);
					 // }
					 // $scope.percentageNum.sort(function(a, b){return a-b});
					 $scope.actions.push($scope.alertPointsArray[index].todoAction);
					 $scope.alertPointsArray.splice(index,1);
				}; 


				// function for update existing alert point
				$scope.updateAlertPoint=function(index)
				{
						// $scope.setaletcriteriapopup=true;
						//  for(var i=$scope.alertPointsArray[index].startPoint;i<=$scope.alertPointsArray[index].endPoint;i++){
					 // 		$scope.percentageNum.push(i);
					 //    }
					   // $scope.percentageNum.sort(function(a, b){return a-b});
					   $scope.actions.push($scope.alertPointsArray[index].todoAction);
					   $scope.endPointPercentage=$scope.alertPointsArray[index].endPoint;
					   $scope.todoAction=$scope.alertPointsArray[index].todoAction;
					   $scope.message=$scope.alertPointsArray[index].message;
					   $scope.alertPointsArray.splice(index,1);

				};

				// function user for set exclude days
				$scope.excludeDaysArray=[];
				 // $scope.excludeDaysArray=["Sunday","Monday"];
				$scope.fnExcludedDays=function(id){
					var ispresent=$scope.excludeDaysArray.indexOf(id);
					if (ispresent > -1) {
				           $scope.excludeDaysArray.splice(ispresent, 1);
				        }else {// is newly selected
				           $scope.excludeDaysArray.push(id);
				           // $scope.excluded= $scope.excluded + id +','
				        }
				}

				// function used for save attendance alert configurations
				$scope.saveAttendanceAlertSettings=function()
				{
						var alertSettingsObj={};
						if($scope.courseObj){

						}
						else{
								alertSettingsObj.Settings={};
								if($scope.alertPointsArray.length>0)
								{
									alertSettingsObj.Settings.alertCriteria=$scope.alertPointsArray;
								}
								else{
									alertSettingsObj.Settings.alertCriteria="Absense";
									alertSettingsObj.Settings.message=$scope.message;
								}
								alertSettingsObj.Settings.sendOnInterval=$scope.sendOnInterval;
								alertSettingsObj.Settings.excludeDays=$scope.excludeDaysArray;
								alertSettingsObj.companyId=companyId;
								alertSettingsObj.userLoginId=userLoginId;

						}	
						console.log(alertSettingsObj);
						var saveAttendanceAlertSettings=globalSettings.saveAttendanceAlertSettings(alertSettingsObj);
						saveAttendanceAlertSettings.then(function  (data) {
							  if(data.status==200&&data.statusText=="OK"){
							  				$rootScope.userinfo.ActiveUserData.attendanceAlertConfig=alertSettingsObj.Settings;
							  				console.log($rootScope.userinfo.ActiveUserData);
							  				$scope.alertPointsArray=$scope.excludeDaysArray=[];
							  				$scope.sendOnInterval=$scope.message=undefined;
							  				$scope.whenAlert="Absense";
							  				alertSettingsObj={};
											$scope.notifications("Success","Attendance Settings is Created ","success");
									}
						});
					    

				}

				$scope.notifications=function(title,message,type){
				     // Notify(message, 'top-right', '2000', type, symbol, true); \
				     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
				    };


			// end..............
		}
	};
}]);
