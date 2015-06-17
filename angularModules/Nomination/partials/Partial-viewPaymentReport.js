angular.module('baabtra').controller('ViewpaymentreportCtrl',['$scope','$rootScope','paymentReport','commonService','$modal','$alert','$state',function($scope,$rootScope,paymentReport,commonService,$modal,$alert,$state){

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
	var currentStateIdentifier=$state.params.key;
	var stateArray=[
					{acthType:"Requestee",reportName:'Cash'},
					{acthType:"Course",reportName:'Sales'}
				   ];
	$scope.customerType=[
							{value:'company',name:'Corporate customer'},
							{value:'individual',name:'Individual customer'}
						];
	$scope.obj={};
	$scope.selectedCurrency=0;
    $scope.reportName=stateArray[currentStateIdentifier].reportName;
	$scope.filter={};
	$scope.filter.courses;
	$scope.searchObj={};
	$scope.searchObj.searchObj={companyId:companyId,"actHead.type":stateArray[currentStateIdentifier].acthType};
	$scope.currency=[];
// 'INR'
// '$'
// 'SR'
// 'AED'
	$scope.fnGetReport=function () {
		var promise=paymentReport.getReport($scope.searchObj);
		promise.then(function  (data) {

			$scope.obj.report=angular.fromJson(JSON.parse(data.data));

			console.log($scope.obj.report);
			$scope.totalCredit={};
			for(key in $scope.obj.report){
				if(angular.equals($scope.totalCredit[$scope.obj.report[key]._id.currency],undefined)){
					$scope.totalCredit[$scope.obj.report[key]._id.currency]=0;
					$scope.currency.push($scope.obj.report[key]._id.currency);
				}
				$scope.totalCredit[$scope.obj.report[key]._id.currency]+=$scope.obj.report[key].credit;
			}
			if(!$scope.obj.report.length){
				$alert({title: 'Sorry !', content: 'There have no entries to show.', placement: 'top-right', type: 'warning', show: true});
			}
		});
	};

	$scope.clearReport=function () {
		//$scope.searchObj={};
		//$scope.searchObj.searchObj={};
		delete $scope.filter.customerType;
		delete $scope.filter.courses;
		delete $scope.obj.report;
	};

	$scope.filterPopup=function () {
		// popup-paymentReportFilter.html
		$modal({scope: $scope, template: 'angularModules/Nomination/partials/popup-paymentReportFilter.html', show: true})
	};

	$scope.selectTab=function (tabName) {
		$scope.selectedFilterTab=tabName;
	};

	$scope.buildFilterObject=function  (hide) {
		// $scope.searchObj.searchObj['actHead.requesteeType']
		if(!angular.equals($scope.filter.customerType,undefined)){
			$scope.searchObj.searchObj['actHead.requesteeType']=$scope.customerType[$scope.filter.customerType].value;
		}
		else{
			delete $scope.searchObj.searchObj['actHead.requesteeType'];
		}

		if(!angular.equals($scope.filter.courses,undefined)){
			if($scope.filter.courses._id){
				// $scope.searchObj.searchObj['transactionFor.courseId']={};
				// $scope.searchObj.searchObj['transactionFor.courseId']['$in']=[];
				// for(key in $scope.filter.courses){
					$scope.searchObj.searchObj['transactionFor.courseId']=$scope.filter.courses._id;
				// }
			}else{
				delete $scope.searchObj.searchObj['transactionFor.courseId'];
				// delete $scope.filter.courses;
			}

		}

		hide();
	};


	$scope.deleteSearchKey=function (keyName){
		if(keyName=='customerType'){
			delete $scope.searchObj.searchObj['actHead.requesteeType'];
			delete $scope.filter.customerType;
		}
		else if(keyName=='course'){
			delete $scope.searchObj.searchObj['transactionFor.courseId'];
			delete $scope.filter.courses;
		}
	};

	$scope.fnGetObjectLen = function(obj){
		console.log(Object.keys(obj));
		return Object.keys(obj).length;
	};

}]);