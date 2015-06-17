angular.module('baabtra').service('viewBatches',['bbConfig','$http',function(bbConfig,$http) {

//function to load the batches
 this.viewBatchesForManage=function($scope,firstId,type,lastId,searchKey){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnLoadBatchesForView/',
	    data:{"companyId":$scope.companyId,"firstId":firstId,"type":type,"lastId":lastId,"searchKey":searchKey}
	 });
	return promise;
 };	

 this.viewMenteesForManage=function($scope,firstId,type,lastId,searchKey){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnLoadMenteesForView/',
	    data:{"companyId":$scope.companyId,"firstId":firstId,"type":type,"lastId":lastId,"searchKey":searchKey}
	 });
	return promise;
 }	

  this.loadBatchMentees=function($scope,batchMappingId){

 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnloadBatchDetails4assignment/',
	    data:{"companyId":$scope.companyId,"batchMappingId":batchMappingId}
	 });
	return promise;
 };	

  this.assignCourseMaterials4Batch=function($scope){

 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnAssignCourseMaterials4Batch/',
	    data:{"batchMappingId":$scope.batchMappingId,"courseObj":$scope.batchObj.selectedCourseList}
	 });
	return promise;
 };	

	this.loadCoursesMaterials4menteeAtt=function($scope){

		var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnloadCoursesMaterials4menteeAtt/',
	    data:{"userCourseId":$scope.selectedCourse,"urmId":$scope.urmId}
	 });
	return promise;
	};	
	
	this.loadCourseMaterials4batchAtt=function($scope){
		
		var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnloadCourseMaterials4batchAtt/',
	    data:{"batchMappingId":$scope.batchMappingId}
	 });
	return promise;
	};	

	this.loadMentees4batchAtt=function($scope,bathObj){
		var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnloadMentees4batchAtt/',
	    data:{"batchMappingId":$scope.batchMappingId,"batchObj":batchObj}
	 });
	return promise;
	};

	this.LoadUserCourseDetails = function(usersList, courseId){
		var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'LoadUserCourseDetails/',
	    data:{"usersList":usersList,"courseId":courseId}
	 });
	return promise;
	};

	this.ChangeBatchStatus = function(courseBatchMappingId,status,companyId,rmId,startDate){
		var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'ChangeBatchStatus/',
	    data:{"courseBatchMappingId":courseBatchMappingId,"status":status,"companyId":companyId,"rmId":rmId,"startDate":startDate}
	 });
	return promise;
	};

}]);