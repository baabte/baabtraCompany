angular.module('baabtra').directive('onFinishRender', function() {
	return {
		restrict: 'AE',
		 link: function (scope, element, attr) {
            if (scope.$last === true) {
                scope.$evalAsync(attr.onFinishRender);
            }
        }
	};
});