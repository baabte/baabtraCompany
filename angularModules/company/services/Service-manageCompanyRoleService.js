angular.module('baabtra').service('manageCompanyRoleService',['$http','bbConfig','$rootScope',function manageCompanyRoleService($http,bbConfig,$rootScope) {


this.addUserRole=function ($scope){ // functon that call web service to add a comapny role
     
      if($rootScope.userinfo. ActiveUserData.roleMappingObj.fkRoleId==1){
        var roles={"role":1,"roleName":$scope.roleName,"_id":$scope.roleId,"roleDescription":$scope.RoleDesc,"crmId":$scope.crmId.$oid,"urmId":$scope.urmId.$oid};
      }
      else{
          var roles={"role":2,"roleName":$scope.roleName,"roleDescription":$scope.RoleDesc,"companyId":$scope.companyId,"crmId":$scope.crmId.$oid,"urmId":$scope.urmId.$oid};
      }

    $http({
	 		url: bbConfig.BWS+'ManageCompanyRole/',
	 		data: JSON.stringify({"roles":roles}),
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	}).
	 	success(function(data, status, headers, config) {
          var asd=angular.fromJson(JSON.parse(data));//Converting the result to json object
          console.log(asd);
                   $scope.fnAddNewRollCallBack(data);
               }).
	 	error(function(data, status, headers, config) {
	 		
	 	});  

}; 

//service call changed using promise edit by arun
//this service is used in company mange role ,form Customizer 
this.RetrieveUserRole=function (companyId){ // sending a parameter only for test
      if($rootScope.userinfo. ActiveUserData.roleMappingObj.fkRoleId==1){
       var  userdata={"usertype":1};
    }
    else{
      var userdata={"usertype":2,"companyId":companyId};
    }
    var promise=$http({
         	url: bbConfig.BWS+'ViewManageCompanyRole/',
           data: JSON.stringify({"userdata":userdata}), //it will filter roles under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
       }).
         success(function(data, status, headers, config) {
         	// $scope.fnRertrivecompanyRoleCallBack(data);  
          return data;                   
             }).
         error(function(data, status, headers, config) {
         	
         }); 
    return promise;
};

this.DeleteCompanyRole=function($scope,RollData)
    {

  if($rootScope.userinfo. ActiveUserData.roleMappingObj.fkRoleId==1){
       var  userdata={"role":1,"objId":RollData};
    }
    else{
      var userdata={"role":2,"objId":RollData};
    }
        $http({
           url: bbConfig.BWS+'DeleteCompanyRole/',
           data: angular.toJson(userdata), //it will filter roles under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
           }).
             success(function(data, status, headers, config) {
                 $scope.fnDeleteRoleCallBack(data);   
             }).
              error(function(data, status, headers, config) {

             }); 

};

this.UpdateUserRole=function($scope)
{
      
      var roleData={"_id":$scope.roleData._id.$oid,"role":$scope.role,"data":$scope.data};
        $http({
           url: bbConfig.BWS+'UpdateCompanyRole/',
           data: JSON.stringify(roleData), //it will filter roles under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
           }).
             success(function(data, status, headers, config) {
                  $scope.fnEditUserRoleCallBack(data);
             }).
              error(function(data, status, headers, config) {
                
             }); 
};

 }]);
