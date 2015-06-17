angular.module('baabtra').controller('BatchassignmentCtrl',['$scope','viewBatches','$rootScope','$stateParams','$alert',function($scope,viewBatches,$rootScope,$stateParams,$alert){

	$scope.batchObj={};

	$rootScope.$watch('userinfo',function(){
		$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		loadBatchDetails=viewBatches.loadBatchMentees($scope,$stateParams.batchMappingId);
		$scope.batchMappingId=$stateParams.batchMappingId;
		loadBatchDetails.then(function(response){ //promise for batch load
			$scope.batchObj.selectedList = [];
			
			$scope.batchObj.batchDetails=angular.fromJson(JSON.parse(response.data)).batchList;
			//$scope.batchObj.courseTimeline=angular.fromJson(JSON.parse(response.data)).courseObj;
			$scope.batchObj.userArray=angular.fromJson(JSON.parse(response.data)).userList;
			$scope.batchObj.userList=angular.fromJson(JSON.parse(response.data)).userDetails;
	
		});
	});


	$scope.assignCourseMaterials4Batch=function(){
		//getting blacklist users
		$scope.excludeList=[];
			for (key in $scope.batchObj.userArray) { //loop to get the unselected users
	 			var value = $scope.batchObj.userArray[key];
	 			if (angular.equals($scope.batchObj.selectedList.indexOf(value.$oid),-1)) {
	   				$scope.excludeList.push(value.$oid);
	 			}
		}
		//adding exluded list
		angular.forEach($scope.batchObj.selectedCourseList,function(element,key){
			$scope.batchObj.selectedCourseList[key].courseElement.excludeList=$scope.excludeList;
		});

		console.log($scope.batchObj.selectedCourseList);
		var assignCourseMaterialsResponse=viewBatches.assignCourseMaterials4Batch($scope);
		assignCourseMaterialsResponse.then(function(response){ //promise for batch load
			var result=angular.fromJson(JSON.parse(response.data));
			if(angular.equals(result,'success')){
				$alert({title: "Success", content: 'Sucessfully Added course material to this batch' , placement: 'top-right',duration:3, type: 'info'});
			}
		});

	};
}]);