angular.module('baabtra').controller('ResultreportCtrl',['$scope','commonService','$rootScope','$state','resultReportSrvc','$modal','bbConfig','$alert',function($scope,commonService,$rootScope,$state, resultReportSrvc,$modal,bbConfig,$alert){

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
	/*login details ends*/



	$scope.reportObj={};
	$scope.reportObj.selectedTest={};
	$scope.reportObj.date={};

	//====================================
//this is to manage the progress popup
$scope.loaderProgressTab=0;
$scope.progressStart=function () {

		$scope.loaderProgressTab=$scope.loaderProgressTab==4?1:$scope.loaderProgressTab*1+1;
		$scope.$digest();


};
	var interval=setInterval(function() {
		$scope.progressStart();
	},700);
//=======================================

 $scope.fromDateChange= function(){
 	
 	$scope.fromDateFormated=$scope.DateFormatChange($scope.fromDate);
	
	// console.log($scope.fromDateFormated);  	
};

 $scope.pad=function(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
};

	 $scope.DateFormatChange= function(inputdate){
	 	var date = new Date(inputdate);
		return date.getFullYear()+'/'+ $scope.pad(date.getMonth()+1)+'/'+ $scope.pad(date.getDate());//prints expected 
	 };



	$scope.searchUser=function(){
		if(!angular.equals($scope.fromDate,undefined)){
		$scope.reportObj.date.fromDate=$scope.DateFormatChange($scope.fromDate);
		}
		if(!angular.equals($scope.toDate,undefined)){
		$scope.reportObj.date.toDate=$scope.DateFormatChange($scope.toDate);
		}


			var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: true,placement:'center'});

		var fetchUserResultsCallback = resultReportSrvc.fetchUserResults(companyId,$scope.reportObj.searchKey,$scope.reportObj.selectedTest[0],$scope.reportObj.date);
		   fetchUserResultsCallback.then(function(data){
		   	$scope.reportObj = angular.fromJson(JSON.parse(data.data));
        	// console.log($scope.reportObj);
			loader.hide();
			if(!angular.equals($scope.reportObj.userList,null)){
			$scope.notifications('Done ! ','Result Report Created Successfully','success');   

			}else{
			$scope.notifications('Sorry ! ','There have no results to show','warning');   

			}

        });
	};

$scope.saveContent=function(fileContents){
    var link = document.createElement('a');
    link.href = fileContents;
    link.click();
};
	//funtion to generate report 
	$scope.generateReport=function(){
		if(!angular.equals($scope.fromDate,undefined)){
		$scope.reportObj.date.fromDate=$scope.DateFormatChange($scope.fromDate);
		}
		if(!angular.equals($scope.toDate,undefined)){
		$scope.reportObj.date.toDate=$scope.DateFormatChange($scope.toDate);
		}
			var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: true,placement:'center'});

		var fetchUserResultReportCallback = resultReportSrvc.fetchUserResultReport(companyId,$scope.reportObj.searchKey,$scope.reportObj.selectedTest[0],$scope.reportObj.date);
		   fetchUserResultReportCallback.then(function(data){
		   	$scope.reportObj = angular.fromJson(JSON.parse(data.data));
        	// console.log($scope.reportObj);
			loader.hide();
			if(!angular.equals($scope.reportObj.userList,null)){
			$scope.notifications('Done ! ','Result Report Created Successfully','success');   
			var url=bbConfig.BWS+'files/'+$scope.reportObj.filepath;
			$scope.saveContent(url);
			}else{
			$scope.notifications('Sorry ! ','There have no results to show','warning');   

			}
			

        });
	};

	$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };




}]);