angular.module('baabtra').controller('FormloaderCtrl',['$scope', '$state', 'formLoader', 'userRegistrationService', 'addCourseService', 'nomination', '$alert', 'courseAllocateService',function ($scope, $state ,formLoader, userRegistrationService, addCourseService, nomination, $alert, courseAllocateService){

	$scope.data = {};
	$scope.data.registerButtonClicked = false;
	var courseDetails = {};
	
	function loadFormDetails(companyId){
		var LoadCustomForm = formLoader.LoadCustomFormforRegistration(companyId, 'User test registration');
		LoadCustomForm.then(function(response){
				var result = angular.fromJson(JSON.parse(response.data));
				if(Object.keys(result).length){
					$scope.data.companyId = result.companyId.$oid;
					$scope.data.form = result.form;
					$scope.data.formSteps = Object.keys($scope.data.form);
					$scope.data.currentStepIndex = 0;
					$scope.data.currentStep = $scope.data.formSteps[$scope.data.currentStepIndex];
					$scope.data.width = 100/$scope.data.formSteps.length;
					$scope.data.formOut = {};
				}
			});	
	}

	var courseLoadResponse = addCourseService.fnLoadCourseDetails($scope, $state.params.courseId);
		courseLoadResponse.then(function(course){
	    	
	    	$scope.data.course = angular.fromJson(JSON.parse(course.data)).courseDetails;
	    	$scope.data.orderForm = {};
			var time=(new Date()).valueOf();
			hashids = new Hashids("this is a order form id");
			var orderFormId = 'OF-' + hashids.encode(time);
			var orderFormData = {};

	    	$scope.data.orderForm.draftFlag = 1;
			$scope.data.orderForm.orderFormId = orderFormId;
			$scope.data.orderForm.orderDetails = [];
			$scope.data.orderForm.companyId = $scope.data.course.companyId.$oid;
			$scope.data.orderForm.registrationType = "API";
			
			loadFormDetails($scope.data.orderForm.companyId);

	    	courseDetails.courseId = $scope.data.course._id.$oid;

	    	courseDetails.Name = $scope.data.course.Name;
	    	courseDetails.PendingApprovalCount=1;
			courseDetails.VerifiedCount=0;
			courseDetails.PaidCount=0;
			courseDetails.ApprovedCount=0;
			courseDetails.RejectedCount=0;
			courseDetails.Resubmit=0;

	    	if(!$scope.data.course.Fees.free){
	    		courseDetails.currency = $scope.data.course.Fees.currency.currency;
	    		courseDetails.coursePrice = $scope.data.course.Fees.totalAmount;
	    	}
	    	else{
	    		courseDetails.coursePrice = "free";
	    		courseDetails.currency="free";
	    	}
	    	

	    	courseDetails.userCount = 1;

	    	courseDetails.userInfo = [];
	    })

	$scope.nextStep = function(){
		$scope.data.currentStepIndex = $scope.data.formSteps.indexOf($scope.data.currentStep) + 1;
		$scope.data.currentStep = $scope.data.formSteps[$scope.data.currentStepIndex];
	};

	$scope.previousStep = function(){
		$scope.data.currentStepIndex = $scope.data.formSteps.indexOf($scope.data.currentStep) - 1;
		$scope.data.currentStep = $scope.data.formSteps[$scope.data.currentStepIndex];
	};

	function jsonConcat(o1, o2) {
		for (var key in o2) {
			o1[key] = o2[key];
		}
		return o1;
	}

	$scope.submitUserDetails = function(){

		$scope.data.registerButtonClicked = true;
		
		var userDetails = {};
		userDetails.role = {roleId:3};

		userDetails.companyId = $scope.data.companyId;

		userDetails.course = {};
		userDetails.course._id = $state.params.courseId;
		userDetails.coursetype = "instructorLead";
		userDetails.materialAssignment = "automatic";
		userDetails.doj = new Date();

		var output = {};
		for(var step in $scope.data.formOut){	
			output = jsonConcat(output, $scope.data.formOut[step]);
		}

		
		output.satus = "Enrolled"
		output.statusHistory = [{
                            "statusChangedOn" : Date(),
                            "previousStatus" : "Pending Approval",
                            "statusChangedby" : "54978cc57525614f6e3e7109",
                            "statusChangedTo" : "Verified"},
                            {"statusChangedOn" : Date(),
                            "previousStatus" : "Verified",
                            "statusChangedby" : "54978cc57525614f6e3e7109",
                            "statusChangedTo" : "Approved"},
                            {"statusChangedOn" : Date(),
                            "previousStatus" : "Approved",
                            "statusChangedby" : "54978cc57525614f6e3e7109",
                            "statusChangedTo" : "Paid"},{
                            "statusChangedOn" : Date(),
                            "previousStatus" : "Approved",
                            "statusChangedby" : "54978cc57525614f6e3e7109",
                            "statusChangedTo" : "Enrolled"
                        	}];
		userDetails.mandatoryData = output;

		courseDetails.userInfo.push(output);
		$scope.data.orderForm.orderDetails.push(courseDetails);
		$scope.data.orderForm.requesteeDetails = output;
		$scope.data.orderForm.requesteeDetails.type = 'individual'

			var nomintaionResponse = formLoader.CustomFormUserRegistration($scope.data.orderForm, "5562fe9394214e36a96600e5");
			nomintaionResponse.then(function(response){
					$scope.data.registerButtonClicked = false;
					$alert({title: 'Done..!', content: 'You Have Registered Successfully :-)', placement: 'top-right',duration:3 ,animation:'am-slide-bottom', type: 'success', show: true});
					$state.go('login');	
			})

		// var fnRegisterUserCallBack = userRegistrationService.FnRegisterUser(userDetails);
		//
		// fnRegisterUserCallBack.then(function(data){
			
		// 	var result = angular.fromJson(JSON.parse(data.data));
			
			

		// })
	};

}]);