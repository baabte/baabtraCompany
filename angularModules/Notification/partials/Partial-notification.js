angular.module('baabtra').controller('NotificationCtrl',['$rootScope','$scope','commonService','notification','$state',function($rootScope,$scope,commonService,notification,$state){

  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }

 $scope.data = {};

 $scope.data.filter = {fkLoginId:$rootScope.userinfo.userLoginId};

 	var gotNotification = notification.fnLoadUserNotificationFull($scope.data.filter,'');

 	gotNotification.then(function (response) {
 		$scope.data.userNotification = angular.fromJson(JSON.parse(response.data));
 	});


 $scope.goToState = function (link) {
 	$state.go(link.state,link.params);
 };
// fkLoginId
$scope.loadMore = function () {
	var len=$scope.data.userNotification.notifications.length;
	var id = $scope.data.userNotification.notifications[len-1]._id.$oid;
	var loadedMore = notification.fnLoadUserNotificationFull($scope.data.filter,id);
		loadedMore.then(function (response) {
			$scope.data.userNotification.notifications=$scope.data.userNotification.notifications.concat(angular.fromJson(JSON.parse(response.data)).notifications);
		});
};

}]);