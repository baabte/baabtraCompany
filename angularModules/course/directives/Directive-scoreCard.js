angular.module('baabtra').directive('scoreCard',['$compile', function($compile) {
	return {
		restrict: 'E',
		replace: true,
		scope:{
			scoreObj:"="
		},
		templateUrl: 'angularModules/course/directives/Directive-scoreCard.html',
		link: function(scope, element, attrs, fn) {
			
			var getMarkInAllLevel = function(syllabus,index){
				if(!angular.equals(syllabus[index].mark, undefined)){
					if(syllabus[index].children.length){
						for (var i = 0; i < syllabus[index].children.length; i++) {
							var mark = getMarkInAllLevel(syllabus[index].children, i);
							var length = syllabus[index].children.length;
							if(!syllabus[index].mark.markScored){
								syllabus[index].mark.markScored = 0;
							}
							if(mark.markScored){
								syllabus[index].mark.markScored = syllabus[index].mark.markScored + (mark.markScored/mark.maxMark);
								if(angular.equals(length, (i+1))){
									syllabus[index].mark.markScored = parseFloat(((syllabus[index].mark.markScored/length)*syllabus[index].mark.maxMark).toFixed(2));
								}
							}
						}
					}

				    if(syllabus[index].mark){
				    	if(syllabus[index].mark.markScored){
				    		syllabus[index].mark.markScored = parseFloat(syllabus[index].mark.markScored.toFixed(2));
				    	}
				    	return syllabus[index].mark;
				    }

				}
			}

			scope.scoreCard = {};
			scope.scoreCard.markSheet = scope.scoreObj;
			var objTest = getMarkInAllLevel(scope.scoreCard.markSheet, 0);
		}
	};
}]);


/*
if(angular.equals(syllabus[index].mark.markScored,undefined)){
              					syllabus[index].mark.markScored = 0;
           					}
           					if(!angular.equals(mark.markScored, undefined)){
           						
           						if(mark.markScored > 0){
           							mark.markScored = parseFloat(mark.markScored).toFixed(2);
	           						//syllabus[index].mark.markScored = parseFloat(syllabus[index].mark.markScored) + parseFloat(mark.markScored);
	           						console.log(syllabus[index].mark.markScored);
	           						//console.log(syllabus[index].mark.markScored);
	           					}

							}
*/