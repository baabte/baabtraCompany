angular.module('baabtra').controller('BaabtraComprofileCtrl',['$scope', '$rootScope', '$stateParams', 'baabtraProfile', 'bbConfig', 'commonService', '$state', 'viewBatches', function ($scope,$rootScope,$stateParams,baabtraProfile, bbConfig, commonService, $state, viewBatches){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/




$scope.baabtraProfile = {};
$scope.baabtraProfile.type = $stateParams.type;

var dataObj = {};
if(angular.equals(bbConfig.MURID, roleId)){
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	var day = today.getDate();
	var currentDate = year+'/'+month+'/'+day;

	dataObj.userLoginId = $rootScope.userinfo.ActiveUserData.userLoginId;
	dataObj.type = 'detailed';
	dataObj.date = currentDate;

}
else{
	dataObj.userLoginId = $stateParams.userLoginId;
	dataObj.type = $stateParams.type;
}

var userData = baabtraProfile.fnLoadUserProfileDetails(dataObj);

userData.then(function (data) {
	$scope.baabtraProfile.result = angular.fromJson(JSON.parse(data.data));
	$scope.baabtraProfile.userDetails = $scope.baabtraProfile.result.userDetails;
	$scope.baabtraProfile.courses = [];
	$scope.baabtraProfile.tests = [];
	$scope.baabtraProfile.courseDropdown = [];
	$scope.buildBaabtraProfile($scope.baabtraProfile.result.courses, '');
	
});

$scope.buildBaabtraProfile = function(courses, loadingType){
	for(var course in courses){
		var singleCourse = courses[course];
		if(angular.equals($scope.baabtraProfile.type, 'byCourse')){
			var courseDetails = {Name:singleCourse.Name, Type:singleCourse.type?singleCourse.type:'Course',courseId:singleCourse.fkCourseId.$oid, userId:$scope.baabtraProfile.userDetails.roleMappingId};
			if(!angular.equals(loadingType, 'single')){
				$scope.baabtraProfile.courseDropdown.push(courseDetails);
			}
			else if(angular.equals(loadingType, 'single')){
				$scope.baabtraProfile.courses = [];
				$scope.baabtraProfile.tests = [];
			}
		}
		if(singleCourse.activeFlag){
			if(angular.equals(courses[course].type, 'course') || angular.equals(courses[course].type, undefined)){
				courses[course].type = 'course';
				$scope.baabtraProfile.courses.push(courses[course]);
			}
			else if(angular.equals(courses[course].type, 'test')){
				$scope.baabtraProfile.tests.push(courses[course]);
			}
		}
	}

	if(angular.equals($scope.baabtraProfile.courseDropdown.length, 1)){
		$scope.loadCourseDetailsById($scope.baabtraProfile.courseDropdown[0].userId.$oid,$scope.baabtraProfile.courseDropdown[0].courseId);
	}
};

var lastCourseId = "";
$scope.loadCourseDetailsById = function(userId, courseId){
	if(!angular.equals(lastCourseId, courseId)){
		lastCourseId = courseId;
		var courseDetailsResponse = viewBatches.LoadUserCourseDetails([userId], courseId);
	  	courseDetailsResponse.then(function(response){
	  		var course = angular.fromJson(JSON.parse(response.data));
	  		$scope.buildBaabtraProfile(course, 'single');
	  	});
  	}
};

$scope.calculateAge = function calculateAge(birthday) { // birthday is a date
	birthday = new Date(birthday);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - new Date().getUTCFullYear());
};


$scope.convertDate = function convertDate(date){
	return new Date(date);
};


$scope.getCourseDuration = function getCourseDuration(duration){
	return duration[Object.keys(duration)[0]] +" "+ Object.keys(duration)[0];
};
$scope.baabtraProfile.showInPrint = true;
$scope.showId = function showId(){
	$scope.baabtraProfile.showId = true;
	$scope.baabtraProfile.showInPrint = false;
	setTimeout(function(){ 
	angular.element('#myElement').click();
}, 5);
};

$scope.fullPrint = function fullPrint(){
	$scope.baabtraProfile.showInPrint = false;
	setTimeout(function(){ 
	angular.element('#myElement').click();
}, 5);
};


$scope.baabtraProfile.current = 4;
$scope.baabtraProfile.max = 5;

}]);