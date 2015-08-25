/*
Purpose : Directive for load branch under company
Created By : Jihin
Created On : 25/08/2015
*/
angular.module('baabtra').directive('branchLoader',['branchSrv','manageTreeStructureSrv','$rootScope',function(branchSrv,manageTreeStructureSrv,$rootScope) {
  return {
    restrict: 'E',
    require:["ng-model"],
    scope: {
      ngModel:"=",
      onBranchRemove:"=?",
      onBranchChange:"=?",
      multiple:"=?"
    },
    templateUrl: 'angularModules/common/directives/Directive-branchLoader.html',

    link: function($scope, element, attrs, ctrls) {
      
      var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
      var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
      var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;

      var branchCondition = {companyId:companyId};
      $scope.branchObj = {};
      $scope.branchObj.loadedBranches = [];
      

      if($scope.multiple){
        var branchLoaderResponse = branchSrv.fnLoadAllBranchesUnderCompany(branchCondition);
        branchLoaderResponse.then(function(response){
           $scope.branchObj.branch = angular.fromJson(JSON.parse(response.data));
           for(var branch in $scope.branchObj.branch){
            $scope.branchObj.branch[branch]._id = $scope.branchObj.branch[branch]._id.$oid;
           }
        });
      }
      else{
        
        if($scope.ngModel){
          branchCondition._id = $scope.ngModel.$oid?$scope.ngModel.$oid:$scope.ngModel;
        }
        else{
          branchCondition.parent = "root";
        }

        var branchLoadResponse = branchSrv.fnLoadBranch(branchCondition);
        branchLoadResponse.then(function(response){
          var result = angular.fromJson(JSON.parse(response.data));
          if($scope.ngModel){
            $scope.ngModel = $scope.ngModel.$oid?$scope.ngModel.$oid:$scope.ngModel;
            $scope.branchObj.currentBranch = {_id:result[0]._id.$oid, name:result[0].name};
          }
          else{
            $scope.branchObj.branch = result;
            $scope.branchObj.loadedBranches.push(result);
          }
          
        });
      }

      $scope.removeBranch = function (currentBranch) {

        delete $scope.branchObj.currentBranch;

        branchCondition = {companyId:companyId, parent:"root"};
        // $scope.updateUserProfileDatas();
        $scope.ngModel = "";

        var branchLoadResponse = branchSrv.fnLoadBranch(branchCondition);
        branchLoadResponse.then(function(response){
          var result = angular.fromJson(JSON.parse(response.data));
          $scope.branchObj.branch = result;
          $scope.branchObj.loadedBranches = [];
          $scope.branchObj.loadedBranches.push(result);
          
          if($scope.onBranchRemove){
            $scope.onBranchRemove();
          }

        });

      };

      $scope.branchSelected = function(item, index){
        $scope.ngModel = JSON.parse(JSON.stringify(item._id.$oid));

        if($scope.onBranchChange){
          $scope.onBranchChange(item, index);
        }

        var branchLength = $scope.branchObj.loadedBranches.length;
        if(branchLength > (index + 1)){
          for(var branch in $scope.branchObj.loadedBranches){
            if(index < branch){
              $scope.branchObj.loadedBranches.splice(branch, 1);
              delete $scope.branchObj.selectedBranch[branch];
            }
          }
        }

        if(item.children.length){
          branchCondition = {companyId:companyId, parent:item._id.$oid};
          var branchLoadResponse = branchSrv.fnLoadBranch(branchCondition);
          branchLoadResponse.then(function(response){
            var result = angular.fromJson(JSON.parse(response.data));
            if(result.length){
              $scope.branchObj.loadedBranches.push(result);
            };
          });
        }

      };//branchSelected-fn-end

      $scope.multipleBranchSelected = function(item, index){
        $scope.ngModel.push(item);
      };

      $scope.multipleBranchRemove = function(item, index){
        var index = $scope.ngModel.indexOf(item);
        $scope.ngModel.splice(index, 1);
      };

    }//link-end

  };

}]);
