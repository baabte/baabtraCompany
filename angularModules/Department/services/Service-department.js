angular.module('baabtra').service('department',['$http', 'bbConfig', function($http, bbConfig) {

	this.fnAddDepartment = function(departmentObject, companyId, rmId){
    var promise = $http({
      url: bbConfig.BWS+'AddDepartment/',
      data: {departmentObject:departmentObject, companyId:companyId, rmId:rmId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

   this.fnLoadDepartment = function(companyId, branchId){
    var promise = $http({
      url: bbConfig.BWS+'LoadDepartment/',
      data: {companyId:companyId, branchId:branchId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

}]);