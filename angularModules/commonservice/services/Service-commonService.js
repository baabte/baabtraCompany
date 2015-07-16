angular.module('baabtra').service('commonService',['$http','bbConfig','$state','localStorageService','$rootScope','$q',function commonService($http,bbConfig,$state,localStorageService,$rootScope,$q) {
//this service is for maintain the userstate 

this.GetUserCredentials=function($scope)
				 {
					if(!$rootScope.userinfo){ //whenever the user refresh the page it will check the credential variable 
						if(localStorageService.get('logDatas')){ // then it will chack the local storage for neccessary datas
							// console.log();
							if(angular.equals($rootScope.fromState,undefined)){
								$rootScope.fromState = $state.current.name;
								// console.log($state.params);
							if(!angular.equals($state.params,undefined)){

								$rootScope.stateParams = $state.params;
							}
							}
							// console.log($rootScope.fromState);
							$state.go('home.redirect');
						}
						else{
							localStorageService.set('logDatas','{}');//resetting the userinfo before logout 
							$rootScope.hide_when_root_empty=false;
							$rootScope.loggedIn=true;
							$state.go('login');//redirecting path into login
						}
					}

					 // console.log($rootScope.userinfo);
					return $rootScope.userinfo;
			};

this.loadUserData = function () {
	
	var promise = $http({//call to the webservice
						  method: 'POST',
						  url: bbConfig.BWS+'loadlogUserdata/',
						  data:angular.toJson({"UserDataObjId":localStorageService.get('logDatas')}), //passing the login credentials          
		  	   	   }).error(function(data, status, headers, config) {
				        localStorageService.set('logDatas','{}');//resetting the userinfo before logout 
							$rootScope.hide_when_root_empty=false;
							$rootScope.loggedIn=true;
							$state.go('login');//redirecting path into login 
				 	});

		return promise;
};




	
}]);

