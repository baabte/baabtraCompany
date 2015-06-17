angular.module('baabtra').controller('ManagetraineesCtrl',['$scope', '$rootScope', '$state', 'viewBatches', 'commonService', function ($scope, $rootScope, $state, viewBatches, commonService){

	  /*login detils start*/

  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

  var rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  $scope.companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/

  	$scope.currentOption=$state.params.key;
	//$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	$scope.batchObj = {};
	$scope.activeTab="false";
		$scope.batchObj.mtype='initial'
		$scope.batchObj.mlastId='';
		$scope.batchObj.mfirstId='';
		/*Checking for first load. ie by checking its length or the list is undefind */
		if(angular.equals($scope.batchObj.menteeList,undefined)||angular.equals($scope.batchObj.menteeList.length,0)){
			loadMenteePromise=viewBatches.viewMenteesForManage($scope,$scope.batchObj.mfirstId,'initial',$scope.batchObj.mlastId,'');
			loadMenteePromise.then(function(response){ //promise for mentee load
				var result = angular.fromJson(JSON.parse(response.data));
				$scope.batchObj.menteeList = result.userList;
				$scope.batchObj.mfirstId = result.firstId.$oid;
				$scope.batchObj.mlastId = result.lastId.$oid;
			});
		}

	$scope.fnSearchBatchMentee=function(searchKey){

  			loadMenteePromise=viewBatches.viewMenteesForManage($scope,$scope.batchObj.mfirstId,'initial',$scope.batchObj.mlastId,searchKey);
				loadMenteePromise.then(function(response){ //promise for batch load
					var result = angular.fromJson(JSON.parse(response.data));

					if(result.userList.length){

						$scope.prevButtonDesabled = false;
						$scope.nextButtonDesabled = false;
						$scope.batchObj.menteeList = result.userList;
						$scope.batchObj.mfirstId = result.firstId.$oid;
						$scope.batchObj.mlastId = result.lastId.$oid;

					}
					else{
						$scope.batchObj.menteeList = [];
					}
				})
  	};

  	$scope.pagination=function(type){
  		$scope.prevButtonDesabled = false;
  		loadMenteePromise = viewBatches.viewMenteesForManage($scope,$scope.batchObj.mfirstId,type,$scope.batchObj.mlastId,'');
			loadMenteePromise.then(function(response){ //promise for mentee load
			var result = angular.fromJson(JSON.parse(response.data));
					if(result.userList.length){

						$scope.prevButtonDesabled = false;
						$scope.nextButtonDesabled = false;
						$scope.batchObj.menteeList = result.userList;
						$scope.batchObj.mfirstId = result.firstId.$oid;
						$scope.batchObj.mlastId = result.lastId.$oid;
					}
					else{
						
						if(angular.equals(type, "prev")){
							$scope.prevButtonDesabled = true;
						}
						else if(angular.equals(type, "next")){
							$scope.nextButtonDesabled = true;
						}
					}
				});
  			};

}]);