angular.module('baabtra').controller('DraftedcoursesCtrl',['$scope', '$rootScope', '$state', 'draftedCourses', 'commonService','$alert', function($scope, $rootScope, $state, draftedCourses, commonService ,$alert){

	/*login detils start*/

	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if($rootScope.loggedIn==false){
		$state.go('login');
	}

	$scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
    $scope.cmp_id = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    /*login detils ends*/
    if(!angular.equals($scope.cmp_id,undefined)){
		var daraftedCourse = draftedCourses.fnLoadDraftedCourses($scope.cmp_id)//this fn load in-completed course details
		daraftedCourse.then(function(response){
		$scope.draftedCourses = angular.fromJson(JSON.parse(response.data));
		if(!$scope.draftedCourses.length){
			$scope.WarringMessage="Drafted Courses Not Found..."
		}
	});
	}
	else{
		$scope.WarringMessage="Heyy..! This is not for you.."
	}
	
	
	//edit course details
	$scope.editCourseDetails = function(courseId){
		$state.go('home.main.addCourse.step1',{'courseId':courseId});
	};

	//for undo deleted course
	$scope.undo = function(){
		var undoCourse = draftedCourses.fnDeleteCourse({activeFlag:1},$scope.lastDeletedCourseId, $scope.rm_id, "Draft", $scope.cmp_id);
		undoCourse.then(function (data) {
			$scope.draftedCourses = angular.fromJson(JSON.parse(data.data));
		});
	};
	
	//delete course
	$scope.deleteCourseDetails = function(courseId){
		$scope.lastDeletedCourseId = courseId;		
	var deleteCourse = draftedCourses.fnDeleteCourse({activeFlag:0},courseId, $scope.rm_id , "Draft", $scope.cmp_id);
	deleteCourse.then(function (data) {
		$scope.draftedCourses = angular.fromJson(JSON.parse(data.data));
		$alert({scope: $scope, container:'body', keyboard:true, animation:'am-fade-and-slide-top', template:'views/ui/angular-strap/alert.tpl.html', title:'Undo', content:'The course has been moved to the Trash <i class="fa fa-smile-o"></i>', duration:15, placement: 'top-right', type: 'warning'});
	});
	
	};

}]);