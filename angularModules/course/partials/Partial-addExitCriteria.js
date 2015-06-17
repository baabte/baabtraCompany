
angular.module('baabtra').controller('AddexitcriteriaCtrl',['$scope','$rootScope','addExitCriteriaService','addCourseElementService','commonService','$modal','$state','$alert',function($scope,$rootScope,addExitCriteriaService,addCourseElementService,commonService,$modal,$state,$alert){




if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}


// console.log($rootScope.userinfo.ActiveUserData.roleMappingId.$oid);

 var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;

	// $scope.curseElement={}:
	$scope.exitCriteria={};
	$scope.AddExitCriteriaText=false;
	$scope.EditExitCriteriaText=true;
	$scope.exitCriteriaUpdatebtn=false;
	$scope.exitCriteriaSavebtn=true;
	
    //^Icons
    




	$scope.saveExitCriteria = function(exit_criteria_form){

		$scope.exitCriteria.exitCriteriaData={};
		if ($scope.exitCriteria._id!==undefined){
			$scope.exitCriteria.exitCriteriaData._id=$scope.exitCriteria._id;
			delete $scope.exitCriteria._id;
		}
		$scope.exitCriteria.exitCriteriaData.Name=$scope.exitCriteria.Name;
		delete $scope.exitCriteria.Name;
		$scope.exitCriteria.exitCriteriaData.exitCriteriaConfig=$scope.exitCriteria.schema;
		delete $scope.exitCriteria.schema;
		$scope.exitCriteria.loggedusercrmid=loggedusercrmid;
		

		addExitCriteriaService.FnSaveExitCriteriaForm($scope);

		exit_criteria_form.$setPristine();

	};


$scope.exitCriteriaConfig	= function(exitCriteriaEdit){
	// console.log(exitCriteriaEdit);
	$scope.exitCriteria.Name=exitCriteriaEdit.Name;
	$scope.exitCriteria.schema=exitCriteriaEdit.exitCriteriaConfig;
	$scope.exitCriteria._id=exitCriteriaEdit._id.$oid;
	// console.log(exitCriteriaEdit.exitCriteria);

	

};

$scope.deleteExitCriteria = function(exitCriteriaDelete){
	// console.log(exitCriteriaDelete);
	$scope.exitCriteriaDelete={};
	$scope.exitCriteriaDelete._id=exitCriteriaDelete._id.$oid;
	$scope.exitCriteriaDelete.loggedusercrmid=loggedusercrmid;
	addExitCriteriaService.FnDeleteExitCriteria($scope);


};


	
$scope.updateExitCriteriaFetch = function(exit_criteria_form){
	$scope.exitCriteriaUpdatebtn=true;
	$scope.exitCriteriaSavebtn=false;
	$scope.AddExitCriteriaText=true;
	$scope.EditExitCriteriaText=false;

	exit_criteria_form.$setPristine();
	$scope.exitCriteria={};
	
	addCourseElementService.FnGetExitCriteria($scope);

		
};



$scope.AddExitCriteria = function(exit_criteria_form){
	$scope.exitCriteriaUpdatebtn=false;
	$scope.exitCriteriaSavebtn=true;
	$scope.AddExitCriteriaText=false;
	$scope.EditExitCriteriaText=true;

	exit_criteria_form.$setPristine();
	$scope.exitCriteria={};
					
	};





$scope.fnGetExitCriteriaCallBack = function(result){
	if(result==='success'){      
       
      }
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }


};






$scope.fnSaveExitCriteriaCallBack = function(result){

	if(result==='success'){
        $scope.notifications('Done!','Created ExitCriteria Successfully ','info');
       
      }
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }


};

// fnDeleteExitCriteriaCallBack

$scope.fnDeleteExitCriteriaCallBack = function(result){

	if(result==='success'){
        $scope.notifications('Done!',' Exit Criteria Deleted ','info');
		addCourseElementService.FnGetExitCriteria($scope);
 
      }
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }


};

//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };

}]);