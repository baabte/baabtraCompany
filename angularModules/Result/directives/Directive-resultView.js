angular.module('baabtra').directive('resultView', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			userObject:"=",
			companyObject:"="
		},
		templateUrl: 'angularModules/Result/directives/Directive-resultView.html',
		link: function(scope, element, attrs, fn) {
			scope.data = {};
			scope.data.user = {};
			scope.data.grandTotal = 0;
			scope.data.siNo=0;
			//function to check the status
			scope.fnCheckStatus=function(elem){
				// console.log(elem.markScored);
				if(angular.equals(elem.evalStatus,undefined)){
						return 'Pending submission';
					}
				else if(angular.equals(elem.markScored,undefined)){
					return elem.evalStatus;	
				//}else if(angular.equals(elem.evalStatus,undefined)){
				//	return 'Pending evaluation';
				}else{
					return elem.markScored;
				}
			};
		scope.indexCount=0;
		scope.generateIndex=function (elemIndex) {
			scope.indexCount=scope.indexCount+1;
			var index=scope.indexCount;
			 elemIndex.index=index;
		};
		}
	};
});
