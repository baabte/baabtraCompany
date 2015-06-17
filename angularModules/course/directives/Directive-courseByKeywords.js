angular.module('baabtra').directive('courseByKeywords',['PublishedCourse','$state', function(PublishedCourse,$state) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			keywords:"=",
			skipThis:"="
		},
		templateUrl: 'angularModules/course/directives/Directive-courseByKeywords.html',
		link: function(scope, element, attrs, fn) {
			scope.companyId = scope.keywords.companyId.$oid;
			scope.relatedCourses = 0;
			scope.relatedInfo = "";

			var searchKey = {};
			searchKey["Tags"] = scope.keywords.Tags;
			searchKey["Technologies"] = scope.keywords.Technologies;
			searchKey["Domains"] = scope.keywords.Domains;

			
			var relatedCourseResponse = PublishedCourse.courseByKeywords(scope.companyId, searchKey);
			relatedCourseResponse.then(function(data){
				scope.relatedCourses = angular.fromJson(JSON.parse(data.data)).courses;
			});

		scope.viewCourseDetails = function(courseId){
			$state.go("home.main.course",{courseId:courseId})
		}

		}//link
	};
}]);
