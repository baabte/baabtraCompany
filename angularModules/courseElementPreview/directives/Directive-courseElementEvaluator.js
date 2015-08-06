angular.module('baabtra').directive('courseElementEvaluator',['$compile', function ($compile) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			previewData:"=",
			tlPosition:"@",
			courseMappingId:'=',
			result:'=',
			elementMark:'='
		},
		templateUrl: 'angularModules/courseElementPreview/directives/Directive-courseElementEvaluator.html',
		link: function(scope, element, attrs, fn) {
			
			scope.result = [];

			scope.rand=Math.floor(Math.random()*100000); // for generating random id for elements
			scope.$watch('previewData', function(){
				$(element).find('#elementContent'+scope.rand).html('');
				if(!angular.equals(scope.previewData,undefined)){

					if(!angular.equals(scope.previewData.markScored, undefined)){
						scope.elementMark = scope.previewData.markScored;
					}
								
					angular.forEach(scope.previewData.elements, function(data,key){//looping through each type of course elements at this point in the object
							if(data instanceof Object){
							 		var elementToBeCreated=$('<'+data.type+'-ev>');
							 		//checking for custom attributes and adding them
							 		if(!angular.equals(data.customAttributes, undefined)) {
							 			
							 			for (var keyAttrib in data.customAttributes){
							 				elementToBeCreated.attr(keyAttrib,data.customAttributes[keyAttrib]);
							 			}
							 		}

							 		elementToBeCreated.attr('data',JSON.stringify(data));
							 		elementToBeCreated.attr('course-element',JSON.stringify(scope.previewData));
							 		elementToBeCreated.attr('index',key);
							 		elementToBeCreated.attr('course-id','courseId');
							 		elementToBeCreated.attr('course-mapping-id',JSON.stringify(scope.courseMappingId));
							 		elementToBeCreated.addClass('elementField');

							 		scope.result[key] = {};	

							 		scope.result[key].data = data;						 		

							 		$('#elementContent'+scope.rand).append(elementToBeCreated);
							}
					});
					if(!angular.equals(scope.previewData.nestedElements,undefined)){
						// if it is having any nested elements we have to append like this
						// then only it can append same directive inside this directive
						var elem='<nested-element data="previewData.nestedElements"></nested-element>';
						$('#elementContent'+scope.rand).append(elem);

					} 
						
				}
				// now we have to compile the view to render all the directives that we have added manually using js
				$compile(element)(scope);
			},true);
		}
	};
}]);
