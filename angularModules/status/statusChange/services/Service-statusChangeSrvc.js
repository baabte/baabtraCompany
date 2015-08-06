angular.module('baabtra').service('statusChangeSrvc',['$http','bbConfig',function($http,bbConfig) {


	this.fnFetchCurrentStatus=function(tab,userId,companyId){
    var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'FetchCurrentStatus/',
          data:{"tab":tab,"userId":userId,"companyId":companyId},
          contentType:'application/json; charset=UTF-8',
        });
          return promise;
      };

     this.fnSetStatus=function(status,tab,userId,companyId,rm_id){
    var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'SetStatus/',
          data:{"status":status,"tab":tab,"userId":userId,"companyId":companyId,"rm_id":rm_id},
          contentType:'application/json; charset=UTF-8',
        });
          return promise;
      };
}]);