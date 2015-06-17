angular.module('baabtra').directive('feedbackField',function() {
	return {
		restrict: 'E',
		replace: true,
		scope: { // should take an input object to bind the output
			feedback:'=ngModel'
		},
		templateUrl: 'angularModules/feedback/feedbackField/directives/Directive-feedbackField.html',
		link: function(scope, element, attrs, fn) {
			//setting default tab
			scope.selectedTab='question';
			//output plain text from html
			scope.outputPlainText=function(str){
				if(!angular.equals(str,undefined)){
					return str.trim().replace(/<[^>]+>/gm, '');
				}

			};


			// var gotCourseElements=srvCrs.fnGetCourseElementFields();
			// gotCourseElements.then(function (data) {
			// 	var courseElems=angular.fromJson(JSON.parse(data.data));
			// 	var loopIter=0;
			// 	for ( loopIter;loopIter<courseElems.length; loopIter++) {

			// 		if (!angular.equals(courseElems[loopIter].canBeAnAnswer,undefined)) {
			// 			if (courseElems[loopIter].canBeAnAnswer==true) {
			// 				var elem={Debug:courseElems[loopIter].Debug,Name:courseElems[loopIter].DispalyName,icon:courseElems[loopIter].icon};
			// 			    scope.answerTypes.push(elem);
			// 			}
			// 		}

			// 		scope.answerTypesSecond=angular.copy(scope.answerTypes);
			// 	}
			// });



			//this is for managing object design according to expected answer type
			scope.questionTypeChange=function (type) {
				if(type=='objective'){
					scope.feedback.answerType="singleAnswer";
				}
			};

			//initializing toway bindable objects
			if(!scope.feedback){
				scope.feedback={};
				scope.feedback.type='objective';
			}
			// scope.question.type="objective";
			// scope.question.answerType="singleAnswer";

		}

	};
});
