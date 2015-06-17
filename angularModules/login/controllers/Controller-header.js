angular.module('baabtra').controller('header',['$scope','$rootScope','$state','localStorageService','header','commonService','$modal', function($scope,$rootScope,$state,localStorageService,header,commonService,$modal) {
		
		if($rootScope.userinfo){
			$scope.loggedUserInfo=$rootScope.userinfo.ActiveUserData;
		}
		$scope.$watch(function() {
  					return $rootScope.userinfo;
		}, function() {
				if($rootScope.userinfo){
					$scope.loggedUserInfo=$rootScope.userinfo.ActiveUserData;
				}
		}, true);		

		//LOGOUT FUNTION
		$scope.logout=function(){//function fired when clicked on logout .
			$scope.logData=localStorageService.get('logDatas');
			$scope.logDatas={"logData":$scope.logData,"Frequenzy":$scope.Frequenzy=1};
			header.logout($scope);
			};
		//call back functions of LOGOUT
		$scope.fnCallbackLogout=function(data){
				logoutObject=angular.fromJson(JSON.parse(data));
				// console.log(logoutObject);
				if(logoutObject.numberOfSessions>1){
						$scope.numberOfSessions=logoutObject.numberOfSessions;
						$modal({ scope: $scope,
			              template: 'angularModules/login/partials/Partial-confirmLogout.html',
			              placement:'center',
			              show: true});	
					}
					else{
						// if(logoutObject.msg=="success"){
							localStorageService.set('logDatas','{}');//resetting the userinfo before logout 
			   				$rootScope.loggedIn=false;
			   				$rootScope.userinfo=undefined;
							$state.go('login');//redirecting path into login
						// }
					}
   				

			}
		$scope.confirmLogout=function(logoutMode){
			$scope.logData=localStorageService.get('logDatas');
			$scope.Frequenzy=2;
			if(logoutMode==1){
				$scope.logoutMode=logoutMode;
			}else{
				$scope.logoutMode=logoutMode;
			}
			$scope.logDatas={"logData":$scope.logData,"Frequenzy":$scope.Frequenzy=2,"logoutMode":$scope.logoutMode};
			header.logout($scope);
		}
				
   		$scope.details=function(){
   			$scope.ips=$rootScope.userinfo.ActiveUserData.ip_address;
   			// for (var counter=0;counter<ips.length;counter++){
   			// 	console.log(ips[counter]);
   			// }
   			// console.log($scope.ips);
   			header.Details($scope);
   		};
   		$scope.navigateToProfile=function(){

   			$state.go('home.main.userProfile',{userId:''});
   		}

}]);