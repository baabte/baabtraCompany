angular.module('baabtra').service('commonSrv',['$http','$upload','bbConfig',function commonSrv($http,$upload,bbConfig) {
this.FnLoadGlobalValues=function(key)
      {
        var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'LoadGlobalValues/',
          data:{"key":key},
          contentType:'application/json; charset=UTF-8',
        });
        return promise;
      };

  this.fnUploadProfilePic = function (path, urmId){
    var promise = $http({
      url: bbConfig.BWS+'UploadProfilePic/',
      data: {"path":path, "urmId":urmId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

   this.fnSaveAppSettings = function(companyId, appSettings, rmId){
    var promise = $http({
      url: bbConfig.BWS+'SaveAppSettings/',
      data: {"companyId":companyId ,"appSettings":appSettings, "rmId":rmId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

   this.fnLoadRoleUnderCompany = function(companyId){
    var promise = $http({
      url: bbConfig.BWS+'LoadRoleUnderCompany/',
      data: {"companyId":companyId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   }

   this.fnLoadMentees = function(companyId){
    var promise = $http({
      url: bbConfig.BWS+'loadMentees/',
      data: {"companyId":companyId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

   this.fnLoadUsersUnderRole = function(roleId, companyId){
    var promise = $http({
      url: bbConfig.BWS+'LoadUsersUnderRole/',
      data: {roleId:roleId, companyId:companyId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

   this.fnLoadUserCardDetails = function(rmId){
    var promise = $http({
      url: bbConfig.BWS+'LoadUserCardDetails/',
      data: {"rmId":rmId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

   this.fnFileUpload = function (fileToBeUpload, pathToBeSave){ // functon that call web service to add a comapny role
    var promise = $upload.upload({
           url: bbConfig.BWS+'CourseFileUpload/',
           file: fileToBeUpload,
           data: {'pathToBeSave':pathToBeSave},
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           });
    // console.log(typeof fileToBeUpload,fileToBeUpload);
    return promise;
   };

   this.fnRemoveFileFromServer = function (pathToBeDelete){ // functon that call web service to add a comapny role
    var promise = $upload.upload({
           url: bbConfig.BWS+'fileRemove/',
           data: {'pathToBeDelete':pathToBeDelete},
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           })
    return promise;
    };
    
   this.getResultFromUrl = function (url){
    var promise = $http({
      url:url,
      method: "GET",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
      crossDomain : true,
    });
    return promise;
   };

 this.loadCourseMaterial=function(courseId,userId){ //to load the course materials under specific course
  var promise = $http({
    method: 'POST',
      url: bbConfig.BWS+'fnloadCourseMaterial4multiSelect/',
      data:{"courseId":courseId,"urmId":userId}
   });
  return promise;
 }; 

 this.loadCourseMaterial4Batch=function(batchMappingId){ //to load the course materials under specific course
  var promise = $http({
    method: 'POST',
      url: bbConfig.BWS+'fnloadCourseMaterial4Batch/',
      data:{"batchMappingId":batchMappingId}
   });
  return promise;
 };

  this.LoadInterviewQuestionBank=function(interviewQuestionObj){ 
    var promise = $http({
        method: 'POST',
        url: bbConfig.BWS + 'LoadInterviewQuestionBank/',
        data:{interviewQuestionObj:interviewQuestionObj}
     });
    return promise;
  }; 

  this.checkUserIdExistence=function(userId){ 
    var promise = $http({
        method: 'POST',
        url: bbConfig.BWS + 'checkUserIdExistence/',
        data:{userId:userId}
     });
    return promise;
  }; 


}]);