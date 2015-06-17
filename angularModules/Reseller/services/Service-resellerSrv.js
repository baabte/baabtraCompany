angular.module('baabtra').service('resellerSrv',['$http', 'bbConfig','$alert',function resellerSrv($http, bbConfig, $alert) {
	
	this.fnRegisterReseller=function($scope, resellerDetails){//for load menu for logged user
      $http({ 
            method: 'post',
            url: bbConfig.BWS+'RegisterReseller/',
            data:{'resellerDetails':resellerDetails, 'rm_id':$scope.rm_id, 'cmp_id':$scope.companyId},
            contentType:'application/json; charset=UTF-8',
           }).
              success(function(data, status, headers, config) { //success respond from server
                var result=angular.fromJson(JSON.parse(data));
                $alert({title: 'Hey..!', type:'success', content: 'Reseller has been registered successfuly',animation:'am-fade',duration:'3', placement: 'top-right', template: 'views/ui/angular-strap/alert.tpl.html', show: true});
              }).
              error(function(data, status, headers, config) {
             });
    };
}]);