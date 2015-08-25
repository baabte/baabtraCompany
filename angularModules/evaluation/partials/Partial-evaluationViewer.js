angular.module('baabtra').controller('EvaluationviewerCtrl',['$scope','$rootScope','$state','commonService','evaluationService','addCourseService','branchSrv','$modal', function($scope,$rootScope,$state,commonService,evaluationService,addCourseService,branchSrv,$modal){

	if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}

$scope.data = {};
$scope.data.searchKey = {};
$scope.data.searchKey.course = {};
$scope.data.firstId='';
$scope.data.lastId='';
$scope.data.searchKey.evalStatus='Pending Evaluation';
$scope.selectedElement={}; //obj to store the selected element
var evaluationFetchObj={};


		$scope.rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		$scope.childCompanyId='';
		if(angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.childCompanyId,'')){
			$scope.childCompanyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.childCompanyId.$oid;
		}


 	 //====================================
		//this is to manage the progress popup
		$scope.loaderProgressTab=0;
		$scope.progressStart=function () {

				$scope.loaderProgressTab=$scope.loaderProgressTab==4?1:$scope.loaderProgressTab*1+1;


		};
			var interval=setInterval(function() {
				$scope.progressStart();
			},700);
		//=======================================

	var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: false,placement:'center'});

	$scope.startLoader =function(){
	loader.$promise.then(loader.show);
	};

	$scope.stopLoader =function(){
	loader.hide();
	};   


	var courseFetchData={fkcompanyId:$scope.companyId,type:'all'};
	var FetchCourseListCallBack = addCourseService.fnFetchCourseList(courseFetchData);

	FetchCourseListCallBack.then(function(response){
		$scope.data.courseList = angular.fromJson(JSON.parse(response.data));
	});

	var branchLoaderObj = {companyId:$scope.companyId};
	var branchLoaderResponse = branchSrv.fnLoadAllBranchesUnderCompany(branchLoaderObj);
	branchLoaderResponse.then(function(response){
		 $scope.data.branchList = angular.fromJson(JSON.parse(response.data));
	});




	var searchTimeOut;
	$scope.$watch('data.searchKey', function(){
		// if((!angular.equals($scope.data.searchKey.userName,undefined))&&(!angular.equals($scope.data.searchKey.userName,''))){
				if(searchTimeOut) {
					clearTimeout(searchTimeOut);
				}
				searchTimeOut=setTimeout(function(){
				$scope.startLoader();

					if(angular.equals($scope.childCompanyId,'')){
				 evaluationFetchObj={companyId:$scope.companyId,firstId:$scope.data.firstId,lastId:$scope.data.lastId,type:'initial',searchKey:$scope.data.searchKey};
				}else{
			     evaluationFetchObj={companyId:$scope.companyId,childCompanyId:$scope.childCompanyId,firstId:$scope.data.firstId,lastId:$scope.data.lastId,type:'initial',searchKey:$scope.data.searchKey};	
				}
				var  evaluationFetchResponse=evaluationService.evaluationFetch(evaluationFetchObj);
				evaluationFetchResponse.then(function(data){
				var result=angular.fromJson(JSON.parse(data.data));
				$scope.stopLoader();
				$scope.data.usersCount=result.usersCount;
				$scope.data.usersCountFrom = 1;
			    $scope.data.usersCountTo = (($scope.data.usersCount <= 10)?$scope.data.usersCount:10); 
				$scope.data.EvaluationList=result.EvaluationList;
				$scope.data.firstId=result.firstId;
				$scope.data.lastId=result.lastId;
				$scope.data.prevButtondisabled = true;

				});

			    },500);
			// }
		}, true);

	$scope.nextOne=function(){//event  for showing next 12 items
				$scope.startLoader();
	  			
	  			if(angular.equals($scope.childCompanyId,'')){
				 evaluationFetchObj={companyId:$scope.companyId,firstId:$scope.data.firstId,lastId:$scope.data.lastId,type:'next',searchKey:$scope.data.searchKey};
				}else{
				 evaluationFetchObj={companyId:$scope.companyId,childCompanyId:$scope.childCompanyId,firstId:$scope.data.firstId,lastId:$scope.data.lastId,type:'next',searchKey:$scope.data.searchKey};	
				}
				var evaluationFetchResponse=evaluationService.evaluationFetch(evaluationFetchObj);
				evaluationFetchResponse.then(function(data){
				var result=angular.fromJson(JSON.parse(data.data));
				$scope.stopLoader();

	        if(!angular.equals($scope.data.firstId,result.firstId)){
		        $scope.data.usersCountFrom = $scope.data.usersCountFrom + 10;
			    $scope.data.usersCountTo = ((result.usersCount-$scope.data.usersCountFrom) > 10) ? ($scope.data.usersCountTo + 10):result.usersCount;

		        $scope.data.EvaluationList = result.EvaluationList;
		        $scope.data.firstId = result.firstId;
		        $scope.data.lastId = result.lastId;
		        $scope.data.prevButtondisabled = false;
		    }
		    else{
		    	$scope.data.nextButtondisabled = true;
		    }
    	});
	};

	//event  for showing previous 9 items
	$scope.prevOne=function(){
		$scope.startLoader();
		if(angular.equals($scope.childCompanyId,'')){
				 evaluationFetchObj={companyId:$scope.companyId,firstId:$scope.data.firstId,lastId:$scope.data.lastId,type:'prev',searchKey:$scope.data.searchKey};
				}else{
				 evaluationFetchObj={companyId:$scope.companyId,childCompanyId:$scope.childCompanyId,firstId:$scope.data.firstId,lastId:$scope.data.lastId,type:'prev',searchKey:$scope.data.searchKey};	
				}
				var evaluationFetchResponse=evaluationService.evaluationFetch(evaluationFetchObj);
				evaluationFetchResponse.then(function(data){
				var result=angular.fromJson(JSON.parse(data.data));
				$scope.stopLoader();				
		        if(!angular.equals($scope.data.firstId, result.firstId)){
			        
			        $scope.data.usersCountFrom = $scope.data.usersCountFrom - 10;
			    	$scope.data.usersCountTo = $scope.data.usersCountFrom + 9;

			        $scope.data.EvaluationList = result.EvaluationList.reverse();
			        $scope.data.firstId = result.lastId;
			        $scope.data.lastId = result.firstId;
			       
		    	}
		    	else{
		    		$scope.data.prevButtondisabled = true;
		    	}
	    	});
	};

	//funtion to find syllabus parent of a element evaluation
	$scope.syllabusSplit = function(syllabusObj){
		var syllabusArray=syllabusObj.name.split('.');
		return syllabusArray[syllabusArray.length-1];
	};


	$scope.courseSelectionChanged = function(course){
		
		var courseId = course._id.$oid;
		if(!$scope.data.searchKey.coursesSelected){
			$scope.data.searchKey.coursesSelected = [];
		}
		

		if(angular.equals($scope.data.searchKey.coursesSelected.indexOf(courseId), -1)){
			$scope.data.searchKey.coursesSelected.push(courseId);
		}
		else{
			$scope.data.searchKey.coursesSelected.splice($scope.data.searchKey.coursesSelected.indexOf(courseId), 1);
		}

		if($scope.data.searchKey.coursesSelected.length){

			for(var index in $scope.data.courseList){
				if(angular.equals($scope.data.courseList[index]._id.$oid, $scope.data.searchKey.coursesSelected[0])){
					$scope.data.selectedCourse = $scope.data.courseList[index];
				}
			}
		}
	};

	$scope.branchSelectionChanged = function(branch){
		var branchId = branch._id.$oid;
		if(!$scope.data.searchKey.branchSelected){
			$scope.data.searchKey.branchSelected = [];
		}

		if(angular.equals($scope.data.searchKey.branchSelected.indexOf(branchId), -1)){
			$scope.data.searchKey.branchSelected.push(branchId);
		}
		else{
			$scope.data.searchKey.branchSelected.splice($scope.data.searchKey.branchSelected.indexOf(branchId), 1);
		}

	};

