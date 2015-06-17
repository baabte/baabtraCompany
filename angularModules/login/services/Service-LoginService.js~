angular.module('baabtra').service('LoginService',['$http',function LoginService($http) {
	


	this.fnloginService=function($scope)
	 {
        
      
      $http({//call to the webservice
      method: 'POST',
      url: "http://127.0.0.1:8000/"+'Login/',
      data:$scope.loginCredential, //passing the login credentials          
      }).success(function(data, status, headers, config) 
      {
        $scope.loginSuccessCallback(data);
           console.log(data);
      }).error(function(data, status, headers, config) {
          $scope.loginFailureCallback(data);
                     
         });
	 }; 

	
}]);
