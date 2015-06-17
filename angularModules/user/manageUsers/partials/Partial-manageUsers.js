angular.module('baabtra').controller('ManageusersCtrl',['$scope','bbConfig','$rootScope','$state','commonService','$alert',function($scope,bbConfig,$rootScope,$state,commonService,$alert){

if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}

var companyId;
var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
if(angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId,bbConfig.SARID)){
  companyId='';
}
else{
  companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
}
if(angular.equals($rootScope.userinfo.ActiveUserData.modernView,'classic')){
    	$scope.classic=true;
    }




}]);