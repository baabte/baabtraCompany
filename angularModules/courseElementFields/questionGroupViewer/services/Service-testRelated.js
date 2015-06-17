angular.module('baabtra').service('testRelated',['$http','bbConfig',function testRelated($http,bbConfig) {


//courseId,userLoginId,keyName,tlPointInmins,outerIndex,innerIndex

	this.FnSaveTestStartTime=function(StartTimeObj){
    var result;
   var promise=$http({
           url: bbConfig.BWS+'SaveTestStartTime/',
           data: angular.toJson(StartTimeObj),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           });
   
      return promise;
   };

   this.FnSaveTestStartTimeRandomExam=function(StartTimeObj){
    var result;
   var promise=$http({
           url: bbConfig.BWS+'SaveTestStartTimeRandomExam/',
           data: angular.toJson(StartTimeObj),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           });
   
      return promise;
   };

   this.FnTestTimeReCheck=function(data){
    var result;
   var promise=$http({
           url: bbConfig.BWS+'TestTimeReCheck/',
           data: angular.toJson(data),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           });
   
      return promise;
   };

   this.FnSubmitTest=function(SubmitTestObj){
    var result;
   var promise=$http({
           url: bbConfig.BWS+'SubmitTest/',
           data: angular.toJson(SubmitTestObj),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           });
   
      return promise;
   };

	
}]);