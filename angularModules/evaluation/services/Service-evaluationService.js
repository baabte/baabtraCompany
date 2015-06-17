angular.module('baabtra').service('evaluationService',['$http','bbConfig',function evaluationService($http,bbConfig) {

	this.evaluationFetch = function(userCourseMappingId,tlPoint,elementType,outerIndex){
	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'EvaluationFetch/',
	    data:{userCourseMappingId:userCourseMappingId,tlPoint:tlPoint,elementType:elementType,outerIndex:outerIndex}
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

	
}]);