angular.module('baabtra').service('billingPlans',function($http,bbConfig) {

	this.loadFeatures=function ($scope){ // functon that call web service to load a feature
	 	$http({
	 		url: bbConfig.BWS+'loadFeatures/',
	 		data: JSON.stringify({"name":"nothing"}),
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	}).
	 	success(function(data, status, headers, config) {
                   $scope.fnloadFeaturesBack(data);
               }).
	 	error(function(data, status, headers, config) {

	 	});  
	 };

	 this.addNewBillingPlan=function ($scope){ // functon that call web service to load a feature
	 	$http({
	 		url: bbConfig.BWS+'addNewBillingPlan/',
	 		data: angular.toJson({"NewPaln":$scope.newPlan}),
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	}).
	 	success(function(data, status, headers, config) {
                   $scope.fnaddNewPlanCallBack(data);
               }).
	 	error(function(data, status, headers, config) {

	 	});  

	 };

	 this.retriveCurrentPlans=function ($scope){ // functon that call web service to load a feature
	 	$http({
	 		url: bbConfig.BWS+'retriveCurrentPlans/',
	 		data: angular.toJson({"nothing":"nothing"}),
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	}).
	 	success(function(data, status, headers, config) {
                   $scope.fnretrieveCurrentPlans(data);
               }).
	 	error(function(data, status, headers, config) {

	 	});  
 
	 };

	 this.delete_plans=function ($scope){ // functon that call web service to load a feature
	 	console.log($scope.data_to_delete);
	 	$http({
	 		url: bbConfig.BWS+'delete_plans/',
	 		data: angular.toJson({"plan_to_delete":$scope.data_to_delete}),
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	}).
	 	success(function(data, status, headers, config) {
                   $scope.fndeletePlanCallBack(data);

               }).
	 	error(function(data, status, headers, config) {
	 		console.log(data);
	 	});  
 
	 };
	 
});