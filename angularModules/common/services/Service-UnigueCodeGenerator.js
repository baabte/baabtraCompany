angular.module('baabtra').service('UnigueCodeGenerator',['bbConfig','$http',function UnigueCodeGenerator(bbConfig,$http) {

	this.GetCode=function (companyId,item){ // sending a parameter only for test
	var data={"companyId":companyId,"item":item};
    var GetCode=$http({
         	url: bbConfig.BWS+'GetCode/',
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
    return GetCode;
};
}]);