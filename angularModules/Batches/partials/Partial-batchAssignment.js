angular.module('baabtra').controller('BatchassignmentCtrl',['$scope','viewBatches','$rootScope','$stateParams','$alert', '$filter', function($scope,viewBatches,$rootScope,$stateParams,$alert,$filter){

	$scope.batchObj={};
	$scope.batchObj.assignedButton = false;
	$rootScope.$watch('userinfo',function(){
		$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		loadBatchDetails=viewBatches.loadBatchMentees($scope,$stateParams.batchMappingId);
		$scope.batchMappingId=$stateParams.batchMappingId;
		loadBatchDetails.then(function(response){ //promise for batch load
			$scope.batchObj.selectedList = [];
			$scope.batchObj.selectedCourseList = [];
			$scope.batchObj.batchDetails=angular.fromJson(JSON.parse(response.data)).batchList;
			$scope.batchObj.course=angular.fromJson(JSON.parse(response.data)).course;
			

			//$scope.batchObj.courseTimeline=angular.fromJson(JSON.parse(response.data)).courseObj;
			$scope.batchObj.userArray=angular.fromJson(JSON.parse(response.data)).userList;
			$scope.batchObj.userList=angular.fromJson(JSON.parse(response.data)).userDetails;
			
			$scope.batchObj.assignedList = [];
			$scope.batchObj.unAssignedList = [];


			var elementOrderLength = Object.keys($scope.batchObj.course.elementOrder).length;
			
			for (var elemCount = 0; elemCount < elementOrderLength; elemCount++) {

				
				if($scope.batchObj.course.elementOrder[elemCount])
				{
					var elementArray = $scope.batchObj.course.elementOrder[elemCount].split(".");
					var element = $scope.batchObj.batchDetails.courseTimeline;
					for(var elemOrder in elementArray){
						if(!angular.equals(element, undefined)){
							element = element[elementArray[elemOrder]];
						}
					}


					if(!angular.equals(element, undefined) &&  !angular.equals(element, '')){
						if(!angular.equals(element.code, undefined)){
							$scope.batchObj.assignedList.push({courseElement:element});
						}
					}
					else{
						var unAssignedElement = $scope.batchObj.course.courseTimeline;

						for(var elemOrder in elementArray){
							
							if(!angular.equals(unAssignedElement[elementArray[elemOrder]], undefined)){
								unAssignedElement = unAssignedElement[elementArray[elemOrder]];
							}
							
						}
						if(!angular.equals(unAssignedElement.code, undefined)){
							
							$scope.batchObj.unAssignedList.push({Name:unAssignedElement.elements[0].value,elementOrder:$scope.batchObj.course.elementOrder[elemCount],userCourseElementType:unAssignedElement.Name,innerIndex:unAssignedElement.index,tlpoint:unAssignedElement.tlPointInMinute,courseElement:unAssignedElement});
						}
					}
				}
			}
		});
	});


	$scope.assignCourseMaterials4Batch=function(){
		$scope.batchObj.assignedButton = true;
		//getting blacklist users
		$scope.excludeList=[];
			for (key in $scope.batchObj.userArray) { //loop to get the unselected users
	 			var value = $scope.batchObj.userArray[key];
	 			if (angular.equals($scope.batchObj.selectedList.indexOf(value.$oid),-1)) {
	   				$scope.excludeList.push(value.$oid);
	 			}
		}

		//adding exluded list
		angular.forEach($scope.batchObj.selectedCourseList,function(element,key){
			$scope.batchObj.selectedCourseList[key].courseElement.excludeList=$scope.excludeList;
		});


		var assignCourseMaterialsResponse=viewBatches.assignCourseMaterials4Batch($scope);
		assignCourseMaterialsResponse.then(function(response){ //promise for batch load
			var result=angular.fromJson(JSON.parse(response.data));

			
			
			if(angular.equals(result,'success')){
				$alert({title: "Success", content: 'Sucessfully Added course material to this batch' , placement: 'top-right',duration:3, type: 'info'});
				
				var selectedCourseList = angular.copy($scope.batchObj.selectedCourseList);
				for(var assignedElement in selectedCourseList){
					$scope.batchObj.assignedList.push({courseElement:selectedCourseList[assignedElement].courseElement});
					
					for(var unAssignedIndex in  $scope.batchObj.unAssignedList){

						if(angular.equals($scope.batchObj.unAssignedList[unAssignedIndex].elementOrder, selectedCourseList[assignedElement].elementOrder)){
							
							$scope.batchObj.unAssignedList.splice(unAssignedIndex,1);
						}
					}

					// var indexOfAssignedElement = $scope.batchObj.unAssignedList.indexOf(selectedCourseList[assignedElement]);
					// console.log(indexOfAssignedElement);
					// $scope.batchObj.unAssignedList.splice(indexOfAssignedElement,1);
					$scope.batchObj.selectedCourseList = [];
					$scope.batchObj.assignedButton = false;
				}
			}
		});

	};
	
	$scope.dateConvertion=function(date){
		return $filter('date')(date);
	};

	$scope.clickedOnElement = function (element){
		
		

		if(angular.equals(element.ticked,undefined)){
			element.ticked = true;
		}
		else{
			element.ticked = !element.ticked;
		}
		if(angular.equals(element.ticked,true)){
			$scope.batchObj.selectedCourseList.push(element);
		}
		else{
			if(!angular.equals($scope.batchObj.selectedCourseList.indexOf(element),-1)){
				$scope.batchObj.selectedCourseList.splice($scope.batchObj.selectedCourseList.indexOf(element),1);
			}
		}
	};

}]);