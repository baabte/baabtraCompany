angular.module('baabtra').service('userFeatureConfigService',['$http','bbConfig' ,function userFeatureConfigService($http,bbConfig) {

	this.FnGetFeaturesConfigForm=function($scope){
    
    var result;
      $http({
           url: bbConfig.BWS+'GetFeaturesConfig/',
           data: angular.toJson($scope.Config),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                $scope.featurelist=angular.fromJson(JSON.parse(data));
                result='success';
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnGetFeaturesConfigFormCallBack(result);
             });  
      return result;

   };

   this.FnGetFeaturesConfigValues=function($scope){
    var result;
      $http({
           url: bbConfig.BWS+'GetFeaturesConfigValues/',
           data: angular.toJson($scope.companyId),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                $scope.featureValues=angular.fromJson(JSON.parse(data));
                result='success';
                $scope.fnGetFeaturesConfigValuesCallBack(result);
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnGetFeaturesConfigValuesCallBack(result);
             });  
      return result;
   };


   this.FnSaveFeaturesConfig=function($scope){
    var result;
      $http({
           url: bbConfig.BWS+'SaveFeaturesConfig/',
           data: angular.toJson($scope.configValues),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                result='success';
                $scope.fnSaveFeaturesConfigCallBack(result);
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnSaveFeaturesConfigCallBack(result);
             });  
      return result;

   };



}]);