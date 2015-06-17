angular.module('baabtra').controller('BaabtraComprofileCtrl',['$scope','$rootScope','$stateParams','baabtraProfile',function ($scope,$rootScope,$stateParams,baabtraProfile){


// $scope.$watch(function(){
// 	return $rootScope.userinfo;
// },function(){
// 	$rootScope.userinfo=$rootScope.userinfo;
// 	console.log($rootScope.userinfo);
// },true);
if($stateParams.userLoginId){
	$scope.userLoginId=$stateParams.userLoginId;	
}

var userData=baabtraProfile.userbaabtraComProfileData($scope.userLoginId);
userData.then(function (data) {
	if(data.status==200&&data.statusText=="OK"){
		$scope.profileData = angular.fromJson(JSON.parse(data.data));
	}
			
});



}]);