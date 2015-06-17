angular.module('baabtra').controller('FeedbackreportlistCtrl',['$scope','feedbackList','$rootScope','$state',function($scope,feedbackList,$rootScope,$state){
//getting the user role mapping id
$rootScope.$watch('userinfo',function(){
    $scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    feedbackList.fnLoadFeedbackList($scope,'','initial',''); 
});

$scope.userState = function(userId){
	$scope.userActive=userId;
	
};


$scope.fnLoadFeedbackListCallback=function(Obj){
	$scope.feedbackObj=Obj;
	// console.log($scope.userObj);
};

$scope.viewFeedbackReport = function(feedbackId){
	$state.go("home.main.feedbackReport",{feedbackId:feedbackId});
};


$scope.prevButtondisabled=true;

$scope.nextOne=function(){//event  for showing next 12 items
	  $scope.prevButtondisabled=false;
	   feedbackList.fnLoadFeedbackList($scope,$scope.feedbackObj.firstId.$oid,'next',$scope.feedbackObj.lastId.$oid);
};

$scope.prevOne=function(){//event  for showing previous 9 items
   
   feedbackList.fnLoadFeedbackList($scope,$scope.feedbackObj.firstId.$oid,'prev',$scope.feedbackObj.lastId.$oid);
  
};


}]);