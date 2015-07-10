angular.module('baabtra').directive('checkUserIdExistence',['$parse', 'commonSrv', '$alert', function($parse, commonSrv, $alert) {
	return {
		restrict: 'A',
		require :["^?form",'ngModel'],
		link: function(scope, element, attrs, fn) {

			var ngModelGet = $parse(attrs.ngModel);
			var modelArray = attrs.ngModel.split(".");
			var myAlert = "";
            element.bind('blur', function() {
            	modelArray = attrs.ngModel.split(".");
            	if(ngModelGet(scope)){
	            	var UserIdExistenceRes = commonSrv.checkUserIdExistence(ngModelGet(scope));
	            	UserIdExistenceRes.then(function(response){
	            		var result = angular.fromJson(JSON.parse(response.data));

	            		if(result){
	            			//test(scope);
	            			

	            			$(element).val("");
	            			console.log($(element).val());
	            			if(myAlert.hide){
	            				myAlert.hide();
	            			}
	            			myAlert = $alert({title: 'User Id already exists', content: '<br>Please choose a different user Id.', placement: 'top-right', type: 'warning', dismissable:false, show: true});
	            			
	            		}
	            		else{
	            			if(myAlert.hide){
	            				myAlert.hide();
	            			}
	            		}
	            	})
            	}
      		});
		}
	};
}]);

