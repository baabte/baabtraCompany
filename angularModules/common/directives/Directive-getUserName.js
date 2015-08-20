angular.module('baabtra').directive('getUserName',['communications',function(communications) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			loginId:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-getUserName.html',
		link: function(scope, element, attrs, fn) {
			
			scope.data = {};
			if(scope.loginId){
			  var getNAme = communications.getUserName(scope.loginId);
			      getNAme.then(function (response) {
			      	scope.data.profile = angular.fromJson(JSON.parse(response.data)).profile;
			      });
			}
			

		}
	};
}]);
