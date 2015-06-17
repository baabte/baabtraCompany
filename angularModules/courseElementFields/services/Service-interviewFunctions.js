angular.module('baabtra').service('interviewFunctions',['$http', 'bbConfig',function ($http, bbConfig) {

	this.fnAddToQuestionBank = function (questionObj){
		var promise = $http({
			url: bbConfig.BWS+'fnAddToQuestionBank/',
			data: {"questionObj":questionObj},
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	});
	 	return promise;
	 };

	 this.fnDeleteFromQuestionBank = function (questionObjId){
		var promise = $http({
			url: bbConfig.BWS+'fnDeleteFromQuestionBank/',
			data: {"questionObjId":questionObjId},
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	});
	 	return promise;
	 };


}]);