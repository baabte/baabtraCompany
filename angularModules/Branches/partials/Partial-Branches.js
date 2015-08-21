angular.module('baabtra').controller('BranchesCtrl',['$scope','$rootScope','commonService','$state','$alert','$timeout','localStorageService','$aside','branchSrv','manageTreeStructureSrv',function ($scope,$rootScope,commonService,$state,$alert,$timeout,localStorageService,$aside,branchSrv,manageTreeStructureSrv){

  /*login detils start*/
  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }

  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

  var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/

  $scope.branchObj = {};
  $scope.branchObj.viewTree = false;
  $scope.branchObj.branchCondition = {companyId:companyId, parent:"root"};
  var branchLoadResponse = branchSrv.fnLoadBranch($scope.branchObj.branchCondition);
  branchLoadResponse.then(function(response){
    var result = angular.fromJson(JSON.parse(response.data));
    

    if(!result.length){
      $scope.branchObj.branches = [{name:$rootScope.userinfo.ActiveUserData.username, parent:"root", children:[]}];
      $scope.branchObj.viewTree = true;
    }
    else{
      $scope.branchObj.viewTree = true;
      result[0].collapsed = true;
      $scope.branchObj.branches = result;
    }
    
  });

  $scope.showPopupForAddChild = function(node) {
    console.log(node);
    $scope.branchObj.parentBranch = node;
    $scope.branchObj.currentTopBranch = {parent:node._id.$oid, children:[]};
    $scope.branchObj.message = "Create A New Branch";
    $scope.branchObj.btnName = "Add";
    var myOtherAside = $aside({scope: $scope,placement:'right',animation:'am-fade-and-slide-right', template: 'angularModules/Branches/aside/aside-newBranch.html'});
  };

  $scope.editChild = function(node) {
    $scope.branchObj.message = "Update Branch Details";
    $scope.branchObj.btnName = "Update";
    $scope.branchObj.currentTopBranch = node;
    var myOtherAside = $aside({scope: $scope,placement:'right',animation:'am-fade-and-slide-right', template: 'angularModules/Branches/aside/aside-newBranch.html'});
  };

  function removeChild (branches, id) {
    for(var branch in branches){
      if(angular.equals(branches[branch]._id.$oid, id.$oid)){
        branches.splice(branch, 1);
        break;
      }

      if(branches[branch].children.length){
        removeChild(branches[branch].children, id);
      }
    }
  }

  $scope.removeChild = function(node){
    node.activeFlag = 0;
    var currentNode = JSON.parse(JSON.stringify(node));
    removeChild($scope.branchObj.branches, node._id);
    $scope.changesHappenedInBranch(currentNode);
  };

  $scope.changesHappenedInBranch = function(branchObj, hide){
    var objectIdArray = ['_id', 'crmId', 'urmId', 'companyId', 'parent'];
    if(branchObj._id){
      $scope.branchObj.parentBranch = {};
      for(var key in objectIdArray){
        if(branchObj[objectIdArray[key]].$oid){
          branchObj[objectIdArray[key]] = branchObj[objectIdArray[key]].$oid;
        }
      }
    }
    var objectToSave = JSON.parse(JSON.stringify(branchObj));

    if(objectToSave.children.length){
      for(var child in objectToSave.children){
        var children = JSON.parse(JSON.stringify(objectToSave.children[child]));
        objectToSave.children[child] = children._id.$oid;
      }
    }

    var updateBranchResponse = branchSrv.fnInsertBranch(companyId, objectToSave, rm_id);
    updateBranchResponse.then(function(response){
      var result = angular.fromJson(JSON.parse(response.data));
      
      if(angular.equals(result, "Error")){
        $alert({title: 'Warning!', content: 'Somthing went wrong while updating branch', placement: 'top-right', type: 'warning', show: true, duration:3});
      }
      else{
        $scope.branchObj.currentTopBranch = result;
        if($scope.branchObj.parentBranch){
          if($scope.branchObj.parentBranch.children){
            $scope.branchObj.parentBranch.children.push(result);
          }
        }        
      }
      
    });

    if(hide){
      hide();
    }

  };

  $scope.fnLoadChild = function(selectedNode){
    
    if(!selectedNode.collapsed){
      $scope.branchObj.branchCondition = {companyId:companyId, parent:selectedNode._id.$oid};
      var branchLoadResponse = branchSrv.fnLoadBranch($scope.branchObj.branchCondition);
      branchLoadResponse.then(function(response){

        var result = angular.fromJson(JSON.parse(response.data));
        if(angular.equals(result, "Error")){
          $alert({title: 'Warning!', content: 'Somthing went wrong while loading branch', placement: 'top-right', type: 'warning', show: true, duration:3});
        }
        else{
          if(result.length){
            for(var branch in result){
              result[branch].collapsed = true;
            }
            
            selectedNode.children = result;
          }
        }
      });
      
    }
  };


}]);
