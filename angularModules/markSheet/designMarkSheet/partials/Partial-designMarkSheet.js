angular.module('baabtra').controller('DesignmarksheetCtrl',['$modal','$scope', 'commonService', '$rootScope','PublishedCourse','markSheetService','$alert',function($modal,$scope, commonService, $rootScope,PublishedCourse,markSheetService,$alert){

	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty = false;
	}
	if($rootScope.loggedIn == false){
		$state.go('login');
	}

	$scope.rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	$scope.roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	$scope.companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	$scope.data={};
	$scope.data.pageNumber=1;
	$scope.data.searchText='';

	$scope.gotPublishedCourses=function (response) {
		$scope.data.courses=angular.fromJson(JSON.parse(response.data));
	};

	var gotPublishedCourses = PublishedCourse.loadPublishedCoursesWithPromise($scope.companyId,'','','','');
	    gotPublishedCourses.then(function (response) {
	    	$scope.gotPublishedCourses(response);
	    });

$scope.pageNavigation=function(type){//event  for showing next/prev 12 items

	if(angular.equals(type,'next')){
		$scope.data.pageNumber+=1;

	}
	else if(angular.equals(type,'prev')){
		$scope.data.pageNumber=$scope.data.pageNumber==1?1:$scope.data.pageNumber-1;
	}

	  var gotPublishedCourses = PublishedCourse.loadPublishedCoursesWithPromise($scope.companyId,$scope.data.searchText,$scope.data.courses.lastId.$oid,type,$scope.data.courses.firstId.$oid);
	      gotPublishedCourses.then(function (response) {
	    	$scope.gotPublishedCourses(response);
	    });
};
var searchKeyTimeout;
$scope.searchKeyChanged = function () {
	if(searchKeyTimeout){
		clearTimeout(searchKeyTimeout);
	}

		searchKeyTimeout = setTimeout(function () {
			$scope.data.pageNumber=1;
			var gotPublishedCourses = PublishedCourse.loadPublishedCoursesWithPromise($scope.companyId,$scope.data.searchText,'','','');
		      gotPublishedCourses.then(function (response) {
		    	$scope.gotPublishedCourses(response);
		    });		
		},600);	

	

};


//====================================
//this is to manage the progress popup
$scope.data.loaderProgressTab=0;
$scope.progressStart=function () {

		$scope.data.loaderProgressTab=$scope.data.loaderProgressTab==4?1:$scope.data.loaderProgressTab*1+1;
		$scope.$digest();


};
	var interval=setInterval(function() {
		$scope.progressStart();
	},700);
//=======================================


//this will check if the element is already added or not
$scope.checkSelectedElements = function (elementKey) {
	if(!angular.equals($scope.data.selectedCourse.markSheetElements,undefined)&&!angular.equals($scope.data.selectedCourse.markSheetElements,null)){
		// if($scope.data.selectedCourse.markSheetElements.in)
		return $scope.data.selectedCourse.markSheetElements.indexOf(elementKey);
	}
	else{
		return -1;
	}
};


// function to add a new element to marksheet
$scope.addToMarksheet = function (elementKey) {
	if(angular.equals($scope.data.selectedCourse.markSheetElements,undefined)||angular.equals($scope.data.selectedCourse.markSheetElements,null)){
		$scope.data.selectedCourse.markSheetElements=[];
	}

	if(angular.equals($scope.data.selectedCourse.markSheetElements.indexOf(elementKey),-1)){
		$scope.data.selectedCourse.markSheetElements.push(elementKey);
	}
};

$scope.removeFromMarksheet = function (elementKey) {
	if(angular.equals($scope.data.selectedCourse.markSheetElements,undefined)||angular.equals($scope.data.selectedCourse.markSheetElements,null)){
		$scope.data.selectedCourse.markSheetElements=[];
	}
	var currsentIndex=$scope.data.selectedCourse.markSheetElements.indexOf(elementKey);
	if(!angular.equals(currsentIndex,-1)){
		$scope.data.selectedCourse.markSheetElements.splice(currsentIndex,1);
		// console.log($scope.data.selectedCourse.markSheetElements);
		// $scope.data.selectedNode=$scope.data.selectedNode;
	}
};


$scope.saveMarksheetToDb = function (hide) {
	var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: true,placement:'center'});
	var savedToDb=markSheetService.saveMarksheetElements($scope.data.selectedCourse.courseId,$scope.data.selectedCourse.markSheetElements);
	savedToDb.then(function (response) {
		hide();
		loader.destroy();
		$alert({title: 'Updated', content: 'Your marksheet configuration is updated.', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});
	});
	savedToDb.error(function (argument) {
		loader.destroy();
		$alert({title: 'Error..!', content: 'Please try again.', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'danger', show: true});
	})
};



$scope.openPopup = function (course) {
	delete $scope.elementsOfSelectedNode;
	$scope.data.selectedNode='';
	// console.log(course._id.$oid);
    var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: true,placement:'center'});
	var gotSyllabus=markSheetService.getCourseSyllabus(course._id.$oid);
		gotSyllabus.then(function (response) {
			// console.log(JSON.parse(response.data));
			$scope.data.selectedCourse={};
			$scope.data.selectedCourse=angular.fromJson(JSON.parse(response.data));
			$scope.data.selectedCourse.courseId=course._id.$oid;
			loader.destroy();
			$modal({scope: $scope, template: 'angularModules/markSheet/designMarkSheet/popup/Popup-DesignMarkSheet.html', show: true,placement:'center'});
		});


	//'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html'
    // $modal({scope: $scope, template: 'angularModules/markSheet/designMarkSheet/popup/Popup-DesignMarkSheet.html', show: true,placement:'center'});

};



//function to trigger when some one selected a node in popup
$scope.$watch('data.selectedNode',function () {
	
	if(angular.equals($scope.data.selectedNode,undefined)||angular.equals($scope.data.selectedNode,'')){
		return;
	}
	//console.log($scope.data.selectedNode.mark.type);
	$scope.elementsOfSelectedNode=[];
	if(!angular.equals($scope.data.selectedNode.element,undefined)){

		for(var key in $scope.data.selectedNode.element){
			var elemNameArray=$scope.data.selectedNode.element[key].split('.');
			var elem=$scope.data.selectedCourse.courseTimeline;
			for(index in elemNameArray){
				elem=elem[elemNameArray[index]];
			}

			if(angular.equals($scope.data.selectedNode.mark.type,'mark')){
				$scope.data.markType='mark';
				if(elem.evaluable&&!angular.equals(elem.totalMark,undefined)){
					$scope.elementsOfSelectedNode.push({element:elem,key:$scope.data.selectedNode.element[key]});
				}
			}
			else if(angular.equals($scope.data.selectedNode.mark.type,'pass/fail')){
				$scope.data.markType='pass/fail';
				 // console.log(elem);
				if(elem.evaluable&&angular.equals(elem.totalMark,undefined)){
					$scope.elementsOfSelectedNode.push({element:elem,key:$scope.data.selectedNode.element[key]});
				}
			}
			else{
				$scope.data.markType='no mark';
			}

		}
	}
},true);




}]);