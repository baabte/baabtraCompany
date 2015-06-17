angular.module('baabtra').service('questionBankService',['$http','bbConfig',function questionBankService($http,bbConfig){

	 this.fnFetchAllQuestionBundles=function(courseAllocate){
    var promise = $http({
          method: 'POST',
          url: bbConfig.BWS+'FetchAllQuestionBundles/',
          data:angular.toJson(courseAllocate),
          contentType:'application/json; charset=UTF-8',
        })

        return promise;
      };

       this.fnModifyQuestionBundles=function(courseAllocate){
    var promise = $http({
          method: 'POST',
          url: bbConfig.BWS+'ModifyQuestionBundles/',
          data:angular.toJson(courseAllocate),
          contentType:'application/json; charset=UTF-8',
        })

        return promise;
      };

        this.fnFetchQuestionBankList=function(questionFetchData){
    var promise = $http({
          method: 'POST',
          url: bbConfig.BWS+'FetchQuestionBankList/',
          data:angular.toJson(questionFetchData),
          contentType:'application/json; charset=UTF-8',
        })

        return promise;
      };


	
}]);