angular.module('baabtra').service('paymentReport',['$http', 'bbConfig',function($http,bbConfig) {
	
	this.getReport = function(searchObj){
	    var promise = $http({
	      url: bbConfig.BWS+'getPaymentReport/',
	      data: searchObj,
	      method: "POST",
	      withCredentials: false,
	      contentType:"application/json",
	      dataType:"json",
	    });
    return promise;
   };

}]);