angular.module('baabtra').directive('scoreCard',['$compile', function($compile) {
	return {
		restrict: 'E',
		replace: true,
		scope:{
			scoreObj:"="
		},
		templateUrl: 'angularModules/course/directives/Directive-scoreCard.html',
		link: function(scope, element, attrs, fn) {

			// var checkElemWithMark = function(arr){
			// 	var count=0;
			// 	for(var key in arr){
			// 		if(angular.equals(arr[key].mark.type,'mark')){
			// 			count++;
			// 		}
			// 	}
			// 	return count==0?1:count;
			// };

			// var getMarkInAllLevel = function(syllabus,index){
			// 	if(!angular.equals(syllabus[index].mark, undefined)){
			// 		if(syllabus[index].mark.type=='mark' && syllabus[index].children.length==0){
			// 			syllabus[index].mark.markScored = parseFloat(syllabus[index].mark.markScored.toFixed(2));
			// 			return syllabus[index].mark;
			// 		}
			// 		else if(syllabus[index].mark.type=='mark'){
			// 			var mark=getMarkInAllLevel(syllabus[index].children,0);
			// 			if(mark.type=='mark'){
			// 				syllabus[index].mark.markScored = ((mark.markScored/mark.maxMark)*syllabus[index].mark.maxMark)/checkElemWithMark(syllabus[index].children);
			// 				syllabus[index].mark.markScored = parseFloat(syllabus[index].mark.markScored.toFixed(2));
			// 				return syllabus[index].mark;
			// 			}
			// 			else if(syllabus.length>(index+1)){
			// 				return getMarkInAllLevel(syllabus,index+1);
			// 			}
			// 		}
			// 		else{
			// 			return {type:'no-mark'};
			// 		}
			// 	}
			// };
			var getMarkInAllLevel = function(syllabus,index){
				if(!angular.equals(syllabus[index].mark, undefined)){
					if(syllabus[index].children.length){
						for (var i = 0; i < syllabus[index].children.length; i++) {
							var mark = getMarkInAllLevel(syllabus[index].children, i);
							if(angular.equals(syllabus[index].mark.markScored,undefined)){
              					syllabus[index].mark.markScored = 0;
           					}
           					if(!angular.equals(mark.markScored, undefined)){
	           					mark.markScored = parseFloat(mark.markScored.toFixed(2));
	           					syllabus[index].mark.markScored = syllabus[index].mark.markScored + parseFloat(mark.markScored.toFixed(2)); 
							}
						}
					}
				      if(syllabus[index].mark){
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
