angular.module('baabtra').controller('GlobalsettingsCtrl',['$scope','commonService','$stateParams','$rootScope','manageCompanyRoleService','globalSettings','$alert','UnigueCodeGenerator','localStorageService','$modal',function($scope,commonService,$stateParams,$rootScope,manageCompanyRoleService,globalSettings,$alert,UnigueCodeGenerator,localStorageService,$modal){


if(localStorageService.get('latestGlobalConfigState')){
		$scope.selectedTab=localStorageService.get('latestGlobalConfigState');	
}
else{
	$scope.selectedTab="SetEvaluator";	
}

// for getting looged users data.
    if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
    }
    if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
    }


var companyId;
$scope.entities=[];
$scope.incrementTypes=[{"Name":"<i class='fa fa-sort-numeric-asc p-xs'></i>Number","value":"Number"},{"Name":"<i class='ti-uppercase p-xs'></i>Alphabetics(In Capital Letter)","value":"Alphabetics(C)"},{"Name":"<i class='ti-smallcap p-xs'></i>Alphabetics(In Small Letter)","value":"Alphabetics(s)"}];
$scope.enableaddEvaluator=true;

// watch function for retireve userinfo # commented by lijin for avoiding watch on 20-5-2015
// $scope.$watch(function() {
//   return $rootScope.userinfo;
// }, function() {
  $scope.userinfo = $rootScope.userinfo;
  // console.log($scope.userinfo.ActiveUserData.roleMappingObj);
  companyId=$scope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  var existingConf= globalSettings.retrieveExistingConf(companyId);
	existingConf.then(function  (data) {
	  existingConfCallBack=angular.fromJson(JSON.parse(data.data));
	  $scope.existingConfiguration=existingConfCallBack.existingConf;
			 //variable for setting candidate age limit for registration
			if(angular.equals($scope.existingConfiguration.candidateAgeLimit,undefined)){
				$scope.existingConfiguration.candidateAgeLimit={};
				$scope.existingConfiguration.candidateAgeLimit.min=10;
				$scope.existingConfiguration.candidateAgeLimit.max=25;

			}
	  $scope.roles=[];
	  $scope.roles=existingConfCallBack.CompanyRoles;
	  var rolesArrayForSuperVisor=existingConfCallBack.CompanyRoles;
	  var roleslist=existingConfCallBack.CompanyRoles;
	  $scope.selectedEvalRoles=[];
	  $scope.selectedSupervisorsRoles=[];
	  if(existingConfCallBack.existingConf){
	  		existingEvalroles=existingConfCallBack.existingConf.evalRoles;
	  		$scope.existingItemAndCodes=existingConfCallBack.existingConf.itemCodes;
	  		ExistingsupervisorRoles=existingConfCallBack.existingConf.supervisorRoles;
	  		orderFormConfigurable=existingConfCallBack.existingConf.orderFormConfigurable;
	  		// console.log(orderFormConfigurable);
	  }
	  else{
	  		existingEvalroles=null;
	  		$scope.existingItemAndCodes=null;
	  		ExistingsupervisorRoles=null;
	  }
	  $scope.roleslist=[];
	  if(existingEvalroles){
	  		for (var i = $scope.roles.length - 1; i >= 0; i--) {
			  var key = $scope.roles[i];
			  if (-1 === existingEvalroles.indexOf(key._id.$oid)) {
			    $scope.roleslist.push({"Name":key.roleName,"value":key._id.$oid}); //populate rest of the roles for evaluate drop down
			  }
			}
			
			for(var index=0;index<existingEvalroles.length;index++){
				for(var index2=0;index2<$scope.roles.length;index2++){
					if(existingEvalroles[index]==$scope.roles[index2]._id.$oid){
						$scope.selectedEvalRoles.push({"Name":$scope.roles[index2].roleName,"value":$scope.roles[index2]._id.$oid});
					}
				}
			}

	  }
	  else{
	  	 for(var roleindex=0;roleindex<roleslist.length;roleindex++){
	  			$scope.roleslist.push({"Name":roleslist[roleindex].roleName,"value":roleslist[roleindex]._id.$oid});//create items for evaluator drop down in case no one selected yet
	  	}

	  }


	  //if for to append data to supervisor roles
	  $scope.supervisorrolelist=[];
	  if(ExistingsupervisorRoles){
	  		for (var i = $scope.roles.length - 1; i >= 0; i--) {
			  var key = $scope.roles[i];
			  if (-1 === ExistingsupervisorRoles.indexOf(key._id.$oid)) {
			    $scope.supervisorrolelist.push({"Name":key.roleName,"value":key._id.$oid}); //populate rest of the roles for evaluate drop down
			  }
			}

			for(var index=0;index<ExistingsupervisorRoles.length;index++){
				for(var index2=0;index2<$scope.roles.length;index2++){
					if(ExistingsupervisorRoles[index]==$scope.roles[index2]._id.$oid){
						$scope.selectedSupervisorsRoles.push({"Name":$scope.roles[index2].roleName,"value":$scope.roles[index2]._id.$oid});
					}
				}
			}
	  }
	  else{
	  		for(var roleindex=0;roleindex<roleslist.length;roleindex++){
	  			$scope.supervisorrolelist.push({"Name":roleslist[roleindex].roleName,"value":roleslist[roleindex]._id.$oid});//create items for evaluator drop down in case no one selected yet
	  	}

	  }


	  //end of the div


	  $scope.roles.push({"roleName":"Branches","_id":{"$oid":"Branches"}},{"roleName":"Department","_id":{"$oid":"Department"}},{"roleName":"Mentee","_id":{"$oid":"Mentee"}},{"roleName":"Orders","_id":{"$oid":"Orders"}},{"roleName":"Receipts","_id":{"$oid":"Receipts"}},{"roleName":"Customers","_id":{"$oid":"Customers"}});
	  // $scope.roleList=
	  if(existingConfCallBack.existingConf){
	  	existingItemsObjArray=existingConfCallBack.existingConf.itemCodes;
	  }
	  else{
	  	existingItemsObjArray=null;
	  }
	  // create content for items
	  if(existingItemsObjArray){

	  		var existingItems=[];
	  		for(var counter=0;counter<existingItemsObjArray.length;counter++){
	  			for(var secCounter=0;secCounter<existingItemsObjArray[counter].items.length;secCounter++){
	  					existingItems.push(existingItemsObjArray[counter].items[secCounter]);
	  			}
	  		}
			for (var i = $scope.roles.length - 1; i >= 0; i--) {
			  var key = $scope.roles[i];
			  if (-1 === existingItems.indexOf(key._id.$oid)) {
			    $scope.entities.push({"Name":key.roleName,"value":key._id.$oid});
			  }
			}
	  }else{

	  		 for(var i=0;i<$scope.roles.length;i++){
				 $scope.entities.push({"Name":$scope.roles[i].roleName,"value":$scope.roles[i]._id.$oid});  		
	  			}
	  }


	  $scope.getItemByNameByValue=function(item){
	  	for(var index=0;index<$scope.roles.length;index++){
	  		if(item==$scope.roles[index]._id.$oid){
	  			return $scope.roles[index].roleName;
	  		}
	  	}
	  }
	  // setting current OrderForm configuration
			 if(orderFormConfigurable){
				$scope.OrderForm='Configurable';
			}else{
				$scope.OrderForm='Default';
			}
	 
	});
	
	// this function should be needed to get unigue codes for different entities 

	// var abc=UnigueCodeGenerator.GetCode("54978cc57525614f6e3e710b","Branches");
	// abc.then(function(data){
	// 	if(data.status==200&&data.statusText=="OK"){
	// 		console.log(data.data);
	// 	}
	// });


// }, true);


$scope.setEvaluator=function(){
	$scope.enableaddEvaluator=false;
	var selectedroles=[];
	for(var index=0;index<$scope.selectedrole.length;index++){
		selectedroles.push($scope.selectedrole[index].value);
	}

	var data={}; 
	data.companyId=companyId;
	data.userLoginId=$scope.userinfo.userLoginId;
	data.evalRoles=selectedroles;
	var addEvalRolesCallback= globalSettings.addEvaluator(data);
	addEvalRolesCallback.then(function  (data) {
	  if(data.status==200&&data.statusText=="OK"){
	  				// console.log(angular.fromJson(JSON.parse(data.data)));
	  				for(var index=0;index<selectedroles.length;index++){
							for(var index2=0;index2<$scope.roleslist.length;index2++){
								if(selectedroles[index]==$scope.roleslist[index2].value){
									$scope.roleslist.splice(index2,1);
									
								}
							}
					}
					for(var index=0;index<$scope.selectedrole.length;index++)
					{
						$scope.selectedEvalRoles.push($scope.selectedrole[index]);
					}
					$scope.notifications("Success","Evaluator Added","success");
					if($rootScope.userinfo.ActiveUserData.roleMappingObj.evalRoles)
					{
						$rootScope.userinfo.ActiveUserData.roleMappingObj.evalRoles=$rootScope.userinfo.ActiveUserData.roleMappingObj.evalRoles.concat(selectedroles);

					}
					else{
						$rootScope.userinfo.ActiveUserData.roleMappingObj.evalRoles=selectedroles;
					}
					selectedroles=[];
			}
	});
};

$scope.setSupervisors=function(){
	var selectedsupervisors=[];
	for(var index=0;index<$scope.selectedSupervisorrole.length;index++){
		selectedsupervisors.push($scope.selectedSupervisorrole[index].value);
	}
	var dataToSend={};
	dataToSend.companyId=companyId;
	dataToSend.supervisorRoles=selectedsupervisors;
	dataToSend.userLoginId=$scope.userinfo.userLoginId;
	var setSupervisorsCallBack=globalSettings.setSupervisors(dataToSend);
	setSupervisorsCallBack.then(function  (data) {
	  if(data.status==200&&data.statusText=="OK"){
	  				for(var index=0;index<selectedsupervisors.length;index++){
							for(var index2=0;index2<$scope.supervisorrolelist.length;index2++){
								if(selectedsupervisors[index]==$scope.supervisorrolelist[index2].value){
									$scope.supervisorrolelist.splice(index2,1);
									
								}
							}
					}
					for(var index=0;index<$scope.selectedSupervisorrole.length;index++)
					{
						$scope.selectedSupervisorsRoles.push($scope.selectedSupervisorrole[index]);
					}
					selectedsupervisors=[];
					$scope.notifications("Success","Supervisor Added","success");
					
			}
	});

}
				
$scope.Range = function(start, end) {
    var result = [];
    for (var i = start; i <= end; i++) {
        result.push(i);
    }

    return result;
};

//This function is used to determine code increment
$scope.getIncrementalCode=function(n, type) {
	if(!n){
		n=1;
	}
	if(type[0].value){
		type=type[0].value;
	}
	

if (angular.equals(type,"Number")){
return n;
}

		var x = n-1,
           r26 = x.toString(26),
           baseCharCode = "A".charCodeAt(0);

       var arr = r26.split(''),
           len = arr.length;

       var newArr =arr.map(function(val,i){
           val = parseInt(val,26);

           if( (i === 0) && ( len > 1)){
               val = val-1;
           }

           return String.fromCharCode(baseCharCode + val);
       });


      if (angular.equals(type,"Alphabetics(s)")){
			return angular.lowercase(newArr.join(''));
	  }

       return newArr.join('');

};


$scope.GenerateCode=function(){
		var codePattern={};
		codePattern.companyId=companyId;
		codePattern.userLoginId=$scope.userinfo.userLoginId;
		var entities=[];

		$scope.selectedEntity.forEach(function(entity) {
		    entities.push(entity.value);
		});
		if($scope.statrange){
			codePattern.startRange=$scope.statrange;
		}
		codePattern.items=entities;
		codePattern.prefix=$scope.prefix;
		codePattern.IncPattern=$scope.selectedPattern[0].value;
		codePattern.companyId=companyId;
		$scope.FormCodeGenerator.$setPristine();
		$scope.selectedEntity=[];
		$scope.prefix="";
		$scope.selectedPattern=[];
		$scope.statrange="";
		var codePatternCallback= globalSettings.GenerateCode(codePattern);
			codePatternCallback.then(function  (data) {
			  if(data.status==200&&data.statusText=="OK"){
			  				for(var index=0;index<entities.length;index++){
								for(var index2=0;index2<$scope.entities.length;index2++){
									if(entities[index]==$scope.entities[index2].value){
										$scope.entities.splice(index2,1);
									}
								}
							}
							delete codePattern.companyId;
							$scope.existingItemAndCodes.push(codePattern);
							$scope.notifications("Success","Code Created","success");
					}
			});
};



$scope.removeExistingEvaluator=function(removeEvaluatorSelected,index){
	
	
	var dataToRemoveEvaluator={};
	dataToRemoveEvaluator.evaluator=removeEvaluatorSelected.value;
	dataToRemoveEvaluator.companyId=companyId;
	var removeExistingEvaluatorCallBack=globalSettings.removeExistingEvaluator(dataToRemoveEvaluator);
	removeExistingEvaluatorCallBack.then(function  (data) {
			  if(data.status==200&&data.statusText=="OK"){
							
			  				$scope.selectedEvalRoles.splice(index,1);
							$scope.roleslist.push({"Name":removeEvaluatorSelected.Name,"value":removeEvaluatorSelected.value});
							$scope.notifications("Success","Evaluator Removed","success");
							for (var i = 0; i < $rootScope.userinfo.ActiveUserData.roleMappingObj.evalRoles.length; i++) {
								if(angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.evalRoles[i],removeEvaluatorSelected.value)){
									$rootScope.userinfo.ActiveUserData.roleMappingObj.evalRoles.splice(i,1);
								}
							};

					}
			});
}

