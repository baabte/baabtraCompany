/*
Created By  : Jihin
Created Date:20/11/2014 
*/
angular.module('baabtra').controller('JobpostingCtrl',['$rootScope','$scope','commonService','JobSrv','$alert',function ($rootScope,$scope,commonService,JobSrv,$alert){



    if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn==false){
 $state.go('login');
}

    $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;



//var cmp_id='5457526122588a5db73e0b23';
//$scope.rm_id='545aff95437b389ba554d6b7';
$scope.PostJob=function()//To post jobs when click post job button
{
	$scope.jobDetails={};
	var temTags=$scope.Job.Tag.split(',');//Split Tags with coma
	var newTags=[];
	for (var i = 0; i < temTags.length; i++) {//to remove empty elements from Tags
		if (temTags[i] !== undefined && temTags[i] !== null && temTags[i] !==""){
			newTags.push(temTags[i]);
		}
	}
	$scope.jobDetails.companyId=$scope.companyId;
	$scope.jobDetails.jobTittle=$scope.Job.Tittle;
	$scope.jobDetails.jobDescription=$scope.Job.Description;
	//$scope.jobDetails.noOfVacancies=$scope.Job.noOfVacancies;
	$scope.jobDetails.Qualification=$scope.Job.Qualification;
	$scope.jobDetails.minSalary=$scope.Job.minSalary;
	$scope.jobDetails.maxSalary=$scope.Job.maxSalary;
	$scope.jobDetails.Location=$scope.Job.Location;
	$scope.jobDetails.Tags = newTags;
	$scope.jobDetails.createdDate=new Date();
	$scope.jobDetails.updatedDate=new Date();
	$scope.jobDetails.crmId=$scope.userRoleMappingId;
	$scope.jobDetails.urmId=$scope.userRoleMappingId;
	$scope.jobDetails.activeFlag=1;
	JobSrv.saveJob($scope);
};																						

}]);