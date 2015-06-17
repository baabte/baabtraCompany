angular.module('baabtra').directive('feedbackViewer',['$rootScope','bbConfig','$compile',function ($rootScope,bbConfig,$compile) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			feedbackForm:'=',
			feedbackResponse:'=',
			userResponse:'='
		},
		templateUrl: 'angularModules/feedback/feedbackViewer/directives/Directive-feedbackViewer.html',
		link: function(scope, element, attrs, fn){

		// console.log(scope.feedbackForm);
		//creating the array to keep the user response 
		
			for(var index in scope.feedbackForm){
				var tempObj={userResponse:[]};
				scope.feedbackResponse.push(tempObj);
			}

		scope.markScored=0;//mark is not used here

		scope.mark=JSON.stringify({totalMark:0}); //markobject set as 0
		}
	};
}]);
