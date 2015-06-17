
angular.module('baabtra').controller('CandidatecoursedetailCtrl',['$scope','$stateParams','candidateCourseDetail','$state',function($scope,$stateParams,candidateCourseDetail,$state){

$scope.courseId=$stateParams.courseId;
var courseDatas=candidateCourseDetail.FetchCourseData($scope);
courseDatas.then(function (data) {
		$scope.courseData = angular.fromJson(JSON.parse(data.data));
		// build duration
	angular.forEach($scope.courseData.Duration.DurationDetails,function(key, value){
		 $scope.prettyDuration = "";
		$scope.prettyDuration = $scope.prettyDuration + key + ' ' + value + ' ';
	})
// end. build duration

		console.log($scope.courseData);
});



	
	
// 	$scope.colorsArray.splice(Math.floor(Math.random() * ($scope.colorsArray.length + 1) + 1),1);
// var detailsBackground;
// $scope.getDetailsBackground = function(mm){
// 	detailsBackground = $scope.colorsArray[10];
// 	//$scope.colorsArray.splice(Math.floor(Math.random() * ($scope.colorsArray.length + 1) + 1),1);
// 	return detailsBackground;
// }


$scope.navigateToTimeline=function(courseId){
	$state.go('home.main.viewCourse',{courseId:courseId.$oid});
}




}]);