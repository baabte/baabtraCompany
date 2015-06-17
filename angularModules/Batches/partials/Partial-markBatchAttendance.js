angular.module('baabtra').controller('MarkbatchattendanceCtrl',['$scope','$rootScope','commonService','batchAttendance','$state','$alert',function($scope,$rootScope,commonService,batchAttendance,$state,$alert){

    if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
    }
    if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
    }

    $scope.mode=$state.params.mode;
    //today's date for marking attendance
    var today=new Date(); //'04-24-2015'
    	today.setHours(0, 0, 0, 0);
    //object for storing selected items status
    $scope.selectedList={};

    $scope.attendance={};
    $scope.attendance.date=today.toISOString();

    //role mapping id and company id of logged user
    $scope.roleMappingId=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;

    // batch mapping id from url
    $scope.batchMappingId=$state.params.batchMappingId;

    $scope.obj={};
    //function for getting full candidate's list under this batch
    // whose attendance is already marked
    $scope.getMenteeListForUpdate = function (){

    	var gotMarkedMenteesList = batchAttendance.fnLoadMenteesMarkedAttendanceFromBatch($scope.batchMappingId,$scope.attendance.date);

    	    gotMarkedMenteesList.then(function (data) {
    	    	$scope.obj.menteesListToUpdate = angular.fromJson(JSON.parse(data.data)).userList;
    	    	$scope.tmpCopyOfMenteeListToUpdate=angular.fromJson(JSON.parse(data.data)).userList;
    	    });
    	
    };
    //function for getting full candidate's list under this batch
    $scope.getMenteeListBlindly = function () {
    	if($scope.mode==1){
    		$scope.attendance.date=$scope.attendance.filterDate;
    	}
    	    var gotMenteesList = batchAttendance.getAllCandidates($scope.batchMappingId,$scope.attendance.date);

		    gotMenteesList.then(function (data) {
		    	$scope.obj.menteeList=angular.fromJson(JSON.parse(data.data)).userDetails;

		    	$scope.batchDetails=angular.fromJson(JSON.parse(data.data)).batchList;

		    	$scope.markedUrmIds=angular.fromJson(JSON.parse(data.data)).markedUrmIds;

		    	// if there have mentees who have already marked attendance
		    	if(angular.fromJson(JSON.parse(data.data)).markedUrmIds.length){
		    		$scope.getMenteeListForUpdate();
		    	}
		    	else{
		    		delete $scope.obj.menteesListToUpdate;
					delete $scope.tmpCopyOfMenteeListToUpdate;
		    	}
		    });
    };

    if($scope.mode==0){
    	$scope.getMenteeListBlindly();	
    }
    

    // function to select all candidates
    $scope.changeSelectAll = function(){
    	if($scope.selectedAll){
    		for(key in $scope.obj.menteeList){
    			$scope.selectedList[key]=true;
    		}
    	}
    	else{
    		for(key in $scope.obj.menteeList){
    			$scope.selectedList[key]=false;
    		}
    	}
    	
    };

    // function for changing status of selected users
    $scope.changeCommonStatus=function () {
    	for(key in $scope.selectedList){
    		if($scope.selectedList[key]){
    			$scope.obj.menteeList[key].status=$scope.commonStatus;
    		}
    	}
    };


    // function for saving attendance for candidates
    $scope.saveCandidatesAttandence=function () {


    	// here we creates a new object for sending it to database
    	var createdDate = new Date();
    		createdDate = createdDate.toISOString();

    	var dataObj={};
    		dataObj.userList=angular.copy($scope.obj.menteeList);
    		for(key in dataObj.userList){
    			dataObj.userList[key].userCourseMappingId=dataObj.userList[key]._id.$oid;
    			delete dataObj.userList[key]._id;
    			dataObj.userList[key].fkUserLoginId=dataObj.userList[key].fkUserLoginId.$oid;
    			dataObj.userList[key].fkUserRoleMappingId=dataObj.userList[key].fkUserRoleMappingId.$oid;
    		}
    		dataObj.batchMappingId=$scope.batchMappingId;
    		dataObj.courseId=$scope.batchDetails.fkCourseId.$oid;
    		dataObj.companyId=$scope.companyId;
    		dataObj.date=$scope.attendance.date;
    		dataObj.createdDate = createdDate;
    		dataObj.updatedDate = createdDate;
    		dataObj.urmId = $scope.roleMappingId;
    		dataObj.crmId = $scope.roleMappingId;
    	var savedAttandence = batchAttendance.saveCandidatesAttandence(dataObj);
    		savedAttandence.then(function () {

    			$alert({title: 'Done..!', content: 'Attendance saved..', placement: 'top-right', type: 'success', show: true,duration:3});
    			$scope.getMenteeListBlindly();
    		});
    };

    $scope.updateAttendance = function () {
    	var updatedDate = new Date();
    		updatedDate = updatedDate.toISOString();
    	var menteeArrayForUpdate = angular.copy($scope.obj.menteesListToUpdate);
    	for(key in menteeArrayForUpdate){
    		menteeArrayForUpdate[key]._id = menteeArrayForUpdate[key]._id.$oid;
    		menteeArrayForUpdate[key].fkUserRoleMappingId = menteeArrayForUpdate[key].fkUserRoleMappingId.$oid;
    		menteeArrayForUpdate[key].fkUserLoginId = menteeArrayForUpdate[key].fkUserLoginId.$oid;
    		menteeArrayForUpdate[key].date = menteeArrayForUpdate[key].date.$date;
    		menteeArrayForUpdate[key].crmId = menteeArrayForUpdate[key].crmId.$oid;
    		menteeArrayForUpdate[key].urmId = $scope.roleMappingId;
    		menteeArrayForUpdate[key].updatedDate = updatedDate;

    		// creating status history
    		if(angular.equals(menteeArrayForUpdate[key].statusHistory,undefined)){
    			menteeArrayForUpdate[key].statusHistory=[];
    		}

    		if(!angular.equals(menteeArrayForUpdate[key].status,$scope.tmpCopyOfMenteeListToUpdate[key].status))
    		{
    					    var statusChange={
							    "statusChangedOn" : $scope.tmpCopyOfMenteeListToUpdate[key].updatedDate,
							    "previousStatus" : $scope.tmpCopyOfMenteeListToUpdate[key].status,
							    "statusChangedby" : $scope.tmpCopyOfMenteeListToUpdate[key].crmId.$oid,
							    "statusChangedTo" : menteeArrayForUpdate[key].status
							 };
			menteeArrayForUpdate[key].statusHistory.push(statusChange);
    		}

    		// end of status history

    	}

    	var dataObj = {};
    		dataObj.userList=menteeArrayForUpdate;
    	var updatedAttandence = batchAttendance.updateCandidatesAttandence(dataObj);
    		updatedAttandence.then(function () {

    			$alert({title: 'Done..!', content: 'Attendance updated..', placement: 'top-right', type: 'success', show: true,duration:3});
    			$scope.getMenteeListForUpdate();
    		});
    };



}]);