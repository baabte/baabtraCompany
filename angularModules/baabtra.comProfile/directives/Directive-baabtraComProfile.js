angular.module('baabtra').directive('baabtraComProfile',['baabtraProfile',function(baabtraProfile) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			userLoginId:"="
		},
		templateUrl: 'angularModules/baabtra.comProfile/directives/Directive-baabtraComProfile.html',
		link: function(scope, element, attrs, fn) {

			var baabtraComProfileData=baabtraProfile.loadbaabtraProfileData("54d84b55ef14f722f4890797");
			baabtraComProfileData.then(function (data) {
			if(data.status==200&&data.statusText=="OK"){
				var baabtraProfile = angular.fromJson(JSON.parse(data.data));
				console.log(baabtraProfile);
			}
					
		});

		}
	};
}]);
