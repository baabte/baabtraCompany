angular.module('baabtra').service('branchSrv',['$http','bbConfig','$rootScope',function branchSrv($http,bbConfig,$rootScope) {

  this.fnInsertBranch=function(cmp_id, branches, rm_id){
        var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'InsertBranch/',
          data:{"cmp_id":cmp_id,"branches":branches,"rm_id":rm_id},
          contentType:'application/json; charset=UTF-8',
        });
        return promise;
      };

      this.fnLoadBranch=function(branchCondition){
        var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'LoadBranches/',
          data:{"branchCondition":branchCondition},
          contentType:'application/json; charset=UTF-8',
        });
        return promise;
      };

      this.fnLoadAllBranchesUnderCompany=function(dataObject){
        var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'loadAllBranchesUnderCompany/',
          data:{"dataObject":dataObject},
          contentType:'application/json; charset=UTF-8',
        });
        return promise;
      };
}]);




