angular.module('baabtra').controller('ViewusersCtrl',['$scope','commonService','$rootScope','$state','courseAllocateService','viewUsers',function($scope,commonService,$rootScope,$state, courseAllocateService, viewUsers){

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
	$scope.data.profile = {};
	$scope.data.profile.gender = "";
	$scope.value = "State";
	$scope.data.userDropdown = [{"text" : "<i class=\"fa fa-fw fa-user\"></i>&nbsp;View Profile Summary",
    							"click":"viewProfile(user.fkUserLoginId.$oid, 'summary')"},
    							{"text" : "<i class=\"fa fa-fw fa-user\"></i>&nbsp;View Detailed Profile",
    							"click":"viewProfile(user.fkUserLoginId.$oid, 'detailed')"}];

// {"text" : "<i class=\"fa fa-fw fa-rotate-left\"></i>&nbsp;Refund Request","click" : "refundRequest(user.fkUserLoginId)"}

	
	var fetchFormFeildsResp = viewUsers.fnFetchFormFeildsForSearch("User test registration", companyId);
	fetchFormFeildsResp.then(function(response){
		$scope.data.Feilds = angular.fromJson(JSON.parse(response.data));
		console.log($scope.data.Feilds);
	})

	var searchKey='';
		$scope.$watch('data.profile', function(){
		if(!angular.equals($scope.data.profile,undefined)){
		if(searchTimeOut) {
		clearTimeout(searchTimeOut);
		}
		searchTimeOut=setTimeout(function(){
	    var fetchUsersToCourseAllocateCallback = viewUsers.fnFetchUsersByDynamicSearch(companyId,'','','initial',$scope.data.profile); 
	    fetchUsersToCourseAllocateCallback.then(function(data){
	        $scope.data.result = angular.fromJson(JSON.parse(data.data));
	        $scope.data.usersObject = $scope.data.result.users;
	        $scope.data.firstUserId = $scope.data.result.firstUserId;
	        $scope.data.lastUserId = $scope.data.result.lastUserId;
	        $scope.data.prevButtondisabled = true;
	         console.log($scope.data.result);
	    });
	    },500);
		}
	},true)

	$scope.nextOne=function(){//event  for showing next 12 items
	  
	   var fetchUsersToCourseAllocateCallback = viewUsers.fnFetchUsersByDynamicSearch(companyId,$scope.data.firstUserId,$scope.data.lastUserId,'next',searchKey); 
    	fetchUsersToCourseAllocateCallback.then(function(data){
	        $scope.data.result = angular.fromJson(JSON.parse(data.data));
	        if(!angular.equals($scope.data.firstUserId, $scope.data.result.firstUserId)){
		        $scope.data.usersObject = $scope.data.result.users;
		        $scope.data.firstUserId = $scope.data.result.firstUserId;
		        $scope.data.lastUserId = $scope.data.result.lastUserId;
		        $scope.data.prevButtondisabled = false;
		    }
		    else{
		    	$scope.data.nextButtondisabled = true;
		    }
    	});
	};

	//event  for showing previous 9 items
$scope.prevOne=function(){
	  
	 var fetchUsersToCourseAllocateCallback = viewUsers.fnFetchUsersByDynamicSearch(companyId,$scope.data.firstUserId,$scope.data.lastUserId,'prev',searchKey); 
    	fetchUsersToCourseAllocateCallback.then(function(data){
	        $scope.data.result = angular.fromJson(JSON.parse(data.data));
	        if(!angular.equals($scope.data.firstUserId, $scope.data.result.firstUserId)){
		        $scope.data.usersObject = $scope.data.result.users.reverse();
		        $scope.data.firstUserId = $scope.data.result.lastUserId;
		        $scope.data.lastUserId = $scope.data.result.firstUserId;
		       
	    	}
	    	else{
	    		$scope.data.prevButtondisabled = true;
	    	}
    	});
};

	








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






    $scope.viewProfile = function(userId, type){
		$state.go("home.main.baabtraProfile",{type:type, userLoginId:userId});
	};

	// $scope.refundRequest = function(userId){
	// 	$state.go("home.main.refundRequest",{userId:userId});
	// };



}]);