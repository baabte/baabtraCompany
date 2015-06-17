angular.module('baabtra').service('courseAllocateService',['$http','bbConfig',function($http,bbConfig) {


	 this.fnfetchUsersToCourseAllocate=function(companyId,firstId,type,lastId,searchKey){
    var promise = $http({
          method: 'POST',
          url: bbConfig.BWS+'FetchUsersToCourseAllocate/',
          data:{"companyId":companyId,"firstId":firstId,"type":type,"lastId":lastId,searchKey:searchKey},
          contentType:'application/json; charset=UTF-8',
        });

        return promise;
      };


      this.fnAllocateUsersToCourse=function(courseAllocate){
    var promise = $http({
          method: 'POST',
          url: bbConfig.BWS+'AllocateUsersToCourse/',
          data:angular.toJson(courseAllocate),
          contentType:'application/json; charset=UTF-8',
        });

        return promise;
      };

}]);