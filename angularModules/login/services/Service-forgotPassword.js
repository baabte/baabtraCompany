angular.module('baabtra').service('forgotPassword',['$http','bbConfig',function forgotPassword($http,bbConfig) {

	this.funGetPassword=function($scope){
		// console.log("called");
		  $http({//call to the webservice
	      method: 'POST',
	      url: bbConfig.BWS+'forgotPassword/',
	      data:JSON.stringify({"user_email":$scope.user_email}), //passing the login credentials          
	      }).success(function(data, status, headers, config) 
	      {
	        $scope.funGetPasswordCallBack(data);
	        
	      }).error(function(data, status, headers, config) {
	          
	         });
		 }; 

}]);