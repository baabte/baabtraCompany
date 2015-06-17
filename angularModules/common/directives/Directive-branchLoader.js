angular.module('baabtra').directive('branchLoader',['branchSrv','manageTreeStructureSrv','$rootScope',function(branchSrv,manageTreeStructureSrv,$rootScope) {
	return {
		restrict: 'E',
		require:["ng-model"],
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-branchLoader.html',
		link: function($scope, element, attrs, ctrls) {
      // console.log($scope.ngModel);
// console.log(ctrls[0]);
// ctrls[0].$setValidity('branchLoader',false);

	// function for converting object : created by Jihin
			var convertObjectName=function(menu,sub){
              if(sub==null){
                sub=0;
              }
              if(angular.equals(menu[sub],undefined)){
                return 0;
              }
                
              if(!angular.equals(menu[sub].childrenObj,undefined)){
                menu[sub].name=menu[sub]._id;
                menu[sub].id=menu[sub]._id;
                menu[sub].$$hashKey=menu[sub]._id+sub;
                delete menu[sub]._id;
                delete menu[sub].createdDate;
                delete menu[sub].parent;
                delete menu[sub].crmId;
                delete menu[sub].updatedDate;
                delete menu[sub].urmId;
                delete menu[sub].activeFlag;
                if(!angular.equals(menu[sub].children,null)){
                menu[sub].children=menu[sub].childrenObj;
                }
                else{
                  menu[sub].children=[];
                }
              }
              if(menu[sub].childrenObj.length){
               convertObjectName(menu[sub].childrenObj,null);
              }
              convertObjectName(menu,++sub);
            };
	//------------------------------------------



			var companyId='';
			if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
			  companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;				
			}
			
      $scope.onBranchSelectionChanged = function(items){
				$scope.ngModel=items;
        ctrls[0].$setValidity('branchLoader',true);

			};
			
        $scope.branches={};
        $scope.branches.branchDetails=[];
        
		var promise=branchSrv.fnLoadBranch($scope,companyId);
		promise.then(function(data){
			var branches=angular.fromJson(JSON.parse(data.data))[0].branches;
			$scope.branches.branchDetails = angular.copy(manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots(branches,null),null));
			convertObjectName($scope.branches.branchDetails, null);
		});

		}
	};
}]);
