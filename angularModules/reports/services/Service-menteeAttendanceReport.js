angular.module('baabtra').service('menteeAttendanceReport',['$http','bbConfig',function($http,bbConfig) {

	this.fnLoadMenteesAttReport=function($scope,userId){
	 	var promise = $http({
		 	method: 'POST',
		    url: bbConfig.BWS+'fnLoadMenteesAttReport/',
		    data:{"courseId":$scope.selectedCourse,"userId":userId}
		 });
		return promise;
	 }	

	this.fnLoadAllBatches4Report=function(companyId){
	 	var promise = $http({
		 	method: 'POST',
		    url: bbConfig.BWS+'fnLoadAllBatches4Report/',
		    data:{"companyId":companyId}
		 });
		return promise;
	 }	

	this.fnLoadBatchAttReport=function(filterObj){
	 	var promise = $http({
		 	method: 'POST',
		    url: bbConfig.BWS+'fnLoadBatchAttReport/',
		    data:{"filterObj":filterObj}
		 });
		return promise;
	 }
}]);