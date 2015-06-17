angular.module('baabtra').controller('CoursedetailsCtrl',['$scope','$rootScope','commonService','addCourseService','$state','$sce',function($scope,$rootScope,commonService,addCourseService,$state,$sce){


  /*login detils start*/

  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

  $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  $scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  $scope.cmp_id=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/


  var promise = addCourseService.fnLoadCourseDetails($scope, $state.params.courseId);
  promise.then(function(course){
    var result = angular.fromJson(JSON.parse(course.data));
    $scope.course = result.courseDetails
    $scope.companyDetails = result.companyDetails;
    //Course Duration details
    $scope.prettyDuration = [];
    angular.forEach($scope.course.Duration.DurationDetails,function(key, value){
		$scope.prettyDuration.push(key + ' ' + value + ' ');
	 })
    $scope.prettyDuration = $scope.prettyDuration.reverse();

    //Course Fee Details

    $scope.feeDetails = {};
    if(!$scope.course.Fees.free){
    	var totalCourseDuration = $scope.course.Duration.durationInMinutes;
    	$scope.feeDetails.amount = $scope.course.Fees.totalAmount;
    	$scope.feeDetails.paymentIn = $scope.course.Fees.currency.currency;
    	$scope.feeDetails.payment = {};
    	if($scope.course.Fees.payment.oneTime){
    		$scope.feeDetails.payment.Mode = "One time";
    		$scope.feeDetails.payment.When = $scope.course.Fees.payment.mode.name;
    	}
    	else{
    		$scope.feeDetails.payment.Mode = "Installments";
    		$scope.feeDetails.payment.installmentDetails = [];
    			var installmentDetails = "";

    		angular.forEach($scope.course.courseTimeline,function(elements){
    			angular.forEach(elements,function(element, key){
    				if(angular.equals(key,"Payment_checkpoint")){
    					var paymentPoint = Math.ceil(element[0].tlPointInMinute/totalCourseDuration*100);
    					paymentPoint = paymentPoint + 5-paymentPoint%5;
    					
    					installmentDetails= installmentDetails + '<br>'+ $scope.feeDetails.paymentIn + ' ' +  element[0].elements[0].value + ' on ' + paymentPoint + '% completion'

    				}
    			});
    		});

    		$scope.feeDetails.payment.installmentDetails = installmentDetails;

    	}
    }
    else{
    	$scope.feeDetails.amount = "FREE";
    }

  });

   $scope.trustSrc = function(src) {
    if(!angular.equals(typeof src,"object")){
      return $sce.trustAsResourceUrl(src);
    }
  }

}]);