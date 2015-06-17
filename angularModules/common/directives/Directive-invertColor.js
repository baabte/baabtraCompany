angular.module('baabtra').directive('invertColor',['$rootScope', function($rootScope) {
	return {
		restrict: 'AC',
		link: function(scope, element, attrs, fn) {
             scope.previousLength = 0;

			if(!angular.equals($rootScope.userinfo.ActiveUserData.menuColor, 'random')){
				
				// var unbindThis = scope.$watch(function() { return $(element);}, function(){
				// 	var backgroundColor = $(element).css('background-color');
				// 	var color = $(element).css('color');					
				// 		$(element).css('color',backgroundColor);
				// 		$(element).css('background-color',color);
				// 		$(element).removeClass('invert-color')
				// 		unbindThis();
				// });
				
				scope.$watch('menuHover',function(){
					if(!angular.equals(scope.menuHover,undefined)){

						var backgroundColor = $(element).css('background-color');
						var color = $(element).css('color');					
						$(element).css('color',backgroundColor);
						$(element).css('background-color',color);
						$(element).removeClass('invert-color');
					}
				});
					

				
			}
		}
	};
}]);