angular.module('baabtra').service('featureConfig',['$http','bbConfig',function($http,bbConfig) {

	this.loadInputTypes=function ($scope){ // functon that call web service to add a comapny role
	 	$http({
	 		url: bbConfig.BWS+'loadInputTypes/',
	 		data: JSON.stringify({"name":"nothing"}),
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	}).
	 	success(function(data, status, headers, config) {
                   $scope.loadInputTypescallback(data);
               }).
	 	error(function(data, status, headers, config) {
	 		console.log(data);
	 	});  
	 };
	 this.addNewFeature=function ($scope,newFeature){ // functon that call web service to add a comapny role
	 	
	 	// delete newFeature[$$hashKey];
	 	$http({
	 		url: bbConfig.BWS+'newFeatureCreation/',
	 		data: angular.toJson({"newFeature":newFeature}),
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	}).
	 	success(function(data, status, headers, config) {
                   $scope.fnCreateFeatureCallBack(data);

               }).
	 	error(function(data, status, headers, config) {

	 	});  
	 };
}]);