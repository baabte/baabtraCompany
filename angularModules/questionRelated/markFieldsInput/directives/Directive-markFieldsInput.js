angular.module('baabtra').directive('markFieldsInput', function() {
	return {
		restrict: 'E',
		scope: {
			markObj:'=',
			customMarks:'='
		},
		templateUrl: 'angularModules/questionRelated/markFieldsInput/directives/Directive-markFieldsInput.html',
		link: function(scope, element, attrs, fn) {


			if(!scope.markObj.markCriteria){
				scope.markObj.markCriteria=[{}]; // default first criteria option
			}

			scope.criteriaTyped=function (ans,index) {
				var totalMark=scope.markChanged(index);
				if(totalMark>=scope.markObj.totalMark){
					return 0;
				}
		    	var timer=setTimeout(function () {
		    		clearTimeout(timer);
		    		if(ans.length>0){
		    			if(angular.equals(scope.markObj.markCriteria[index+1],undefined)){
			    			scope.markObj.markCriteria[index+1]={};
			    			scope.$digest();
			    		}
			    	}
		    	},100);
		    };

		    scope.markChanged = function (index) {
		    	var totalMark=0;
		    	angular.forEach(scope.markObj.markCriteria,function(criteria) {
		    	if(!angular.equals(criteria.mark,undefined)){
		    		totalMark+=criteria.mark;
		    	}
		    	});

		    	if(totalMark>=scope.markObj.totalMark){ // checks if he entered an invalid mark more than total mark
		    		scope.markObj.markCriteria[index].mark=scope.markObj.totalMark-(totalMark-scope.markObj.markCriteria[index].mark);
		    		if(!angular.equals(scope.markObj.markCriteria[index+1],undefined)){
			    			scope.markObj.markCriteria.splice(index+1,1);
			    	}
		    	}
		    	return totalMark;
		    };


		    scope.dropDown=function (index) {
		    	var list=[];
		    	
		    	list.push({text:"Remove",click:function() {
		    		if(scope.markObj.markCriteria.length>1){
			    		scope.markObj.markCriteria.splice(index,1); //removes that object if there have more than one element in the list
		    		}
		    		}});

		    list.push({text:"Insert after",click:function() {
		    		scope.markObj.markCriteria.splice(index+1,0,{});
		    		}});

		    list.push({text:"Insert before",click:function() {
		    		scope.markObj.markCriteria.splice(index,0,{});
		    		}});

		    	return list;
		    };

		}
	};
});
