angular.module('baabtra').service('notificationConfiguration',['bbConfig','$http',function(bbConfig,$http) {

	// this.getConfiguration = function (companyId,configType) {
	// 	if(configType=='batch-status-update'){
	// 		return {
	// 			then:function (fnClBk) {
	// 				fnClBk({
	// 					data:'{id:"value"}'
	// 				});
	// 			}
	// 		};
	// 	}
	// 	else{
	// 		return {
	// 			then:function (fnClBk) {
	// 				fnClBk({
	// 					data:null
	// 				});
	// 			}
	// 		};
	// 	}
	// };


	this.fnUpdateNotificationConfig = function (companyId,rmId,config) {

	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnUpdateNotificationConfig/',
	    data:{"companyId":companyId,rmId:rmId,config:config}
	 });
	return promise;

	};

	this.fnGetNotificationConfig = function (companyId,configType) {

	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnGetNotificationConfig/',
	    data:{"companyId":companyId,configType:configType}
	 });
	return promise;

	};
	
}]);