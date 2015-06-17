angular.module('baabtra').directive('setParentHeight', function() {
	return {
		restrict: 'A',
		scope: {
			parentClName:"="
		},
		
		link: function(scope, element, attrs, fn) {
			var height;
			
			if(!angular.equals(scope.parentClName,undefined)){

				scope.$watch(function(){return $(element).parents().find('.'+scope.parentClName).height();},
					function(){
						height=$(element).parents().find('.'+scope.parentClName).height();
						$(element).height(height);

					});
				
				
			}
			else{
				scope.$watch(function(){return $(element).parents().find('.set-full-height').height();},
					function(){
						height=$(element).parents().find('.set-full-height').height();
						$(element).height(height);
					});
				//height=$(element).parents().find('.set-full-height').height();
				//$(element).height(height);
			}
			
		}
	};
});