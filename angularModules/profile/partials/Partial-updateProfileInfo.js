angular.module('baabtra').controller('UpdateprofileinfoCtrl',['$scope','updateProfileInfo','$rootScope','$stateParams','commonService','userProfile',function($scope,updateProfileInfo,$rootScope,$stateParams,commonService,userProfile){

if(!$rootScope.userinfo){ //checking for the login credentilas is present or not
      $rootScope.hide_when_root_empty=true;
      commonService.GetUserCredentials($scope);
}
$scope.userinfo =$rootScope.userinfo;
var profile = userProfile.loadProfileData($scope.userinfo.ActiveUserData.roleMappingId.$oid);
		profile.then(function (data) {
			$scope.profileData = angular.fromJson(JSON.parse(data.data));
			$rootScope.userinfo.profileData=$scope.profileData;
			if(!$scope.profileData.profileImg){
				$scope.profileData.profileImg="default.jpg";
			}
});



}]);