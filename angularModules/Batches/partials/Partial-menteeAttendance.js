angular.module('baabtra').controller('MenteeattendanceCtrl',['$scope','$rootScope','viewBatches','$stateParams','$alert','assignCourseMaterial','attendenceService',function($scope,$rootScope,viewBatches,$stateParams,$alert,assignCourseMaterial,attendenceService){

	$scope.menteeObj={};
	$rootScope.$watch('userinfo',function(){
		$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		loadCourseDDl=assignCourseMaterial.loadCourses4AssigningCourseMaterial($scope,$stateParams.userId);
		$scope.urmId=$stateParams.userId;
		loadCourseDDl.then(function(response){ //promise for batch load
			$scope.menteeObj.courseList=angular.fromJson(JSON.parse(response.data)).courseList;
			$scope.menteeObj.existCourseObj=angular.fromJson(JSON.parse(response.data)).courseObj;
			$scope.menteeObj.profile=angular.fromJson(JSON.parse(response.data)).profile;
		});
	});

	//function to watch the selected course change
	$scope.$watch('selectedCourse',function(){
		if(!angular.equals($scope.selectedCourse,undefined)){
			loadCourseMaterialsDDl=viewBatches.loadCoursesMaterials4menteeAtt($scope);
			loadCourseMaterialsDDl.then(function(response){ //promise for batch load
				var outcomeObj=angular.fromJson(JSON.parse(response.data));
				if(!angular.equals(outcomeObj,'notfound')){
					$scope.menteeObj.userCourseList=outcomeObj.userCourseList;
					$scope.menteeObj.userCourseElementlist=outcomeObj.userCourseElementlist;
					$scope.status=true;
				}
				else{
					$scope.status=false;
				}
				//$scope.menteeObj.profile=angular.fromJson(JSON.parse(response.data)).profile;
			});
		}
	});

	//marking attendence function will triger on click
		$scope.fnMarkAttendence=function(courseElement){	
			var markAttendencePromise=attendenceService.markAttendence($scope.selectedCourse,courseElement.tlpoint,courseElement.userCourseElementType,courseElement.innerIndex,courseElement.courseElement.attendence);
			markAttendencePromise.then(function(data){
		    var result=angular.fromJson(JSON.parse(data.data));
		    	if(angular.equals(result,'attendence marked')){
		    		$alert({title: "Success", content: 'Done!!' , placement: 'top-right',duration:3, type: 'info'});
		    	}
			});
		};
		//converting back to day
		$scope.changeminutes2day=function(minutes) {
			var day= Math.ceil((minutes/60)/24);
			return day;
		};


}]);