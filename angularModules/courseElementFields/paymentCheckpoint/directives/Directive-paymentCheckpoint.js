angular.module('baabtra').directive('paymentCheckpoint', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {data:"@data"},
		templateUrl: 'angularModules/courseElementFields/paymentCheckpoint/directives/Directive-paymentCheckpoint.html',
		link: function(scope, element, attrs, fn) {

			scope.Amount = JSON.parse(scope.data);
			console.log(scope.Amount);
		}
	};
});
