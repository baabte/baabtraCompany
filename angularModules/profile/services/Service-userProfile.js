angular.module('baabtra').service('userProfile',['$http','bbConfig',function userProfile($http,bbConfig) {



this.loadProfileData=function(userloginId){
var profile=$http({
		url: bbConfig.BWS+'loadProfileData/',
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
	return profile;
};

this.updateUserProfileData=function(userDetailsObjId,userLoginId,profile){
	// console.log({"userDetailsObjId":userDetailsObjId,"profile":profile,"userLoginId":userLoginId});
	var profileDataUpdation=$http({
		url: bbConfig.BWS+'updateUserProfileData/',
		method: "POST",
		data:angular.toJson({'userProfileDataForUpdate':{"userDetailsObjId":userDetailsObjId,"profile":profile,"userLoginId":userLoginId}}),
		withCredentials: false,
		contentType:"application/json",
		dataType:"json",
	}).
	success(function(data, status, headers, config) {
		return data;
		
	}).
	error(function(data, status, headers, config) {

	});
	return profileDataUpdation;
};

this.changeUserPassword=function(userLoginId,currentPassword,newPassword){
	// console.log({"userLoginId":userLoginId,"currentPassword":currentPassword,"newPassword":newPassword});
	var changePassword=$http({
		url: bbConfig.BWS+'changeUserPassword/',
		method: "POST",
		data:angular.toJson({'changePwdObj':{"userLoginId":userLoginId,"currentPassword":currentPassword,"newPassword":newPassword}}),
		withCredentials: false,
		contentType:"application/json",
		dataType:"json",
	}).
	success(function(data, status, headers, config) {
		return data;
		
	}).
	error(function(data, status, headers, config) {

	});
	return changePassword;

};

this.changelanguage=function(data){
	var changelanguage=$http({
		url: bbConfig.BWS+'changelanguage/',
		method: "POST",
		data:angular.toJson({'data':data}),
		withCredentials: false,
		contentType:"application/json",
		dataType:"json",
	}).
	success(function(data, status, headers, config) {
		return data;
		
	}).
	error(function(data, status, headers, config) {

	});
	return changelanguage;

};
	
}]);