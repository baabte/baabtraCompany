angular.module('baabtra').service('RoleMenuMappingSrv',['$http','$alert','bbConfig',function RoleMenuMappingSrv($http,$alert,bbConfig) {
  var role_id="";
	this.FnGetCompanyDetails=function($scope,range,cmp_name)//To Load The Existing Company Details
      {
        $http({
          method: 'post',
          url: bbConfig.BWS+'FnGetCompanyDetailsJi/',
          data:{"range":range,"cmp_name":cmp_name},
          contentType:'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {//success respond from server
          $scope.result=angular.fromJson(JSON.parse(data));//Converting the result to json object
          $scope.companyDetails=$scope.result.comapny_detail;//setting the company details
          $scope.companyCount=$scope.result.comapny_count;//setting the company count for pagenation
          if($scope.companyCount===0)//If No matching data found, This will show an error message
          {
            $scope.ShowNoDataFound=true;//Enabling the error Message
            $scope.WarringMessage="No Matching Comapny Found";
          }
          else
          {
            $scope.ShowNoDataFound=false;//Disabling the error Message
          }
          //$scope.companyBox=true;//Enabling Comapny Box,To show the company Details
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      };

      this.FnLoadTopLevelRoles=function($scope)//To Load The Existing Company Details
      {
        $http({
          method: 'post',
          url: bbConfig.BWS+'FnLoadTopLevelRoles/',
          //data:{"range":range,"cmp_name":cmp_name},
          contentType:'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {//success respond from server
          $scope.topLevelRoles=angular.fromJson(JSON.parse(data));//Converting the result to json object
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      };

      this.FnGetRoles=function ($scope,cmp_id,range,roleVal)//To Load The Roles based on company
      {
        var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'GetAllRoles/',
          data: {"rm_id":$scope.roleId,"cmp_id":cmp_id,"range":range,"roleVal":roleVal},
          contentType   : 'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {
          $scope.result=angular.fromJson(JSON.parse(data));//Converting the result to json object
          $scope.roles=$scope.result.roles;//setting the roles details
          $scope.roles_count=$scope.result.roles_count;//setting the roles count for pagenation
          if($scope.roles_count===0)//If No matching data found, This will show an error message
          {
            $scope.ShowNoDataFound=true;//Enabling the error Message
            $scope.WarringMessage="No Matching Roles Found";
          }
          else
          {
            $scope.ShowNoDataFound=false;//Disabling the error Message
          }
          $scope.ModelRoleBox=true;//Enabling rolesBox,To show the Roles Details
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
        return promise;
      };
      this.FnGetRoleMenus=function ($scope,id,type)//To Load existing menus of selected role
      {
        role_id=id;
        if(!angular.equals(id.$oid,undefined)){
          role_id=id.$oid;//To Get existing selected role
        }
        
        $http({
          method: 'post',
          url:  bbConfig.BWS+'GetRoleMenus/',
          data: {'fkRoleId':role_id,'type':type},
          contentType   : 'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {
          $scope.menus = angular.fromJson(JSON.parse(data));//Converting the result to json object
          if(!angular.equals($scope.menus,null)){//Checking, the selected role have existing menus $scope.menus.menuStructure.length
            $scope.tree1 =$scope.menus.menuStructure[0].regionMenuStructure;//Setting exsting menus of selected role to current menu list
             
              changeObjIdOfMenu($scope.tree1,null);
          }
          else//If no existing role found
          {
            $scope.tree1=[];
          }
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        }); 
      };

        var changeObjIdOfMenu=function(menu,sub){
              if(sub==null){
                sub=0;
              }
              if(angular.equals(menu[sub],undefined)){return 0;}
                
              if(!angular.equals(menu[sub].fkMenuId,undefined))
              {
                menu[sub].fkMenuId=menu[sub].fkMenuId.$oid;
              }
              if(menu[sub].childMenuStructure.length){
               changeObjIdOfMenu(menu[sub].childMenuStructure,null);
              }
              changeObjIdOfMenu(menu,++sub);
            };

          this.FnGetAllMenus=function ($scope,type)//To Load All menus of loded user
          {  
            $http({
              method: 'post',
              url: bbConfig.BWS+'GetAllMenus/',
              data: {'rm_id':$scope.rm_id,'type':type},
              contentType   : 'application/json; charset=UTF-8',
            }).
            success(function(data, status, headers, config) {
            $scope.allMenus=angular.fromJson(JSON.parse(data));//Converting the result to json object
                    if ($scope.allMenus.length>0){//Checking the result
            if (type=="all") {
              for (var i = 0; i < $scope.allMenus.length; i++) {
                $scope.allMenus[i].fkMenuId=$scope.allMenus[i]._id.$oid;
                $scope.allMenus[i].actionMaster=$scope.allMenus[i].actions;
                delete $scope.allMenus[i]._id;
                $scope.allMenus[i].childMenuStructure=[];
              }
              $scope.tree2=$scope.allMenus;
            }
            else{
              $scope.tree2=$scope.allMenus[0].menuStructure[0].regionMenuStructure;//Setting the menus to menulist
              changeObjIdOfMenu($scope.tree2,null);
            }
          
          var removeDuplicateMenus=function(menu,sub,Child){
              if(sub==null){
                sub=0;
              }
              if(angular.equals(menu[sub],undefined))
                {return 0;}
              if(!angular.equals(menu[sub].MenuLink ,undefined))
              {
                  if(Child.fkMenuId==menu[sub].fkMenuId){

                     Child.actionMaster=menu[sub].actions;
                     menu.splice(sub,1);
                     return 0;
                }
                
              }
              if(menu[sub].childMenuStructure.length)
               {removeDuplicateMenus(menu[sub].childMenuStructure,null,Child);}
              removeDuplicateMenus(menu,++sub,Child);
            }; 
           var checkNodeMenus=function(menu,sub){
              if(sub==null){
                sub=0;
              }
              if(angular.equals(menu[sub],undefined))
                {return 0;}
              if(!angular.equals(menu[sub].MenuLink,undefined))
              {
                removeDuplicateMenus($scope.tree2,null,menu[sub]);
              }
              if(menu[sub].childMenuStructure.length)
               {checkNodeMenus(menu[sub].childMenuStructure,null);}
              checkNodeMenus(menu,++sub);
            };
            
            checkNodeMenus($scope.tree1,null);
          
          }
          else
          {
            $scope.tree2=[];
          }
          $scope.menudetails=true;
          //$scope.menudetails=true;
        }).
        error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
               // or server returns response with an error status.
        }); 
      };
      this.FnSaveNewRoleMenu=function ($scope,new_menu)//To Save current menu list
      {

        $http({
          method: 'post',
          url: bbConfig.BWS+'SaveNewRoleMenu/',
          data: {"menus":new_menu,"role_id":role_id,'rm_id':$scope.rm_id},
          contentType   : 'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {
          

          if (data=="Insert")
          {
            $alert({title: 'Success!', type:'success', content: 'Menus Insert Successfuly..',animation:'am-fade',duration:'3', placement: 'top-right', template: 'views/ui/angular-strap/alert.tpl.html', show: true});
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
}]);