angular.module('baabtra').service('formCustomizerService',['$http','$upload','bbConfig',function formCustomizerService($http,$upload,bbConfig) {




	//service function to register a user 
this.FnSaveCustomForm=function(customForm){
    var result;
   var promise=$http({
           url: bbConfig.BWS+'SaveCustomForm/',
           data: angular.toJson(customForm),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           });
   
      return promise;
   };


   //service function to fetch all details of an exsisting user 
   this.FnFetchCustomForm=function(formFetchData){
   	// console.log(formFetchData);
    var result;
      var promise=$http({
           url: bbConfig.BWS+'FetchCustomForm/',
           data: angular.toJson(formFetchData),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           });

      return promise;	
   };

   //service function to fetch all details of an exsisting user 
   this.FnFetchSpecificCustomForm=function(formFetchData){
    // console.log(formFetchData);
    var result;
      var promise=$http({
           url: bbConfig.BWS+'FetchSpecificCustomForm/',
           data: angular.toJson(formFetchData),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           });

      return promise; 
   };

   //service function to fetch all details of an exsisting user 
   this.FnFetchRoles=function(FetchRoleObj){
    // console.log(formFetchData);
    var result;
      var promise=$http({
           url: bbConfig.BWS+'FetchRolesList/',
           data: angular.toJson(FetchRoleObj),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           });
    
      return promise; 
   };

					
	
}]);