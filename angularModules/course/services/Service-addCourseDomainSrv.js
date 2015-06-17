angular.module('baabtra').service('addCourseDomainSrv',['$http','bbConfig',function addCourseDomainSrv($http,bbConfig) {

	this.FnInsertDomain=function($scope, domain, curParent, oldParent)//To Load The Existing Company Details
      {
      	angular.forEach($scope.branches,function(branch){
      		if (!angular.equals(branch.childrenObj,undefined)) {
      			delete branch.childrenObj;
      		}
      	});
        $http({
          method: 'post',
          url: bbConfig.BWS+'InsertDomain/',
          data:{"domain":domain ,"curParent":curParent ,"oldParent":oldParent ,"rm_id":$scope.rm_id},
          contentType:'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {//success respond from server
          $scope.domainDetails=angular.fromJson(JSON.parse(data));//Converting the result to json object
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      };


      this.FnLoadDomain=function($scope)//To Load The Existing Company Details
      {
        var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'LoadDomain/',
          contentType:'application/json; charset=UTF-8',
        });
        return promise;
      };

}]);