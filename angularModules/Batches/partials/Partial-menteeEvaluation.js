angular.module('baabtra').controller('MenteeevaluationCtrl',['$scope','$rootScope','viewBatches','$state','$alert','commonService','attendenceService','$aside',function($scope,$rootScope,viewBatches,$state,$alert,commonService,attendenceService,$aside){





	// $scope.menteeObj={};
	// $rootScope.$watch('userinfo',function(){
	// 	$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	// 	$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	// 	loadCourseDDl=assignCourseMaterial.loadCourses4AssigningCourseMaterial($scope,$stateParams.userId);
	// 	$scope.urmId=$stateParams.userId;
	// 	loadCourseDDl.then(function(response){ //promise for batch load
	// 		$scope.menteeObj.courseList=angular.fromJson(JSON.parse(response.data)).courseList;
	// 		$scope.menteeObj.existCourseObj=angular.fromJson(JSON.parse(response.data)).courseObj;
	// 		$scope.menteeObj.profile=angular.fromJson(JSON.parse(response.data)).profile;

	// 	});
	// });

	// //function to watch the selected course change
	// $scope.$watch('selectedCourse',function(){
	// 	if(!angular.equals($scope.selectedCourse,undefined)){
	// 		loadCourseMaterialsDDl=viewBatches.loadCoursesMaterials4menteeAtt($scope);
	// 		loadCourseMaterialsDDl.then(function(response){ //promise for batch load
	// 			var outcomeObj=angular.fromJson(JSON.parse(response.data));
	// 			if(!angular.equals(outcomeObj,'notfound')){
	// 				$scope.menteeObj.userCourseList=outcomeObj.userCourseList;
	// 				$scope.menteeObj.userCourseElementlist=outcomeObj.userCourseElementlist;
	// 				for(var key in $scope.menteeObj.userCourseElementlist){ //checking for evaluable flag is true or not
	// 					if(!angular.equals($scope.menteeObj.userCourseElementlist[key].evaluable,undefined)&&angular.equals($scope.menteeObj.userCourseElementlist[key].evaluable,true)){
	// 						$scope.menteeObj.userCourseElementlist.splice(key,1);
	// 					}
	// 				}
	// 				$scope.status=true;
	// 			}
	// 			else{
	// 				$scope.status=false;
	// 			}
	// 			//$scope.menteeObj.profile=angular.fromJson(JSON.parse(response.data)).profile;
	// 		});
	// 	}
	// });
	
	// //converting back to day
	// $scope.changeminutes2day=function(minutes) {
	// 	var day= Math.ceil((minutes/60)/24);
	// 	return day;
	// };
	// //function to view the aside window for evaluation 
	// $scope.fnEvaluate=function(materialObj){
	// 	 var evaluateMentee=$aside({scope: $scope,animation:'am-fade-and-slide-top',placement:'top', template: 'angularModules/Batches/partials/aside-evaluation.html',show:true });
	// 	$scope.evalId=$scope.menteeObj.existCourseObj._id.$oid+'.'+materialObj.tlpoint+'.'+materialObj.userCourseElementType+'.'+materialObj.innerIndex;
	// 	$scope.evaluatorId=$scope.loggedusercrmid; //loged user mapping id as evalutor
	// };
	
	/*login detils start*/

  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

  var rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/

  var courseId = $state.params.courseId;
  var usersList = [$state.params.userId];
  $scope.menteeObj = {};
  $scope.menteeObj.evaluableElement = false;
  var courseDetailsResponse = viewBatches.LoadUserCourseDetails(usersList, courseId);

  courseDetailsResponse.then(function(response){

  	var result = angular.fromJson(JSON.parse(response.data));
  	$scope.menteeObj.selectedCourse = result[0];
  	$scope.menteeObj.elementOrderArray = Object.keys($scope.menteeObj.selectedCourse.elementOrder);
  });




}]);