angular.module('baabtra').directive('youtubeVideo',['$sce', function($sce) {
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			data:"@data",
			courseElement:"@"
		},
		templateUrl: 'angularModules/courseElementFields/youtubeVideo/directives/Directive-youtubeVideo.html',
		link: function(scope, element, attrs, fn) {



			//converting text data to objects
			scope.docObj = JSON.parse(scope.data);			
			scope.docObjParent = scope.courseElement;

			scope.url = scope.docObj.value;

			scope.$watch('url',function () {
				if(!angular.equals(scope.url,undefined)){
					if(scope.url.indexOf("v=") !== -1){
						var videoUrl=scope.url.split('v=')[1];
						if(videoUrl.indexOf("&") !== -1){
							videoUrl=videoUrl.split('&')[0];
						}
						scope.embedUrl='//www.youtube.com/embed/'+videoUrl;
					}else{
						scope.embedUrl='\/\/'+scope.url;
					}
				}
			});
			scope.trustSrc = function(src) {
    				return $sce.trustAsResourceUrl(src);
  			};
		}
	};
}]);
