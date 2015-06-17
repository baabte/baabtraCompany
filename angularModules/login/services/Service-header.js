angular.module('baabtra').service('header',['$http','bbConfig',function header($http,bbConfig) {

	
	 this.logout=function($scope)//function for logout
	 {
	      $http({//call to the webservice
	      method: 'POST',
	      url: bbConfig.BWS+'logout/',
	      data: JSON.stringify({"UserLogoutObjId":$scope.logDatas}), //passing the login credentials          
	      }).success(function(data, status, headers, config) 
	      {
		       	$scope.fnCallbackLogout(data);	       	
	      }).error(function(data, status, headers, config) {
	          
	         });
	     
	 }; 

	 this.Details=function($scope){
	 	console.log($scope.ips);
  

	 }

}]);