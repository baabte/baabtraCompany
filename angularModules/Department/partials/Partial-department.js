/*
Purpose : Page for load department under company branch
Created By : Jihin
Created On : 29/08/2015
*/

angular.module('baabtra').controller('DepartmentCtrl',['$scope', '$rootScope', '$state', '$aside', '$alert', '$timeout', 'commonService', 'manageTreeStructureSrv', 'department',function($scope, $rootScope, $state, $aside, $alert, $timeout, commonService, manageTreeStructureSrv, department){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
		return;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	var companyId =$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/

	$scope.deptObj = {};
	$scope.deptObj.message = {};
	$scope.deptObj.message.isMsg = true;
	$scope.deptObj.message.type = "bg-info";
	$scope.deptObj.message.message = "Please select a branch";

	// function for load department under branch
	$scope.loadDepartmentUnderBranch = function(branch, index){
		
		var departmentLoadCondition = {companyId:branch.companyId.$oid, branchId:branch._id.$oid, parent:"root"};
		var loadDepartmentResponse = department.fnLoadDepartment(departmentLoadCondition);
		loadDepartmentResponse.then(function(response){
			$scope.deptObj.selectedBranch = branch;

			$scope.deptObj.departments = angular.fromJson(JSON.parse(response.data));

			if(!$scope.deptObj.departments.length){
				$scope.deptObj.message.isMsg = true;
				$scope.deptObj.message.type = "bg-warning";
				$scope.deptObj.message.message = "No Department under "+branch.name+" branch";
			}
			else{
				$scope.deptObj.departments[0].collapsed = true;
				$scope.deptObj.message.isMsg = false;
			}
		});
	};

	$scope.addNewDepartment = function(branch){
		$scope.deptObj.btnName = "Add";
		$scope.deptObj.asideHeader = "Create new department";
		$scope.deptObj.newDept = {};
		$scope.deptObj.newDept.branchId = branch._id.$oid;
		$scope.deptObj.newDept.parent = branch.parentDepartment?branch.parentDepartment.$oid:"root";

		var myOtherAside = $aside({scope: $scope,placement:'right',animation:'am-slide-right', template: 'angularModules/Department/partials/Aside-addDepartment.html'});//call aside for add new department
	};

	$scope.showPopupForAddChild = function(department){
		$scope.deptObj.parentDepartment = department;
		var branch = {_id:department.branchId, parentDepartment:department._id};
		$scope.addNewDepartment(branch);
	};

	$scope.editChild = function(node) {
	    $scope.deptObj.asideHeader = "Edit departments details";
	    $scope.deptObj.btnName = "Update";
	    $scope.deptObj.newDept = node;
	    var myOtherAside = $aside({scope: $scope,placement:'right',animation:'am-slide-right', template: 'angularModules/Department/partials/Aside-addDepartment.html'});//call aside for add new department
	};

	$scope.changesHappenedInDepartment = function(departmentDetails, hide){
		
		departmentDetails.children = [];
		departmentDetails.companyId = companyId;
		departmentDetails.branchId = departmentDetails.branchId.$oid?departmentDetails.branchId.$oid:departmentDetails.branchId;
		departmentDetails.crmId = departmentDetails.crmId?(departmentDetails.crmId.$oid?departmentDetails.crmId.$oid:departmentDetails.crmId):rm_id;
		departmentDetails.parent = departmentDetails.parent.$oid?departmentDetails.parent.$oid:departmentDetails.parent;
		departmentDetails.urmId = rm_id;
		if(angular.equals(departmentDetails.activeFlag, undefined)){
			departmentDetails.activeFlag = 1;
		}
		if(departmentDetails._id){
			
			departmentDetails._id = departmentDetails._id.$oid?departmentDetails._id.$oid:departmentDetails._id;
		}
		
		var departmentResponse = department.fnAddDepartment(departmentDetails);
		departmentResponse.then(function(response){
			var result = angular.fromJson(JSON.parse(response.data));
			if(!departmentDetails._id){
				if($scope.deptObj.parentDepartment){
					$scope.deptObj.parentDepartment.children.push(result);
				}
				else{
					$scope.deptObj.message.isMsg = false;
					$scope.deptObj.departments = [result];
				}
			}
		});
		if(hide){
			hide();
		}
		
	};

	$scope.fnLoadChild = function(departmentObj){
		
		var departmentLoadCondition = {companyId:departmentObj.companyId.$oid, branchId:departmentObj.branchId.$oid, parent:departmentObj._id.$oid};
		var loadDepartmentResponse = department.fnLoadDepartment(departmentLoadCondition);
		loadDepartmentResponse.then(function(response){
			var result = angular.fromJson(JSON.parse(response.data));
			departmentObj.children = result;
		});
	};

	function removeChild (departments, id) {
	    for(var department in departments){
	      if(angular.equals(departments[department]._id.$oid, id.$oid)){
	        departments.splice(department, 1);
	        break;
	      }

	      if(departments[department].children.length){
	        removeChild(departments[department].children, id);
	      }
	    }
  	}
	$scope.removeChild = function(node){
		node.activeFlag = 0;
	    var currentNode = JSON.parse(JSON.stringify(node));

	    removeChild($scope.deptObj.departments, node._id);
	    $scope.changesHappenedInDepartment(currentNode);
	};

}]);