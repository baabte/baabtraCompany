angular.module('baabtra').controller('header',['$scope','$rootScope','$state','localStorageService','header','commonService','$modal', 'bbConfig', function($scope,$rootScope,$state,localStorageService,header,commonService,$modal, bbConfig) {
		
		if($rootScope.userinfo){
			$scope.loggedUserInfo=$rootScope.userinfo.ActiveUserData;
		}
		$scope.$watch(function() {
  					return $rootScope.userinfo;
		}, function() {
				if($rootScope.userinfo){
					if($rootScope.userinfo.userLoginId){
					var whoCantAccessThis = [bbConfig.MURID, bbConfig.PUSRID, bbConfig.RURID];
				      
				      if(!angular.equals(whoCantAccessThis.indexOf($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId), -1)){
				        $scope.logout();
				        //$scope.logData.result = false;
				      }

					$scope.loggedUserInfo=$rootScope.userinfo.ActiveUserData;
				}
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
				var logoutObject=angular.fromJson(JSON.parse(data));
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
			   				var appSettings = $rootScope.userinfo.ActiveUserData.appSettings;
			   				var companyName = $rootScope.userinfo.ActiveUserData.companyName;			   				$rootScope.userinfo = {};
			   				$rootScope.userinfo.ActiveUserData = {};
			   				$rootScope.userinfo.ActiveUserData.appSettings = appSettings;
			   				$rootScope.userinfo.ActiveUserData.companyName = companyName;
							$state.go('login');//redirecting path into login
						// }
					}
   				

			};
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
		};
				
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
   		};

}]);