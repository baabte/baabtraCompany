angular.module('baabtra').controller('AllocatecandidateCtrl',['$scope', '$rootScope', '$state', '$modal', 'allocateCandidateService', 'addCourseService', '$alert','userRegistrationService','$timeout', function($scope, $rootScope, $state, $modal, allocateCandidateService, addCourseService, $alert,userRegistrationService,$timeout){
	$scope.data={};
	$scope.data.checkAll = {};
	$scope.selectAll=false;
	$scope.data.viewBox = {};
	$scope.courseBasedUserList={};

	$scope.buildUsersObjectByCourse=function (responseData) {
			for(key in $scope.courseBasedUserList){
				delete $scope.courseBasedUserList[key];
			}
			for(var key in responseData.orderFroms){
				for(var detailsKey in responseData.orderFroms[key].orderDetails){
					responseData.orderFroms[key].orderDetails[detailsKey].orderFormId=responseData.orderFroms[key]._id.$oid;
					// console.log(responseData.orderFroms[key].orderDetails[detailsKey]);
					
					if(angular.equals($scope.courseBasedUserList[responseData.orderFroms[key].orderDetails[detailsKey].Name],undefined)){
						$scope.courseBasedUserList[responseData.orderFroms[key].orderDetails[detailsKey].Name]=[];
					}

					$scope.courseBasedUserList[responseData.orderFroms[key].orderDetails[detailsKey].Name].push(responseData.orderFroms[key].orderDetails[detailsKey]);
					// console.log(responseData.orderFroms[key].orderDetails[detailsKey].Name,$scope.courseBasedUserList[responseData.orderFroms[key].orderDetails[detailsKey].Name][0].userInfo);
					var userCount=0;
					for(userIndex in $scope.courseBasedUserList[responseData.orderFroms[key].orderDetails[detailsKey].Name][0].userInfo){
						if(angular.equals($scope.courseBasedUserList[responseData.orderFroms[key].orderDetails[detailsKey].Name][0].userInfo[userIndex].status,'Approved')){
							userCount++;
						}
					}

					if(!userCount){
						delete $scope.courseBasedUserList[responseData.orderFroms[key].orderDetails[detailsKey].Name];
					}
				}
				
			}

			// console.log($scope.courseBasedUserList);
	};

	//getting the user role mapping id
	$rootScope.$watch('userinfo',function(){
		$scope.crmId = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		var allocatedPromise=allocateCandidateService.FnLoadVerifiedCandidates($scope,['Approved']); 
		allocatedPromise.then(function(response){ //getting service response here
			var responseData=angular.fromJson(JSON.parse(response.data));
			//console.log(responseData.orderFroms._firstBatch);
			//$scope.orderFormList=responseData.orderFroms._firstBatch;
			$scope.orderFormList=responseData.orderFroms;
			//console.log($scope.orderFormList);
			$scope.buildUsersObjectByCourse(responseData);


		});
	});



	$scope.selectedCandidates=[];
	//function to check all the checkboxes when the check all checkbox is clicked
	$scope.fnAllocateToBatch = function(mentee,courseObj,index,orderFormId,type){
	 	var mentee = [];

		for(var i in $scope.orderFormList){
			for(var j in $scope.orderFormList[i].orderDetails){

					for(var k in $scope.orderFormList[i].orderDetails[j].userInfo){

						$scope.orderFormList[i].orderDetails[j].userInfo[k].index=k;
						if(angular.equals($scope.orderFormList[i].orderDetails[j].userInfo[k].checkedStatus,true)&&angular.equals($scope.orderFormList[i].orderDetails[j].userInfo[k].status,'Approved')){
							var obj=angular.copy($scope.orderFormList[i].orderDetails[j].userInfo[k]);
							delete obj.status;
							delete obj.userId;
							delete obj.checkedStatus;
							$scope.selectedCandidates.push(obj);
						}
					}
			
			}
		}
		$scope.CallEnrollUserModal(mentee,courseObj,index,orderFormId,type);
	};

	var mandatoryData={};
	var coursetype;
	//function to enroll the user
	$scope.candidateObj={};
	$scope.userRegister={};
	$scope.type='';

	// variable for setting selected course details for loading batches
	$scope.selectedCourse={};
	$scope.CallEnrollUserModalByCourse=function (index,userList,type) {

		$scope.enrollType=type;
		$scope.orderFormData={};
		$scope.selectedUser={};
		$scope.orderFormsData=[];

		//for enrolling single user into a batch
		if(angular.equals(type,'single')){
			
			$scope.orderFormData.index=index;
			$scope.orderFormData.courseObj={};
			$scope.orderFormData.courseObj.courseId=userList.courseId;
			$scope.orderFormData.orderFormId=userList.orderFormId;
			
			$scope.selectedUser.mandatoryData=angular.copy(userList.userInfo[index]);
			$scope.selectedCourse.course={};
			$scope.selectedCourse.course._id=userList.courseId;
			$scope.selectedCourse.course.Name=userList.Name;
			$scope.selectedCourse.coursetype=userList.coursetype?userList[0].coursetype:'offline';
		}
		//for enrolling multiple users to a batch at one click
		else if(angular.equals(type,'bulk')){
			
			for(key in userList){
				var orderFormId=userList[key].orderFormId;
				// checkedStatus
				for(candidKey in userList[key].userInfo){
					if(userList[key].userInfo[candidKey].checkedStatus){
						var groupOfOneOrderForm={};
						groupOfOneOrderForm.orderFormData={};
						groupOfOneOrderForm.orderFormData.index=candidKey;
						groupOfOneOrderForm.orderFormData.courseObj={};
						groupOfOneOrderForm.orderFormData.courseObj.courseId=userList[key].courseId;
						groupOfOneOrderForm.orderFormData.orderFormId=userList[key].orderFormId;
						groupOfOneOrderForm.selectedUser={};
						groupOfOneOrderForm.selectedUser.mandatoryData=angular.copy(userList[key].userInfo[candidKey]);
						delete groupOfOneOrderForm.selectedUser.mandatoryData.status;
						delete groupOfOneOrderForm.selectedUser.mandatoryData.userId;

						$scope.orderFormsData.push(groupOfOneOrderForm);
					}
				}
				
			}


			// console.log($scope.orderFormsData);

			$scope.selectedCourse.course={};
			$scope.selectedCourse.course._id=userList[0].courseId;
			$scope.selectedCourse.course.Name=userList[0].Name;
			$scope.selectedCourse.coursetype=userList[0].coursetype?userList[0].coursetype:'offline';
			$scope.selectedUsers={};

		}

		if(($scope.selectedUser.mandatoryData||$scope.orderFormsData.length)){
			$modal({scope: $scope, template: 'angularModules/user/partials/popup-enrollCandidateByCourse.html', show: true});			
		}
		else{
			$scope.notifications('','Please select atleast one candidate.','danger');
		}
	};
	//flag for disabling the enroll key in popup
	$scope.hideButtonEnrollFlag=false;

	$scope.fnEnrollCandidateByCourse = function (type,hide) {
		var fnRegisterUserCallBack;
		$scope.hideButtonEnrollFlag=true;

		// function for enrolling single user
		if(angular.equals(type,'single')){

				delete $scope.selectedUser.mandatoryData.status;
				delete $scope.selectedUser.mandatoryData.userId;
					//condition to check there is any batch is selected or not.if not selectet then delete the batch object from scope
				if(!angular.equals($scope.selectedCourse.batch,undefined)&&(angular.equals(Object.keys($scope.selectedCourse.batch).length,0))){
				delete $scope.selectedCourse.batch;
				}
				if(!angular.equals($scope.selectedCourse.batch,undefined)&&($scope.selectedCourse.batch.length>0)) { 

				delete $scope.selectedCourse.batch[0].course;
				$scope.selectedUser.batchId=$scope.selectedCourse.batch[0]._id;
				delete $scope.selectedCourse.batch[0]._id;
				delete $scope.selectedCourse.batch[0].companyId;
				delete $scope.selectedCourse.batch[0].updatedDate;
				delete $scope.selectedCourse.batch[0].createddDate;
				delete $scope.selectedCourse.batch[0].crmId;
				delete $scope.selectedCourse.batch[0].urmId;
				$scope.selectedCourse.batch[0].startDate=new Date($scope.selectedCourse.batch[0].startDate).toISOString();
				$scope.selectedCourse.batch[0].endDate=new Date($scope.selectedCourse.batch[0].endDate).toISOString();
				$scope.selectedCourse.batch[0].enrollmentAfter=new Date($scope.selectedCourse.batch[0].enrollmentAfter.$date).toISOString();
				$scope.selectedCourse.batch[0].enrollmentBefore=new Date($scope.selectedCourse.batch[0].enrollmentBefore.$date).toISOString();
				$scope.selectedCourse.batch=$scope.selectedCourse.batch[0];
				//setting the date time
				var time=(new Date()).valueOf();
				hashids = new Hashids("this is a batch id");
				$scope.selectedCourse.batch.batchCode = hashids.encode(time); 

				$scope.selectedUser.batch=angular.copy($scope.selectedCourse.batch);

				 	$scope.selectedUser.course={};
					$scope.selectedUser.coursetype=$scope.selectedCourse.coursetype;
					$scope.selectedUser.course=$scope.selectedCourse.course;
					
					$scope.selectedUser.mandatoryData.password=$scope.selectedUser.mandatoryData.eMail;
					
			  		$scope.selectedUser.loggedusercrmid=$scope.crmId;
			  		$scope.selectedUser.companyId=$scope.companyId;
			  		$scope.selectedUser.role={};
			  		$scope.selectedUser.role.roleId=3; //initialising the role id as mentee

				}

			// calling service for enrolling user
			fnRegisterUserCallBack=allocateCandidateService.fnenrollSingleUser($scope.selectedUser,$scope.orderFormData);
			//console.log({userRegister:$scope.selectedUser,courseObj:$scope.orderFormData})
		}

		else if(angular.equals(type,'bulk')){
				var batchId=$scope.selectedCourse.batch[0]._id;
				if(!angular.equals($scope.selectedCourse.batch,undefined)&&(angular.equals(Object.keys($scope.selectedCourse.batch).length,0))){
				delete $scope.selectedCourse.batch;
				}
				if(!angular.equals($scope.selectedCourse.batch,undefined)&&($scope.selectedCourse.batch.length>0)) { 

				delete $scope.selectedCourse.batch[0].course;
				delete $scope.selectedCourse.batch[0]._id;
				delete $scope.selectedCourse.batch[0].companyId;
				delete $scope.selectedCourse.batch[0].updatedDate;
				delete $scope.selectedCourse.batch[0].createddDate;
				delete $scope.selectedCourse.batch[0].crmId;
				delete $scope.selectedCourse.batch[0].urmId;
				$scope.selectedCourse.batch[0].startDate=new Date($scope.selectedCourse.batch[0].startDate).toISOString();
				$scope.selectedCourse.batch[0].endDate=new Date($scope.selectedCourse.batch[0].endDate).toISOString();
				$scope.selectedCourse.batch[0].enrollmentAfter=new Date($scope.selectedCourse.batch[0].enrollmentAfter.$date).toISOString();
				$scope.selectedCourse.batch[0].enrollmentBefore=new Date($scope.selectedCourse.batch[0].enrollmentBefore.$date).toISOString();
				$scope.selectedCourse.batch=$scope.selectedCourse.batch[0];
				//setting the date time
				var time=(new Date()).valueOf();
				hashids = new Hashids("this is a batch id");
				$scope.selectedCourse.batch.batchCode = hashids.encode(time);

				for(key in $scope.orderFormsData){

					$scope.orderFormsData[key].selectedUser.batchId=batchId;

					$scope.orderFormsData[key].selectedUser.batch=angular.copy($scope.selectedCourse.batch);

				 	$scope.orderFormsData[key].selectedUser.course={};
					$scope.orderFormsData[key].selectedUser.coursetype=$scope.selectedCourse.coursetype;
					$scope.orderFormsData[key].selectedUser.course=$scope.selectedCourse.course;
					// $scope.orderFormsData[key].selectedUser.mandatoryData=
					$scope.orderFormsData[key].selectedUser.mandatoryData.password=$scope.orderFormsData[key].selectedUser.mandatoryData.eMail;
					
			  		$scope.orderFormsData[key].selectedUser.loggedusercrmid=$scope.crmId;
			  		$scope.orderFormsData[key].selectedUser.companyId=$scope.companyId;
			  		$scope.orderFormsData[key].selectedUser.role={};
			  		$scope.orderFormsData[key].selectedUser.role.roleId=3; //initialising the role id as mentee
				}

				fnRegisterUserCallBack=allocateCandidateService.fnenrollBulkUsers($scope.orderFormsData);
				//console.log({userList:$scope.orderFormsData})



		}
	}



		fnRegisterUserCallBack.then(function(data){
		
			var result=angular.fromJson(JSON.parse(data.data));
			//console.log(result);
			hide(); //to hide the modal
			$scope.hideButtonEnrollFlag=false;
			$scope.notifications('Yaay..!','Registered Successfully','success');   
		    //$state.go('home.main');

		    var allocatedPromise=allocateCandidateService.FnLoadVerifiedCandidates($scope,['Approved']); 
			allocatedPromise.then(function(response){ //getting service response here
				var responseData=angular.fromJson(JSON.parse(response.data));
				//console.log(responseData.orderFroms._firstBatch);
				//$scope.orderFormList=responseData.orderFroms._firstBatch;
				$scope.orderFormList=responseData.orderFroms;
				$scope.buildUsersObjectByCourse(responseData);
			}); 
			

		    if(angular.equals(type,'single')){
				//sending notification through email 
				var  userEmail  = $rootScope.userinfo.ActiveUserData.eMail;
				var  username   = $rootScope.userinfo.ActiveUserData.username;
				var menteeEmail = $scope.selectedUser.mandatoryData.eMail;
				var menteeName  = $scope.selectedUser.mandatoryData.firstName;
				var companyName = $rootScope.userinfo.ActiveUserData.username;
				var companyLogo = $rootScope.userinfo.ActiveUserData.appSettings.logo;
				$timeout(function(){
					var sendNotification=userRegistrationService.fnSendEmailSmsNotification(userEmail,username,menteeEmail,menteeName,result.evaluatorEmailLIst,companyName,companyLogo);
			 	},200);
			}

		 });

		fnRegisterUserCallBack.error(function (argument) {
			$scope.hideButtonEnrollFlag=false;

			$scope.notifications('Sorry..!','Something went wrong, please try again','danger');   
				
			});

	};

	//old function
	$scope.CallEnrollUserModal=function(userInfo,courseObj,index,orderFormId,type){
		$scope.type=type;
		$scope.candidateObj.doj='';
		$scope.data.courseObj=courseObj;
		$scope.data.orderFormId=orderFormId;
		$scope.data.index=index;
		$scope.candidateObj.course={};
		$scope.candidateObj.course._id=courseObj.courseId;
		$scope.candidateObj.course.Name=courseObj.Name;
		$scope.candidateObj.coursetype=courseObj.coursetype;
		if(angular.equals(type,'single')){
			mandatoryData=userInfo;
		}else{
			mandatoryData='';
		}
		
		$modal({scope: $scope, template: 'angularModules/user/partials/Popup-enrollCandidate.html', show: true});
	};

	//redirecting to create new batch view
	$scope.fnCreateBatch=function(){
		$state.go('home.main.batches');

	}

	// //enrolling the candidate for specific batch/course
	// $scope.fnEnrollCandidate=function(obj,hide,type){
	// 	$scope.hideButtonEnrollFlag=true;
	// 	//delete some unwanted data
	// 	if(angular.equals(type,'single')){
	// 		delete mandatoryData.status;
	// 		delete mandatoryData.userId;
	// 		//delete mandatoryData.$index;
	// 	}

	// 	//setting course material assignment type to 'manual'
	// 	$scope.userRegister.materialAssignment="manual";

	// 	//condition to check there is any batch is selected or not.if not selectet then delete the batch object from scope
	// 	if(!angular.equals($scope.candidateObj.batch,undefined)&&(angular.equals(Object.keys($scope.candidateObj.batch).length,0))){
	// 	delete $scope.candidateObj.batch;
	// 	}
	// 	if(!angular.equals($scope.candidateObj.batch,undefined)&&($scope.candidateObj.batch.length>0)) { 

	// 	delete $scope.candidateObj.batch[0].course;
	// 	$scope.userRegister.batchId=$scope.candidateObj.batch[0]._id;
	// 	delete $scope.candidateObj.batch[0]._id;
	// 	delete $scope.candidateObj.batch[0].companyId;
	// 	delete $scope.candidateObj.batch[0].updatedDate;
	// 	delete $scope.candidateObj.batch[0].createddDate;
	// 	delete $scope.candidateObj.batch[0].crmId;
	// 	delete $scope.candidateObj.batch[0].urmId;
	// 	$scope.candidateObj.batch[0].startDate=new Date($scope.candidateObj.batch[0].startDate).toISOString();
	// 	$scope.candidateObj.batch[0].endDate=new Date($scope.candidateObj.batch[0].endDate).toISOString();
	// 	$scope.candidateObj.batch[0].enrollmentAfter=new Date($scope.candidateObj.batch[0].enrollmentAfter.$date).toISOString();
	// 	$scope.candidateObj.batch[0].enrollmentBefore=new Date($scope.candidateObj.batch[0].enrollmentBefore.$date).toISOString();
	// 	$scope.candidateObj.batch=$scope.candidateObj.batch[0];
	// 	//setting the date time
	// 	var time=(new Date()).valueOf();
	// 	hashids = new Hashids("this is a batch id");
	// 	$scope.candidateObj.batch.batchCode = hashids.encode(time); 

	// 	 $scope.userRegister.batch=angular.copy($scope.candidateObj.batch);

	// 	} 

	// 	//build the user registration object
	// 	$scope.userRegister.course={};
	// 	$scope.userRegister.coursetype=$scope.candidateObj.coursetype;
	// 	$scope.userRegister.course=$scope.candidateObj.course;
	// 	if(angular.equals(type,'single')){
	// 		$scope.userRegister.mandatoryData=mandatoryData;
	// 		$scope.userRegister.mandatoryData.password=mandatoryData.eMail;
	// 	}else{
	// 		$scope.userRegister.mandatoryData=$scope.selectedCandidates; //assigning selected candidates into userRegister object.
	// 	}
 //  		$scope.userRegister.loggedusercrmid=$scope.crmId;
 //  		$scope.userRegister.companyId=$scope.companyId;
 //  		$scope.userRegister.role={};
 //  		$scope.userRegister.role.roleId=3; //initialising the role id as mentee
	// 	var fnRegisterUserCallBack;
	// 	if(angular.equals(type,'single')){
	// 		fnRegisterUserCallBack=allocateCandidateService.fnenrollSingleUser($scope.userRegister,obj);
	// 	}
	// 	else{
	// 		fnRegisterUserCallBack=allocateCandidateService.fnenrollBulkUsers($scope.userRegister,obj);
	// 	}
	// 	//getting the promise here
	// 	fnRegisterUserCallBack.then(function(data){
		
	// 		var result=angular.fromJson(JSON.parse(data.data));
	// 		hide(); //to hide the modal
	// 		$scope.hideButtonEnrollFlag=false;
	// 		$scope.notifications('Yaay..!','Registered Successfully','success');   
	// 	    //$state.go('home.main');


	// 	    console.log(result);
	// 	 //    var allocatedPromise=allocateCandidateService.FnLoadVerifiedCandidates($scope,['Approved']); 
	// 		// allocatedPromise.then(function(response){ //getting service response here
	// 		// 	var responseData=angular.fromJson(JSON.parse(response.data));
	// 		// 	console.log(responseData.orderFroms._firstBatch);
	// 		// 	//$scope.orderFormList=responseData.orderFroms._firstBatch;
	// 		// 	$scope.orderFormList=responseData.orderFroms;
	// 		// 	$scope.buildUsersObjectByCourse(responseData);
	// 		// }) 

	// 	 //    if(angular.equals(type,'single')){
	// 		// 	//sending notification through email 
	// 		// 	var  userEmail  = $rootScope.userinfo.ActiveUserData.eMail;
	// 		// 	var  username   = $rootScope.userinfo.ActiveUserData.username;
	// 		// 	var menteeEmail = $scope.userRegister.mandatoryData.eMail;
	// 		// 	var menteeName  = $scope.userRegister.mandatoryData.firstName;
	// 		// 	var companyName = $rootScope.userinfo.ActiveUserData.username;
	// 		// 	var companyLogo = $rootScope.userinfo.ActiveUserData.appSettings.logo;
	// 		// 	$timeout(function(){
	// 		// 		var sendNotification=userRegistrationService.fnSendEmailSmsNotification(userEmail,username,menteeEmail,menteeName,result.evaluatorEmailLIst,companyName,companyLogo);
	// 		//  	},200);
	// 		// }

	// 	 });


	// };


	//selectAll option
	$scope.checkAll=function(checked,course){
		for(var i in $scope.orderFormList){
			for(var j in $scope.orderFormList[i].orderDetails){
				if(angular.equals($scope.orderFormList[i].orderDetails[j].courseId,course.courseId)){
					for(var k in $scope.orderFormList[i].orderDetails[j].userInfo){
						$scope.orderFormList[i].orderDetails[j].userInfo[k].checkedStatus=checked;
						
					}
				}
			}
		}

	};


	//function to notify the changes
	$scope.notifications=function(title,message,type){
   
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };

  //function to check and remove  unwanted feilds from userinfo and displays while clicking expand button
	$scope.funCheckExludeList=function(key){
		var inArr=['eMail','password','userLoginId','checkedStatus','statusHistory','doc','passportCopy','userPic','lastName','firstName','showDetails'];
		if(angular.equals(inArr.indexOf(key),-1)){
			return true;
		}else{
			return false;
		}
	};

}]);