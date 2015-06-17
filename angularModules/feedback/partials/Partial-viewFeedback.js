angular.module('baabtra').controller('ViewfeedbackCtrl', ['$scope', '$rootScope', '$state', 'commonService', 'viewFeedback', function ($scope, $rootScope, $state, commonService, viewFeedback){

 /*login detils start*/
  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

  $scope.rm_id  = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  $scope.roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  $scope.cmp_id = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/

  $scope.data = {};
  $scope.data.feedbackType = 'Pending';


  var FeedbackRequestsResponse  = viewFeedback.fnViewFeedbackRequests($scope.rm_id,$scope.cmp_id)
  FeedbackRequestsResponse.then(function(response){
  	$scope.data.feedbackRequests = angular.fromJson(JSON.parse(response.data));
    console.log($scope.data.feedbackRequests);
  });
  $scope.openThisRequest = "";
  $scope.changeRequest = function(feedBackId){
    $state.go('home.main.viewDetails',{feedBackId:feedBackId});
    //$scope.openThisRequest = requestId;
  };

}]);