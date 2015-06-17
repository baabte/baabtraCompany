angular.module('baabtra').controller('AllocatecandidatetobatchCtrl',['$modal','$scope', 'commonService','allocateCandidateService','candidateCourseSrv', '$rootScope','PublishedCourse','$alert','$state',function($modal,$scope, commonService,allocateCandidateService,candidateCourseSrv,$rootScope,PublishedCourse,$alert,$state){


  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

	$scope.rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	$scope.roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	$scope.companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	$scope.data={};
	$scope.data.pageNumber=1;
	$scope.data.searchText='';
	$scope.data.selectedBatchId = '';
	$scope.selectedABatch=false;
	$scope.selectedACourse=false;

	if(!angular.equals($state.params.batchId,'')){
		$scope.selectedABatch = true;
	}
	else if(!angular.equals($state.params.courseId,'')){
		$scope.selectedACourse = true;
	}

//============ for managing course list ==============
	$scope.gotPublishedCourses=function (response) {
		$scope.data.courses=angular.fromJson(JSON.parse(response.data));
	};

	if(!$scope.selectedABatch&&!$scope.selectedACourse){

		var gotPublishedCourses = PublishedCourse.loadPublishedCoursesWithPromise($scope.companyId,'','','','');
		    gotPublishedCourses.then(function (response) {
		    	$scope.gotPublishedCourses(response);
		    });
	}

$scope.pageNavigation=function(type){//event  for showing next/prev 12 items

	if(angular.equals(type,'next')){
		$scope.data.pageNumber+=1;

	}
	else if(angular.equals(type,'prev')){
		$scope.data.pageNumber=$scope.data.pageNumber==1?1:$scope.data.pageNumber-1;
	}

	  var gotPublishedCourses = PublishedCourse.loadPublishedCoursesWithPromise($scope.companyId,$scope.data.searchText,$scope.data.courses.lastId.$oid,type,$scope.data.courses.firstId.$oid);
	      gotPublishedCourses.then(function (response) {
	    	$scope.gotPublishedCourses(response);
	    });
};
var searchKeyTimeout;
$scope.searchKeyChanged = function () {
	if(searchKeyTimeout){
		clearTimeout(searchKeyTimeout);
	}

		searchKeyTimeout = setTimeout(function () {
			$scope.data.pageNumber=1;
			var gotPublishedCourses = PublishedCourse.loadPublishedCoursesWithPromise($scope.companyId,$scope.data.searchText,'','','');
		      gotPublishedCourses.then(function (response) {
		    	$scope.gotPublishedCourses(response);
		    });		
		},600);	
};


$scope.goToThisStateWithCourseID = function (courseId) {
	$state.go('home.main.allocateCandidateToBatch',{courseId:courseId});
};

//====== end of course list managing ===============

$scope.formatDate = function (dateTime) {
	return new Date(dateTime);
}

//====== for managing batch list ==================

$scope.goToThisStateWithBatchID = function (batchId) {
	$state.go('home.main.allocateCandidateToBatch',{batchId:batchId});
};

function loadBatches(){

  $scope.data.selectedFromBatchId='';
  $scope.data.selectedBatchId = '';

  var gotBatchList = candidateCourseSrv.fnLoadBatchesByCourse($scope.companyId,$state.params.courseId);
  gotBatchList.then(function (response) {
  	var responseData = angular.fromJson(JSON.parse(response.data));
  	$scope.data.batches=responseData;
  	// console.log(responseData);
  });


};

if($scope.selectedACourse){
	loadBatches();
}
//======== end of batch list managing ================

//===== loader page ============
$scope.data.loaderProgressTab=0;
$scope.progressStart=function () {

		$scope.data.loaderProgressTab=$scope.data.loaderProgressTab==4?1:$scope.data.loaderProgressTab*1+1;
		$scope.$digest();


};
	var interval=setInterval(function() {
		$scope.progressStart();
	},700);
//===== end of loader page ====




$scope.getMenteeList = function (batchId) {
	var gotMenteeList = candidateCourseSrv.loadBatchMentees($scope.companyId,batchId);
		gotMenteeList.then(function (response) {
			var responseData = angular.fromJson(JSON.parse(response.data));
			$scope.data.menteesList = responseData;
		});
};


$scope.showMenteeList = function (batchId) {
	$scope.data.menteesList=[];
	$scope.data.selectedFromBatchId=batchId;
	var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: true,placement:'center'});
	var gotMenteeList = candidateCourseSrv.loadBatchMentees($scope.companyId,batchId);
		gotMenteeList.then(function (response) {
			var responseData = angular.fromJson(JSON.parse(response.data));
			$scope.data.menteesList = responseData;
			loader.destroy();
			var candidateList = $modal({scope: $scope,backdrop:'static', template: 'angularModules/Batches/allocateCandidateToBatch/popup/popup-candidateList.html', show: true,placement:'center'});

		});

		gotMenteeList.error(function () {
			loader.destroy();
			$alert({title: 'Error..!', content: 'Please try again.', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'danger', show: true});
		});

};

$scope.courseBasedUserList={};
$scope.buildUsersObjectByCourse=function (responseData) {
		$scope.data.selectedCourseId=$state.params.courseId;
			for(key in $scope.courseBasedUserList){
				delete $scope.courseBasedUserList[key];
			}
			for(var key in responseData.orderFroms){
				for(var detailsKey in responseData.orderFroms[key].orderDetails){
					responseData.orderFroms[key].orderDetails[detailsKey].orderFormId=responseData.orderFroms[key]._id.$oid;
					// console.log(responseData.orderFroms[key].orderDetails[detailsKey]);
					if(angular.equals($scope.courseBasedUserList[$state.params.courseId],undefined)){
						$scope.courseBasedUserList[$state.params.courseId]=[];
					}
					if(angular.equals(responseData.orderFroms[key].orderDetails[detailsKey].courseId,$state.params.courseId)){
					
						$scope.courseBasedUserList[$state.params.courseId].push(responseData.orderFroms[key].orderDetails[detailsKey]);
					}
					// console.log(responseData.orderFroms[key].orderDetails[detailsKey].Name,$scope.courseBasedUserList[responseData.orderFroms[key].orderDetails[detailsKey].Name][0].userInfo);
					var userCount=0;
					if(angular.equals($scope.courseBasedUserList[$state.params.courseId][0],undefined)){
						return 0;
					}
					for(userIndex in $scope.courseBasedUserList[$state.params.courseId][0].userInfo){
						if(angular.equals($scope.courseBasedUserList[$state.params.courseId][0].userInfo[userIndex].status,'Approved')){
							userCount++;
						}
					}

					if(!userCount){
						delete $scope.courseBasedUserList[$state.params.courseId];
					}
				}
				
			}

};

$scope.addCandidatesToBatchFromOrderform = function (userList,hide) {
	$scope.orderFormsData=[];
				for(var key in userList){
				var orderFormId=userList[key].orderFormId;
				// checkedStatus
				for(candidKey in userList[key].userInfo){
					if(userList[key].userInfo[candidKey].checkedStatus){
						var groupOfOneOrderForm={};
						groupOfOneOrderForm.orderFormData={};
						groupOfOneOrderForm.orderFormData.index=candidKey;
						groupOfOneOrderForm.orderFormData.courseObj={};
						groupOfOneOrderForm.orderFormData.courseObj.courseId=$state.params.courseId;
						groupOfOneOrderForm.orderFormData.orderFormId=orderFormId;
						groupOfOneOrderForm.selectedUser={};
						groupOfOneOrderForm.selectedUser.mandatoryData=angular.copy(userList[key].userInfo[candidKey]);
						delete groupOfOneOrderForm.selectedUser.mandatoryData.status;
						delete groupOfOneOrderForm.selectedUser.mandatoryData.userId;
						// console.log(groupOfOneOrderForm.orderFormData);
						$scope.orderFormsData.push(groupOfOneOrderForm);
					}
				}

				
			}

			for(var key in $scope.orderFormsData){

					$scope.orderFormsData[key].selectedUser.batch={};
					$scope.orderFormsData[key].selectedUser.batch=angular.copy($scope.data.selectedBatchObj);
					$scope.orderFormsData[key].selectedUser.batch.endDate=$scope.orderFormsData[key].selectedUser.batch.endDate.$date;
					$scope.orderFormsData[key].selectedUser.batch.enrollmentAfter = $scope.orderFormsData[key].selectedUser.batch.enrollmentAfter.$date;
					$scope.orderFormsData[key].selectedUser.batch.enrollmentBefore = $scope.orderFormsData[key].selectedUser.batch.enrollmentBefore.$date;
					$scope.orderFormsData[key].selectedUser.batch.fkCourseId = $scope.orderFormsData[key].selectedUser.batch.fkCourseId.$oid;
					$scope.orderFormsData[key].selectedUser.batch.batchId = $scope.orderFormsData[key].selectedUser.batch.batchId.$oid;
					$scope.orderFormsData[key].selectedUser.batch.startDate=$scope.orderFormsData[key].selectedUser.batch.startDate.$date;
					$scope.orderFormsData[key].selectedUser.batch._id=$scope.orderFormsData[key].selectedUser.batch._id.$oid;
					$scope.orderFormsData[key].selectedUser.batchId=$scope.orderFormsData[key].selectedUser.batch.batchId;

				 	$scope.orderFormsData[key].selectedUser.course={};
					$scope.orderFormsData[key].selectedUser.coursetype=userList[0].coursetype?userList[0].coursetype:'offline';
					$scope.orderFormsData[key].selectedUser.course._id=$state.params.courseId;
					// $scope.orderFormsData[key].selectedUser.mandatoryData=
					$scope.orderFormsData[key].selectedUser.mandatoryData.password=$scope.orderFormsData[key].selectedUser.mandatoryData.eMail;
					
			  		$scope.orderFormsData[key].selectedUser.loggedusercrmid=$scope.rm_id;
			  		$scope.orderFormsData[key].selectedUser.companyId=$scope.companyId;
			  		$scope.orderFormsData[key].selectedUser.role={};
			  		$scope.orderFormsData[key].selectedUser.role.roleId=3; //initialising the role id as mentee
				}

			var fnRegisterUserCallBack=allocateCandidateService.fnenrollBulkUsers($scope.orderFormsData);
					fnRegisterUserCallBack.then(function(data){
						var result=angular.fromJson(JSON.parse(data.data));
						loadBatches();
						hide();
						$alert({title: '', content: 'Enrolled candidates..!', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});

					});
};


$scope.showUnallocatedMentees = function (batch) {
	$scope.data.selectedBatchObj=batch;
	var batchId = batch._id.$oid;
	var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: true,placement:'center'});

	var gotOrderForms = candidateCourseSrv.loadUnallocatedMenteees($scope.companyId,$state.params.courseId);
		gotOrderForms.then(function (response) {
			var responseData = angular.fromJson(JSON.parse(response.data));
			$scope.buildUsersObjectByCourse(responseData);
			loader.destroy();
			$modal({scope: $scope,backdrop:'static', template: 'angularModules/Batches/allocateCandidateToBatch/popup/popup-candidateListUnallocated.html', show: true,placement:'center'});

		});
		gotOrderForms.error(function () {
			loader.destroy();
			$alert({title: 'Error..!', content: 'Please try again.', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'danger', show: true});
		});
};

$scope.moveToSelectedBatch = function (hide) {
	//$scope.data.selectedBatchId
	//$scope.data.selectedToBatchId
	var userCourseMappings = [];
	for(var index in $scope.data.menteesList){
		if($scope.data.menteesList[index].checked){
			userCourseMappings.push($scope.data.menteesList[index]._id.$oid);
		}
	}
	if(!userCourseMappings.length){
		$alert({title: '', content: 'Please select candidates.', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'danger', show: true});
		return 0;
	}
	var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: true,placement:'center'});

	var updatedMenteesBatch=candidateCourseSrv.moveMenteeToAnotherBatch($scope.companyId,$scope.data.selectedFromBatchId,$scope.data.selectedBatchId,userCourseMappings);
		updatedMenteesBatch.then(function (response) {
			var responseData = angular.fromJson(JSON.parse(response.data));
			if(angular.equals(responseData.result,'ok')){
				$alert({title: '', content: 'Re-allocated candidates..!', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});
				loadBatches();
			}
			loader.destroy();
			hide();
		});
		updatedMenteesBatch.error(function () {
			hide();
			loader.destroy();
			$alert({title: 'Error..!', content: 'Please try again.', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'danger', show: true});
		});
};

}]);