angular.module('baabtra').service('candidateCourseSrv',['bbConfig','$http',function(bbConfig,$http) {

this.fnLoadBatchesByCourse = function (companyId,courseId) {

		var promise = $http({
			 	method: 'POST',
			    url: bbConfig.BWS+'fnLoadBatchesByCourse/',
			    data:{"companyId":companyId,"courseId":courseId}
			 });
		return promise;
	};


this.loadBatchMentees=function(companyId,batchMappingId){

 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnLoadMenteesByBatch/',
	    data:{"companyId":companyId,"batchMappingId":batchMappingId}
	 });
	return promise;
 };

this.moveMenteeToAnotherBatch=function(companyId,fromBatchMappingId,toBatchMappingId,userMappings){

 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnMoveMenteeToAnotherBatch/',
	    data:{"companyId":companyId,"fromBatchMappingId":fromBatchMappingId,"toBatchMappingId":toBatchMappingId,"userMappings":userMappings}
	 });
	return promise;
 };	

this.loadUnallocatedMenteees=function(companyId,courseId){

 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnGetUnallocatedCandidatesByCourse/',
	    data:{"companyId":companyId,"courseId":courseId}
	 });
	return promise;
 };	
}]);