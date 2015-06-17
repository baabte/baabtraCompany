angular.module('baabtra').directive('smoothScroll', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {
			$(element).smoothTouchScroll({
				mousewheelScrolling: "allDirections",
				manualContinuousScrolling: true,
				autoScrollingMode: "onStart"
			});
		}
	};
});