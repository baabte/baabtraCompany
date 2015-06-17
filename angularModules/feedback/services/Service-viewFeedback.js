angular.module('baabtra').service('viewFeedback', ['$http', 'bbConfig', function ($http, bbConfig) {

	this.fnViewFeedbackRequests = function(rmId, companyId){
		var promise = $http({
	 		method: 'POST',
	    	url: bbConfig.BWS+'viewFeedbackRequests/',
	    	data:{rmId:rmId, companyId:companyId}
	 	});
		return promise;
	}

	this.fnLoadFeedbackRequestDetails = function(companyId, feedbackId, rmId){
		var promise = $http({
	 		method: 'POST',
	    	url: bbConfig.BWS+'LoadFeedbackRequestDetails/',
	    	data:{companyId:companyId, feedbackId:feedbackId, rmId:rmId}
	 	});
		return promise;
	}

	this.fnSaveUserFeedback = function(feedbackId, feedback, rmId){
		var promise = $http({
	 		method: 'POST',
	    	url: bbConfig.BWS+'SaveUserFeedback/',
	    	data:{feedbackId:feedbackId, feedback:feedback, rmId:rmId}
	 	});
		return promise;
	}

}]);