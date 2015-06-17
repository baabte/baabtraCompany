angular.module('baabtra').service('viewUsers',['$http','bbConfig',function($http,bbConfig) {

this.fnLoadCompnayUsers=function($scope,firstId,type,lastId)//To Load The Existing Company Details
      {
    var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'fnLoadCompnayUsers/',
          data:{"companyId":$scope.companyId,"firstId":firstId,"type":type,"lastId":lastId},
          contentType:'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {//success respond from server
          // var userObj=angular.fromJson(JSON.parse(data));//Converting the result to json object
          // $scope.fnLoadCompnayUsersCallback(userObj);
          //$scope.companyBox=true;//Enabling Comapny Box,To show the company Details
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });

          return promise;
      };
}]);