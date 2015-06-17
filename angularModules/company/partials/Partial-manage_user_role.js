angular.module('baabtra').controller('ManageUserRoleCtrl',['$scope','manageCompanyRoleService','localStorageService','$state','$alert','$rootScope','commonService',function($scope,manageCompanyRoleService,localStorageService,$state,$alert,$rootScope,commonService){

$scope.showOrhideroleId=false;
if(!$rootScope.userinfo){ //checking for the login credentilas is present or not
      $rootScope.hide_when_root_empty=true;
      commonService.GetUserCredentials($scope);
}

 if($rootScope.userinfo. ActiveUserData.roleMappingObj.fkRoleId==2){
         $scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  }
  else if($rootScope.userinfo. ActiveUserData.roleMappingObj.fkRoleId==1){
    $scope.showOrhideroleId=true;
  }

if($rootScope.loggedIn==false){
  $state.go('login');
}
$scope.crmId=$rootScope.userinfo.ActiveUserData.roleMappingObj.crmId;
$scope.urmId=$rootScope.userinfo.ActiveUserData.roleMappingObj.urmId;
	
	$scope.btnRoleAdd='add';
  // service call to fetch roles of company edit by arun 
 var fnRertrivecompanyRoleCallBack= manageCompanyRoleService.RetrieveUserRole( $scope.companyId);
fnRertrivecompanyRoleCallBack.then(function  (data) {
  $scope.roles=angular.fromJson(JSON.parse(data.data));
});
$scope.resetForm = function(){
  $scope.RoleDesc="";
  $scope.roleName="";
  $scope.Form_Adding_form.$pristine = true;

}

$scope.AddCompanyRole=function(){
	// $scope.progress=true;
	$scope.btnRoleAdd='In progress';
	manageCompanyRoleService.addUserRole($scope);
};
 $scope.deleteRole=function(RollData,arrayindex_for_delete) //it wil edit roles from database
    {
       $scope.arrayindex_for_delete=arrayindex_for_delete;
       if($rootScope.userinfo. ActiveUserData.roleMappingObj.fkRoleId!=1){
          RollData._id=RollData._id.$oid;
       }
       manageCompanyRoleService.DeleteCompanyRole($scope,RollData._id); // calling service function
    };
  $scope.updateUserRole=function(role,roleData,data) //it wil edit roles from database
    {      
       $scope.roleData=roleData;
       $scope.role=role;
       $scope.data=data;
       manageCompanyRoleService.UpdateUserRole($scope);
    };
      


// call back functions
$scope.fnAddNewRollCallBack=function(data){ //callback function for handle Add new role of the company         
  data=angular.fromJson(JSON.parse(data));
  if(data=="success")
    {
      $scope.Form_Adding_form.$setPristine();
      $scope.roleName="";$scope.RoleDesc="";
       //  service call to fetch roles of company edit by arun 
      var fnRertrivecompanyRoleCallBack= manageCompanyRoleService.RetrieveUserRole($scope.companyId);
      fnRertrivecompanyRoleCallBack.then(function  (data) {
        $scope.roles=angular.fromJson(JSON.parse(data.data));
      });
      $scope.notifications("Success","new role added and Menu Assigned","success");
    }
     $scope.btnRoleAdd='add';          
};

// $scope.fnRertrivecompanyRoleCallBack=function(data){ //callback function for handle Edit role of the company         
//  $scope.roles=angular.fromJson(JSON.parse(data));

// };
$scope.fnEditUserRoleCallBack=function(data){ //callback function for handle Edit role of the company         
 data=angular.fromJson(JSON.parse(data));
 if(data=="success")
  {
   $scope.notifications("success","Updated","success");}
   else if (data=="error"||data=="failed") 
     {$scope.notifications("Failed to Create role","warning");}           
 };
$scope.fnDeleteRoleCallBack=function(data){ //callback function for handle Edit role of the company         
 data=angular.fromJson(JSON.parse(data));
 if(data=="success")
 {
  $scope.roles.splice($scope.arrayindex_for_delete, 1);}
  else if (data=="error"||data=="failed") 
   {$scope.notifications("Failed to Create role","warning");}                        
};

//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };

}]);



