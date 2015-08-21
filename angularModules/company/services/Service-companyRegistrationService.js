


angular.module('baabtra').service('companyRegistrationService',['$http','$upload','bbConfig',function companyRegistrationService($http,$upload,bbConfig) {

	// service('Companyregistration',['$http','$upload', function Companyregistration($http,$upload) {

 //service function for sector loading
this.FnGetSectors=function(){
    
    var result;
     var promise=$http({
           url: bbConfig.BWS+'CompanySector/',
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
              return data;  
               
              }).
              error(function(data, status, headers, config) {
                result='error';
               
             });  
      return promise;

   };

//service function for country state district loading
this.FnGetCountryStateDistrict=function($scope){
     
     var result;
     var promise=$http({
           url: bbConfig.BWS+'CountryStateDistrict/',
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
              return data;
              }).
              error(function(data, status, headers, config) {
                
                result='error';
                
                
             });  
      return promise;
 

   };
   //service fuction for username validation
this.fnUserNameValid=function(userValObj){
      
     var result;
     var promise= $http({
           url: bbConfig.BWS+'UserNameValid/',
           data: angular.toJson(userValObj),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
  
            
                return data;
                
              }).
              error(function(data, status, headers, config) {
                result='error';
                // $scope.fnUserCheckCallBack(result);

             });  
      return promise;

   };
//service is called in
//company registration 
//user registration

    

//service function for company registration
    this.fnCompanyRegister=function(companyRegData){
      var result;
      console.log(companyRegData);
      var companyLogo=companyRegData.companyLogo;
      // var extArr=companyLogo.name.split('.');
      // var ext=extArr[extArr.length-1].toUpperCase();
      // // console.log(companyRegData);
      // if(ext!=='JPG'&&ext!=='JPEG'&&ext!=='PNG'&&ext!=='TIF'&&ext!=='GIF'){
      //   result='fileErr';
      //   // $scope.fnGetCompanyRegisterDetailsCallBack(result);
      //   return 0;
      // }
       var promise= $upload.upload({
           url: bbConfig.BWS+'CompanyRegistration/',
           file: companyLogo,
           data: companyRegData,
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
      
           }).
       success(function( data, status, headers, config) {
                 return data;
              }).
       error(function(data, status, headers, config) {
                 return data;     
             }).
       progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      });


     return promise;
   };
//end ofservice function for company registration

this.fnCheckDomainExits =function(domainName){
  var promise=  $http({
    url: bbConfig.BWS+'checkDomainExits/',
    data: {domainName:domainName},
    method: 'POST',
    withCredentials: false,
    contentType:'application/json',
    dataType:'json',
  })
  return promise;
};


this.fnCheckRegDomainExits =function(domainName){
  var promise=  $http({
    url: bbConfig.BWS+'checkRegDomainExits/',
    data: {domainName:domainName},
    method: 'POST',
    withCredentials: false,
    contentType:'application/json',
    dataType:'json',
  })
  return promise;
};




}]);