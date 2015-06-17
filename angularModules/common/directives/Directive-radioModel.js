/* 
    Created by:lijin
    Created on:13-02-2015
    use: This can be used for getting value of selected paper-radio button
    Example:"<paper-radio-button value="objective"  radio-model="question.type"  name="objective" label="Objective"></paper-radio-button>"
    required attributes:value , radio-model
*/

angular.module('baabtra').directive('radioModel', function() {
	return {
		restrict: 'A',
		scope:{radioModel:"=",
			   radioChange:'&'},
		link: function(scope, element, attrs, fn) {
			
			element.on('keyup', function(evt){
				if(evt.which==9){ // for handling tab key press
					return 0;
				}
				scope.$apply(function() {
					scope.radioModel=attrs.value;
					scope.radioChange();
				});
			});
			element.on('click', function(){
				
				scope.$apply(function() {
					scope.radioModel=attrs.value;
					scope.radioChange();
				});
			});

		}
	};
});