$scope.removeExistingSupervisors=function(removeEvaluatorSupervisor,index){
		var dataToRemoveSupervisor={};
		dataToRemoveSupervisor.supervisor=removeEvaluatorSupervisor.value;
		dataToRemoveSupervisor.companyId=companyId;
		var removeExistingSupervisorCallBack=globalSettings.removeExistingSupervisors(dataToRemoveSupervisor);
		removeExistingSupervisorCallBack.then(function  (data) {
				  if(data.status==200&&data.statusText=="OK"){
								
				  				$scope.selectedSupervisorsRoles.splice(index,1);
								$scope.supervisorrolelist.push({"Name":removeEvaluatorSupervisor.Name,"value":removeEvaluatorSupervisor.value});
								$scope.notifications("Success","Supervisor Removed","success");
								//console.log();
					}
				});
}


$scope.removeItemFromAgroup=function(item){
	itemDataToRemove={};
	itemDataToRemove.companyId=companyId;
	itemDataToRemove.item=item;
	var removeItemFormAgroup=globalSettings.removeItemFromAgroup(itemDataToRemove);
	removeItemFormAgroup.then(function  (data) {
			  if(data.status==200&&data.statusText=="OK"){
			  				for(var index=0;index<$scope.existingItemAndCodes.length;index++){
								for(var index1=0;index1<$scope.existingItemAndCodes[index].items.length;index1++){
									if($scope.existingItemAndCodes[index].items[index1]==item){
										$scope.existingItemAndCodes[index].items.splice(index1,1);
										var arryLen=$scope.existingItemAndCodes[index].items.length;
                                        if(arryLen<1){
                                            $scope.existingItemAndCodes.splice(index,1);
                                            }
			               				 break;
									}
								}
							}
							for(var index=0;index<$scope.roles.length;index++){
								if($scope.roles[index]._id.$oid==item){
									$scope.entities.push({"Name":$scope.roles[index].roleName,"value":$scope.roles[index]._id.$oid});
									break;
								}
							}
							$scope.notifications("Success","Item Removed","success");
					}
			});

}	


