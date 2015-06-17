angular.module('baabtra').controller('NotificationconfigurationCtrl',['$scope','formCustomizerService','commonService','$rootScope','notificationConfiguration','$modal','bbConfig',function($scope,formCustomizerService,commonService,$rootScope,notificationConfiguration,$modal,bbConfig){


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
	$scope.data={};



//====================================
//this is to manage the progress popup
$scope.data.loaderProgressTab=0;
$scope.progressStart=function () {

		$scope.data.loaderProgressTab=$scope.data.loaderProgressTab==4?1:$scope.data.loaderProgressTab*1+1;
		$scope.$digest();


};
	var interval=setInterval(function() {
		$scope.progressStart();
	},700);
//=======================================





// list of available notification types (Can be changed to db later)
$scope.configurations = [
							{name:'Registered a new user',configType:'new-user-registration'},
							{name:'Updated batch status',configType:'batch-status-update'}
						];


$scope.configTabs = [];



//function for opening popup window while clicking on configure button
$scope.openPopup = function (configType) {

	delete $scope.data.roles;
	delete $scope.data.config;
	delete $scope.data.configType;
	$scope.data.configType =  configType;
	var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: true,placement:'center'});

	//fetching roles including (top roles) mentee and company admin
	var FetchRoleObj={companyId:$scope.companyId,topRoleFetch:[bbConfig.CURID,bbConfig.MURID]};
	var fnFetchRoleCallBack= formCustomizerService.FnFetchRoles(FetchRoleObj);
		fnFetchRoleCallBack.then(function (dat) {
			var resData = angular.fromJson(JSON.parse(dat.data));
			// console.log(resData);
			$scope.data.roles = resData;
		});


	var gotCurrentConfig = notificationConfiguration.fnGetNotificationConfig($scope.companyId,configType);
		gotCurrentConfig.then(function (response) {
			console.log(response.data);
			var responseData = angular.fromJson(JSON.parse(response.data));
			$scope.data.config = responseData;
			loader.destroy();
			$modal({scope: $scope, template: 'angularModules/Notification/notificationConfiguration/popups/popup-configure-notification.html', show: true,placement:'center'});

		});



};


$scope.saveConfiguration = function (hide) {
	// $scope.data.configType
	// $scope.companyId
	// $scope.rm_id
	// $scope.data.config
	$scope.data.config.configType = $scope.data.configType;
	if($scope.data.config._id){
		$scope.data.config._id = $scope.data.config._id.$oid;
	}
	var updatedConfig = notificationConfiguration.fnUpdateNotificationConfig($scope.companyId,$scope.rm_id,$scope.data.config);
		updatedConfig.then(function (response) {
			hide();
		});
};




}]);