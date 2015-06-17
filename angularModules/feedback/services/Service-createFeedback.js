angular.module('baabtra').service('createFeedback', ['$http', 'bbConfig', function ($http, bbConfig) {

	this.fnSaveFeedbackForm = function(feedbackForm){
		var promise = $http({
	 		method: 'POST',
	    	url: bbConfig.BWS+'saveFeedbackForm/',
	    	data:{feedbackForm: feedbackForm}
	 	});
		return promise;
	}

}]);