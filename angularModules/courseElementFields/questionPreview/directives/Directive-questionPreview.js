angular.module('baabtra').directive('questionPreview', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
         previewData:'='
		},
		templateUrl: 'angularModules/courseElementFields/questionPreview/directives/Directive-questionPreview.html',
		link: function(scope, element, attrs, fn) {
			        scope.buttonInactiveState=true;
               scope.selectedCheckboxval=[];
              scope.saveAnswer = function(type){
                if(type==="radio"){
                 console.log(scope.selectedRadioval);
                  console.log(scope.previewData);
                }else{
                 console.log(scope.selectedCheckboxval);  
                }              	
              }
              scope.changeRadio=function(value,e){
              	scope.selectedRadioval=value;
                scope.buttonInactiveState=false;                
                //console.log(e.target);
                console.log($(e.target).parent().next().find("paper-button"));
              }
              scope.changeCheckBox=function(value,e){
                 
                  if(e.target.checked_===false){
              	    scope.selectedCheckboxval.push(value);//pushing the selected item to array
                  }else{
                    scope.selectedCheckboxval.splice(scope.selectedCheckboxval.indexOf(value),1);//to splice the unchecked item from the array
                  }
              }
		}
	};
});




