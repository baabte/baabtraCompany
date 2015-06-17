angular.module('baabtra').service('candidateCourseDetail',['$http','bbConfig',function candidateCourseDetail($http,bbConfig) {

	this.FetchCourseData=function($scope){

	 var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'FetchCourseData/',
	    data:JSON.stringify({"courseId":$scope.courseId}),
	 }).success(function(data, status, headers, config)
	 {
	 		
	 }).error(function(data, status, headers, config)
	 {

	 });
	return promise;
};
}]);