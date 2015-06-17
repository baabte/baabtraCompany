angular.module('baabtra').service('JobSrv',['bbConfig','$http','$alert','$modal',function JobSrv(bbConfig,$http,$alert,$modal) {
	this.saveJob=function($scope){
    $http({
           url: bbConfig.BWS+'postCompanyJobs/',
           method: "POST",
           data:$scope.jobDetails,
           withCredentials: false,
           contentType: undefined,
           processData: false,
           //dataType:"json",
           }).
              success(function(data, status, headers, config) {
              //console.log(angular.fromJson(JSON.parse(data)));
              $alert({title: 'Success!', content: 'Job Posted Successfuly..',animation:'am-fade',duration:'3', placement: 'top-right', template: 'views/ui/angular-strap/alert.tpl.html', show: true});
              }).
              error(function(data, status, headers, config) {
             });
        };

        this.listJobs=function($scope,cmp_id,search_key,search_range){

     $http({
          method: 'post',
          url: bbConfig.BWS+'getCompanyJobs/',
          data: {"cmp_id":cmp_id,"search_key":search_key,"search_range":search_range},
          contentType   : 'application/json; charset=UTF-8',
        }).
              success(function(data, status, headers, config) {
              var result=angular.fromJson(JSON.parse(data));
              $scope.Jobs=result.JobDetails;
              $scope.JobCount=result.jobCount;
                            console.log($scope.JobCount);
                //$scope.pageNum=pageNum;
                
              }).
              error(function(data, status, headers, config) {
                
                
             });
    };

    this.updateJobDetails=function(jobDetails,jobId){

      $http({
           url: bbConfig.BWS+'UpdateJobDetails/',
           method: "POST",
           data:{"jobId":jobId,"jobDetails":jobDetails},
           withCredentials: false,
           contentType: undefined,
           processData: false,
           //dataType:"json",
           }).
              success(function(data, status, headers, config) {
                //var result=angular.fromJson(JSON.parse(data));
                if (data="success") {}
              }).
              error(function(data, status, headers, config) {
             });

    };

    this.hideJobDetails=function(jobId,jobStaus){

      $http({
           url: bbConfig.BWS+'HideJobDetails/',
           method: "POST",
           data:{"jobId":jobId,"jobStaus":jobStaus},
           withCredentials: false,
           contentType: undefined,
           processData: false,
           //dataType:"json",
           }).
              success(function(data, status, headers, config) {
                //var result=angular.fromJson(JSON.parse(data));
                if (data="success") {}
              }).
              error(function(data, status, headers, config) {
             });

    };

}]);