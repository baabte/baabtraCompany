/*
Created By:Jihin
Created On:12/11/2014
*/

angular.module('baabtra').service('home',['$http','$state','$rootScope','bbConfig',function home($http,$state,$rootScope,bbConfig) {

this.FnLoadMenus = function($scope){//for load menu for logged user
      var promise = $http({ 
            method: 'post',
            url: bbConfig.BWS+'LoadMenus/',
            data:{'rm_id':$scope.rm_id},
            contentType:'application/json; charset=UTF-8',
           })
      return promise;
    };
}]);