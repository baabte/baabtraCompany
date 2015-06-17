angular.module('baabtra').service('CertificateSrv',['bbConfig','$http',function(bbConfig,$http) {

	this.getCandidateCertificateDetails = function (rmId,courseId) {
		var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'getCandidateDetailsForCertificate/',
	    data:{'rmId':rmId,'courseId':courseId}
	 });
	return promise;
	}
	
}]);