angular.module('baabtra').service('addBatches',['$http','bbConfig','$rootScope',function($http,bbConfig,$rootScope) {

 this.addNewBatches=function($scope,type){
 	var save_url="";
 	if(type=="Update Batch"){
 	save_url=bbConfig.BWS+'updateBatch/';	
 	}else{
 	save_url=bbConfig.BWS+'saveNewBatches/';
 	}	
 	var promise = $http({
	 	method: 'POST',
	    url:save_url,
	    data:{"batchObj":$scope}
	 });
	return promise;
 }	
 this.loadBatches=function(cmpId){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadBatches/',
	    data:{"cmpId":cmpId}
	 });
	return promise;
 }
 this.loadExistingCoursesUnderBatch=function(id){
    var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadExistingCoursesUnderBatch/',
	    data:{"id":id}
	 });
	return promise;

 }

 this.addCoursesToBatch =function(batch){
 	   var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'addCoursesToBatch/',
	    data:{"batch":batch[0]}
	 });
	return promise;
 }
 this.loadCourseRelatedBatches=function(cmpId,coursId,joinDate,courseType){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadCourseRelatedBatches/',
	    data:{"cmpId":cmpId,"courseId":coursId,"joinDate":joinDate,"courseType":courseType}
	 });
	return promise;
 }

 this.deleteBatch=function(id,cmpId){
    var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'deleteBatch/',
	    data:{"id":id,"cmpId":cmpId}
	 });
	return promise;
 }
 this.editBatch=function(id){
    var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'editBatch/',
	    data:{"id":id}
	 });
	return promise;

 }

}]);