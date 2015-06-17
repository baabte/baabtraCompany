angular.module('baabtra').controller('ViewresultCtrl',['$scope','viewBatches','$rootScope','$stateParams','$alert','$modal',function($scope,viewBatches,$rootScope,$stateParams,$alert,$modal){

	$scope.batchObj={};
	$scope.batchObj.grandTotal=0;
	//watch function for  rootscope change
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

	$scope.viewResult = function(user){
		$scope.data.user = user;
		$modal({scope: $scope, template: 'angularModules/Result/partials/popup-viewResult.html', show: true});
	};


	
}]);