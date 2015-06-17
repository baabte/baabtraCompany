angular.module('baabtra').controller('MenteeattendancereportCtrl',['$scope','menteeAttendanceReport','$rootScope','$stateParams','assignCourseMaterial',function($scope,menteeAttendanceReport,$rootScope,$stateParams,assignCourseMaterial){

$scope.attReportObj={};
$scope.chartObj={};
//chart type object
$scope.chart = { //dummy object
  "type":"PieChart",	
  "options": {
    "title": "",
    "tooltip": {
      "isHtml": true
    },
    'width':600,
   'height':400
  }
};
//$scope.chartObj.type=$scope.attReportObj.chart.type;
//to check login info to get the user details
if(!$rootScope.userinfo){
    //commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

$rootScope.$watch('userinfo',function(){
	$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	loadCourseDDl=assignCourseMaterial.loadCourses4AssigningCourseMaterial($scope,$stateParams.userId);
	$scope.urmId=$stateParams.userId;
	loadCourseDDl.then(function(response){ //promise for batch load
		$scope.attReportObj.courses=angular.fromJson(JSON.parse(response.data)).courseList;
		$scope.attReportObj.profile=angular.fromJson(JSON.parse(response.data)).profile;
	});
});

//checking for feedbackId to load the feedback report
	$scope.$watch('selectedCourse',function(){
		if(!angular.equals($scope.selectedCourse,undefined)){
			var menteeAttendanceReportPromise = menteeAttendanceReport.fnLoadMenteesAttReport($scope,$stateParams.userId);
				menteeAttendanceReportPromise.then(function(response){ //getting the promise of feedback response
					$scope.reportList=angular.fromJson(JSON.parse(response.data)).data;
						$scope.chart.data=$scope.reportList;
						$scope.chart.options.title="Attendance Report";
						$scope.chartObj=angular.copy($scope.chart); //to copy the object
						
			});
		}
	});

$scope.chartTypes = [{"value":"PieChart","label":"PieChart"},{"value":"AreaChart","label":"Area Chart"},{"value":"ColumnChart","label":"Column Chart"},{"value":"LineChart","label":"Line Chart"},{"value":"Table","label":"Table"},{"value":"BarChart","label":"Bar Chart"}];

}]);