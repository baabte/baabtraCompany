angular.module('baabtra').controller('AssigncoursematerialCtrl',['$scope','$rootScope','assignCourseMaterial','$stateParams','$alert',function($scope,$rootScope,assignCourseMaterial,$stateParams,$alert){

	$scope.courseObj={}; //main object
	$rootScope.$watch('userinfo',function(){ //to load the urmid and company id from userinfo object which present in rootscope.
		$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		loadCourseDDl=assignCourseMaterial.loadCourses4AssigningCourseMaterial($scope,$stateParams.userId);
		$scope.urmId=$stateParams.userId;
		loadCourseDDl.then(function(response){ //promise for batch load
			$scope.courseObj.courseList=angular.fromJson(JSON.parse(response.data)).courseList;
			$scope.courseObj.existCourseObj=angular.fromJson(JSON.parse(response.data)).courseObj;
			$scope.courseObj.profile=angular.fromJson(JSON.parse(response.data)).profile;
		});
	});

	$scope.assignCourseMaterial2timeline=function(){

		/*angular.forEach($scope.courseObj.courseMaterials,function(element){
				$scope.courseObj.existCourseObj.courseTimeline[element.key]=element.courseElem;
				
				for(keyNew in element.elemOrder){
					if(element.elemOrder[keyNew].indexOf(element.key+'.')==0){
						$scope.courseObj.existCourseObj.elementOrder[keyNew]=element.elemOrder[keyNew];
						//$scope.courseObj.courseMaterials.courseObj.elementOrder[keyNew]=element.elemOrder[keyNew];
					}
					
				}
		});*/

		//loop to build the courseTimeline object
		/*angular.forEach($scope.courseObj.courseMaterials,function(element){
			console.log($scope.courseObj.courseMaterials);
			console.log($scope.courseObj.existCourseObj);
				//$scope.batchObj.batchDetails.courseTimeline[element.key]=element.courseElem;
				if(angular.equals($scope.courseObj.existCourseObj.courseTimeline[element.structureArr[0]],undefined)){

					$scope.courseObj.existCourseObj.courseTimeline[element.structureArr[0]]={};
				}
				if(angular.equals($scope.courseObj.existCourseObj.courseTimeline[element.structureArr[0]][element.structureArr[1]],undefined)){
					$scope.courseObj.existCourseObj.courseTimeline[element.structureArr[0]][element.structureArr[1]]=[];
				}
				if(angular.equals($scope.courseObj.existCourseObj.courseTimeline[element.structureArr[0]][element.structureArr[1]][element.structureArr[2]],undefined)){

					$scope.courseObj.existCourseObj.courseTimeline[element.structureArr[0]][element.structureArr[1]][element.structureArr[2]]={};
					
				}

				$scope.courseObj.existCourseObj.courseTimeline[element.structureArr[0]][element.structureArr[1]][element.structureArr[2]]=element.courseElem;

				for(var keyNew in element.elemOrder){
					if(element.elemOrder[keyNew].indexOf(element.key+'.')==0){
						$scope.courseObj.existCourseObj.elementOrder[keyNew]=element.elemOrder[keyNew];
						
					}
					
				}
		});*/

		//response to the assign course material
		assignResponse=assignCourseMaterial.assignCourseMaterial2timeline($scope);
		assignResponse.then(function(response){ //promise for batch load
			if(angular.fromJson(JSON.parse(response.data))=='success'){
				$alert({title: "Success", content: 'Sucessfully Added course material to user Timeline' , placement: 'top-right',duration:3, type: 'info'});
			}
		});
	};

	


}]);