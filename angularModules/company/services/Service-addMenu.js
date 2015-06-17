angular.module('baabtra').service('addMenu',['$http','$alert','bbConfig',function addMenu($http,$alert,bbConfig) {
this.addMenuDetails=function($scope){
  $http({
    method: 'post',
    url: bbConfig.BWS+'AddMenus/',
    data:{'menu':$scope.menu},
    contentType:'application/json; charset=UTF-8',
    }).
    success(function(data, status, headers, config) { //success respond from server
            $alert({title: 'Successfuly',
                    type:'success',
                    content: 'Inserted...',
                    animation:'am-fade',
                    duration:'3',
                    placement: 'top-right',
                    template: 'views/ui/angular-strap/alert.tpl.html',
                    show: true
                  });
          $scope.allMenus=angular.fromJson(JSON.parse(data));//Converting the result to json object
        }).
    error(function(data, status, headers, config) {
    });
  };


  this.updateMenuDetails=function($scope,menu){
    var promise = $http({
      method: 'post',
      url: bbConfig.BWS+'UpdateMenus/',
      data:{'menu':menu},
      contentType:'application/json; charset=UTF-8',
      });
    return promise;
  };

  this.FnGetAllMenus=function ($scope,type){//To Load All menus of loded user
    $http({
      method: 'post',
      url: bbConfig.BWS+'GetAllMenus/',
      data: {'rm_id':$scope.userRoleMappingId,'type':type},
      contentType   : 'application/json; charset=UTF-8',
    }).
    success(function(data, status, headers, config) {
      $scope.allMenus=angular.fromJson(JSON.parse(data));//Converting the result to json object
      $scope.existingMenus=true;//enable company row
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  };

  this.FnRemoveMenu=function ($scope,menuId){//For remove exiting menu from list
    $http({
      method: 'post',
      url: bbConfig.BWS+'RemoveMenu/',
      data: {'rm_id':$scope.userRoleMappingId,'menuId':menuId,'active_flag':0},
      contentType   : 'application/json; charset=UTF-8',
    }).
    success(function(data, status, headers, config) {
      $alert({scope: $scope,
              container:'body',
              keyboard:true,
              animation:'am-fade-and-slide-top',
              template:'views/ui/angular-strap/alert.tpl.html',
              title:'Undo',content:'Deleted...',
              placement: 'top-right',
              type: 'warning'});      
      $scope.allMenus=angular.fromJson(JSON.parse(data));//Converting the result to json object
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  };

    this.FnRestoreMenu=function ($scope,menuId){//For remove exiting menu from list
    $http({
      method: 'post',
      url: bbConfig.BWS+'RemoveMenu/',
      data: {'rm_id':$scope.userRoleMappingId,'menuId':menuId,'active_flag':1},
      contentType   : 'application/json; charset=UTF-8',
    }).
    success(function(data, status, headers, config) { 
      $scope.allMenus=angular.fromJson(JSON.parse(data));//Converting the result to json object
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  };

}]);