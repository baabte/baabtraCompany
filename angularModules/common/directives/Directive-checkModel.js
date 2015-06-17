/* 
    Created by:lijin
    Created on:17-02-2015
    use: This can be used for getting value of selected paper-check box button
    Example:"<paper-checkbox check-model="selectedAnswer" label="{{option.value}}"  value="value"></paper-checkbox>"
    required attributes:value , check-model
*/

angular.module('baabtra').directive('checkModel', function() {
	return {
		restrict: 'A',
		scope:{checkModel:"="},
		link: function(scope, element, attrs, fn) {

			element.on('keyup', function(evt){
				if(evt.which!=32){ // for handling tab key press
					return 0;
				}
				 scope.$apply(function() {
					if(scope.checkModel==attrs.value){
						scope.checkModel='';
					}
					else{
						scope.checkModel=attrs.value;
					}
					
				});

			});

			element.on('click', function(){
				scope.$apply(function() {
					if(scope.checkModel==attrs.value){
						scope.checkModel='';
					}
					else{
						scope.checkModel=attrs.value;
					}
					
				});
			});

		}
	};
});