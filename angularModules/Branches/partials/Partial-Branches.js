angular.module('baabtra').controller('BranchesCtrl',['$scope','$rootScope','commonService','$state','$alert','$timeout','localStorageService','$aside','branchSrv','manageTreeStructureSrv',function ($scope,$rootScope,commonService,$state,$alert,$timeout,localStorageService,$aside,branchSrv,manageTreeStructureSrv){


$scope.branchTree=[];
$scope.branch="";
    if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn==false){
 $state.go('login');
}

    $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
    var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    branchSrv.fnLoadBranch($scope,companyId);
        //$scope.companyId="5457526122588a5db73e0b23";

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

$scope.tree1NodesOptions = { 
      dropped:function(event) {
        if (!angular.equals(event.source.nodeScope.$modelValue.parent,event.dest.nodesScope.$parent.$modelValue._id)) {
        event.source.nodesScope.$parent.$modelValue.children.splice(event.source.index,1);
        if (!event.source.nodesScope.$parent.$modelValue.children.length) {
          event.source.nodesScope.$parent.$modelValue.children=null;
        }
        event.source.nodeScope.$modelValue.parent = event.dest.nodesScope.$parent.$modelValue._id;
        event.dest.nodesScope.$parent.$modelValue.children.push(event.source.nodeScope.$modelValue._id);

        branchSrv.fnInsertBranch($scope,companyId,$scope.branches,$scope.rm_id);
        }
      }
  };

$scope.$watch('branches',function (newValue,oldValue){
  if (!angular.equals($scope.branches,undefined)) {
    jsPlumb.detachEveryConnection();
    //buildBranchTree(findRoots($scope.branches,null),null);
    $scope.branchTree=manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.branches,null),null);
    console.log($scope.branchTree);
    $scope.drawLines($scope.branchTree);
  }
  });
var nodeData="";

$scope.newSubItem = function(scope) {
    $scope.updateBranch=false;
  $scope.addBranch=true;
  nodeData= scope.$modelValue;
  $scope.message="Create A New Branch Under ";
  $scope.CurrentTopBranch=nodeData._id;
  var myOtherAside = $aside({scope: $scope,placement:'bottom',animation:'am-fade-and-slide-bottom', template: 'angularModules/Branches/aside/aside-newBranch.html'});
  };

$scope.addSubBranch = function(branchDetails){
  angular.forEach($scope.branches,function(branch)
  {
    if (branch._id == nodeData._id) {
      if (branch.children == null) {
        branch.children=[];
      }
      branch.children.push(branchDetails.name);
    }
  });
  $scope.branches.push({ _id:branchDetails.name,
                           location:branchDetails.location,
                           email:branchDetails.email,
                           phone:branchDetails.phone,
                           children: null,
                           parent: nodeData._id,
                           activeFlag:1});
  branchSrv.fnInsertBranch($scope,companyId,$scope.branches,$scope.rm_id);
   };
var lastDeletedBranch={};
$scope.undo = function(){
  lastDeletedBranch.activeFlag=1;
  angular.forEach($scope.branches,function(branch){
    if (lastDeletedBranch._id==branch._id) {
          branch.activeFlag=1;
        }
  });
  branchSrv.fnInsertBranch($scope,companyId,$scope.branches,$scope.rm_id);
};
   $scope.removeBranch = function(node){
    node.$nodeScope.$modelValue.activeFlag=0;
    lastDeletedBranch=node.$nodeScope.$modelValue;
    branchSrv.fnInsertBranch($scope,companyId,$scope.branches,$scope.rm_id);
    $alert({scope: $scope,container:'body',keyboard:true,animation:'am-fade-and-slide-top',template:'views/ui/angular-strap/alert.tpl.html',title:'Undo',content:'The branch has been deleted', placement: 'top-right', type: 'warning'});
};
var lastEditBranch="";
$scope.editBranch = function(branch){
  lastEditBranch=branch;
  $scope.message="Update Details Of ";
  $scope.CurrentTopBranch=branch.$nodeScope.$modelValue._id;
  $scope.updateBranch=true;
  $scope.addBranch=false;
  $scope.branch={};
  var myOtherAside = $aside({scope:$scope,placement:'bottom',animation:'am-fade-and-slide-bottom', template: 'angularModules/Branches/aside/aside-newBranch.html'});
  $scope.branch.name=branch.$nodeScope.$modelValue._id;
  $scope.branch.email=branch.$nodeScope.$modelValue.email;
  $scope.branch.location=branch.$nodeScope.$modelValue.location;
  $scope.branch.phone=branch.$nodeScope.$modelValue.phone;
};

$scope.updateSubBranch = function(branch){
  
  if (!angular.equals(lastEditBranch.$nodeScope.$modelValue._id,$scope.branch.name)) {
    angular.forEach($scope.branches,function(branch){
      if (angular.equals(lastEditBranch.$nodeScope.$modelValue.parent,branch._id)) {
        for (var i = 0; i < branch.children.length; i++) {
            if (angular.equals(lastEditBranch.$nodeScope.$modelValue._id,branch.children[i])) {
              branch.children[i]=$scope.branch.name;
            }
        }
      }
    });
    lastEditBranch.$nodeScope.$modelValue._id=$scope.branch.name;
  }
  lastEditBranch.$nodeScope.$modelValue.email=$scope.branch.email;
  lastEditBranch.$nodeScope.$modelValue.location=$scope.branch.location;
  lastEditBranch.$nodeScope.$modelValue.phone=$scope.branch.phone;
  branchSrv.fnInsertBranch($scope,companyId,$scope.branches,$scope.rm_id);
};
}]);
