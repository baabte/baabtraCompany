angular.module('baabtra').controller('ViewusersCtrl',['$scope','commonService','$rootScope','$state','courseAllocateService',function($scope,commonService,$rootScope,$state, courseAllocateService){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/

	$scope.data = {};

	$scope.data.userDropdown = [{"text" : "<i class=\"fa fa-fw fa-rotate-left\"></i>&nbsp;Refund Request",
    							"click" : "refundRequest(user.fkUserLoginId)"},
    							{"text" : "<i class=\"fa fa-fw fa-user\"></i>&nbsp;View Profile",
    							"click":"viewProfile(user.fkUserLoginId)"}];



	var searchKey='';
    var fetchUsersToCourseAllocateCallback = courseAllocateService.fnfetchUsersToCourseAllocate(companyId,'','initial','',searchKey); 
    fetchUsersToCourseAllocateCallback.then(function(data){
        $scope.data.usersObject = angular.fromJson(JSON.parse(data.data));
        console.log($scope.data.usersObject);
        // console.log('initial')
        // console.log($scope.userObj);
        $scope.data.firstUser = $scope.data.usersObject.firstId;
    });

    var searchTimeOut;
	$scope.searchUser=function(){
		if(searchTimeOut) {
		clearTimeout(searchTimeOut);
		}
		searchTimeOut=setTimeout(function(){
			var fetchUsersToCourseAllocateCallback = courseAllocateService.fnfetchUsersToCourseAllocate(companyId,'', 'initial', '', $scope.data.usersObject.searchKey);
		   fetchUsersToCourseAllocateCallback.then(function(data){
		   	$scope.data.usersObject = angular.fromJson(JSON.parse(data.data));
	       });
		},500);
	};

	$scope.nextOne=function(){//event  for showing next 9 items
	  $scope.data.prevButtondisabled = false;
	   var fetchUsersToCourseAllocateCallback=courseAllocateService.fnfetchUsersToCourseAllocate(companyId,$scope.data.usersObject.firstId,'next',$scope.data.usersObject.lastId,$scope.data.usersObject.searchKey);
	   fetchUsersToCourseAllocateCallback.then(function(data){
        $scope.data.usersObject = angular.fromJson(JSON.parse(data.data));
       });
};


//event  for showing previous 9 items
$scope.prevOne=function(){
	  
	  if(angular.equals($scope.data.firstUser,$scope.data.usersObject.firstId)){ 
		$scope.data.prevButtondisabled = true;
	  }
	  else{
	   var fetchUsersToCourseAllocateCallback=courseAllocateService.fnfetchUsersToCourseAllocate(companyId,$scope.data.usersObject.firstId,'prev',$scope.data.usersObject.lastId,$scope.data.usersObject.searchKey);
	   fetchUsersToCourseAllocateCallback.then(function(data){
	        $scope.data.usersObject = angular.fromJson(JSON.parse(data.data));
	         if (angular.equals($scope.data.firstUser,$scope.data.usersObject.firstId)){ 
				$scope.data.prevButtondisabled=true;
	  		}
	   });
   	  }
};

    $scope.viewProfile = function(userId){
		$state.go("home.main.userProfile",{userId:userId});
	};

	$scope.refundRequest = function(userId){
		$state.go("home.main.refundRequest",{userId:userId});
	};



}]);