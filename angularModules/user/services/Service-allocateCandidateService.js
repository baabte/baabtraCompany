angular.module('baabtra').service('allocateCandidateService',['$http','bbConfig',function($http,bbConfig) {
	//service to load the verified users from training request
	this.FnLoadVerifiedCandidates=function($scope,statusType){
      var promise=$http({
           url: bbConfig.BWS+'FnLoadVerifiedCandidates/',
           data: {companyId:$scope.companyId,statusType:statusType},
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }); 
      return promise;
   };

   //service function to register a user 
	this.fnenrollSingleUser=function(userRegister,courseObj){
    var result;
      var promise=$http({
           url: bbConfig.BWS+'fnenrollSingleUser/',
           data: angular.toJson({regObject:userRegister,courseObj:courseObj}),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                return promise;
               
              }).
              error(function(data, status, headers, config) {
                result='error';
             });  
      return promise;
   };

   //service function to register a user 
	this.fnenrollBulkUsers=function(userList){
    var result;
      var promise=$http({
           url: bbConfig.BWS+'fnenrollBulkUsers/',
           data: angular.toJson({listData:userList}),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                return promise;
               
              }).
              error(function(data, status, headers, config) {
                result='error';
             });  
      return promise;
   };

}]);