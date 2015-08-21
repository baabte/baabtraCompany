angular.module('baabtra').service('communications',['$http','bbConfig',function($http,bbConfig) {
	this.newMessage = function (data) {
		var promise = $http({
	      method: 'post',
	      url: bbConfig.BWS+'sendMessage/',
	      data:data,
	      contentType:'application/json; charset=UTF-8',
	      });
	    return promise;
	};

	this.loadInbox = function (data) {
		var promise = $http({
	      method: 'post',
	      url: bbConfig.BWS+'loadInbox/',
	      data:data,
	      contentType:'application/json; charset=UTF-8',
	      });
	    return promise;
	};

	this.getUserName = function (loginId) { 
		var promise = $http({
	      method: 'post',
	      url: bbConfig.BWS+'getUserName/',
	      data:{loginId:loginId},
	      contentType:'application/json; charset=UTF-8',
	      });
	    return promise;
	};

	this.loadSingleMessage = function (id) { 
		var promise = $http({
	      method: 'post',
	      url: bbConfig.BWS+'loadSingleMessage/',
	      data:{id:id},
	      contentType:'application/json; charset=UTF-8',
	      });
	    return promise;
	};

	this.fnLoadParent = function (id) { 
		var promise = $http({
	      method: 'post',
	      url: bbConfig.BWS+'fnLoadParent/',
	      data:{candidateId:id},
	      contentType:'application/json; charset=UTF-8',
	      });
	    return promise;
	};
}]);