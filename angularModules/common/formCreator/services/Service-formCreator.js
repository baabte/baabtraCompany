angular.module('baabtra').service('formCreator',['$http','$upload','bbConfig',function ($http, $upload, bbConfig) {

	this.saveCustomFormMain=function(customForm){
		var promise = $http({
			method: 'post',
			url: bbConfig.BWS+'saveCustomFormMain/',
			data:{customForm:customForm},
			contentType:'application/json; charset=UTF-8',
		});
		return promise;
	};

	this.loadCustomFormsMain=function(customForm){
		var promise = $http({
			method: 'post',
			url: bbConfig.BWS+'loadCustomFormsMain/',
			data:{customForm:customForm},
			contentType:'application/json; charset=UTF-8',
		});
		return promise;
	};

	this.saveCompanyCustomForm=function(customForm){
		var promise = $http({
			method: 'post',
			url: bbConfig.BWS+'SaveCompanyCustomForm/',
			data:{customForm:customForm},
			contentType:'application/json; charset=UTF-8',
		});
		return promise;
	};

	this.LoadCompanyCustomForm=function(companyId, formId){
		var promise = $http({
			method: 'post',
			url: bbConfig.BWS+'LoadCompanyCustomForm/',
			data:{companyId:companyId, formId:formId},
			contentType:'application/json; charset=UTF-8',
		});
		return promise;
	};

}]);