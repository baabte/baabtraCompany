angular.module('baabtra').service('department',['$http', 'bbConfig', function($http, bbConfig) {

  this.fnAddDepartment = function(departmentObject){
    var promise = $http({
      url: bbConfig.BWS+'AddDepartment/',
      data: departmentObject,
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

   this.fnLoadDepartment = function(departmentObj){
    var promise = $http({
      url: bbConfig.BWS+'LoadDepartment/',
      data: departmentObj,
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

}]);