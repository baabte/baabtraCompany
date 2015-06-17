angular.module('baabtra').service('companyCourseList', ['$http','bbConfig', function ($http, bbConfig) {

	this.loadCourseToWebSite = function(companyId){
	    var promise = $http({
	      url: bbConfig.BWS+'loadCourseToWebSite/',
	      data: {companyId:companyId},
	      method: "POST",
	      withCredentials: false,
	      contentType:"application/json",
	      dataType:"json",
	    });
	    return promise;
   };

}]);