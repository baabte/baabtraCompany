angular.module('baabtra').directive('userCard',['commonSrv', function (commonSrv) {
	return {
		restrict: 'E',
		scope: {
			userId : "="
		},
		templateUrl: 'angularModules/common/directives/Directive-userCard.html',
		link: function(scope, element, attrs, fn) {
			
			var userCardResponse = commonSrv.fnLoadUserCardDetails(scope.userId);
			userCardResponse.then(function(response){
				scope.data = {};
				scope.data.userDetails = angular.fromJson(JSON.parse(response.data));
				
			});
		}
	};
}]);
