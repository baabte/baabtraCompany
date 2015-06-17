angular.module('baabtra').service('addCourseElementService',['$http','bbConfig',function addCourseElementService($http,bbConfig) {

	




  this.FnGetExitCriteria=function($scope){
    
    var result;
      $http({
           url: bbConfig.BWS+'GetExitCriteria/',
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
              $scope.exitcriterialist=angular.fromJson(JSON.parse(data));
                result='success';
               
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnGetExitCriteriaCallBack(result);
             });  
      return result;

   };

   this.FnGetCourseElements=function(courseElementNameVal){
    
    var promise;
      promise=$http({
           url: bbConfig.BWS+'GetCourseElements/',
           method: 'POST',
           withCredentials: false,
           data:{courseElementName:courseElementNameVal},
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
              //$scope.courseElementlist=angular.fromJson(JSON.parse(data));
                //result='success';
               
              }).
              error(function(data, status, headers, config) {
                //result='error';
                //$scope.fnGetCourseElementsCallBack(result);
             });  
      return promise;

   };

	this.FnSaveCourseElementForm=function($scope){
    
    var result;
      $http({
           url: bbConfig.BWS+'SaveCourseElementForm/',
           data: angular.toJson($scope.courseElement),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                result='success';
                $scope.fnSaveCourseElementFormCallBack(result);                
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnSaveCourseElementFormCallBack(result);
             });  
      return result;

   };

   this.FnDeleteCourseElement=function($scope){
    
    var result;
      $http({
           url: bbConfig.BWS+'DeleteCourseElement/',
           data: angular.toJson($scope.courseElementDelete),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                result='success';
                $scope.fnDeleteCourseElementCallBack(result);                
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnDeleteCourseElementCallBack(result);
             });  
      return result;

   };




}]);