// Pre-fetch an external template populated with a custom scope
var evaluationModal = $modal({scope: $scope,backdrop:true, template: 'angularModules/evaluation/partials/popup-evaluator.html', show: false,placement:'center'});
// Show when some event occurs (use $promise property to ensure the template has been loaded)



$scope.showEvaluationModal =function(){
evaluationModal.$promise.then(evaluationModal.show);
};

$scope.hideEvaluationModal =function(){
evaluationModal.hide();
};    



$scope.$watch('selectedElement',function(){

	if($scope.selectedElement.elementAddress){
		if(!$scope.selectedElement.element){
			$scope.startLoader();
			var evaluationElementFetchObj={elementAddress:$scope.selectedElement.elementAddress,courseMappingId:$scope.selectedElement.fkUserCourseMappingId.$oid};
			var evaluationElementFetchResponse=evaluationService.evaluationElementFetch(evaluationElementFetchObj);
			evaluationElementFetchResponse.then(function(data){
			var result=angular.fromJson(JSON.parse(data.data));
			$scope.selectedElement.element=result;
			$scope.stopLoader();
			$scope.showEvaluationModal();		

			});
		}else{
		$scope.showEvaluationModal();			
		}
	}

},true);

$scope.removeEvaluated=function(){
	// console.log($scope.selectedElementIndex);	
	// console.log($scope.data.EvaluationList[$scope.selectedElementIndex])
	$scope.data.EvaluationList.splice($scope.selectedElementIndex,1);
	// console.log($scope.data.EvaluationList[$scope.selectedElementIndex])
	
};

$scope.selectElement=function(element,index){
$scope.selectedElement=element;
$scope.selectedElementIndex=index;
if($scope.selectedElement.element){
		$scope.showEvaluationModal();
};

};



//this function is used to format the date from milliseconds
$scope.convertDate=function (millisec) {
	var date=new Date(millisec);
	return {day:date.toDateString(),time:date.toTimeString()};
}; 






}]);