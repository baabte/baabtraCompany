angular.module('baabtra').service('notification',['$http','bbConfig', function ($http, bbConfig) {

	this.fnLoadUserNotification = function(rmId){
    var promise = $http({
      url: bbConfig.BWS+'loadUserNotification/',
      data: {rmId:rmId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

}]);