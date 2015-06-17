angular.module('baabtra').directive('interviewViewerEv',['$rootScope', 'commonSrv', function($rootScope, commonSrv) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"="
		},
		templateUrl: 'angularModules/courseElementFields/interviewViewerEv/directives/Directive-interviewViewerEv.html',
		link: function(scope, element, attrs, fn) {


			
			var cmp_id = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
			// initialisisng the return variable
			if(angular.equals(scope.result, undefined)){
				scope.result = scope.$parent.result[parseInt(attrs.index)];
				scope.result.data = angular.copy(scope.data);
				
				if(angular.equals(scope.result.data.value.questionSelection.type, 'manual')){
					scope.questionArray = scope.result.data.value.questionArray;
					
				}
				else if(angular.equals(scope.result.data.value.questionSelection.type, 'automatic')){
					var QuestionBankResponse = commonSrv.LoadInterviewQuestionBank(cmp_id, scope.result.data.value.questionSelection.noOfQuestions);
					QuestionBankResponse.then(function(response){
						scope.questionArray = angular.fromJson(JSON.parse(response.data));
					});
				}
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

			};
			// if(scope.data){
			// 	if(angular.equals(scope.data.value.questionSelection.type, "manual")){
			// 		scope.questionArray = scope.result.data.value.questionArray;
			// 	}
			// }
		}
	};
}]);
