angular.module('baabtra').service('PublishedCourse',['$http','bbConfig','$rootScope',function PublishedCourse($http,bbConfig,$rootScope) {

this.loadPublishedCourses=function($scope,searchKey,lastId,type,firstId, courseType){
	 $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadPublishedCourses/',
	    data:JSON.stringify({"companyId":$scope.companyId,"searchKey":searchKey,"lastId":lastId,"type":type,"firstId":firstId, courseType:courseType}),
	 }).success(function(data, status, headers, config)
	 {
	 	$scope.publishedCourses = angular.fromJson(JSON.parse(data));

	 	$scope.notfoundCourse=false;
	 }).error(function(data, status, headers, config)
	 {

	 });
	 
	
};

this.courseByKeywords = function(companyId, searchKey){
	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'courseByKeywords/',
	    data:{"companyId":companyId,"searchKey":searchKey}
	 });
	return promise;
};


this.loadPublishedCoursesWithPromise=function(companyId,searchKey,lastId,type,firstId){
	 var promise=$http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadPublishedCourses/',
	    data:JSON.stringify({"companyId":companyId,"searchKey":searchKey,"lastId":lastId,"type":type,"firstId":firstId,"courseType":'course'}),
	 });
	 return promise;
	
};

this.fnDuplicateCourse = function (courseId,rmId,companyId){ // this function delete drafted courses
var promise = $http({
		url: bbConfig.BWS+'duplicateCourse/',
		method: "POST",
		data:{'courseId':courseId, 'rmId':rmId,'companyId':companyId},
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