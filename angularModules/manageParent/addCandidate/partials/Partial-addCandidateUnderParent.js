angular.module('baabtra').controller('AddcandidateunderparentCtrl',['$scope','$rootScope','commonService','manageParent','courseAllocateService','$modal',function($scope,$rootScope,commonService,manageParent,courseAllocateService,$modal){

//for managing logged in user
if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}

$scope.data={}; /* for managing all the datas generated from this controller
				  otherwise sometimes we cant delete or reset some data from variables, so 
				  we will keep it binded to this object.*/



  var rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  // var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  $scope.companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
// manageParent.getParent(searchKey,$scope.companyId)

 	$scope.searchParents = function () {
 		var gotParents = manageParent.getParent($scope.data.searchKey,$scope.companyId);
 			gotParents.then(function (response) {
 				var responseData = angular.fromJson(JSON.parse(response.data));
 				console.log(responseData);
 				$scope.data.parents = responseData;
 			});
 	};

 	//action menu for each parent
 	$scope.buildActions = function (index) {
 		return [
				{
				"text": "<i class=\"fa fa-hand-o-up\"></i>&nbsp;Add a candidate",
				 "click": "loadCandidates('"+index+"')"
				}
				];
 	};

 	$scope.loadCandidates = function (index) {
 		$scope.data.candidateList=[];
 		// console.log(index);
 		$scope.data.selectedParent = $scope.data.parents[index];
 		var loginIdOfParent = $scope.data.selectedParent.fkUserLoginId.$oid
 		if(!$scope.data.selectedParent.candidates){
 			$scope.data.selectedParent.candidates=[];
 		}

 		var loadedCandidates = manageParent.loadMappedCandidates(loginIdOfParent);
 		loadedCandidates.then(function (response) {
 			var respData = angular.fromJson(JSON.parse(response.data));
 			$scope.data.candidateList = respData;
 		});
 		//popup here
 		//angularModules/manageParent/popup/candidateList.html
			$modal({scope: $scope, template: 'angularModules/manageParent/popup/candidateList.html', show: true,placement:'center'});

 	};

 	//for saving candidate mapping list to db
 	$scope.saveCandidateMapping = function () {
 		//$scope.data.selectedParent.candidates
 		var loginIdOfParent = $scope.data.selectedParent.fkUserLoginId.$oid
 		var updatedCandidateMapping = manageParent.saveCandidateMapping(loginIdOfParent,$scope.data.selectedParent.candidates);
 		updatedCandidateMapping.then(function (response) {
 			//updated
 		});

 	};

    //for mapping a candidate to a parent
 	$scope.addCandidate = function (candidate) {
 		$scope.data.candidateList.push(candidate);
 		$scope.data.selectedParent.candidates.push(candidate.fkUserLoginId);
 		$scope.saveCandidateMapping();
 		
 	};

 	//for removing candidate mapping from a parent
 	$scope.removeCandidate = function (index) {
 		var fkUserLoginId = $scope.data.candidateList[index].fkUserLoginId;
 		$scope.data.candidateList.splice(index,1);
 		var lgnIndex = $scope.data.selectedParent.candidates.indexOf(fkUserLoginId);
 		$scope.data.selectedParent.candidates.splice(lgnIndex,1);
 		$scope.saveCandidateMapping();

 	};


 	//for excluding already added candidates from list
 	$scope.checkCandidate = function (fkUserLoginId) {
 		// console.log($scope.data.selectedParent.candidates.indexOf(fkUserLoginId));
 		return $scope.data.selectedParent.candidates.indexOf(fkUserLoginId)==-1?true:false;
 	};



	// $scope.actions = ;


	// $scope.data.usersObject={};
	$scope.data.candidateSearchKey='';
    var searchTimeOut;
	$scope.searchUser=function(){
		// if(searchTimeOut) {
		// clearTimeout(searchTimeOut);
		// }
		// searchTimeOut=setTimeout(function(){
			var fetchUsersToCourseAllocateCallback = courseAllocateService.fnfetchUsersToCourseAllocate($scope.companyId,'', 'initial', '', $scope.data.candidateSearchKey);
		   fetchUsersToCourseAllocateCallback.then(function(data){
		   	$scope.data.usersObject = angular.fromJson(JSON.parse(data.data));
	       });
		// },500);
	};

	$scope.nextOne=function(){//event  for showing next 9 items
	  $scope.data.prevButtondisabled = false;
	   var fetchUsersToCourseAllocateCallback=courseAllocateService.fnfetchUsersToCourseAllocate($scope.companyId,$scope.data.usersObject.firstId,'next',$scope.data.usersObject.lastId,$scope.data.candidateSearchKey);
	   fetchUsersToCourseAllocateCallback.then(function(data){
        $scope.data.usersObject = angular.fromJson(JSON.parse(data.data));
       });
};


//event  for showing previous 9 items
$scope.prevOne=function(){
	  
	  if(angular.equals($scope.data.firstUser,$scope.data.usersObject.firstId)){ 
		$scope.data.prevButtondisabled = true;
	  }
	  else{
	   var fetchUsersToCourseAllocateCallback=courseAllocateService.fnfetchUsersToCourseAllocate(companyId,$scope.data.usersObject.firstId,'prev',$scope.data.usersObject.lastId,$scope.data.candidateSearchKey);
	   fetchUsersToCourseAllocateCallback.then(function(data){
	        $scope.data.usersObject = angular.fromJson(JSON.parse(data.data));
	         if (angular.equals($scope.data.firstUser,$scope.data.usersObject.firstId)){ 
				$scope.data.prevButtondisabled=true;
	  		}
	   });
   	  }
};



}]);