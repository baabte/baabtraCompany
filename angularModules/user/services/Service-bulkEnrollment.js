angular.module('baabtra').service('bulkEnrollment',['bbConfig','$upload','$http',function(bbConfig,$upload,$http) {
	//service function for uploading the doc for bulk enrolment
	this.fnSaveBulkEnroll=function($scope){
		var promise= $upload.upload({
				url: bbConfig.BWS+'fnBulkEnroll/',
				file: $scope.excelDoc,
				data: $scope.userRegister,
				method: 'POST',
				withCredentials: false,
				contentType:'application/json',
				dataType:'json',

			}).
			success(function( data, status, headers, config) {
				return data;
			}).
			error(function(data, status, headers, config) {
				return data;     
			}).
			progress(function(evt) {
				console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
			});


		return promise;
	};
	this.FnLoadReport=function(companyId){
      var promise=$http({
           url: bbConfig.BWS+'fnLoadUserReport/',
           data: {companyId:companyId},
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }); 
      return promise;
   };

   this.fnBulkEnrolluptoavailable=function($scope){
		var promise= $upload.upload({
				url: bbConfig.BWS+'fnBulkEnrollavailable/',
				file: $scope.excelDoc,
				data: $scope.userRegister,
				method: 'POST',
				withCredentials: false,
				contentType:'application/json',
				dataType:'json',

			}).
			success(function( data, status, headers, config) {
				return data;
			}).
			error(function(data, status, headers, config) {
				return data;     
			}).
			progress(function(evt) {
				console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
			});


		return promise;
	};
}]);


