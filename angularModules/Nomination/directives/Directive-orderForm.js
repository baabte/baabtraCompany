angular.module('baabtra').directive('orderForm', function() {
	return {
		restrict: 'E',
		scope: {
			orderObject:"=",
			companyObject:"="
		},
		templateUrl: 'angularModules/Nomination/directives/Directive-orderForm.html',
		link: function(scope, element, attrs, fn) {
			scope.data = {};
			scope.data.orderForm = {};
			scope.data.grandTotal = 0;
		}
	};
});
