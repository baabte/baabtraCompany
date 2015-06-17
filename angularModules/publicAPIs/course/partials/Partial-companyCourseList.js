angular.module('baabtra').controller('CompanycourselistCtrl',['$scope', 'companyCourseList', '$state', '$modal', function ($scope, companyCourseList, $state, $modal){

	$scope.data = {};
	$scope.data.companyId = $state.params.companyId;
	var courseResponse = companyCourseList.loadCourseToWebSite($state.params.companyId);
	courseResponse.then(function(response){
		$scope.data.courseList = angular.fromJson(JSON.parse(response.data));
		console.log($scope.data.courseList);
		// if(Object.keys($scope.data.result).length){
		// 	$scope.data.courseList = {};
		// }
		// angular.forEach($scope.data.result, function(course){
		// 	if(angular.equals($scope.data.courseList[course.type], undefined)){
		// 		$scope.data.courseList[course.type] = [];
		// 	}
		// 	$scope.data.courseList[course.type].push(course);
		// })
	});




}]);