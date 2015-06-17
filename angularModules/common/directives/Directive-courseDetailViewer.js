angular.module('baabtra').directive('courseDetailViewer',['$sce','$alert', function($sce,$alert) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			courseDetails:"=",
			editable:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-courseDetailViewer.html',
		link: function(scope, element, attrs, fn) {
			
			var lastDeletedCourseDetail = "";//for store last deleted course detail for undo
			var indexOfDeletedCourseDetail = "";//for store index of last deleted course detail
			scope.removeThisDetails = function(index){//for remove detail from the course
				lastDeletedCourseDetail = scope.courseDetails[index];
				indexOfDeletedCourseDetail = index;
				$alert({scope: scope,container:'body',keyboard:true,animation:'am-fade-and-slide-top',template:'views/ui/angular-strap/alert.tpl.html',title:'Undo',content:'Course detail has been removed', placement: 'bottom-left', type: 'warning'});  
				scope.courseDetails.splice(index,1);
			};

			scope.undo = function(){
				scope.courseDetails.splice(indexOfDeletedCourseDetail, 0, lastDeletedCourseDetail);
			};

			 scope.trustSrc = function(src) {
			 	if(!angular.equals(typeof src,"object")){
			 		return $sce.trustAsResourceUrl(src);
			 	}
			 }
		}
	};
}]);
