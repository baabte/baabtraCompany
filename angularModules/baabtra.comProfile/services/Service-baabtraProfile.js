angular.module('baabtra').service('baabtraProfile',['$http','bbConfig',function baabtraProfile($http,bbConfig) {

this.fnLoadUserProfileDetails=function(userloginId, type){
	var userbaabtraComProfileData = $http({
			url: bbConfig.BWS + 'loadUserProfileDetails/',
			method: "POST",
			data:angular.toJson({'userloginId':userloginId, 'type':type}),
			withCredentials: false,
			contentType:"application/json",
			dataType:"json",
		})
	return userbaabtraComProfileData;
};

this.loadbaabtraProfileData=function(userloginId){
		var baabtraComProfileData=$http({
		url: bbConfig.BWS+'baabtraComProfileData/',
		method: "POST",
		data:angular.toJson({'userloginId':userloginId}),
		withCredentials: false,
		contentType:"application/json",
		dataType:"json",
	}).
	success(function(data, status, headers, config) {
		return data;
		
	}).
	error(function(data, status, headers, config) {

	});
	return baabtraComProfileData;
};
	

	
}]);