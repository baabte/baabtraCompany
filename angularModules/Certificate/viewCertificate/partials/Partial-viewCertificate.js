angular.module('baabtra').controller('ViewcertificateCtrl',['$scope','$rootScope','commonService','CertificateSrv','$state',function($scope,$rootScope,commonService,CertificateSrv,$state){



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
  $scope.companyLogo = $rootScope.userinfo.ActiveUserData.appSettings.logo
  /*login detils ends*/


  var courseId = $state.params.courseId;
  var usersList = $state.params.userId;

  var checkElemWithMark = function(arr){
    var count=0;
    for(var key in arr){
      if(arr[key].mark.markScored){
        count++;
      }
    }
    return count==0?1:count;
  };

  var getMarkInAllLevel = function(syllabus,index){
  
      if(syllabus[index].mark.type=='mark'&&syllabus[index].children.length==0){
        return syllabus[index].mark;
      }
      else if(syllabus[index].mark.type=='mark'){
        var mark=getMarkInAllLevel(syllabus[index].children,0);
        if(mark.type=='mark'){
          syllabus[index].mark.markScored=((mark.markScored/mark.maxMark)*syllabus[index].mark.maxMark)/checkElemWithMark(syllabus[index].children);
          syllabus[index].mark.status=syllabus[index].mark.minMark>syllabus[index].mark.markScored?'Failed':'Passed';
          // console.log(syllabus[index].mark);
          return syllabus[index].mark;
        }
        else if(syllabus.length>(index+1)){
          return getMarkInAllLevel(syllabus,index+1);
        }
        
      }
      else{
          return {type:'no-mark'};
        }
  
  };

  var calculateAttendance = function (attendanceArray) {
    var count=attendanceArray.length;
    var attendance=0;

    for(var index in attendanceArray){
      if(attendanceArray[index].status=='Present'){
        attendance++;
      }
    }

    if(attendance){
      return ((attendance/count)*100);
    }else{
      return (0);
    }
  };

$scope.gotTheResponseFromDb = false;
var gotCertificateDetails=CertificateSrv.getCandidateCertificateDetails(usersList,courseId);
    gotCertificateDetails.then(function (response) {
      $scope.candidate={};
      var responseData=angular.fromJson(JSON.parse(response.data));
      // console.log(responseData);
      if(!angular.equals(responseData.syllabus,undefined)&&!angular.equals(responseData.syllabus,null)){
        getMarkInAllLevel(responseData.syllabus,0);
        $scope.candidate.mark=responseData.syllabus[0];
      }
      if(!angular.equals(responseData.attendance,undefined)){
        $scope.candidate.attendance=calculateAttendance(responseData.attendance);
      }
      if(!angular.equals(responseData.companyDetails,undefined)){
        $scope.companyDetails=responseData.companyDetails;
      }

      $scope.candidate.courseName = responseData.courseName;
      $scope.candidate.orderForm = responseData.orderForm;
      $scope.candidate.orderFormId = responseData.orderFormId;
      $scope.userDetails=responseData.userDetails;
      $scope.candidate.gotTheResponseFromDb = true;

    });


}]);