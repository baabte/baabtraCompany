angular.module('baabtra').controller('EmailsmsconfigCtrl',['$scope','bbConfig','$rootScope','$http','$state','commonService','emailSmsConfig','$alert',function($scope,bbConfig,$rootScope,$http,$state,commonService,emailSmsConfig,$alert){
    if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
    }
    if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
    }
   $scope.events=[{id:1,text:"Request Approval"},{id:2,text:"User Registration"},{id:3,text:"Publish Course"},{}] 
  var promise= emailSmsConfig.loadMenuNames();
   promise.then(function(response){
   	if(response.data){   		
   		$scope.menuNames= angular.fromJson(JSON.parse(response.data));
   		//console.log($scope.menuStates);
   	}

   });

   $scope.fnGetActions=function(menuId){
   var promise= emailSmsConfig.loadMenuStates(menuId);
   promise.then(function(response){
   	if(response.data){  		
   		$scope.menuStates= angular.fromJson(JSON.parse(response.data));
   		console.log($scope.menuStates[0].actions);
   	}
   });
  }

  $scope.saveTemplate=function(){
  delete $scope.template.menu.actions;
  $scope.template.menu._id=$scope.template.menu._id.$oid;
  $scope.template.crmId = $scope.rm_id;
  $scope.template.urmId = $scope.rm_id;
  $scope.template.activeFlag=1;
  //$scope.template.createdDate = Date();
  //$scope.template.updatedDate = Date();
  //console.log($scope.template);
   var saveTemp= emailSmsConfig.saveTemplates($scope.template);
      saveTemp.then(function(response){
      if(response.data){
       $alert({title: 'Done..!', content: 'Successfuly added the template :-)', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});
       $scope.template={};
      }
    })
  }
   $scope.loadTemplates	=function(){
   	var promise= emailSmsConfig.loadTemplate();
   	  promise.then(function(response){
        if(response.data){
        $scope.addedTemplates= angular.fromJson(JSON.parse(response.data));
   		console.log($scope.addedTemplates);
         } 	
   	  })
   }	
}]);