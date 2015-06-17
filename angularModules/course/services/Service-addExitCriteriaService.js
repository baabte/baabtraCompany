

angular.module('baabtra').service('addExitCriteriaService',['$http','bbConfig',function addExitCriteriaService($http,bbConfig) {

	




	this.FnSaveExitCriteriaForm=function($scope){
    
    var result;
      $http({
           url: bbConfig.BWS+'SaveExitCriteria/',
           data: angular.toJson($scope.exitCriteria),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                result='success';
                $scope.fnSaveExitCriteriaCallBack(result);                
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnSaveExitCriteriaCallBack(result);
             });  
      return result;

   };

   this.FnDeleteExitCriteria=function($scope){
    
    var result;
      $http({
           url: bbConfig.BWS+'DeleteExitCriteria/',
           data: angular.toJson($scope.exitCriteriaDelete),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                result='success';
                $scope.fnDeleteExitCriteriaCallBack(result);                
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnDeleteExitCriteriaCallBack(result);
             });  
      return result;

   };




}]);