$scope.updateItemProps=function(fullObj,datas,field){
	prefixDataToSend={};
	prefixDataToSend.companyId=companyId;
	prefixDataToSend.data=datas;
	prefixDataToSend.field=field;
	prefixDataToSend.item=fullObj.items[0];
	var prefixUpdateCallBack=globalSettings.updateExistingPrefix(prefixDataToSend);
	prefixUpdateCallBack.then(function  (data) {
			  if(data.status==200&&data.statusText=="OK"){
							$scope.notifications("Success"," Your "+field+" Changed to "+datas,"success");
					}
			});
}


$scope.setOrderFormConfOrNot=function(data){
	var OrderFormSendData={};
	if(angular.equals(data,'Configurable')){
		OrderFormSendData.orderFormConfigurable=true;
	}
	else{
		OrderFormSendData.orderFormConfigurable=false;	
	}
	OrderFormSendData.companyId=companyId;
	OrderFormSendData.userLoginId=$rootScope.userinfo.userLoginId
	//console.log(OrderFormSendData);
	var OrderFormSendDatacallBack=globalSettings.setOrderFormConfOrNot(OrderFormSendData);
	OrderFormSendDatacallBack.then(function  (data) {
			  if(data.status==200&&data.statusText=="OK"){
							$scope.notifications("Success"," Order Form Configuration Updated","success");
					}
			});
}

