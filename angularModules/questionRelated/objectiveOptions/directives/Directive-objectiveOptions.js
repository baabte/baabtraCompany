angular.module('baabtra').directive('objectiveOptions', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			options:'=',
			answerType:'=',
			answer:'=',
			markScored:'=',
			markObj:'=',
			userAnswer:'=',
			dbAnswer:'='
		},
		templateUrl: 'angularModules/questionRelated/objectiveOptions/directives/Directive-objectiveOptions.html',
		link: function(scope, element, attrs, fn) {

			if(!scope.userAnswer){ // if he already answered no need to reset the marks
				scope.markScored=0;
			}
			else{
				scope.selectedAnswer=scope.userAnswer;
			}
			
			scope.$watch('selectedAnswer',function () {
				var answerList=angular.copy(scope.answer);
				scope.userAnswer=angular.copy(scope.selectedAnswer);
				var count=0;
				var correctAnswer=0;
				while(!angular.equals(answerList.length,0)&&scope.selectedAnswer.length>count){

					if(answerList[0].Name==scope.selectedAnswer[count]){ // looping through user's answer to calculate marks
						correctAnswer++;
						answerList.splice(0,1);
					}
					
					count++;
					
				}
				// while(scope.userAnswer.indexOf('')!=-1){
				// 	var indexNum=scope.userAnswer.indexOf('');
				// 	scope.userAnswer.splice(indexNum,1);
				// }
				var uaLooper=0;
				for(uaLooper;uaLooper<scope.userAnswer.length;){ // looping to remove null values and empty values
					if(scope.userAnswer[uaLooper]==null||scope.userAnswer[uaLooper]==''){
						scope.userAnswer.splice(uaLooper,1);
					}
					else
					{
						uaLooper++;
					}
				}

				if(correctAnswer==scope.answer.length&&scope.userAnswer.length==correctAnswer){
					scope.markScored=scope.markObj.totalMark; // calculating marks to be given
				}
				else{
					scope.markScored=0;
				}
			},true);


		// function for checking selected user answer
		scope.fnCheckTicked=function (option) {
			if(typeof scope.dbAnswer !='undefined'){
				return scope.dbAnswer.indexOf(option)!=-1;
			}
			else{
				return false;
			}
		};

		}
	};
});
