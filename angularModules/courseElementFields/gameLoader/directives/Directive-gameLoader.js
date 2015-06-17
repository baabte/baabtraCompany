angular.module('baabtra').directive('gameLoader',['$rootScope','$state','$sce',function($rootScope,$state,$sce) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:'@',
			index:'=',
			courseElement:'='
		},
		templateUrl: 'angularModules/courseElementFields/gameLoader/directives/Directive-gameLoader.html',
		link: function(scope, element, attrs, fn) {
			

			var data=JSON.parse(scope.data);
			
			scope.gameUrl= $sce.trustAsResourceUrl(data.value);
			console.log(scope.gameUrl);



		}
	};
}]);