// function user for maintain tab state upon referesh
$scope.setState=function(state){
	localStorageService.add('latestGlobalConfigState',state);
}

// $scope.percentageValueValidation=function(value,type){
// 		if(angular.equals(type,'start')){
// 			if(!angular.equals($scope.endPointPercentage,undefined)){
// 				if(value*1>=$scope.endPointPercentage*1){
// 					$scope.notifications("Warning","Start Point value  Must be lesser than End Point value","warning");
// 					$scope.startPointPercentage=undefined;
// 				}
// 			}

// 		}
// 		else{
// 			if(!angular.equals($scope.startPointPercentage,undefined)){
// 				if($scope.startPointPercentage*1>=value*1)
// 				{
// 					$scope.notifications("Warning","End Point value Must Greater than Start Point value","warning");
// 					$scope.endPointPercentage=undefined;
// 				}
// 			}
// 		}
// }

// function for add a new alert point
// $scope.addAlertPoint=function(){
// 	// $scope.alertPointsArray=[];
// 	var alertPoint={};
// 	alertPoint.startPoint=$scope.startPointPercentage*1;
// 	alertPoint.endPoint=$scope.endPointPercentage*1;
// 	alertPoint.todoAction=$scope.todoAction;
// 	alertPoint.message=$scope.message;
// 	$scope.alertPointsArray.push(alertPoint);
// 	$scope.percentageNum=[];
// 	for(var i=$scope.endPointPercentage*1+1,counter=0;i<=num;i++){
// 		$scope.percentageNum[counter]=i;
// 		counter++;
// 	}
// 	$scope.actions.splice($scope.todoAction,1);
// 	$scope.startPointPercentage=$scope.message=$scope.endPointPercentage=$scope.todoAction=undefined;
// 	$scope.setCriteriaForm.$setPristine();
// };

