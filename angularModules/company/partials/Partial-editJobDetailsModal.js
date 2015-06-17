angular.module('baabtra').controller('EditjobdetailsmodalCtrl',['$scope','JobSrv',function ($scope,JobSrv){

var cmp_id='5457526122588a5db73e0b23';
$scope.rm_id='545aff95437b389ba554d6b7';
$scope.UpdateJob=function(job_id)//To post jobs when click post job button
{
	$scope.jobDetails={};
	if(!angular.isArray($scope.EditJobDetails.Tags))
	{
		var temTags=$scope.EditJobDetails.Tags.split(',');//Split Tags with coma
		var newTags=[];
		for (var i = 0; i < temTags.length; i++) {//to remove empty elements from Tags
			if (temTags[i] !== undefined && temTags[i] !== null && temTags[i] !==""){
			newTags.push(temTags[i]);
			}
		}
		$scope.jobDetails.Tags=newTags;
	}
	else
	{
		$scope.jobDetails.Tags=$scope.EditJobDetails.Tags;
	}
	$scope.jobDetails.jobTittle=$scope.EditJobDetails.jobTittle;
	$scope.jobDetails.jobDescription=$scope.EditJobDetails.jobDescription;
	$scope.jobDetails.Qualification=$scope.EditJobDetails.Qualification;
	$scope.jobDetails.minSalary=$scope.EditJobDetails.minSalary;
	$scope.jobDetails.maxSalary=$scope.EditJobDetails.maxSalary;
	$scope.jobDetails.Location=$scope.EditJobDetails.Location;
	
	JobSrv.updateJobDetails($scope.jobDetails,job_id);
	/*$scope.jobDetails.companyId=cmp_id;
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
	$scope.jobDetails.crmId=$scope.rm_id;
	$scope.jobDetails.urmId=$scope.rm_id;
	$scope.jobDetails.activeFlag=1;
	JobSrv.saveJob($scope);*/
	console.log($scope.jobDetails);
};
}]);