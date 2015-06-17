angular.module('baabtra').service('feedbackList',['bbConfig','$http',function(bbConfig,$http) {
//service function to load the feedback list
this.fnLoadFeedbackList=function($scope,firstId,type,lastId)//To Load The Existing Company Details
      {
        $http({
          method: 'post',
          url: bbConfig.BWS+'fnLoadFeedbackList/',
          data:{"companyId":$scope.companyId,"firstId":firstId,"type":type,"lastId":lastId},
          contentType:'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {//success respond from server
          var feedbackObj=angular.fromJson(JSON.parse(data));//Converting the result to json object
          $scope.fnLoadFeedbackListCallback(feedbackObj);
          //$scope.companyBox=true;//Enabling Comapny Box,To show the company Details
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      };

      //service function to load the report responses for feedback report
      this.fnLoadFeedbackReport=function(id)//To Load The Existing Company Details
      {
        var promise=$http({
          method: 'post',
          url: bbConfig.BWS+'fnLoadFeedbackReport/',
          data:{"feedbackId":id},
          method: 'POST',
          withCredentials: false,
          contentType:'application/json',
          dataType:'json'
        });
          return promise;
      };

}]);