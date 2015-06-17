angular.module('baabtra').directive('setSubHeadingAndBackgroundColor',['$compile','$rootScope', function($compile,$rootScope) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {

			 $rootScope.$watch(function(){ return $rootScope.userinfo; }, function(){
     
			 		
					var subTitleAndBackColor=$rootScope.userinfo.ActiveUserData.subTitleAndBackColor;
					// console.log($rootScope.userinfo);
					// console.log(subTitleAndBackColor);
					if(!angular.equals(subTitleAndBackColor,undefined)){
						if(!angular.equals(subTitleAndBackColor.SubTitlecolour,undefined)){
							 $(element).addClass($rootScope.userinfo.ActiveUserData.subTitleAndBackColor.SubTitlecolour);	
						}
						else{
							
							$(element).addClass('btn-material-blue-grey-200');	
						}
					}
					else{
							$(element).addClass('btn-material-blue-grey-200');
					}
      
		    });


		}
	};
}]);