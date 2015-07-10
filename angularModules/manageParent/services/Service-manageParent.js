angular.module('baabtra').service('manageParent',['$http','bbConfig',function($http,bbConfig) {

	this.getParent = function (searchKey,companyId) {
		var promise=$http({
           url: bbConfig.BWS+'fnLoadParents/',
           data: {companyId:companyId,searchKey:searchKey},
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }); 
      	return promise;
	};


  this.saveCandidateMapping = function (fkLoginId,candidateArray) {
    var promise=$http({
           url: bbConfig.BWS+'fnSaveCandidateMapping/',
           data: {fkLoginId:fkLoginId,candidateArray:candidateArray},
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }); 
        return promise;
  };


  this.loadMappedCandidates = function (fkLoginId) {
    var promise=$http({
           url: bbConfig.BWS+'fnLoadMappedCandidatesForParent/',
           data: {fkLoginId:fkLoginId},
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }); 
        return promise;
  };

}]);