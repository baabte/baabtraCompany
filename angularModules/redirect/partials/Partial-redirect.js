angular.module('baabtra').controller('RedirectCtrl',['$scope','commonService','$rootScope','$state','localStorageService',function($scope,commonService,$rootScope,$state,localStorageService){


	var gotData = commonService.loadUserData();
		gotData.then(function (response) {
			if(angular.fromJson(JSON.parse(response.data))=="error"||angular.fromJson(JSON.parse(response.data))=="failed"){ //if the user data not present it active user log it will push to logout
				    localStorageService.set('logDatas','{}');//resetting the userinfo before logout 
					$rootScope.loggedIn=false;
					$rootScope.hide_when_root_empty=false;
					$state.go('login');//redirecting path into login
					

				}
			else{  //if the user is active in the active log then reload the user state
					$rootScope.userinfo=angular.fromJson(JSON.parse(response.data));
					$rootScope.hide_when_root_empty=false;
					$rootScope.loggedIn=true;
					if(angular.equals($rootScope.fromState,undefined)){
						$state.go("home.main");
					}
					else{
						if(!angular.equals($rootScope.stateParams,undefined)){
							$state.go($rootScope.fromState,$rootScope.stateParams);		
						}
						else{
							$state.go($rootScope.fromState);
						}
						
					}
					
				 	//console.log($rootScope.hide_when_root_empty);
				}		
		});

}]);