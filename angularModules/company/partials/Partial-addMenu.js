angular.module('baabtra').controller('AddmenuCtrl',['$scope','commonService','$alert','$modal','$rootScope','addMenu','localStorageService','$compile',function ($scope,commonService,$alert,$modal,$rootScope,addMenu,localStorageService,$compile){


   
    
    if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn==false){
 $state.go('login');
}

    $scope.userRoleMappingId = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    
    $scope.menu={};
    $scope.menu.canView = true; 
    $scope.menu.publicLink = false;

    $scope.menu.actions=[];//For store menu states
    $scope.addMenu=true;
    $scope.GetIcon = function(){//functon for show icons for menus
		  $modal({ scope: $scope,
               template: 'angularModules/company/partials/iconPage.html',
               placement:'center',
               show: true});
    };
	$scope.setIcon = function(icon){//For change existing icon, calls when click change icon
		$scope.menu.menuIcon=icon;
	};
  $scope.loadMenu = function(){
    if(!$scope.existingMenus){//privent call when the menu is enable
      addMenu.FnGetAllMenus($scope,'all');//loading existing menus
    }
  };
	$scope.AddMenu = function(){//For Inserting new menu to db
    /*Start: Building object for new menu*/
		$scope.menu.createdDate=Date();
		$scope.menu.updatedDate=Date();
		$scope.menu.crmId=$scope.userRoleMappingId;
		$scope.menu.urmId=$scope.userRoleMappingId;
		$scope.menu.activeFlag=1;
    delete $scope.menu.actionName;
    delete $scope.menu.stateName;
    /*End: Building object for new menu*/
		addMenu.addMenuDetails($scope);//calling service for insert menu
	};
	$scope.editMenu = function(menu){
    angular.element("#menuName").focus();
    $scope.addMenu=false;
    $scope.updateMenu=true;
    /*Start: load exiting menu details*/
    $scope.menu = menu;
    $scope.menu._id = $scope.menu._id.$oid; 
    /*end: load exiting menu details*/



	};
  $scope.addActtion =function(){//for adding states
    if ($scope.menu.stateName && !angular.equals($scope.menu.actionName,undefined)) {
      $scope.menu.actions.push({"actionName":$scope.menu.actionName,
                                "stateName":$scope.menu.stateName
                              });
      $scope.menu.stateName="";
      $scope.menu.actionName="";
    }
  };
  $scope.removeAction = function(index){//for removing exiting actions
    $scope.menu.actions.splice(index,1);
  };

  $scope.editAction = function(action,index){//for editing actions
    $scope.menu.stateName=action.stateName;
    $scope.menu.actionName=action.actionName;
    $scope.menu.actions.splice(index,1);
  };
  var lastDeletedItem="";
  $scope.removeMenu = function(menu){//for remove a particular menu
    lastDeletedItem=menu._id.$oid;//store the id of last deleted menu ObjectId for restore
    addMenu.FnRemoveMenu($scope,menu._id.$oid);//calling service for removing menu
  };

  $scope.undo = function(){//for retrive last deleted menu
    addMenu.FnRestoreMenu($scope,lastDeletedItem);//calling service for restore menu
  };

  $scope.UpdateMenu = function(){//for update details of existing menus
    console.log($scope.menu);
    $scope.menu.urmId = $scope.userRoleMappingId;
    $scope.menu.updatedDate = Date();
    var menuUpdateResponse = addMenu.updateMenuDetails($scope,$scope.menu);
    menuUpdateResponse.then(function(response){
      $scope.allMenus = response.data;
      $alert({container:'body',duration:3,animation:'am-fade-and-slide-top',title:'Updated!',content:'Updated successfuly...',placement: 'top-right',type: 'success'}); 
    })
  };

}]);