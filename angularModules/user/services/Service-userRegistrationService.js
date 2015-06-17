angular.module('baabtra').service('userRegistrationService',['$http','$upload','bbConfig',function userRegistrationService($http,$upload,bbConfig) {


//service function to register a user 
this.FnRegisterUser=function(userRegister){
  // console.log(userRegister);
    var result;
      var promise=$http({
           url: bbConfig.BWS+'RegisterUser/',
           data: angular.toJson(userRegister),
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

this.fnSendEmailSmsNotification=function(userEmail,userName,menteeEmail,menteeName,evaluatorEmailLIst,companyName,companyLogo){
  var promise = $http({
    method: 'POST',
      url: bbConfig.BWS+'sendEmailSmsNotification/',
      data:{"userEmail":userEmail,"userName":userName,"menteeEmail":menteeEmail,"menteeName":menteeName,"evaluatorEmailLIst":evaluatorEmailLIst,"companyName":companyName,"companyLogo":companyLogo}
   });
  return promise;
 }

 this.FnRegisterMultipleUser=function(users){
  var promise = $http({
    method: 'POST',
      url: bbConfig.BWS+'RegisterMultipleUsers/',
      data:{"users":users},
      method: 'POST',
      withCredentials: false,
      contentType:'application/json',
      dataType:'json'
   });
  return promise;
 }

 //   //service function to fetch all details of an exsisting user 
 //   this.FnFetchUserDetails=function(formData){
 //    var result;
 // var promise=$http({
 //           url: bbConfig.BWS+'FetchUserDetails/',
 //           data: angular.toJson(formData),
 //           method: 'POST',
 //           withCredentials: false,
 //           contentType:'application/json',
 //           dataType:'json',
 //           }).
 //              success(function(data, status, headers, config) {
             
 //                data=angular.fromJson(JSON.parse(data));
 //                return data;
 //              }).
 //              error(function(data, status, headers, config) {
 //                result='error';
 //             });  
 //      return promise;
 //   };


	//end of service 
}]);