// //function for delete an existing alert point
// $scope.deleteAlertPoint=function(index){
// 	 for(var i=$scope.alertPointsArray[index].startPoint;i<=$scope.alertPointsArray[index].endPoint;i++){
// 	 		$scope.percentageNum.push(i);
// 	 }
// 	 $scope.percentageNum.sort(function(a, b){return a-b});
// 	 $scope.actions.push($scope.alertPointsArray[index].todoAction);
// 	 $scope.alertPointsArray.splice(index,1);
// }; 


// // function for update existing alert point
// $scope.updateAlertPoint=function(index)
// {
// 		$scope.setaletcriteriapopup=true;
// 		 for(var i=$scope.alertPointsArray[index].startPoint;i<=$scope.alertPointsArray[index].endPoint;i++){
// 	 		$scope.percentageNum.push(i);
// 	    }
// 	   $scope.percentageNum.sort(function(a, b){return a-b});
// 	   $scope.actions.push($scope.alertPointsArray[index].todoAction);
// 	   $scope.startPointPercentage=$scope.alertPointsArray[index].startPoint;
// 	   $scope.endPointPercentage=$scope.alertPointsArray[index].endPoint;
// 	   $scope.todoAction=$scope.alertPointsArray[index].todoAction;
// 	   $scope.message=$scope.alertPointsArray[index].message;
// 	   $scope.alertPointsArray.splice(index,1);

