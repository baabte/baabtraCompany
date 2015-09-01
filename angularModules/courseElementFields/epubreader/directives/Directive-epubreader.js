angular.module('baabtra').directive('epubreader',['$sce', function($sce) {
	return {
			restrict: "E",
			scope: {
				data: '@data'
			},
      templateUrl: 'angularModules/courseElementFields/epubreader/directives/Directive-epubreader.html',
      link: function(scope, element, attrs, gAnalytics) {
        scope.epubObj = {};
        var data = JSON.parse(scope.data);
        console.log(data);

        //scope.src = "http://services.baabtra.com/files/Course/arabicEpub1/Sample.html&output=embed";
        scope.currentProjectUrl = $sce.trustAsResourceUrl(data.value);
      }
    }
}]);