angular.module('baabtra').controller('CourseallocateCtrl',['$scope','bbConfig','$rootScope','$state','commonService','courseAllocateService','$alert','$aside',function($scope,bbConfig,$rootScope,$state,commonService,courseAllocateService,$alert,$aside){

if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}



$rootScope.$watch('userinfo',function(){
    $scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    if(angular.equals($rootScope.userinfo.ActiveUserData.modernView,'classic')){
    	$scope.classic=true;
    }
    var searchKey='';

    $scope.childCompanyId='';
	if($rootScope.userinfo){
		if($rootScope.userinfo.ActiveUserData.roleMappingObj.childCompanyId){
		 $scope.childCompanyId=	$rootScope.userinfo.ActiveUserData.roleMappingObj.childCompanyId.$oid;
		console.log($scope.childCompanyId);
		}
	};

    var fetchUsersToCourseAllocateCallback=courseAllocateService.fnfetchUsersToCourseAllocate($scope.companyId,'','initial','',searchKey); 
    fetchUsersToCourseAllocateCallback.then(function(data){
        $scope.userObj=angular.fromJson(JSON.parse(data.data));
        // console.log('initial')
        // console.log($scope.userObj);
        $scope.firstUser=$scope.userObj.firstId;
    });
});



$scope.courseAllocate={};

$scope.courseAllocate.selectedCourse={};
$scope.courseAllocate.selectedUsers={};
$scope.prevButtondisabled=true;
$scope.showFields=false;
$scope.allUserSelected=false;
$scope.expand=false;


var searchTimeOut;
$scope.searchUser=function(){
	if(searchTimeOut) {
	clearTimeout(searchTimeOut);
	}
	searchTimeOut=setTimeout(function(){
		var fetchUsersToCourseAllocateCallback=courseAllocateService.fnfetchUsersToCourseAllocate($scope.companyId,'','initial','',$scope.userObj.searchKey);
	   fetchUsersToCourseAllocateCallback.then(function(data){
	   	var searchKey=$scope.userObj.searchKey;
        $scope.userObj=angular.fromJson(JSON.parse(data.data));
        $scope.userObj.searchKey=searchKey;
        // console.log('search initial')
        // console.log($scope.userObj)
       });
	},500);
	

};

$scope.nextOne=function(){//event  for showing next 9 items
	  $scope.prevButtondisabled=false;
	   var fetchUsersToCourseAllocateCallback=courseAllocateService.fnfetchUsersToCourseAllocate($scope.companyId,$scope.userObj.firstId,'next',$scope.userObj.lastId,$scope.userObj.searchKey);
	   fetchUsersToCourseAllocateCallback.then(function(data){
        $scope.userObj=angular.fromJson(JSON.parse(data.data));
        // console.log('next');
        // console.log($scope.userObj);
       });
};


//event  for showing previous 9 items
$scope.prevOne=function(){
	  
	  if(angular.equals($scope.firstUser,$scope.userObj.firstId)){ 
		$scope.prevButtondisabled=true;
	  }
	  else{
	   var fetchUsersToCourseAllocateCallback=courseAllocateService.fnfetchUsersToCourseAllocate($scope.companyId,$scope.userObj.firstId,'prev',$scope.userObj.lastId,$scope.userObj.searchKey);
	   fetchUsersToCourseAllocateCallback.then(function(data){
	        $scope.userObj=angular.fromJson(JSON.parse(data.data));
	        // console.log('prev');
        	// console.log($scope.userObj);
	         if (angular.equals($scope.firstUser,$scope.userObj.firstId)){ 
				$scope.prevButtondisabled=true;
	  		}
	   });
   	  }
};



var showSelectedUsersModal = $aside({scope: $scope, template: 'angularModules/user/partials/aside-selectedUsers.html', show: false,placement:'left',animation:'am-fade-and-slide-left'});

$scope.showSelectedUsers=function(){
showSelectedUsersModal.$promise.then(showSelectedUsersModal.show);
};

$scope.fnUserRemove=function(userobj){

	var user=angular.copy(userobj);
	var index=user.index;
	// if(angular.equals($scope.userObj.userList.indexOf(user),-1)){
		$scope.userObj.userList.splice(index,0,user);	
	// }
	 
	 delete $scope.courseAllocate.selectedUsers[user.fkUserLoginId];
	// console.log($scope.courseAllocate.selectedUsers);

	if(Object.keys($scope.courseAllocate.selectedUsers).length>0){
		$scope.showFields=true;
	}
	else{
		$scope.showFields=false;
	}

};

$scope.fnAddAllUsers=function(){
	for(var index in $scope.userObj.userList){
		if (angular.equals($scope.userObj.userList[index].Selection,true)) {

			var user=angular.copy($scope.userObj.userList[index]);
			user.index=index;
			if(angular.equals($scope.courseAllocate.selectedUsers[user.fkUserLoginId],undefined)){
			$scope.courseAllocate.selectedUsers[user.fkUserLoginId]=user;
			}
			
		}
	}

	if(Object.keys($scope.courseAllocate.selectedUsers).length>0){
				$scope.showFields=true;
			}
};


$scope.fnAllocateUser=function(){
var today = new Date();
$scope.courseAllocate.date = today.toISOString();
$scope.courseAllocate.companyId = $scope.companyId;
if(!angular.equals($scope.childCompanyId,'')){
			$scope.courseAllocate.childCompanyId = $scope.childCompanyId;
};
$scope.courseAllocate.loggedusercrmid=$scope.loggedusercrmid;
var fnAllocateUsersToCourseCallback=courseAllocateService.fnAllocateUsersToCourse($scope.courseAllocate);
fnAllocateUsersToCourseCallback.then(function(data){
	var result=angular.fromJson(JSON.parse(data.data));
$scope.courseAllocate.selectedUsers={};

$scope.notifications(':)','Allocated to Course Successfully','success');  
		$scope.showFields=false;

});

};

$scope.fnSelectAll=function(){
	var index;
	if(angular.equals($scope.userObj.SelectionAll,true)){
		for(index in $scope.userObj.userList){
			$scope.userObj.userList[index].Selection=true;
			$scope.allUserSelected=true;
		}

	}
	else if(angular.equals($scope.userObj.SelectionAll,false)){
		for(index in $scope.userObj.userList){
			$scope.userObj.userList[index].Selection=false;
			$scope.allUserSelected=false;
		}
	}
	// console.log($scope.userObj.userList);

};

$scope.fnUserSelection=function(userobj,index){

	var user=angular.copy(userobj);
	user.index=index;
	if(angular.equals($scope.courseAllocate.selectedUsers[user.fkUserLoginId],undefined)){
	$scope.courseAllocate.selectedUsers[user.fkUserLoginId]=user;
	 $scope.userObj.userList.splice(index,1);
	// console.log($scope.courseAllocate.selectedUsers);
	}
	else{
	 $scope.userObj.userList.splice(index,1,user);
	 delete $scope.courseAllocate.selectedUsers[user.fkUserLoginId];
	// console.log($scope.courseAllocate.selectedUsers);
	}

	if(Object.keys($scope.courseAllocate.selectedUsers).length>0){
		$scope.showFields=true;
	}
	else{
		$scope.showFields=false;
	}

};


$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };



}]);