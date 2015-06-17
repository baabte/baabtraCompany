angular.module('baabtra').controller('ViewcourseCtrl',['$scope','$stateParams','viewCourse','$rootScope','commonService',function($scope,$stateParams,viewCourse,$rootScope,commonService){

if(!$rootScope.userinfo){ //checking for the login credentilas is present or not
      $rootScope.hide_when_root_empty=true;
      commonService.GetUserCredentials($scope);
}
$scope.roleid=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
$scope.courseid=$stateParams.courseId;
$scope.userLoginId=$rootScope.userinfo.userLoginId;
var fnViewCourseData=viewCourse.loadCourseData($scope);
fnViewCourseData.then(function(data){
	$scope.coursePreviewObject={};
	$scope.course=angular.fromJson(JSON.parse(data.data));

});


}]);

 