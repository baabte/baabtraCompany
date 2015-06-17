angular.module('baabtra').service('viewUsersForApprove',['$http','bbConfig',function ($http, bbConfig) {


this.fnLoadMenteesForApprove=function(companyId, statusType, pageNumber, nPerPage, searchKey,orderFormType)//To Load Mentees For Approve
      {
        var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'fnLoadMenteesForApprove/',
          data:{companyId:companyId, statusType:statusType, pageNumber:pageNumber, nPerPage:nPerPage, searchKey:searchKey,orderFormType:orderFormType},
          contentType:'application/json; charset=UTF-8',
        });
        return promise;
      };

this.fnLoadMenteesForPayment=function(companyId, pageNumber, nPerPage, searchKey,orderFormType)//To Load Mentees For Approve
      {
        var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'fnLoadMenteesForPayment/',
          data:{companyId:companyId, pageNumber:pageNumber, nPerPage:nPerPage, searchKey:searchKey,orderFormType:orderFormType},
          contentType:'application/json; charset=UTF-8',
        });
        return promise;
      };

this.fnApproveUserRequest = function(userId, orderFormId, courseKey, statusType, rmId, companyId)//To Load Mentees For Approve
      {
        var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'ApproveUserRequest/',
          data:{userId:userId, orderFormId:orderFormId, courseKey:courseKey, statusType:statusType, rmId:rmId, companyId:companyId},
          contentType:'application/json; charset=UTF-8',
        });
        return promise;
      };
      
this.verifyCandidateByCourse = function(formList){
    var result;
      var promise=$http({
           url: bbConfig.BWS+'verifyCandidateByCourse/',
           data: angular.toJson({listData:formList}),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                return promise;
               
              }).
              error(function(data, status, headers, config) {
                result='error';
             });  
      return promise;
   };


}]);