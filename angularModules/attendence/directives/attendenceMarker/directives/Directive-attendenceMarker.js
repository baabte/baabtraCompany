angular.module('baabtra').directive('attendenceMarker',['attendenceService','$aside',function (attendenceService,$aside) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			userCourseId:'='
		},
		templateUrl: 'angularModules/attendence/directives/attendenceMarker/directives/Directive-attendenceMarker.html',
		link: function(scope, element, attrs, fn) {
	    // Pre-fetch an external template populated with a custom scope
		var courseElementAside = $aside({scope: scope,animation:'am-fade-and-slide-left',placement:'left', template: 'angularModules/attendence/aside/aside-attendenceMarking.html'});
		var courseElementFetchPromise=attendenceService.courseElementsFetch(scope.userCourseId);
		courseElementFetchPromise.then(function(data){
		    scope.courseElementlist=angular.fromJson(JSON.parse(data.data));
			console.log(scope.courseElementlist);
			
			//for loading aside 
            courseElementAside.$promise.then(function() {
              courseElementAside.show();
            });
		});
		//marking attendence function will triger on click
		scope.fnMarkAttendence=function(courseElement){	
				console.log(courseElement.courseElement.attendence);
			var markAttendencePromise=attendenceService.markAttendence(scope.userCourseId,courseElement.tlpoint,courseElement.userCourseElementType,courseElement.innerIndex,courseElement.courseElement.attendence);
			markAttendencePromise.then(function(data){
		    var result=angular.fromJson(JSON.parse(data.data));
			console.log(result);

			});
		};
		//converting back to day
		scope.changeminutes2day=function(minutes) {
			var day= Math.ceil((minutes/60)/24);
			return day;
		};


		}
	};
}]);
