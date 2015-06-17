angular.module('baabtra').controller('DepartmentCtrl',['$scope', '$rootScope', '$state', '$aside', '$alert', '$timeout', 'commonService', 'manageTreeStructureSrv', 'department',function($scope, $rootScope, $state, $aside, $alert, $timeout, commonService, manageTreeStructureSrv, department){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	$scope.coursePreviewObject={};
	$scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	$scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	$scope.cmp_id=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/

	$scope.data = {};
	$scope.data.departments = {};
	
	$scope.common = {
                connector: ["Flowchart", {cornerRadius:5}],
                //connector: ["State Machine"],
                anchor: ["Top", "Bottom"],
                endpoint:"Blank"
            };

$scope.drawLines = function(bTree){
  $timeout(function() {
  angular.forEach(bTree, function(node) {
        	jsPlumb.ready(function() {
            if (node.parent!=null) {
                    $scope.myInstanceOfJsPlumb = jsPlumb.connect({
                        source:node.parent, //node.parentId+"",
                        target:node._id, //node.id+"",
                        paintStyle:{ strokeStyle:"lightgray", lineWidth:3 },
                        endpointStyle:{ fillStyle:"lightgray", outlineColor:"gray" },
                        overlays:[ 
                            ["Arrow" , { width:12, length:12, location:0.67 }]
                        ]
                    }, $scope.common); 
            }
          });
          if (!angular.equals(node.childrenObj,undefined)) {
                  $scope.drawLines(node.childrenObj);
          } 	
    });
},100);
   
};
	//function load existing department under branch
	var loadDepartmentResponse = department.fnLoadDepartment($scope.cmp_id, $state.params.branchId);
	loadDepartmentResponse.then(function(response){
		$scope.departmentsTree = angular.fromJson(JSON.parse(response.data));

		//striping $oid from departmentId
		angular.forEach($scope.departmentsTree, function(department){
			if(!angular.equals(department.departmentId,undefined)){
				department.departmentId = department.departmentId.$oid;
			}
		});

		//function for bulding tree structure
		if(!angular.equals($scope.departmentsTree,null)){
			$scope.data.departments[$state.params.branchId] = angular.copy($scope.departmentsTree);
			$scope.data.departmentsTree = manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.departmentsTree,null),null);
			
			// function for draw lines b/w departments
			$scope.drawLines($scope.data.departmentsTree);
		}
		else{// if currently no departments is added this condition exicute and set default values 
			
			$scope.data.departmentsTree = [{ _id: $state.params.branchId, 'parent': null, 'children': [], ancestors: [], deptHeadrmId:null, activeFlag:1}];
			$scope.data.departments[$state.params.branchId] = angular.copy($scope.data.departmentsTree);
		}
	});
	
	var currentSelectedParent = "";
	$scope.addNewDepartment = function(item){
		$scope.data.editable = false;//setting mode to create
		$scope.department = {};
		currentSelectedParent = item;//details of cliked element to add new chiled
		$scope.data.asideHeading="Create a new department under "+currentSelectedParent._id;//Setting asside header details
		var myOtherAside = $aside({scope: $scope,placement:'left',animation:'am-slide-left', template: 'angularModules/Department/partials/Aside-addDepartment.html'});//call aside for add new department
	};

	$scope.createNewDepartment = function(departmentObj, $hide){

		angular.forEach($scope.data.departments[$state.params.branchId],function(dept){
			//stripping $oid from rolemappingId
			if(!angular.equals(dept.deptHeadrmId,null)){
				dept.deptHeadrmId[0].roleMappingId = dept.deptHeadrmId[0].roleMappingId.$oid;
			}

			//inserting new children id to his parent element array
			if(angular.equals(dept._id, currentSelectedParent._id)){	
				if(angular.equals(dept.children,null)){
					dept.children = [];
				}
				dept.children.push(departmentObj.name);
			}

		});

		currentSelectedParent.ancestors.push(currentSelectedParent._id);//setting up ancestors of new department added

		//pushing new department
		$scope.data.departments[$state.params.branchId].push({ _id: departmentObj.name, parent: currentSelectedParent._id, 'children': null, ancestors: currentSelectedParent.ancestors, deptHeadrmId:departmentObj.Head, activeFlag:1});
		
		//function for save new department structure 
		var departmentResponse = department.fnAddDepartment($scope.data.departments, $scope.cmp_id, $scope.rm_id);
		departmentResponse.then(function(response){

			//new department structure
			$scope.departmentsTree = angular.fromJson(JSON.parse(response.data));
			$scope.data.departments[$state.params.branchId] = angular.copy($scope.departmentsTree);
			
			//function for bulding tree structure
			$scope.data.departmentsTree = manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.departmentsTree,null),null);
			
			// function for draw lines b/w departments
			$scope.drawLines($scope.data.departmentsTree);
			
			$alert({scope: $scope,container:'body',keyboard:true,animation:'am-fade-and-slide-top',title:'Success... -:)',content:'The department has been added', placement: 'top-right', type: 'success', duration:3});
			$hide();
		});
		
	};

	var selectedDepartmentForEdit = "";
	$scope.department = {};
	$scope.editDepartment = function(item){
		
		$scope.data.editable = true;//setting mode to edit

		selectedDepartmentForEdit = angular.copy(item);//taking a copy of editing item
		//building object for editing
		$scope.department.name = selectedDepartmentForEdit._id;
		selectedDepartmentForEdit.deptHeadrmId[0].roleMappingId = selectedDepartmentForEdit.deptHeadrmId[0].roleMappingId.$oid;
		$scope.department.Head = selectedDepartmentForEdit.deptHeadrmId;
		$scope.department.departmentId = selectedDepartmentForEdit.departmentId;
		$scope.department.parent = selectedDepartmentForEdit.parent;

		//aside heading conntent
		$scope.data.asideHeading="Edit department "+item._id;
		var myOtherAside = $aside({scope: $scope,placement:'left',animation:'am-slide-left', template: 'angularModules/Department/partials/Aside-addDepartment.html'});
	};

	$scope.updateDepartment = function(departmentObj, $hide){

		//function for update department
		angular.forEach($scope.data.departments[$state.params.branchId],function(dept){
			
			if(angular.equals(dept._id,departmentObj.parent)){
				dept.children[dept.children.indexOf(selectedDepartmentForEdit._id)] = departmentObj.name;
			}
			if(angular.equals(dept.parent,selectedDepartmentForEdit._id)){
				dept.parent = departmentObj.name;
				dept.ancestors[dept.ancestors.indexOf(selectedDepartmentForEdit._id)] = departmentObj.name;
			}
			if(!angular.equals(dept.deptHeadrmId,null)){
				if(angular.equals(dept.departmentId, departmentObj.departmentId)){
					dept._id = departmentObj.name;
					dept.deptHeadrmId = departmentObj.Head;
				}
				if(!angular.equals(dept.deptHeadrmId[0].roleMappingId.$oid,undefined)){
					//stripping $oid from rolemappingId
					dept.deptHeadrmId[0].roleMappingId = dept.deptHeadrmId[0].roleMappingId.$oid;
				}
			}
		});

		//function for save changes to database
		var departmentResponse = department.fnAddDepartment($scope.data.departments, $scope.cmp_id, $scope.rm_id);
		departmentResponse.then(function(response){
			$scope.departmentsTree = angular.fromJson(JSON.parse(response.data));

			//striping $oid from departmentId
			angular.forEach($scope.departmentsTree, function(department){
				if(!angular.equals(department.departmentId,undefined)){
					department.departmentId = department.departmentId.$oid;
				}
			});

			$scope.data.departments[$state.params.branchId] = angular.copy($scope.departmentsTree);
			$scope.data.departmentsTree = manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.departmentsTree,null),null);
			$scope.drawLines($scope.data.departmentsTree);
			$alert({scope: $scope,container:'body',keyboard:true,animation:'am-fade-and-slide-top',title:'Success... -:)',content:'The department has been updated', placement: 'top-right', type: 'success', duration:3});
			$hide();
		});
	};
	var lastDeletedDepartmentId = 0;

	$scope.undo = function(){

		//function for revert deleted element
		angular.forEach($scope.data.departments[$state.params.branchId],function(dept){
			if(!angular.equals(dept.deptHeadrmId,null)){
				if(angular.equals(dept.departmentId,lastDeletedDepartmentId)){
					lastDeletedDepartmentId = dept.departmentId;
					dept.activeFlag = 1;
				}

				if(!angular.equals(dept.deptHeadrmId[0].roleMappingId.$oid,undefined)){
						//stripping $oid from rolemappingId
						dept.deptHeadrmId[0].roleMappingId = dept.deptHeadrmId[0].roleMappingId.$oid;
				}
			}

		});

		var departmentResponse = department.fnAddDepartment($scope.data.departments, $scope.cmp_id, $scope.rm_id);
		departmentResponse.then(function(response){
			$scope.departmentsTree = angular.fromJson(JSON.parse(response.data));

			//striping $oid from departmentId
			angular.forEach($scope.departmentsTree, function(department){
				if(!angular.equals(department.departmentId,undefined)){
					department.departmentId = department.departmentId.$oid;
				}
			});

			$scope.data.departments[$state.params.branchId] = angular.copy($scope.departmentsTree);
			$scope.data.departmentsTree = manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.departmentsTree,null),null);
			$scope.drawLines($scope.data.departmentsTree);

			$alert({scope: $scope,container:'body',keyboard:true,animation:'am-fade-and-slide-top',title:'Success... -:)',content:'The department has been reverted', placement: 'top-right', type: 'success', duration:3});
		});
	};

	$scope.removeDepartment = function(item){
		// function for remove department
		angular.forEach($scope.data.departments[$state.params.branchId],function(dept){
			if(!angular.equals(dept.deptHeadrmId,null)){
				if(angular.equals(dept.departmentId,item.departmentId)){
					lastDeletedDepartmentId = dept.departmentId;
					dept.activeFlag = 0;
				}

				if(!angular.equals(dept.deptHeadrmId[0].roleMappingId.$oid,undefined)){
						//stripping $oid from rolemappingId
						dept.deptHeadrmId[0].roleMappingId = dept.deptHeadrmId[0].roleMappingId.$oid;
				}
			}

		});

		var departmentResponse = department.fnAddDepartment($scope.data.departments, $scope.cmp_id, $scope.rm_id);
		departmentResponse.then(function(response){
			$scope.departmentsTree = angular.fromJson(JSON.parse(response.data));

			//striping $oid from departmentId
			angular.forEach($scope.departmentsTree, function(department){
				if(!angular.equals(department.departmentId,undefined)){
					department.departmentId = department.departmentId.$oid;
				}
			});

			$scope.data.departments[$state.params.branchId] = angular.copy($scope.departmentsTree);
			$scope.data.departmentsTree = manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.departmentsTree,null),null);
			$scope.drawLines($scope.data.departmentsTree);

			$alert({scope: $scope,container:'body',keyboard:true,animation:'am-fade-and-slide-top',template:'views/ui/angular-strap/alert.tpl.html',title:'Undo',content:'The department has been deleted', placement: 'top-right', type: 'warning'});
		});
	};

}]);