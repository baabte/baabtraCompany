angular.module('baabtra').directive('menteeView',['$state', function($state) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			menteeObj:"=",
			actionFlag:"=",
			specificOption:"=",
			shadow:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-menteeView.html',
		link: function(scope, element, attrs, fn) {

			scope.actions = [
			{
			"text": "<i class=\"fa fa-user\"></i>&nbsp;View profile",
			 "click": "fnViewProfile()"
			},
			{
			"text": "<i class=\"fa fa-globe\"></i>&nbsp;View course",
			 "click": "fnViewCourse()"
			},
			{
			"text": "<i class=\"fa fa-hand-o-up\"></i>&nbsp;Mark attendance",
			 "click": "fnMarkAttendance()"
			},
			{
			"text": "<i class=\"fa fa-paperclip\"></i>&nbsp;Assign a course material",
			"click": "fnAssignMaterial()"

			},
			{
			"text": "<i class=\"fa fa-check\"></i>&nbsp;Evaluate",
			"click": "fnEvaluate()"

			},
			{
			"text": "<i class=\"fa fa-pie-chart\"></i>&nbsp;Attendance report",
			"click": "fnMenteeReport()"

			},
			{
			"text": "<i class=\"fa fa-pie-chart\"></i>&nbsp;View mark sheet",
			"click": "fnviewMarkSheet()"

			},
			{
			"text": "<i class=\"fa fa-pie-chart\"></i>&nbsp;View certificate",
			"click": "fnviewCertificate()"

			}
			];

			//function to view the profile
			scope.fnViewProfile=function(){
				$state.go("home.main.userProfile",{userId:scope.menteeObj.fkUserLoginId.$oid});
			};

			//function to view course
			scope.fnViewCourse=function(){
				$state.go("home.main.course",{courseId:scope.menteeObj.fkCourseId.$oid});
			};

			//function to view course
			scope.fnAssignMaterial=function(){
				$state.go("home.main.assignCourseMaterial",{userId:scope.menteeObj.fkUserRoleMappingId.$oid});
			};



			//function to view course
			/*scope.fnMarkAttendance=function(){
				
				$state.go("home.main.menteeAttendance",{userId:scope.menteeObj.fkUserRoleMappingId.$oid});
			};*/

			//function to evaluate course materials
			scope.fnEvaluate=function(){
				$state.go("home.main.menteeEvaluation",{courseId:scope.menteeObj.fkCourseId.$oid, userId:scope.menteeObj.fkUserRoleMappingId.$oid});
			};

			scope.fnviewMarkSheet = function(){
				$state.go("home.main.viewMarkSheet",{courseId:scope.menteeObj.fkCourseId.$oid, userId:scope.menteeObj.fkUserRoleMappingId.$oid})
			};


			scope.fnviewCertificate = function(){
				$state.go("home.main.viewCertificate",{courseId:scope.menteeObj.fkCourseId.$oid, userId:scope.menteeObj.fkUserRoleMappingId.$oid})
			};

			//function to evaluate course materials
			/*scope.fnMenteeReport=function(){
				$state.go("home.main.menteeAttendanceReport",{userId:scope.menteeObj.fkUserRoleMappingId.$oid});

			};*/

			// function for executing functions from name
				scope.executeFunction=function (functionName) {
					functionName=functionName.replace('()','');
					scope[functionName]();
				};

		}
	};
}]);
