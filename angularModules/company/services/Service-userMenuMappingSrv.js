angular.module('baabtra').service('userMenuMappingSrv',['$http','$alert','bbConfig', function userMenuMappingSrv($http,$alert,bbConfig) {
    var thisService=this;
    // To load the existing company users.
    this.FnGetCompanyDetails=function($scope,range,prefix)
    {
      $http({ //headers: {'Content-Type': 'application/json; charset=utf-8'},
            method: 'post',
            url: bbConfig.BWS+'FnGetCompanyDetails/',
            data: JSON.stringify({'roleId':$scope.roleId,'companyId':$scope.companyId,'range':range,'prefix':prefix}),
            contentType:'application/json; charset=UTF-8',
           }).
              success(function(data, status, headers, config) { //success respond from server
                var result=angular.fromJson(JSON.parse(data));
                $scope.companyDetails=result.company_details;
                $scope.companyCount=result.company_count;
                if($scope.ShowNoDataFound){
                  $scope.ShowNoDataFound=false;
                }
                if (!$scope.companyCount) {
                  $scope.WarringMessage="No Matching User Found";
                  $scope.ShowNoDataFound=true;
                }
                //$scope.companyDetails=result.data;      //filer the user list from respond data
              }).
              error(function(data, status, headers, config) {
             });
    };

        //function to load the current users menu items
    this.FnLoadExMenuItems4AUMMapping=function ($scope,fkUserRoleMappingId,fkRoleId,companyId){
    $http({
           url: bbConfig.BWS+'LoadExMenuItems4AUMMapping/',
           data: JSON.stringify({'fkUserRoleMappingId':fkUserRoleMappingId,'companyId':companyId,'roleId':fkRoleId}),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
                var result=angular.fromJson(JSON.parse(data)); //response from server
                  if (result!=='') {
                    $scope.ExMenus = result.data;

                     $scope.CurrentFkUserRoleMappingId=result.urmId.$oid;

                  $scope.menuRegionId=$scope.ExMenus[0].menuStructure[0].fkmenuRegionId.$oid;
                  $scope.tree1 = $scope.ExMenus[0].menuStructure[0].regionMenuStructure;
                   
            var changeObjIdOfMenu=function(menu,sub){
              if(sub==null){
                sub=0;
              }
              if(angular.equals(menu[sub],undefined))
                {return 0;}
              if(!angular.equals(menu[sub].fkMenuId,undefined))
                {menu[sub].fkMenuId=menu[sub].fkMenuId.$oid;}
              if(menu[sub].childMenuStructure.length)
               {changeObjIdOfMenu(menu[sub].childMenuStructure,null);}
              changeObjIdOfMenu(menu,++sub);
            };
            changeObjIdOfMenu($scope.tree1,null);
             $scope.menudetails=true;
          }
              thisService.FnLoadMenuItems4AUMMapping($scope,$scope.roleId);
                }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
               // or server returns response with an error status.
             });

    };

     //function to load the current users menu items
    this.FnLoadMenuItems4AUMMapping=function ($scope,fkRoleId){
    $http({
           url: bbConfig.BWS+'LoadMenuItems4AUMMapping/',
           data: JSON.stringify({'fkRoleId': fkRoleId}),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
           
                   $scope.menuList = angular.fromJson(JSON.parse(data)); //response from server
                   if($scope.menuList!==''){

                  $scope.tree2 = $scope.menuList.menuStructure[0].regionMenuStructure; //Assigning the object value into a variable to load All menus
            var changeObjIdOfMenu=function(menu,sub){
              if(sub==null){
                sub=0;
              }
              if(angular.equals(menu[sub],undefined))
                {return 0;}
              if(!angular.equals(menu[sub].fkMenuId,undefined)){
                  menu[sub].fkMenuId=menu[sub].fkMenuId.$oid;
                  menu[sub].actionMaster=menu[sub].actions;
                  delete menu[sub]._id;
                  menu[sub].childMenuStructure = [];
                }
              if(menu[sub].childMenuStructure.length)
               {changeObjIdOfMenu(menu[sub].childMenuStructure,null);}
              changeObjIdOfMenu(menu,++sub);
            };
            changeObjIdOfMenu($scope.tree2,null);
                  $scope.menuRegionId=$scope.menuList.menuStructure[0].fkmenuRegionId.$oid;
                  }
                  else{
                     $scope.tree2 =[];
                  }
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
               // or server returns response with an error status.
             });
          };

this.FnSaveUserMenu=function ($scope){ //function to save the user menus.
        $http({
           url: bbConfig.BWS+'InsertUserMenu/',
           data: {'fkUrmId': $scope.userRoleMappingId,'fkUserRoleMappingId': $scope.CurrentFkUserRoleMappingId,'fkMenuRegionId':$scope.menuRegionId,'menus':$scope.tree1},
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
               if (data=="Insert")
          {
            $alert({title: 'Success!', content: 'Menus Insert Successfuly..',animation:'am-fade',duration:'3', placement: 'top-right', template: 'views/ui/angular-strap/alert.tpl.html', show: true});
          }
          else if (data=="Update")
          {
            $alert({title: 'Success!', type:'success' ,content: 'Menus Updated Successfuly..',animation:'am-fade',duration:'3', placement: 'top-right', template: 'views/ui/angular-strap/alert.tpl.html', show: true});
          }
          else if (data=="Not Allowed")
          {
            $alert({title: 'Not Allowed!', type:'warning' ,content: 'More than 1 Submenu Not Allowed',animation:'am-fade',duration:'3', placement: 'top-right', template: 'views/ui/angular-strap/alert.tpl.html', show: true});
          }          
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
               // or server returns response with an error status.
             });    
    };

        this.FnLoadUsers=function ($scope,companyId,range,search_key){
    $http({

           url: bbConfig.BWS+'LoadUsers/',
           data: JSON.stringify({'companyId': companyId,'prefix': search_key,'range':range}),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {     //success respond from server
                
                var result = angular.fromJson(JSON.parse(data)); 
                console.log("ashdgf"+result);   //setting the respond into a  variable
                $scope.UserList=result.data;                   //filer the user list from respond data
                $scope.user_count=result.user_count;
                if($scope.ShowNoDataFound){
                  $scope.ShowNoDataFound=false;
                }
                if (!$scope.user_count) {
                  $scope.WarringMessage="No Matching User Found";
                  $scope.ShowNoDataFound=true;
                }
        //         if ($scope.UserList.length>0) {
        //   $scope.ModelUserBox=true;
        // }//filer the user list from respond data
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
               // or server returns response with an error status.
             });


    };


}]);