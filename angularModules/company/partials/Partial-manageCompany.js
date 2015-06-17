angular.module('baabtra').controller('ManagecompanyCtrl',['$scope','$localStorage','localStorageService','$rootScope','$state','$location','manageCompanySrv',function ($scope,$localStorage,localStorageService,$rootScope,$state,$location,manageCompanySrv){

  var loginInfo=localStorageService.get('loginInfo');
  if(loginInfo===null||loginInfo.length===0){
       $location.path('/'); //setting the location path to login page if local storage contain null value.
    }
    if(localStorageService.get('loginInfo').length!==0){ //checking for data in local storage
      $scope.rm_id=loginInfo.roleMappingId.$oid; //gets the last logged role mapping id from local storage
      if(angular.equals(loginInfo.roleMappingObj[0].fkCompanyId,"")){
        $scope.companyId='';
      }
      else{
        $scope.companyId=loginInfo.roleMappingObj[0].fkCompanyId.$oid;          
      }        
      $scope.roleId=loginInfo.roleMappingObj[0].fkRoleId;
      if($scope.roleId!=1 && $scope.roleId!=2){ //checking for login role id 
          $location.path('/home');
      }      
    }


 manageCompanySrv.FnGetCompanyDetails($scope,"","");
 $scope.manageComapny = function(comapny)
 {
  $state.go('home.main.manageCompany.company',{'companyId':comapny._id.$oid});
};
}]);