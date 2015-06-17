angular.module('baabtra').service('emailSmsConfig',['$http','bbConfig','$rootScope',function($http,bbConfig,$rootScope) {

this.loadMenuNames=function(){

 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadMenuNames/'//,
	    //data:{"cmpId":cmpId}
	 });
	return promise;
 }
 this.loadMenuStates=function(id){
	
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadMenuStates/',
	    data:{"id":id}
	 });
	return promise;
 }

 this.saveTemplates=function(template){	
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'saveTemplates/',
	    data:{"template":template}
	 });
	return promise;
 }
 
 this.loadTemplate=function(){	
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadTemplate/'//,
	   // data:{"template":template}
	 });
	return promise;
 }
}]);