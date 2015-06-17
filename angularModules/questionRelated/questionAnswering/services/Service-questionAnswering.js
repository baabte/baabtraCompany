angular.module('baabtra').service('questionAnsweringSrv',['$http','bbConfig',function questionAnsweringSrv($http,bbConfig) {

	this.saveAnswer=function (courseId,userLoginId,keyName,tlPointInmins,outerIndex,innerIndex,answerObj) {
		var promise = $http({
			url: bbConfig.BWS+'saveAnswer/',
	 		method: "POST",
	 		data: {courseId:courseId,userLoginId:userLoginId,keyName:keyName,tlPointInmins:tlPointInmins,outerIndex:outerIndex,innerIndex:innerIndex,answerObj:answerObj},
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	});
	 	return promise;

		
	};

}]);