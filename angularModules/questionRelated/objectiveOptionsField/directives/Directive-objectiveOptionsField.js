/* 
    Created by:lijin
    Created on:14-02-2015
    use: This can be used for displaying objective type question's options (input)
    Example:"<objective-options-field answers="question.options"></objective-options-field>"
    required attributes:answers
*/

angular.module('baabtra').directive('objectiveOptionsField', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			answers:'='
		},
		templateUrl: 'angularModules/questionRelated/objectiveOptionsField/directives/Directive-objectiveOptionsField.html',
		link: function(scope, element, attrs, fn) {

			// for generating a customizable keys for the options
		    scope.optionsArray=[{name:'Alphabet (a,b,c,d ...)',value:['a','b','c','d','e','f','g','h','i','j','k']},
		    					{name:'Number (1,2,3,4, ...)',value:[1,2,3,4,5,6,7,8,9,10]},
		    					{name:'Roman (I,II,III,IV, ...)',value:['I','II','III','IV','V','VI','VII','VIII','IX','X']},
		    					{name:'Roman - small (i,ii,iii,iv, ...)',value:['i','ii','iii','iv','v','vi','vii','viii','ix','x']}];

		    scope.selectedNumbering={name:'Alphabet',value:['a','b','c','d','e','f','g','h','i','j','k']}; // setting default key type

		    if(!scope.answers){
		    	scope.answers=[{Name:scope.selectedNumbering.value[0]}]; // default first answer option
		    }

		    scope.dropDown=function (index) {
		    	var list=[];
		    //if(!angular.equals(scope.answers[index].value,undefined)){
		    	
		    	list.push({text:"Remove",click:function() {
		    		if(scope.answers.length>1){
			    		scope.answers.splice(index,1); //removes that object if there have more than one element in the list
			    		// if(scope.answers.length==1){
			    		// 	// this will add an element if there have only one element left after deleting this element
			    		// 	scope.answers.push({});
			    		// }
			    		scope.changeNumberingType();   //this function rebuilds the key values(numberings) in correct order

		    		}
		    		}});

		    //}

		    list.push({text:"Insert after",click:function() {
		    		scope.answers.splice(index+1,0,{});
		    		scope.changeNumberingType(); 
		    		}});

		    list.push({text:"Insert before",click:function() {
		    		scope.answers.splice(index,0,{});
		    		scope.changeNumberingType(); 
		    		}});

		    	return list;
		    };


		    scope.changeNumberingType=function() {
		    	var optLoop=0;
		    	for(optLoop;optLoop<scope.answers.length;optLoop++){
		    		scope.answers[optLoop].Name=scope.selectedNumbering.value[optLoop];
		    	}
		    };


		    scope.ansChanged=function (ans,index) {
		    	var timer=setTimeout(function () {
		    		clearTimeout(timer);
		    		if(ans.length>0){
		    			if(angular.equals(scope.answers[index+1],undefined)){
			    			scope.answers[index+1]={Name:scope.selectedNumbering.value[index+1]};
			    			scope.$digest();
			    		}
			    	}
		    	},100);
		    };

		}
	};
});
