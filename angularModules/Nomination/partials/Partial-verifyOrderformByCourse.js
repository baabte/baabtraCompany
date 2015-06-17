angular.module('baabtra').controller('VerifyorderformbycourseCtrl',['commonService','$scope', '$rootScope', '$state', '$modal', 'allocateCandidateService', 'addCourseService', '$alert','userRegistrationService','$timeout','viewUsersForApprove', function(commonService,$scope, $rootScope, $state, $modal, allocateCandidateService, addCourseService, $alert,userRegistrationService,$timeout,viewUsersForApprove){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}
	
	$scope.coursePreviewObject={};
	// $scope.rmId = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	$scope.roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
		$scope.crmId = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/

	$scope.data={};
	$scope.data.pageNumber=1;
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
						if(angular.equals($scope.courseBasedUserList[responseData.orderFroms[key].orderDetails[detailsKey].Name][0].userInfo[userIndex].status,'Pending Approval')){
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


	var allocatedPromise=viewUsersForApprove.fnLoadMenteesForApprove($scope.companyId, ['Pending Approval'], $scope.data.pageNumber, 8,"",'');//allocateCandidateService.FnLoadVerifiedCandidates($scope,['Approved']); 
		allocatedPromise.then(function(response){ //getting service response here
			var responseData=angular.fromJson(JSON.parse(response.data));
			// console.log(responseData);
			//$scope.orderFormList=responseData.orderFroms._firstBatch;
			$scope.orderFormList=responseData.orderFroms;
			//console.log($scope.orderFormList);
			$scope.buildUsersObjectByCourse(responseData);


		});


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

	  //function to check and remove  unwanted feilds from userinfo and displays while clicking expand button
	$scope.funCheckExludeList=function(key){
		var inArr=['eMail','password','checkedStatus','statusHistory','doc','passportCopy','userPic','lastName','firstName','showDetails'];
		if(angular.equals(inArr.indexOf(key),-1)){
			return true;
		}else{
			return false;
		}
	};


	$scope.verifyOrderForm = function (index,userList,type) {

		$scope.enrollType=type;

		//verifying single user
		if(angular.equals(type,'single')){
			$scope.orderFormsData=[];
			var groupOfOneOrderForm={};
				groupOfOneOrderForm.crm=$scope.crmId;
				groupOfOneOrderForm.orderFormData={};
				groupOfOneOrderForm.orderFormData.index=index;
				groupOfOneOrderForm.orderFormData.courseObj={};
				groupOfOneOrderForm.orderFormData.courseObj.courseId=userList.courseId;
				groupOfOneOrderForm.orderFormData.orderFormId=userList.orderFormId;
				$scope.orderFormsData.push(groupOfOneOrderForm);
		}
		//for verifying multiple users under different order form
		else if(angular.equals(type,'bulk')){
			$scope.orderFormsData=[];
			for(key in userList){
				var orderFormId=userList[key].orderFormId;
				// checkedStatus
				for(candidKey in userList[key].userInfo){
					if(userList[key].userInfo[candidKey].checkedStatus){
						var groupOfOneOrderForm={};
						groupOfOneOrderForm.crm=$scope.crmId;
						groupOfOneOrderForm.orderFormData={};
						groupOfOneOrderForm.orderFormData.index=candidKey;
						groupOfOneOrderForm.orderFormData.courseObj={};
						groupOfOneOrderForm.orderFormData.courseObj.courseId=userList[key].courseId;
						groupOfOneOrderForm.orderFormData.orderFormId=userList[key].orderFormId;

						$scope.orderFormsData.push(groupOfOneOrderForm);
					}
				}
				
			}

		}

		var updatedOrderForms = viewUsersForApprove.verifyCandidateByCourse($scope.orderFormsData);
			updatedOrderForms.then(function (data) {
				if(!angular.equals(data.data,'error')){
					$scope.notifications('Done','verified users successfully','success');
				}
				else{
					$scope.notifications('Sorry','Something went wrong','error');
				}

					var allocatedPromise=viewUsersForApprove.fnLoadMenteesForApprove($scope.companyId, ['Pending Approval'], $scope.data.pageNumber, 8,"");//allocateCandidateService.FnLoadVerifiedCandidates($scope,['Approved']); 
						allocatedPromise.then(function(response){ //getting service response here
							var responseData=angular.fromJson(JSON.parse(response.data));
							// console.log(responseData);
							//$scope.orderFormList=responseData.orderFroms._firstBatch;
							$scope.orderFormList=responseData.orderFroms;
							//console.log($scope.orderFormList);
							$scope.buildUsersObjectByCourse(responseData);


						});

			});
		// console.log($scope.orderFormsData);
		//$modal({scope: $scope, template: 'angularModules/user/partials/popup-enrollCandidateByCourse.html', show: true});
	};

	$scope.notifications=function(title,message,type){
   
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };

}]);