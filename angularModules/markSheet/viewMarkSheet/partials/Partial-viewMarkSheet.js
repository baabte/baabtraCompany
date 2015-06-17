angular.module('baabtra').controller('ViewmarksheetCtrl',['$scope', '$rootScope', '$state', 'commonService', 'viewBatches', function ($scope, $rootScope, $state, commonService, viewBatches){

	/*login detils start*/

  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

  var rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/

  var courseId = $state.params.courseId;
  var usersList = [$state.params.userId];
  
  $scope.menteeMarkSheet = {};
  var markSheet = {};
  $scope.menteeMarkSheet.noMarkSheet = true;

  var checkElemWithMark = function(arr){
    var count=0;
    for(var key in arr){
      if(angular.equals(arr[key].mark.type,'mark')){
        count++;
      }
    }
    return count==0?1:count;
  };

  var getMarkInAllLevel = function(syllabus,index){

    if(!angular.equals(syllabus[index].mark, undefined)){
      console.log(syllabus[index].mark);
      if(syllabus[index].mark.type=='mark' && syllabus[index].children.length==0){
        syllabus[index].mark.markScored = parseFloat(syllabus[index].mark.markScored.toFixed(2));
        return syllabus[index].mark;
      }
      else if(syllabus[index].mark.type=='mark'){
        var mark=getMarkInAllLevel(syllabus[index].children,0);
        if(mark.type=='mark'){

          syllabus[index].mark.markScored = ((mark.markScored/mark.maxMark)*syllabus[index].mark.maxMark)/checkElemWithMark(syllabus[index].children);
          syllabus[index].mark.markScored = parseFloat(syllabus[index].mark.markScored.toFixed(2));
          return syllabus[index].mark;
        }
        else if(syllabus.length>(index+1)){
          return getMarkInAllLevel(syllabus,index+1);
        }
        
      }
      else{
          return {type:'no-mark'};
        }
    }
    else{
      $scope.menteeMarkSheet.noMarkSheet = false;
    }
  };



  var courseDetailsResponse = viewBatches.LoadUserCourseDetails(usersList, courseId);
  courseDetailsResponse.then(function(response){
  	var result = angular.fromJson(JSON.parse(response.data));
    $scope.menteeMarkSheet.course = result[0];
    console.log(result[0]);
    $scope.menteeMarkSheet.markSheet = $scope.menteeMarkSheet.course.syllabus[0].children;
    //fnBuildmarkSheet(syllabus, markSheet);

    var objTest = getMarkInAllLevel($scope.menteeMarkSheet.course.syllabus,0);
  });

}]);