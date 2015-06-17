angular.module('baabtra').controller('PublishedcourseCtrl',['$scope','$rootScope','commonService','$state','PublishedCourse','$alert','draftedCourses','$aside','addCourseDomainSrv','manageTreeStructureSrv','branchSrv','commonSrv',function($scope,$rootScope,commonService,$state,PublishedCourse,$alert,draftedCourses,$aside,addCourseDomainSrv,manageTreeStructureSrv,branchSrv,commonSrv){

if(!$rootScope.userinfo){ //checking for the login credentilas is present or not
      $rootScope.hide_when_root_empty=true;
      commonService.GetUserCredentials($scope);
}
if(angular.equals($rootScope.loggedIn,false)){
  $state.go('login');
}
$scope.notfoundCourse=true;
$scope.showNavMenu=false;
$scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
//if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId==2){
	$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	PublishedCourse.loadPublishedCourses($scope,'','','','',$state.params.key);
//}


//$scope.showCourseFilter = false;
var courseDomainResponse = addCourseDomainSrv.FnLoadDomain();
courseDomainResponse.then(function(response){
  $scope.domainDetails=angular.fromJson(JSON.parse(response.data));//Converting the result to json object
  $scope.domainTree=manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.domainDetails,null),null);//to get the course tree
});

var globalValuesResponse = commonSrv.FnLoadGlobalValues("");
globalValuesResponse.then(function(data){
  var globalValues=angular.fromJson(JSON.parse(data.data));
  $scope.globalValues = {};
  angular.forEach(globalValues,function(value){
    $scope.globalValues[value._id] = value.values.approved;
  });
  $scope.technologies = $scope.globalValues.technologies;
  $scope.taggs = $scope.globalValues.tags;
  $scope.Designation =$scope.globalValues.Designation;

});

$scope.data = {};



$scope.cmp_id=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;//to get the company id
  branchSrv.fnLoadBranch($scope,$scope.cmp_id);//to load the branches
  $scope.$watch('branches', function(newVal, oldVal){
    if (!angular.equals($scope.branches,undefined)) {
        $scope.data1=manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.branches,null),null);
        $scope.branchDetails = angular.copy($scope.data1);
        convertObjectName($scope.branchDetails, null);
    }
});

  var convertObjectName=function(menu,sub){
              if(sub==null){
                sub=0;
              }
              if(angular.equals(menu[sub],undefined)){
                return 0;
              }
                
              if(!angular.equals(menu[sub].childrenObj,undefined)){
                menu[sub].name=menu[sub]._id;
                menu[sub].id=menu[sub]._id;
                menu[sub].$$hashKey=menu[sub]._id+sub;
                delete menu[sub]._id;
                delete menu[sub].createdDate;
                delete menu[sub].parent;
                delete menu[sub].crmId;
                delete menu[sub].updatedDate;
                delete menu[sub].urmId;
                delete menu[sub].activeFlag;
                if(!angular.equals(menu[sub].children,null)){
                menu[sub].children=menu[sub].childrenObj;
                }
                else{
                  menu[sub].children=[];
                }
              }
              if(menu[sub].childrenObj.length){
               convertObjectName(menu[sub].childrenObj,null);
              }
              convertObjectName(menu,++sub);
            };

// $scope.loadPublishedCoursesCallback=function(data){
// 	$scope.publishedCourses=angular.fromJson(JSON.parse(data));
// };

$scope.navigateToCourse = function( courseId ){
    $state.go('home.main.viewCourse',{id:courseId});
};

$scope.editCourse = function(courseId, type){
  if(angular.equals(type, undefined)){
    type = 'course';
  }
	$state.go('home.main.addCourse.step1',{key:type,courseId:courseId});
};

$scope.undo = function(){
		var undoCourse = draftedCourses.fnDeleteCourse({activeFlag:1},$scope.lastDeletedCourseId, $scope.rm_id, "Publish",$scope.companyId);
		undoCourse.then(function (data) {
			$scope.publishedCourses = angular.fromJson(JSON.parse(data.data));
		});
	};

$scope.deleteCourseDetails = function(courseId, courseName){
	$scope.lastDeletedCourseId = courseId;
  	
	var deleteCourse = draftedCourses.fnDeleteCourse({activeFlag:0},courseId, $scope.rm_id , "Publish",$scope.companyId);

  deleteCourse.then(function (data) {
		$scope.publishedCourses = angular.fromJson(JSON.parse(data.data));

		$alert({scope: $scope, container:'body', keyboard:true, animation:'am-fade-and-slide-top', template:'views/ui/angular-strap/alert.tpl.html', title:'Undo', content:courseName+' has been moved to the Trash <i class="fa fa-smile-o"></i>', duration:15, placement: 'top-right', type: 'warning'});
	});

   };

  $scope.duplicateCourse = function(courseId,index){  
  var duplicateCourse = PublishedCourse.fnDuplicateCourse(courseId,$scope.rm_id,$scope.companyId);
  duplicateCourse.then(function (data) {
     var duplicateCourse= angular.fromJson(JSON.parse(data.data));
     console.log(duplicateCourse);
     console.log($scope.publishedCourses.courses.length);
     $scope.publishedCourses.courses.splice(index,0,duplicateCourse);
     $scope.publishedCourses.courseLength=$scope.publishedCourses.courses.length;
     console.log($scope.publishedCourses.courses.length);
     
   $alert({title: 'Done!', content: 'A duplicate copy of the course has been created' , placement: 'top-right',duration:3, type: 'success'});

    });
  };

$scope.data.courseDropdown = [
  {
    "text": "<i class=\"fa fa-fw mdi-action-toc\"></i>&nbsp;View course",
    "click": "this.viewCourseDetails(course._id.$oid);"
  },
  {
    "text": "<i class=\"fa fa-fw fa-edit\"></i>&nbsp;Edit course",
    "click": "this.editCourse(course._id.$oid, course.type);"
  },
  {
    "text": "<i class=\"fa fa-fw fa-copy\"></i>&nbsp;Duplicate course",
    "click": "this.duplicateCourse(course._id.$oid,$index);"

  },
  {
    "text": "<i class=\"fa fa-fw fa-trash\"></i>&nbsp;Delete course",
    "click": "this.deleteCourseDetails(course._id.$oid, course.Name);"
  }];

var searchInProgress;
$scope.searchCoursesAvailable=function(searchKey,type){//for seaeching the available courses
	clearTimeout(searchInProgress);
searchInProgress=setTimeout(function(){
PublishedCourse.loadPublishedCourses($scope,searchKey,'',type,'','course');

},500);

};
$scope.prevButtondisabled=true;
$scope.nextOne=function(){//event  for showing next 12 items
	  $scope.prevButtondisabled=false;
	  PublishedCourse.loadPublishedCourses($scope,'',$scope.publishedCourses.lastId.$oid,'next',$scope.publishedCourses.firstId.$oid,'course');
};

$scope.prevOne=function(){//event  for showing previous 12 items
   
   PublishedCourse.loadPublishedCourses($scope,'',$scope.publishedCourses.lastId.$oid,'prev',$scope.publishedCourses.firstId.$oid,'course');
  
};

$scope.viewCourseDetails = function(courseId){
	$state.go("home.main.course",{courseId:courseId});
};

}]);