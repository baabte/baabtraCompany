angular.module('baabtra').service('courseElementFieldsManaging',['$http', 'bbConfig',function courseElementFieldsManaging($http, bbConfig) {
	
	this.fnSaveCourseElementFields = function (element){
		var promise = $http({
			url: bbConfig.BWS+'SaveCourseElementFields/',
			data: {"element":element},
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	});
	 	return promise;
	 };

	 this.fnGetCourseElementFields = function (){
		var promise = $http({
			url: bbConfig.BWS+'GetCourseElementFields/',
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	});
	 	return promise;
	 };

	this.fnGetCourseElementFieldsTemp = function (){
		var promise = $http({
			url: bbConfig.BWS+'fnLoadCustomFormTemplates/',
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	});
	 	return promise;
	 };

	 this.fnDeleteCourseElementFields = function (elementId, manageType, urmId){
		var promise = $http({
			url: bbConfig.BWS+'DeleteCourseElementFields/',
			data: {"elementId":elementId, 'manageType':manageType, 'urmId':urmId},
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	});
	 	return promise;
	 };

}]);

angular.module('baabtra').provider("safeService2", function() {
    var provider = {};

    provider.$get = ['courseElementFieldsManaging', function(p1) {
        var service = {};

        service.doService = function() {
            console.log("safeService from provider: " + p1.fnGetCourseElementFields());
        }

        return service;
    }];

    return provider;
});