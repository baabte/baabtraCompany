angular.module('baabtra').controller('FeedbackdetailsCtrl',['$scope', '$rootScope', '$state', '$alert', 'commonService', 'viewFeedback', function($scope, $rootScope, $state, $alert, commonService, viewFeedback){

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
  $scope.data.feedbackResponse = [];
	var FeedbackRequestDetailsResponse = viewFeedback.fnLoadFeedbackRequestDetails($scope.cmp_id, $state.params.feedBackId, $scope.rm_id);
	FeedbackRequestDetailsResponse.then(function(response){
		$scope.data.feedBackDetails = angular.fromJson(JSON.parse(response.data));
		
		if(!angular.equals($scope.data.feedBackDetails.userResponse,undefined)){

			//console.log($scope.data.feedBackDetails.userResponse);
		}
		else{
			//console.log($scope.data.feedBackDetails.questions);
			//console.log("Not Answerd");
		}
		
	});

	$scope.submitMyResponse = function(){
		var response = {};
		response.userResponse = {};
		response.userResponse.rmId = angular.copy($scope.rm_id);
		response.userResponse.response = angular.copy($scope.data.feedbackResponse);
		response.responseObject = [];
		for(var questionsCount = 0;questionsCount < $scope.data.feedBackDetails.questions.length; questionsCount++){
			response.responseObject[questionsCount] = [];
			var options = angular.copy($scope.data.feedBackDetails.questions[questionsCount].options);
			var userResponse = angular.copy($scope.data.feedbackResponse[questionsCount].userResponse);
			angular.forEach(userResponse,function(value){
				angular.forEach(options,function(option){
					if(angular.equals(option.Name,value)){
						response.responseObject[questionsCount].push(option.value);
					}
				});
			});
		}

		var saveUserFeedbackResponse = viewFeedback.fnSaveUserFeedback($state.params.feedBackId ,response, $scope.rm_id);
				saveUserFeedbackResponse.then(function(response){
					 $rootScope.data.userNotification = angular.fromJson(JSON.parse(response.data));
          			 $rootScope.data.userNotification.notification = $rootScope.data.userNotification.notification.reverse()
					 $alert({title: 'Success!', content: 'Feedback submited successfuly...', placement: 'top-right', duration:3, type: 'success', show: true});
					 $state.go('home.main.viewFeedbackRequest');
				});
	};

}]);