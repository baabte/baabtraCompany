angular.module('baabtra').service('evaluationService',['$http','bbConfig',function evaluationService($http,bbConfig) {

	this.evaluationFetch = function(evaluationFetchObj){
	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'EvaluationFetch/',
	    data:angular.toJson(evaluationFetchObj)
	 });
	return promise;
};

this.evaluateAnswer = function(userCourseMappingId, element, elementOrder){
	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'EvaluateAnswer/',
	    data:{userCourseMappingId:userCourseMappingId,element:element,elementOrder:elementOrder}
	 });
	return promise;
};


this.evaluationElementFetch = function(evaluationFetchObj){
	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'evaluationElementFetch/',
	    data:angular.toJson(evaluationFetchObj)
	 });
	return promise;
};


	
}]);