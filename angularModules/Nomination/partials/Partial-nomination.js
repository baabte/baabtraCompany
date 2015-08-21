angular.module('baabtra').controller('NominationCtrl',['$scope','bbConfig','globalSettings','$rootScope', '$state', '$modal','commonService', 'formCustomizerService', 'addCourseService', 'nomination', '$alert', 'commonSrv', function($scope,bbConfig,globalSettings, $rootScope, $state, $modal, commonService, formCustomizerService, addCourseService, nomination, $alert, commonSrv){

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
	var childCompanyId='';
	if($rootScope.userinfo){
		if($rootScope.userinfo.ActiveUserData.roleMappingObj.childCompanyId){
		 childCompanyId=	$rootScope.userinfo.ActiveUserData.roleMappingObj.childCompanyId.$oid;
		console.log(childCompanyId);
		}
	};
	/*login detils ends*/
	


$scope.status={};
$scope.status.selected=1;
$scope.allSync={}; //the variable to pass data in controller to syncdata
// $scope.status.selected=0;
$scope.allSync.newUser=false;
$scope.allSync.FormData={}; // formdata to keep all form inserted data
var mandatoryFields=[];
var formFetchData={};
formFetchData.fkcompanyId=companyId;//to fetch forms from clnCustomForms
formFetchData.formName='orderForm';//to fetch all the froms give specific name to fetch that form only
// formFetchData.formName='signUp';//to fetch all the froms give specific name to fetch that form only
$scope.fnUserRegisterClicked=false;
$scope.finshRegisterationClicked=false;
//sevice call to fetch form 


	var gotGlobalSettings = globalSettings.retrieveExistingConf(companyId);
		gotGlobalSettings.then(function (response) {
			var responseData = angular.fromJson(JSON.parse(response.data));
			// console.log();
			var dateRange = {};
			var minDate;
			var maxDate;
			if(!angular.equals(responseData.existingConf.candidateAgeLimit,undefined)){
				var today = new Date();
				maxDate =new Date(today.getTime() - (responseData.existingConf.candidateAgeLimit.min*365*24*60*60*1000));
				minDate =new Date(today.getTime() - ((responseData.existingConf.candidateAgeLimit.max)*365*24*60*60*1000));
			}
			else{
				var today = new Date();
				maxDate =new Date(today.getTime() - (1*365*24*60*60*1000));
				minDate =new Date(today.getTime() - (100*365*24*60*60*1000));
				    // console.log(dateRange.minDate,dateRange.maxDate);	
			}

			dateRange.minDate = 1+'/'+1+'/'+minDate.getFullYear();
			dateRange.maxDate = 1+'/'+1+'/'+maxDate.getFullYear();
			$scope.allSync.dateRange = dateRange;


			var FnFetchCustomFormCallBack= formCustomizerService.FnFetchCustomForm(formFetchData);

					FnFetchCustomFormCallBack.then(function(data){

					 var result=angular.fromJson(JSON.parse(data.data));
					 $scope.formlist=result.formlist;
					 
					$scope.stepCount=$scope.formlist.formSteps;
					//to get the mandtory from field name in an array 
					    for(var i in $scope.formlist.formSchema){
					      for(var x in $scope.formlist.formSchema[i].stepFormSchema.fields){
					       if(angular.equals($scope.formlist.formSchema[i].stepFormSchema.fields[x].name,'role')||angular.equals($scope.formlist.formSchema[i].stepFormSchema.fields[x].name,'Branch'))
					       {}
					       else{
					      mandatoryFields.push($scope.formlist.formSchema[i].stepFormSchema.fields[x].name);
					      
					     }
					    } 
					    $scope.formlistCopy = angular.copy($scope.formlist);
					    }

					    $scope.fnInitializeFormRelatedDatas();
					});

		});




$scope.fnInitializeFormRelatedDatas = function (argument) {
	    //nedd to improve the call with role id\\//
    if(!angular.equals(companyId,'')){
    var FetchSpecificFormObj={companyId:companyId,fetchFormName:"orderForm"};
       var fnFetchSpecificCustomFormCallBack= formCustomizerService.FnFetchSpecificCustomForm(FetchSpecificFormObj);
      fnFetchSpecificCustomFormCallBack.then(function  (data) {

        var result=angular.fromJson(JSON.parse(data.data));

        $scope.roleSchema=result.roleSchema.roleSchema;        

        

        $scope.roleId=bbConfig.MURID;

        $scope.role={};//to keep the schema of form

        if($scope.roleId){
            $scope.allSync.FormData.role={};
            $scope.allSync.FormData.role.roleId=$scope.roleId;
        for(var index in $scope.roleSchema){
          if (angular.equals($scope.roleSchema[index].roleId,$scope.roleId)){
            $scope.role.roleId = $scope.roleId;
            $scope.role.formSchema = $scope.roleSchema[index].formSchema;
            $scope.role.formSteps = $scope.roleSchema[index].formSteps;  
            $scope.allSync.FormData.role = $scope.role;                  
          }

        }
        
      }

      });
    }else{
       $scope.allSync.FormData.role={};
       $scope.allSync.FormData.role.roleId=bbConfig.MURID;
    }
};

$scope.$watch('allSync.FormData.role', function(){
if(!angular.equals($scope.formlist,undefined) && !angular.equals($scope.allSync.FormData.role,undefined)){
        $scope.stepCount= $scope.formlist.formSteps;
        while(!angular.equals($scope.formlist.formSchema[++$scope.stepCount],undefined)){
          delete $scope.formlist.formSchema[$scope.stepCount];
        }

        $scope.stepCount= $scope.formlist.formSteps;
        if($scope.allSync.FormData.role.formSchema){    
              for(var i in $scope.allSync.FormData.role.formSchema){

                  $scope.formlist.formSchema[++$scope.stepCount]=$scope.allSync.FormData.role.formSchema[i];
                             
              }
            }
    }
                
    }, true);

$scope.data = {};
$scope.data.firstFormValid = false;
$scope.data.requesteeDetailsCompleted = false;
if(angular.equals($scope.data.orderForm, undefined)){
			$scope.data.orderForm = {};
		}
$scope.data.orderForm.requesteeDetails = {};

if(angular.equals($state.params.ofId,"")){
	if(angular.equals($state.params.key,'company')){}
	$scope.data.orderForm.requesteeDetails.type = $state.params.key;
}
else{
	$scope.data.requesteeDetailsCompleted = true;
}


if(!angular.equals($state.params.ofId,"")){
	var orderFormResponse = nomination.fnLoadOrderFormById($state.params.ofId);
	orderFormResponse.then(function(response){
		var orderForm = angular.fromJson(JSON.parse(response.data));
		console.log(orderForm);
		orderForm._id = orderForm._id.$oid;
		orderForm.companyId = orderForm.companyId.$oid;
		$scope.data.orderForm = orderForm;

	});
}


$scope.requisteTypeChanged = function( requisteType ){
	$scope.data.orderForm.requesteeDetails = {};
	$scope.data.orderForm.requesteeDetails.type = requisteType;
	$scope.data.orderForm.requesteeDetails.gender = "Male";
};

$scope.requesteDetailsCompleted = function(){
	$scope.data.requesteeDetailsCompleted = true;
};


$scope.checkUserAlreadyExists = function(){
	
	if(!angular.equals($scope.data.orderForm.requesteeDetails.eMail,undefined)){
		var companyCustomerDetailsResponse = nomination.fnLoadCompanyCustomerDetails($scope.data.orderForm.requesteeDetails.eMail, companyId, $scope.data.orderForm.requesteeDetails.type);
		companyCustomerDetailsResponse.then(function(response){
			if(!angular.equals(angular.fromJson(JSON.parse(response.data)), null)){
				$scope.data.orderForm.requesteeDetails = angular.fromJson(JSON.parse(response.data));
			}
			
		});
	}
};

//fn for register user
$scope.fnUserRegister =function (draftFlag,fnCallback) {
	//checking course selection
	if(Object.keys($scope.allSync.FormData.course).length && $scope.data.firstFormValid){
		// disabling registeration button
		$scope.fnUserRegisterClicked=true;
		$scope.finshRegisterationClicked=true;

		//taking the selected course id
		var currentCourseId = angular.copy($scope.allSync.FormData.course._id);
		
		// var time=(new Date()).valueOf();
		// hashids = new Hashids("this is a id for mentees");
		// var userUniqueId = 'RQ-' + hashids.encode(time);
			
		
		var filePaths = [];
		var keyCount = 0;
		for(var key in $scope.allSync.FormData){
			if(angular.equals(Object.prototype.toString.call($scope.allSync.FormData[key]),"[object File]")){
				filePaths.push(key);
			}
			else if(angular.equals(Object.prototype.toString.call($scope.allSync.FormData[key]),"[object Date]")){
				$scope.allSync.FormData[key] = new Date($scope.allSync.FormData[key]).toISOString();
			}

			if(angular.equals(Object.keys($scope.allSync.FormData).length, (keyCount+1) )){
				$scope.allSync.FormData.status = "Pending Approval";
				//$scope.allSync.FormData.userId = userUniqueId;
			}
			keyCount++;
		}

		$scope.fileUpload = 0;
		for(var index in filePaths){
			var courseImageUploadResponse = commonSrv.fnFileUpload($scope.allSync.FormData[filePaths[index]],filePaths[index]);
			courseImageUploadResponse.then(function(response){
				var imagePath = response.data.replace('"','').replace('"','');
				//var imagePathArray = imagePath.split('_');
				$scope.allSync.FormData[imagePath.split('.')[0].split('_')[0]] = bbConfig.BWS + 'files/'+ imagePath.split('.')[0].split('_')[0] +'/' + imagePath;
				$scope.fileUpload++;
			});
		}

		if(angular.equals($scope.data.orderForm._id, undefined)){
			//if requestee type is self
			if(angular.equals($scope.data.orderForm.requesteeDetails.type,'self')){
					$scope.data.orderForm.requesteeDetails.firstName = $scope.allSync.FormData.firstName;
					$scope.data.orderForm.requesteeDetails.lastName = $scope.allSync.FormData.lastName;
					$scope.data.orderForm.requesteeDetails.eMail = $scope.allSync.FormData.eMail;
					$scope.data.orderForm.requesteeDetails.dob = $scope.allSync.FormData.dob;
					$scope.data.orderForm.requesteeDetails.type = "individual";
				}
			var time=(new Date()).valueOf();
			hashids = new Hashids("this is a order form id");
			$scope.data.orderForm.orderFormId = 'OF-' + hashids.encode(time);
			$scope.data.orderForm.companyId = companyId;
			if(!angular.equals(childCompanyId,'')){
			$scope.data.orderForm.childCompanyId = childCompanyId;
			};
			$scope.data.orderForm.orderDetails = [];
		}

		//for take course details
		var courseExits = false;
		var courseDetails = {};
		$scope.courseCount = 0;
		for(var order in $scope.data.orderForm.orderDetails){
			if(angular.equals($scope.data.orderForm.orderDetails[order].courseId, currentCourseId)){
				courseDetails = $scope.data.orderForm.orderDetails[order];
				courseExits = true;
			}
			$scope.courseCount++;
		}


		$scope.$watch('fileUpload + courseCount', function(){
			if(angular.equals($scope.fileUpload, filePaths.length) && angular.equals($scope.courseCount, $scope.data.orderForm.orderDetails.length)){

				var userinfo = angular.copy($scope.allSync.FormData);
				if(!angular.equals(userinfo.course,undefined)){
					delete userinfo.course;
				}
				if(!angular.equals(userinfo.role,undefined)){
					delete userinfo.role;
				}
				if(angular.equals(courseDetails.userInfo, undefined)){
					courseDetails.userInfo = [];
				}

				if(!courseExits){
					var courseLoadResponse = addCourseService.fnLoadCourseDetails($scope, currentCourseId);
					courseLoadResponse.then(function(course){
		     		var course = angular.fromJson(JSON.parse(course.data)).courseDetails;
     			
			    	courseDetails.courseId = course._id.$oid;

			    	courseDetails.Name = course.Name;
			    	courseDetails.PendingApprovalCount=1;
			    	courseDetails.VerifiedCount=0;
			    	courseDetails.PaidCount=0;
			    	courseDetails.ApprovedCount=0;
			    	courseDetails.RejectedCount=0;
			    	courseDetails.Resubmit=0;
			    	if(!course.Fees.free){
			    		courseDetails.currency = course.Fees.currency.currency;
			    		courseDetails.coursePrice = course.Fees.totalAmount;
			    	}
			    	else{
		    		courseDetails.coursePrice = "free";
		    		courseDetails.currency="free";
		    		}
			    	courseDetails.userCount = 1;

			    	courseDetails.coursetype = $scope.allSync.FormData.coursetype;

			    	
			    	courseDetails.userInfo.push(userinfo);
			    	$scope.data.orderForm.orderDetails.push(courseDetails);
			    	saveOrderForm(draftFlag,fnCallback);
     			})
			}
			else{
				
				courseDetails.userCount++;
				courseDetails.PendingApprovalCount++;
				courseDetails.userInfo.push(userinfo);
				saveOrderForm(draftFlag, fnCallback);
			}
			}
		})

		
	}

	else{
		
		if(angular.equals(fnCallback, undefined)){
			$alert({title: 'Select..!', content: 'Please select a course to complete your registration :-)', placement: 'top-right',duration:4 ,animation:'am-slide-bottom', type: 'warning', show: true});
		}
		else{
			fnCallback();
		}
				
		//enablig the button
		$scope.fnUserRegisterClicked = false;
		$scope.finshRegisterationClicked = false;
	}
};//fnUserRegister - end

function saveOrderForm(draftFlag, fnCallback){
	$scope.data.orderForm.draftFlag = draftFlag;
	var nomintaionResponse = nomination.fnAddUserNomination($scope.data.orderForm, $scope.rm_id);
				nomintaionResponse.then(function(response){
					var orderForm = angular.fromJson(JSON.parse(response.data));
					if(!angular.equals(orderForm._id.$oid,undefined)){
					orderForm._id = orderForm._id.$oid;
					}
					if(!angular.equals(orderForm.companyId.$oid,undefined)){
					orderForm.companyId = orderForm.companyId.$oid;
					}

					$scope.data.orderForm = orderForm;

					$alert({title: 'Done..!', content: 'Mentees Registered Successfully :-)', placement: 'top-right',duration:3 ,animation:'am-slide-bottom', type: 'success', show: true});
					//changing the selected tab
					$scope.status.selected=1;

					if(!angular.equals(fnCallback,undefined)){
						fnCallback();
					}
					else{
						//changing the selected tab
						$scope.status.selected=1;
						$state.go('home.main.nominateEmployee',{ofId:$scope.data.orderForm.orderFormId});
					}

					//Re-initialize formdata
					for(key in $scope.allSync.FormData){
						if(!angular.equals(key,'course')){
							$scope.allSync.FormData[key]='';
						}
					}
					$scope.fnInitializeFormRelatedDatas();
					$scope.fnUserRegisterClicked=false;
					$scope.finshRegisterationClicked=false;


				});
}
	
$scope.finshRegisteration = function(draftFlag){
		
		if($scope.finshRegisterationClicked){
			return;
		}
		
		$scope.finshRegisterationClicked=true;
			
			$scope.fnUserRegister(draftFlag,function(){
				var orderFormModel = $modal({scope: $scope, template: 'angularModules/Nomination/partials/popup-orderForm.html', show: true});
				$scope.showModal = function() {
              		orderFormModel.$promise.then(orderFormModel.show);
            	};
			});
	};

	$scope.hideOrderForm = function(){
		$state.go('home.main');
	};

}]);