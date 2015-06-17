angular.module('baabtra').controller('ListjobsCtrl',['$scope', '$rootScope', 'JobSrv', '$modal', 'commonService',function ($scope, $rootScope, JobSrv, $modal, commonService){

  /*login detils start*/

  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }

  if($rootScope.loggedIn==false){
    $state.go('login');
  }

  $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
$scope.companyId='5457526122588a5db73e0b23';
    /*login detils ends*/


//var cmp_id='5457526122588a5db73e0b23';
$scope.activeLink=1;
var CurNewValue="";

JobSrv.listJobs($scope,$scope.companyId,"","");

$scope.$watch('modelSearch', function (newValue, oldValue) {//function which watces the change in text box and used  for searching companies and roles
      if(!angular.equals(newValue,undefined)){
		CurNewValue=newValue;
		JobSrv.listJobs($scope,$scope.companyId,CurNewValue,"");
      }
  });

$scope.next_one = function() {//To get Next page
	if ($scope.JobCount>12) {
        $scope.activeLink=$scope.activeLink+12;
        JobSrv.listJobs($scope,$scope.companyId,CurNewValue,$scope.activeLink-1);
        }
    };
    $scope.prev_one = function() {//To get Previous page
	if($scope.activeLink>12)
		{
			$scope.activeLink=$scope.activeLink-12;
			JobSrv.listJobs($scope,$scope.companyId,CurNewValue,$scope.activeLink);
		}
    };
$scope.ViewJobDetails=function(Job)
{
	$scope.JobDetails=Job;
	var myOtherModal = $modal({scope: $scope, template: 'angularModules/company/partials/Partial-viewJobDetailsModal.html', show: true});
};

$scope.editJobDetails=function(Job)
{
	$scope.EditJobDetails=Job;
	console.log($scope);
	var myOtherModal = $modal({scope: $scope, template: 'angularModules/company/partials/Partial-editJobDetailsModal.html', show: true});
};
$scope.hideJobDetails=function(job_id,flag)
{
//alert(job_id);
var jobStaus=flag?0:1;
//alert(jobStaus);
JobSrv.hideJobDetails(job_id,jobStaus);
};
}]);