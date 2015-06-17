angular.module('baabtra').directive('gTranslate',['commonSrv',function(commonSrv) {
	return {
		restrict: 'AC',
		link: function(scope, element, attrs, fn) {
			
			console.clear();
		
		var strToConvert = attrs.gTranslate;
		var sourceLang = "en";
		var targetLang = "ar";

		var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
            + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(strToConvert);
        var simpleUrl="https://translate.googleapis.com/translate_a/single";
        var encData={client:'gtx'
        			,sl:sourceLang
        			,tl:targetLang
        			,dt:'t'
        			,q:encodeURI(strToConvert)};
  
  		// var result = JSON.parse(UrlFetchApp.fetch(url).getContentText());
  		var gotResult=commonSrv.getResultFromUrl(url);
  		gotResult.then(function(data) {
  			var result=angular.fromJson(JSON.parse(data.data));
  			
  			console.log(result);
  		});


  		

		}
	};
}]);