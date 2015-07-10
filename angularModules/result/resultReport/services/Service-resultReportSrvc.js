angular.module('baabtra').service('resultReportSrvc',['$http','bbConfig',function resultReportSrvc ($http,bbConfig) {


	this.fetchUserResults=function(companyId,searchKey,testDetails,date)//To Load The Existing Company Details
      {
    var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'fetchUserResults/',
          data:{companyId:companyId,searchKey:searchKey,testDetails:testDetails,date:date},
          contentType:'application/json; charset=UTF-8',
        })
          return promise;
      };


      this.fetchUserResultReport=function(companyId,searchKey,testDetails,date)//To Load The Existing Company Details
      {
    var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'fetchUserResultReport/',
          data:{companyId:companyId,searchKey:searchKey,testDetails:testDetails,date:date},          
          contentType:'application/json; charset=UTF-8',
        })
          return promise;
      };


}]);