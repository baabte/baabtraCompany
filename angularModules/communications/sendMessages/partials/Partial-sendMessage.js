angular.module('baabtra').controller('SendmessageCtrl',['communications','notification','$alert','$modal','commonService','viewUsers','addCourseService','$scope','$rootScope',function(communications,notification,$alert,$modal,commonService,viewUsers,addCourseService,$scope,$rootScope){
if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
   return;
}
// console.log($rootScope.userinfo.ActiveUserData.roleMappingObj.fkUserLoginId.$oid);
	var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	var loginId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkUserLoginId.$oid;

	$scope.data = {};

var gotMsgs = communications.loadInbox({filter:{from:loginId}});
	
	gotMsgs.then(function (response) {
		var msgs = angular.fromJson(JSON.parse(response.data));
		$scope.data.messages=msgs;
	});
	$scope.data.mailingList = [];
	$scope.data.mailingListIds = [];

	$scope.data.clickOnExport = false;
	$scope.data.searchKey = {};
	$scope.data.searchKey.course = {};
	$scope.data.searchKey.course.minMark = 1;

	$scope.data.searchKey.status = {};
	$scope.data.searchKey.profile = {};
	$scope.data.searchKey.profile.gender = "";
	$scope.value = "State";

$scope.composeNew = function () {
	$scope.data.mailingList = [];
	$scope.data.mailingListIds = [];
	$modal({scope: $scope,backdrop:true, template: 'angularModules/communications/sendMessages/popup/popup-compose.html', show: true,placement:'center'});
};

$scope.sendMessage = function (hide) {
	var fkLoginIds = $scope.data.mailingListIds;
	$scope.data.message.fkcompanyId = companyId;
	$scope.data.message.from = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkUserLoginId.$oid;
	$scope.data.message.to =  fkLoginIds;
	$scope.data.message.read = []; //here communications
	var sendMsg = communications.newMessage($scope.data.message);
		sendMsg.then(function (response) {
			notification.newNotification({companyId:companyId,fkLoginIds:fkLoginIds,message:$scope.data.message.subject,link:{state:'home.main.inbox',params:{}},crmId:rm_id});
			$alert({title: '', content: 'Message sent.', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});
			hide();
		});
	
};


	/*login detils ends*/

	$scope.status={};






	$scope.data.userDropdown = [
								{"text" : "<i class=\"mdi-action-account-box\"></i>&nbsp;Add to list",
    							"click":"addToList(user)"},
    							{"text" : "<i class=\"mdi-action-account-box\"></i>&nbsp;View Parent",
    							"click":"loadParent(user.fkUserLoginId.$oid)"}
    						   ];

    $scope.addToList = function (user) {
    if($scope.data.mailingListIds.indexOf(user.fkUserLoginId.$oid)!=-1)
    {
    	$alert({title: 'User exists.', content: 'You have already added this user.', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'warning', show: true});
    	return;
    }
	$scope.data.mailingList.push(user);
	$scope.data.mailingListIds.push(user.fkUserLoginId.$oid);

    };

    $scope.removeFromList = function (user) {
    	var index = $scope.data.mailingListIds.indexOf(user.fkUserLoginId.$oid);
    	var indexOfObj = $scope.data.mailingList.indexOf(user);
    	$scope.data.mailingListIds.splice(index,1);
    	$scope.data.mailingList.splice(indexOfObj,1);
    };

    $scope.showRecipients = function () {
    	$modal({scope: $scope,backdrop:true, template: 'angularModules/communications/sendMessages/popup/popup-recipientList.html', show: true,placement:'center'});
    };

    $scope.composeMessage = function () {
    	
    	$modal({scope: $scope,backdrop:true, template: 'angularModules/communications/sendMessages/popup/popup-newMessage.html', show: true,placement:'center'});
    };

    $scope.loadParent = function (candidateId) {
    	$scope.data.parents = [];
    	var gotParents = communications.fnLoadParent(candidateId);
    		gotParents.then(function (parents) {
    			$scope.data.parents = angular.fromJson(JSON.parse(parents.data));
    		});

		$modal({scope: $scope,backdrop:true, template: 'angularModules/communications/sendMessages/popup/popup-parents.html', show: true,placement:'center'});

    };
	
	var fetchFormFeildsResp = viewUsers.fnFetchFormFeildsForSearch("User test registration", companyId);
	fetchFormFeildsResp.then(function(response){
		$scope.data.Feilds = angular.fromJson(JSON.parse(response.data));
	});

	var courseFetchData={fkcompanyId:companyId,type:'all'};
	var FetchCourseListCallBack = addCourseService.fnFetchCourseList(courseFetchData);

	FetchCourseListCallBack.then(function(response){
		$scope.data.courseList = angular.fromJson(JSON.parse(response.data));
	});

	var searchTimeOut;
	$scope.$watch('data.searchKey', function(){
		if(!angular.equals($scope.data.searchKey.profile,undefined)){
				if(searchTimeOut) {
					clearTimeout(searchTimeOut);
				}
				searchTimeOut=setTimeout(function(){
			    var fetchUsersToCourseAllocateCallback = viewUsers.fnFetchUsersByDynamicSearch(companyId,'','','initial',$scope.data.searchKey); 
			    fetchUsersToCourseAllocateCallback.then(function(data){
			        $scope.data.result = angular.fromJson(JSON.parse(data.data));

			        $scope.data.usersCountFrom = 1;
			        $scope.data.usersCountTo = (($scope.data.result.usersCount <= 12)?$scope.data.result.usersCount:12); 
			        
			        $scope.data.usersObject = $scope.data.result.users;
			        $scope.data.firstUserId = $scope.data.result.firstUserId;
			        $scope.data.lastUserId = $scope.data.result.lastUserId;
			        $scope.data.prevButtondisabled = true;
			    });
			    },500);
			}
		}, true);

	$scope.nextOne=function(){//event  for showing next 12 items
	  
	   var fetchUsersToCourseAllocateCallback = viewUsers.fnFetchUsersByDynamicSearch(companyId,$scope.data.firstUserId,$scope.data.lastUserId,'next',$scope.data.searchKey); 
    	fetchUsersToCourseAllocateCallback.then(function(data){
	        $scope.data.result = angular.fromJson(JSON.parse(data.data));

	        if(!angular.equals($scope.data.firstUserId, $scope.data.result.firstUserId)){
		        $scope.data.usersCountFrom = $scope.data.usersCountFrom + 12;
			    $scope.data.usersCountTo = (($scope.data.result.usersCount-$scope.data.usersCountFrom) > 12) ? ($scope.data.usersCountTo + 12):$scope.data.result.usersCount;

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
		var fetchUsersToCourseAllocateCallback = viewUsers.fnFetchUsersByDynamicSearch(companyId,$scope.data.firstUserId,$scope.data.lastUserId,'prev',$scope.data.searchKey); 
	    	fetchUsersToCourseAllocateCallback.then(function(data){
		        $scope.data.result = angular.fromJson(JSON.parse(data.data));
		        if(!angular.equals($scope.data.firstUserId, $scope.data.result.firstUserId)){
			        
			        $scope.data.usersCountFrom = $scope.data.usersCountFrom - 12;
			    	$scope.data.usersCountTo = $scope.data.usersCountFrom + 11;

			        $scope.data.usersObject = $scope.data.result.users.reverse();
			        $scope.data.firstUserId = $scope.data.result.lastUserId;
			        $scope.data.lastUserId = $scope.data.result.firstUserId;
			       
		    	}
		    	else{
		    		$scope.data.prevButtondisabled = true;
		    	}
	    	});
	};

	$scope.courseSelectionChanged = function(course){
		
		var courseId = course._id.$oid;
		if(!$scope.data.searchKey.coursesSelected){
			$scope.data.searchKey.coursesSelected = [];
		}
		

		if(angular.equals($scope.data.searchKey.coursesSelected.indexOf(courseId), -1)){
			$scope.data.searchKey.coursesSelected.push(courseId);
		}
		else{
			$scope.data.searchKey.coursesSelected.splice($scope.data.searchKey.coursesSelected.indexOf(courseId), 1);
		}

		if($scope.data.searchKey.coursesSelected.length){

			for(var course in $scope.data.courseList){
				if(angular.equals($scope.data.courseList[course]._id.$oid, $scope.data.searchKey.coursesSelected[0])){
					$scope.data.selectedCourse = $scope.data.courseList[course];
					$scope.data.searchKey.course.maxMark = $scope.data.selectedCourse.totalMark;
				}
			}
		}
	};

    var searchTimeout;
	$scope.searchUser=function(){
		if(searchTimeout) {
		clearTimeout(searchTimeout);
		}
		searchTimeout=setTimeout(function(){
			var fetchUsersToCourseAllocateCallback = courseAllocateService.fnfetchUsersToCourseAllocate(companyId,'', 'initial', '', $scope.data.usersObject.searchKey);
		   fetchUsersToCourseAllocateCallback.then(function(data){
		   	$scope.data.usersObject = angular.fromJson(JSON.parse(data.data));
	       });
		},500);
	};



}]);