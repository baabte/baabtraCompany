angular.module('baabtra').service('candidateCourseView',['$http','bbConfig',function candidateCourseView($http,bbConfig) {

this.loadCoursesForCandidates=function(courseId){
	var promise = $http({
		url: bbConfig.BWS+'loadCoursesForCandidates/',
		method: "POST",
		data:{'courseId':courseId},
		withCredentials: false,
		contentType:"application/json",
		dataType:"json",
	}).
	success(function(data, status, headers, config) {

	}).
	error(function(data, status, headers, config) {

	});
return promise;
};


	
}]);