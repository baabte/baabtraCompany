angular.module('baabtra').service('globalSettings',['$http','bbConfig',function globalSettings($http,bbConfig) {


this.retrieveExistingConf=function (data){ // sending a parameter only for test
    var promise=$http({
         	url: bbConfig.BWS+'retrieveExistingConf/',
           data: JSON.stringify({"comapanyId":data}), //it will filter roles under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
       }).
         success(function(data, status, headers, config) { 
          return data;                   
             }).
         error(function(data, status, headers, config) {
         	
         }); 
    return promise;
};


this.addEvaluator=function (data){ // sending a parameter only for test

    var promise=$http({
         	url: bbConfig.BWS+'addEvaluator/',
           data: JSON.stringify({"data":data}), //it will filter roles under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
       }).
         success(function(data, status, headers, config) { 
          return data;                   
             }).
         error(function(data, status, headers, config) {
         	
         }); 
    return promise;
};

this.GenerateCode=function (data){ // sending a parameter only for test
    var promise=$http({
         	url: bbConfig.BWS+'GenerateCode/',
           data: JSON.stringify({"data":data}), //it will filter roles under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
       }).
         success(function(data, status, headers, config) { 
          return data;                   
             }).
         error(function(data, status, headers, config) {
         	
         }); 
    return promise;
};
	


this.removeExistingEvaluator=function (data){ // sending a parameter only for test
    var promise=$http({
         	url: bbConfig.BWS+'removeExistingEvaluator/',
           data: JSON.stringify({"data":data}), //it will filter roles under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
       }).
         success(function(data, status, headers, config) { 
          return data;                   
             }).
         error(function(data, status, headers, config) {
         	
         }); 
    return promise;
};

this.removeItemFromAgroup=function (data){ // sending a parameter only for test
    var promise=$http({
         	url: bbConfig.BWS+'removeItemFromAgroup/',
           data: JSON.stringify({"data":data}), //it will filter roles under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
       }).
         success(function(data, status, headers, config) { 
          return data;                   
             }).
         error(function(data, status, headers, config) {
         	
         }); 
    return promise;
};

this.updateExistingPrefix=function (data){ // 
    var promise=$http({
         	url: bbConfig.BWS+'updateExistingPrefix/',
           data: JSON.stringify({"data":data}), //it will filter roles under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
       }).
         success(function(data, status, headers, config) { 
          return data;                   
             }).
         error(function(data, status, headers, config) {
         	
         }); 
    return promise;
};


this.setSupervisors=function (data){ // 
    var promise=$http({
         	url: bbConfig.BWS+'setSupervisors/',
           data: JSON.stringify({"data":data}), //it will filter roles under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
       }).
         success(function(data, status, headers, config) { 
          return data;                   
             }).
         error(function(data, status, headers, config) {
         	
         }); 
    return promise;
};

this.removeExistingSupervisors=function (data){ // 
    var promise=$http({
         	url: bbConfig.BWS+'removeExistingSupervisors/',
           data: JSON.stringify({"data":data}), //it will filter roles under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
       }).
         success(function(data, status, headers, config) { 
          return data;                   
             }).
         error(function(data, status, headers, config) {
         	
         }); 
    return promise;
};

this.saveAttendanceAlertSettings=function(data){ // 
  // console.log(angular.toJson(data));
    var promise=$http({
          url: bbConfig.BWS+'saveAttendanceAlertSettings/',
           data: angular.toJson({"data":data}), //it will save saveAttendanceAlertSettings under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
       }).
         success(function(data, status, headers, config) { 
          return data;                   
             }).
         error(function(data, status, headers, config) {
          
         }); 
    return promise;
};

this.setOrderFormConfOrNot=function(data){ // 

    var promise=$http({
          url: bbConfig.BWS+'setOrderFormConfOrNot/',
           data: angular.toJson({"data":data}), //it will save saveAttendanceAlertSettings under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
       }).
         success(function(data, status, headers, config) { 
          return data;                   
             }).
         error(function(data, status, headers, config) {
          
         }); 
    return promise;
};

this.fnUpdateCandidateAgeLimit=function(comapanyId,limitRange){ // 

    var promise=$http({
          url: bbConfig.BWS+'fnUpdateCandidateAgeLimit/',
           data:{comapanyId:comapanyId,candidateAgeLimit:limitRange}, //it will save saveAttendanceAlertSettings under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
       }).
         success(function(data, status, headers, config) { 
          return data;                   
             }).
         error(function(data, status, headers, config) {
          
         }); 
    return promise;
};

}]);