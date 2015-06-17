angular.module('baabtra').directive('randomQuestionExam', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/courseElementFields/randomQuestionExam/directives/Directive-randomQuestionExam.html',
		link: function(scope, element, attrs, fn) {
			scope.units=['minute(s)','hour(s)'];

			if(angular.equals(scope.ngModel,undefined)){

			scope.randomExam={};
			scope.randomExam.duration={unit:"minute(s)"};
			scope.randomExam.mark={};
			scope.randomExam.questionView={mode:'single'};
			scope.randomExam.resultMode='submit';
			scope.randomExam.testModel=[];
			
			}else{
			scope.randomExam=angular.copy(scope.ngModel);

			}

			 scope.$watch(function(){return scope.randomExam;},function(){



			 		//if duration is in minutes duration will be maximum of 60
			 	if(!angular.equals(scope.randomExam.duration.value,undefined)){

			    	if(angular.equals(scope.randomExam.duration.unit,'minute(s)')){
			    		if(scope.randomExam.duration.value>60){
			    			scope.randomExam.duration.value=60;
			    		}
			    		scope.randomExam.actualDuration=scope.randomExam.duration.value*60000;
			    		
			    	}
			    	//if duration is in hour duration will be maximum of 24
			       	else if(angular.equals(scope.randomExam.duration.unit,'hour(s)')){
			       		
			    		if(scope.randomExam.duration.value>24){
			    			scope.randomExam.duration.value=24;		    			
			    		}
			    		scope.randomExam.actualDuration=scope.randomExam.duration.value*3600000;
			    	}
		    	}

			 	scope.ngModel=angular.copy(scope.randomExam);

			 },true)

			


		}
	};
});
