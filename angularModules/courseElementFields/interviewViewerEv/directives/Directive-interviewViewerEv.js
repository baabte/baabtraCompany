angular.module('baabtra').directive('interviewViewerEv',['$rootScope', 'commonSrv', '$alert', function($rootScope, commonSrv, $alert) {
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
					var courseElement = JSON.parse(attrs.courseElement);
					var elementOrder = courseElement.tlPointInMinute+"."+courseElement.Name+"."+courseElement.index
					var interviewQuestionObj = {courseMappingId:attrs.courseMappingId.replace(/["']/g,''),elementOrder:elementOrder, index:parseInt(attrs.index), cmp_id:cmp_id, noOfQuestions:scope.result.data.value.questionSelection.noOfQuestions};
					var QuestionBankResponse = commonSrv.LoadInterviewQuestionBank(interviewQuestionObj);
					QuestionBankResponse.then(function(response){
						
						var result = angular.fromJson(JSON.parse(response.data));
						if(angular.equals(result, "Error")){
							$alert({title: 'Warning !', content: 'Something went wrong while loading<br>' + courseElement.elements[0].value, placement: 'top-right', type: 'warning', show: true, duration:3});
						}else{
							console.clear();
							scope.questionArray = result;
						}
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
