angular.module('baabtra').directive('questionGroupViewerEv', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"="
		},
		templateUrl: 'angularModules/courseElementFields/questionGroupViewerEv/directives/Directive-questionGroupViewerEv.html',
		link: function(scope, element, attrs, fn) {
			// initialisisng the return variable
			if(angular.equals(scope.result, undefined)){
				scope.result = scope.$parent.result[parseInt(attrs.index)];
				scope.result.data = angular.copy(scope.data);
			}


			if(angular.equals(scope.result.data.value.markScored,undefined)){
				scope.result.data.value.markScored=0;
			}


			scope.markChanged = function(mark, index){
				
				if(!angular.equals(mark, undefined)){
					if(angular.equals(scope.result.data.markScored, undefined)){
						scope.result.data.markScored = {};
					}
					scope.result.data.markScored[index] = mark;

					scope.$parent.elementMark = 0;
					for(var qMark in scope.result.data.markScored){
						scope.$parent.elementMark = scope.$parent.elementMark +  scope.result.data.markScored[qMark];
					}
					
				}

				// 	var totalMark=0
					
				// for(var index in scope.result.data.value.testModel){
				// 	totalMark = totalMark + scope.result.data.value.testModel[index].markScored
				// }

				// scope.result.data.value.markScored=totalMark;

			};

		}
	};
});
