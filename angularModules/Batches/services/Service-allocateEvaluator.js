angular.module('baabtra').service('allocateEvaluator', ['$http', 'bbConfig', function ($http, bbConfig) {

	this.LoadCoureBatchByBatchId=function(coureBatchId, companyId){
	 	var promise = $http({
		 	method: 'POST',
		    url: bbConfig.BWS+ 'LoadCoureBatchByBatchId/',
		    data:{coureBatchId:coureBatchId, companyId:companyId}
		 });
		return promise;
	};

	this.saveBatchTimelineChanges=function(coureBatchId, courseTimeline){
	 	var promise = $http({
		 	method: 'POST',
		    url: bbConfig.BWS+ 'saveBatchTimelineChanges/',
		    data:{coureBatchId:coureBatchId, courseTimeline:courseTimeline}
		 });
		return promise;
	};

}]);