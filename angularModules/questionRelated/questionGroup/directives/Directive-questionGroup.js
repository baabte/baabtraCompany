angular.module('baabtra').directive('questionGroup',['$modal', function($modal) {
	return {
		restrict: 'E',
		require:'ngModel',
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/questionRelated/questionGroup/directives/Directive-questionGroup.html',
		link: function(scope, element, attrs, fn) {
			
		if(angular.equals(scope.ngModel,undefined)){					

			scope.questionGroupModel=[];//array to keep the 
			scope.courseElement={index:1,tlPointInMinute:1000,Name:'Test'};
			//dummy object created to view the question here
			// scope.questionShow=false;
			scope.questionModel = {mark:{}};
			scope.duration = {unit:"minute(s)"};
			scope.units = ['minute(s)','hour(s)'];
			scope.mark = {totalMark:{}};
			scope.resultMode = 'live';
			scope.questionView = {};
			scope.questionView.mode = 'single';
			}
			else{

			scope.mark=scope.ngModel.mark;
			scope.duration=scope.ngModel.duration;
			scope.units=['minute(s)','hour(s)'];
			scope.resultMode=scope.ngModel.resultMode;
			scope.questionView=scope.ngModel.questionView;
			// scope.questionShow=false;
			scope.questionModel={mark:{}};
			scope.courseElement={index:1,tlPointInMinute:1000,Name:'Test'};
			scope.questionGroupModel=scope.ngModel.testModel;
			}
		 scope.dropDown=function (index) {
		    	var list=[];

		    list.push({text:"Edit",click:function() {
		    			scope.placeindex=index;
		    			scope.questionModel=angular.copy(scope.questionGroupModel[index]);
		    			scope.position='edit';
			    	 	scope.questionShowActivate();

		    		
		    		}});
		    list.push({text:"Insert before",click:function() {
		    		scope.placeindex=index;
		    		scope.position='before';
		    		// scope.questionShow=true;
		    	 	scope.questionShowActivate();

		    		// scope.questionGroupModel.splice(index,0,{});
		    		}});
		    list.push({text:"Insert after",click:function() {
		    		scope.placeindex=index;
		    		scope.position='after';
		    		// scope.questionShow=true;
		    	 	scope.questionShowActivate();

		    		// scope.QuestionModalOpen();
		    		// scope.questionGroupModel.splice(index+1,0,{});
		    		}});
		    list.push({text:"Remove",click:function() {
		    		scope.placeindex=index;
		    		if(scope.questionGroupModel.length>=1){
			    		scope.questionGroupModel.splice(index,1); //removes that object if 
		    			if(angular.equals(index,0)){
		    				// scope.questionShow=true;
			    	 	scope.questionShowActivate();

		    			}
		    		}
		    		}});

		    	return list;
		    };

		    scope.questionShowActivate =function(){
		    	 questionModal.$promise.then(questionModal.show);		    	
		    };

		    scope.questionShowDeactivate =function(){
		     	scope.questionModel={mark:{}};
		    	questionModal.hide();		    	
		    };
		    

		     // Pre-fetch an external template populated with a custom scope
            var questionModal = $modal({scope: scope, template: 'angularModules/questionRelated/questionGroup/directives/Modal-question.html', show: false,placement:'top'});
            // Show when some event occurs (use $promise property to ensure the template has been loaded)
          
             
           
		    //watch function to keep track of the the totalmark  
		    scope.$watch(function(){return scope.questionModel.mark;},function(){
		    	

		    	if(!angular.equals(scope.questionModel.mark.totalMark,undefined)){
		    	

		    		var addedQuestionTotal=0;
		    		//calculating the total mark 
		    		for(var i in scope.questionGroupModel){
		    			if(!angular.equals(scope.questionGroupModel[i].mark.totalMark,undefined)){
		    			addedQuestionTotal=addedQuestionTotal+scope.questionGroupModel[i].mark.totalMark;
		    			}
		    		}

		    		
		    		// console.log(addedQuestionTotal);
		    		if(addedQuestionTotal+scope.questionModel.mark.totalMark>scope.mark.totalMark){
		    			scope.questionModel.mark.totalMark=scope.mark.totalMark-addedQuestionTotal;
		    		}
		    	}
		    },true);
		    	//watch function to keep track of the the duration 
		     scope.$watch(function(){return scope.duration;},function(){
		     	if(!angular.equals(scope.duration, undefined)){
			     	//0 duration not allowed will set it to 1
			    	if(scope.duration.value<=0){
			     		scope.duration.value=1;
			     	}
			     	//if duration is in minutes duration will be maximum of 60
			    	if(angular.equals(scope.duration.unit,'minute(s)')){
			    		if(scope.duration.value>60){
			    			scope.duration.value=60;
			    		}
			    		scope.actualDuration=scope.duration.value*60000;
			    		
			    	}
			    	//if duration is in hour duration will be maximum of 24
			       	else if(angular.equals(scope.duration.unit,'hour(s)')){
			       		
			    		if(scope.duration.value>24){
			    			scope.duration.value=24;		    			
			    		}
			    		scope.actualDuration=scope.duration.value*3600000;
			    		
			    	}
		    	}
		    },true);
		     	//watch function to keep track of the the duration 
		     scope.$watch(function(){return scope.mark;},function(){	
			     if(!angular.equals(scope.mark, undefined)){     			    			     	
			    	if(scope.mark.qualifyScore>scope.mark.totalMark){
			    		scope.mark.qualifyScore=scope.mark.totalMark;
			    	}
			    }			    	
		    },true);

          scope.addQuestion =function(questionModel,placeindex){
          	// console.log(placeindex);
          	var tempArray=[];
          	for(var key in questionModel.answer){
          		var tempObj={};
          		tempObj=questionModel.answer[key];
          		tempArray.push(tempObj);
          	}
          	questionModel.answer=tempArray;
            	if(angular.equals(placeindex,undefined)){
            	scope.questionGroupModel.push(questionModel);//must pass questionmodel instead of scope.questionmodel
            	// console.log(scope.questionGroupModel);            		            		
            	}
            	//to add a question to a specific position 
            	else{

            		if(angular.equals(scope.position,'edit')){
            			// console.log(scope.position);
            			scope.questionGroupModel[placeindex]=questionModel;            			            		
            		}
            		else if(!angular.equals(scope.position,'before')){
            			scope.questionGroupModel.splice(placeindex+1,0,questionModel);            	            		
            		}
            		else if(!angular.equals(placeindex,'after')){
		    			scope.questionGroupModel.splice(placeindex,0,questionModel);    
            		}
            	    delete scope.placeindex;//deleted to set the index back to default state

            	}
            	scope.ngModel={mark:scope.mark,questionView:scope.questionView,resultMode:scope.resultMode,duration:scope.duration,actualDuration:scope.actualDuration,testModel:scope.questionGroupModel};
            	scope.questionShowDeactivate();

            };

            scope.fnFormatObj=function (question) {
            	return JSON.stringify({value:question});
            };

		}

	};
}]);
