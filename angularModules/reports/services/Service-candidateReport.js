angular.module('baabtra').service('candidateReport',['$http','bbConfig',function candidateReport($http,bbConfig) {

		this.FetchCandidateReport=function(data){

		var FetchCandidateReport=$http({
				url: bbConfig.BWS+'FetchCandidateReport/',
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
			return FetchCandidateReport;

		};


this.CandidateRegistrationReport=function(data){

		var CandidateRegisteredReport=$http({
				url: bbConfig.BWS+'FetchCandidateRegisteredReport/',
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
			return CandidateRegisteredReport;

		};
	
}]);