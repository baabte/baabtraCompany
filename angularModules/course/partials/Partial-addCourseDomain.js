angular.module('baabtra').controller('AddcoursedomainCtrl',['$scope','$alert','$aside','$rootScope','$state','addCourseDomainSrv','commonService','manageTreeStructureSrv',function($scope,$alert,$aside,$rootScope,$state,addCourseDomainSrv,commonService,manageTreeStructureSrv){

    if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn==false){
 $state.go('login');
}
$scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
$scope.tree1=[];
var domainStatus = "";

var courseDomainResponse = addCourseDomainSrv.FnLoadDomain();
courseDomainResponse.then(function(response){
  $scope.domainDetails=angular.fromJson(JSON.parse(response.data));//Converting the result to json object
  $scope.tree1 = manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.domainDetails,null),null);
  console.log($scope.tree1);
});



// $scope.$watch('domainDetails',function (newValue,oldValue){
//   if (!angular.equals($scope.domainDetails,undefined)) {
//     $scope.tree1=manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.domainDetails,null),null);
//   }
// });


$scope.tree1NodesOptions = { 
      dropped:function(event) {
        console.log(event);
        var domain = "";
        var curParent = "";
        var oldParent = "";
        if(!angular.equals(event.dest.nodesScope.$parent.$nodeScope,undefined)){
          if(angular.equals(event.dest.nodesScope.$parent.$nodeScope.$modelValue.children,null)){
            event.dest.nodesScope.$$nextSibling.$parent.$nodeScope.$modelValue.children=[];
          }
          event.dest.nodesScope.$$nextSibling.$parent.$nodeScope.$modelValue.children.push(event.source.nodeScope.$modelValue._id);
          curParent = event.dest.nodesScope.$$nextSibling.$parent.$nodeScope.$modelValue;
          event.source.nodeScope.$modelValue.parent = curParent._id;
          domain = event.source.nodeScope.$modelValue;
          if(event.source.nodesScope.$parent.$nodeScope != undefined){
            event.source.nodesScope.$parent.$nodeScope.$modelValue.children.splice(event.source.index,1);
            if (!event.source.nodesScope.$parent.$nodeScope.$modelValue.children.length) {
            event.source.nodesScope.$parent.$nodeScope.$modelValue.children = null;
          }
          oldParent = event.source.nodesScope.$parent.$nodeScope.$modelValue;
        }
        
        }
        else{
          event.source.nodeScope.$modelValue.parent=null;
          domain = event.source.nodeScope.$modelValue;
          if(event.source.nodesScope.$parent.$nodeScope != undefined){
            event.source.nodesScope.$parent.$nodeScope.$modelValue.children.splice(event.source.index,1);
            if (!event.source.nodesScope.$parent.$nodeScope.$modelValue.children.length) {
            event.source.nodesScope.$parent.$nodeScope.$modelValue.children = null;
          }
          oldParent = event.source.nodesScope.$parent.$nodeScope.$modelValue;
          }
          
        }
          addCourseDomainSrv.FnInsertDomain($scope ,domain, curParent, oldParent);
      }
    }

$scope.addSubDomain =function(clickedDomain){
  domainStatus = clickedDomain;
var myOtherAside = $aside({scope: $scope, template: 'angularModules/course/partials/Partial-addSubDomain.html'});
};

$scope.AddDomain = function(domain){
  if (!angular.equals(domainStatus,'new')) {
    if (angular.equals(domainStatus.$nodeScope.$modelValue.children,null)) {
      domainStatus.$nodeScope.$modelValue.children=[];
    };
    domainStatus.$nodeScope.$modelValue.children.push(domain.name);
    domainStatus.$nodeScope.$modelValue.updatedDate=Date();
    var parent = domainStatus.$nodeScope.$modelValue;
    var domain=[{"_id" : domain.name,"children" : null,"parent" : domainStatus.$nodeScope.$modelValue._id,createdDate:Date(),updatedDate:Date(),crmId:$scope.rm_id,urmId:$scope.rm_id,activeFlag:1}];

    // domainStatus.$nodeScope.$modelValue.childrenObj.push({"_id" : domain.name,"children" : null,"parent" : domainStatus.$nodeScope.$modelValue._id});
    // $scope.branches.push({"_id" : domain.name,"children" : null,"parent":domainStatus.$nodeScope.$modelValue._id,createdDate:Date(),updatedDate:Date(),crmId:$scope.rm_id,urmId:$scope.rm_id,activeFlag:1});
    $scope.tree1=[];
    $scope.tree1=manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.domainDetails,null),null);
    // console.log($scope.tree1);
    addCourseDomainSrv.FnInsertDomain($scope,domain,parent,"");
  }
  else{
    $scope.domainDetails.push({"_id" : domain.name,"children" : null,"parent" : null,createdDate:Date(),updatedDate:Date(),crmId:$scope.rm_id,urmId:$scope.rm_id,activeFlag:1});
    var domain=[{"_id" : domain.name,"children" : null,"parent" : null,createdDate:Date(),updatedDate:Date(),crmId:$scope.rm_id,urmId:$scope.rm_id,activeFlag:1}];
    $scope.tree1=[];
  $scope.tree1=manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.domainDetails,null),null);
  addCourseDomainSrv.FnInsertDomain($scope ,domain, "", "");
  }
};

}]);