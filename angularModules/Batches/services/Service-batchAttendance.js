angular.module('baabtra').service('batchAttendance',['$http','bbConfig',function($http,bbConfig) {

	this.getAllCandidates=function (batchMappingId,date) {
		var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnLoadMenteesBlindFromBatch/',
	    data:{"batchMappingId":batchMappingId,date:date}
	 });
	return promise;
	};

	this.fnLoadMenteesMarkedAttendanceFromBatch=function (batchMappingId,date) {
		var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnLoadMenteesMarkedAttendanceFromBatch/',
	    data:{batchMappingId:batchMappingId}
	 });
	return promise;
	};

	this.saveCandidatesAttendance=function (dataObj) {
		var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'saveCandidatesAttendance/',
	    data:{"dataObj":dataObj}
	 });
	return promise;
	};


	this.updateCandidatesAttandence=function (dataObj) {
		var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'updateCandidatesAttendance/',
	    data:{"dataObj":dataObj}
	 });
	return promise;
	};



}]);