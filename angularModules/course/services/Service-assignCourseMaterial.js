angular.module('baabtra').service('assignCourseMaterial',['$http','bbConfig',function($http,bbConfig) {

//function to load the batches
 this.loadCourses4AssigningCourseMaterial=function($scope,urmId){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnloadCourses4AssigningCourseMaterial/',
	    data:{"companyId":$scope.companyId,"urmId":urmId}
	 });
	return promise;
 };	

  this.assignCourseMaterial2timeline=function($scope){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnAssignCourseMaterial2timeline/',
	    data:{"courseId":$scope.selectedCourse,"urmId":$scope.urmId,"courseObj":$scope.courseObj.courseMaterials}
	 });
	return promise;
 };	

}]);