// };

// // function user for set exclude days
// $scope.excludeDaysArray=[];
//  // $scope.excludeDaysArray=["Sunday","Monday"];
// $scope.fnExcludedDays=function(id){
// 	var ispresent=$scope.excludeDaysArray.indexOf(id);
// 	if (ispresent > -1) {
//            $scope.excludeDaysArray.splice(ispresent, 1);
//         }else {// is newly selected
//            $scope.excludeDaysArray.push(id);
//            // $scope.excluded= $scope.excluded + id +','
//         }
// }

// // function used for save attendance alert configurations
// $scope.saveAttendanceAlertSettings=function()
// {
// 		var alertSettingsObj={};
// 		if($scope.alertPointsArray.length>0)
// 		{
// 			alertSettingsObj.alertCriteria=$scope.alertPointsArray;
// 		}
// 		else{
// 			alertSettingsObj.alertCriteria="Absense";
// 			alertSettingsObj.message=$scope.message;
// 		}
// 		alertSettingsObj.sendOnInterval=$scope.sendOnInterval;
// 		alertSettingsObj.excludeDays=$scope.excludeDaysArray;
// 		alertSettingsObj.companyId=companyId;
// 		alertSettingsObj.userLoginId=$scope.userinfo.userLoginId;
// 		var saveAttendanceAlertSettings=globalSettings.saveAttendanceAlertSettings(alertSettingsObj);
// 		saveAttendanceAlertSettings.then(function  (data) {
// 			  if(data.status==200&&data.statusText=="OK"){
// 			  				$scope.alertPointsArray=$scope.excludeDaysArray=[];
// 			  				$scope.sendOnInterval=$scope.message=undefined;
// 			  				$scope.whenAlert="Absense";
// 			  				alertSettingsObj={};
// 							$scope.notifications("Success","Attendance Settings is Created ","success");
// 					}
// 		});
	    

// }

$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };

$scope.saveAgeLimitRange = function () {
	$scope.updatingCandidateAgeLimit = true;
	var updatedGlobal = globalSettings.fnUpdateCandidateAgeLimit(companyId,$scope.existingConfiguration.candidateAgeLimit);
		updatedGlobal.then(function (response) {
			$scope.updatingCandidateAgeLimit = false;
			$scope.notifications('','Updated age limit.','success');
			$scope.existingConfiguration = angular.fromJson(JSON.parse(response.data)); 
		});
		updatedGlobal.error(function(){
			$scope.notifications('Sorry..!','Something went wrong, please try again.','danger');
			$scope.updatingCandidateAgeLimit = false;
		});
};







}]);