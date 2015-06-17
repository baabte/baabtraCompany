angular.module('baabtra').service('draftedCourses',['$http','bbConfig',function draftedCourses($http, bbConfig) {

this.fnLoadDraftedCourses = function (cmp_id){ // this function load in-completed coursers
	var draftedCourses = $http({
		url: bbConfig.BWS+'loadDraftedCourses/',
		method: "POST",
		data:{'cmp_id':cmp_id},
		withCredentials: false,
		contentType:"application/json",
		dataType:"json",
	}).
	success(function(data, status, headers, config) {
		return data;
		// $scope.draftedCourses=angular.fromJson(JSON.parse(data));
		// if(!$scope.draftedCourses.length){
		// 	$scope.WarringMessage="Drafted Courses Not Found..."
		// }
	}).
	error(function(data, status, headers, config) {

	});
	return draftedCourses;
};


this.fnDeleteCourse = function (manageType, courseId, urmId, courseType, companyId){ // this function delete drafted courses
var promise = $http({
		url: bbConfig.BWS+'deleteDraftedCourse/',
		method: "POST",
		data:{'manageType':manageType, 'courseId':courseId, 'urmId':urmId, 'courseType':courseType,'companyId':companyId},
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