angular.module('baabtra').service('manageCompanySrv',['$http','bbConfig',function manageCompanySrv($http,bbConfig) {

this.FnGetCompanyDetails=function($scope,range,cmp_name)//To Load The Existing Company Details
      {
        $http({
          method: 'post',
          url: bbConfig.BWS+'FnGetCompanyDetailsJi/',
          data:{"range":range,"cmp_name":cmp_name},
          contentType:'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {//success respond from server
          $scope.result=angular.fromJson(JSON.parse(data));//Converting the result to json object
          $scope.companyDetails=$scope.result.comapny_detail;//setting the company details
          $scope.companyCount=$scope.result.comapny_count;//setting the company count for pagenation
          if($scope.companyCount===0)//If No matching data found, This will show an error message
          {
            $scope.ShowNoDataFound=true;//Enabling the error Message
            $scope.WarringMessage="No Matching Comapny Found";
          }
          else
          {
            $scope.ShowNoDataFound=false;//Disabling the error Message
          }
          //$scope.companyBox=true;//Enabling Comapny Box,To show the company Details
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      };
}]);