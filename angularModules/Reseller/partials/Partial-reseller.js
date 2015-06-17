angular.module('baabtra').controller('ResellerCtrl',['$scope', 'commonService', '$rootScope', 'resellerSrv',function($scope, commonService, $rootScope, resellerSrv){
	
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty = false;
	}
	if($rootScope.loggedIn == false){
		$state.go('login');
	}
	$scope.rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	$scope.roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	$scope.companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	$scope.existingEmail = ""

	// //function for user name validation
	// $scope.LoadExistingUserData = function (userEmail){// For load existing user data
	// 	commonSrv.FnLoadExistingUserData($scope,userEmail);// calling service fo load exiting user data
	// };

	$scope.insertResellerDetails = function(resellerDetails){// For Insert Reseller Details
		console.log(resellerDetails);
		resellerSrv.fnRegisterReseller($scope, resellerDetails);
	}

}]);