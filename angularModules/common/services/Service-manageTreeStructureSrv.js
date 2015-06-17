angular.module('baabtra').service('manageTreeStructureSrv',function manageTreeStructureSrv() {

var branchTree=[];
var branch="";
var branches="";

this.buildTree = function(branchTree,index){
    if(index==null){
      index=0;
    }
    if (!angular.equals(branchTree[index].children,null)) {
        this.buildChildren(branchTree[index]);
    }
    if (branchTree.length-1 > index) {      
        this.buildTree(branchTree,++index);
    }
    return branchTree;
  }
this.findRoots = function(branch,index){
    if(index==null){
      branches=branch;
      branchTree=[];
      index=0;
    }
    if (branch[index].parent == null){
      branchTree.push(branch[index]);
    }
    branch[index].childrenObj=[];
    if (branch.length-1 > index) {
    this.findRoots(branch,++index);
    }
    return branchTree;
    }


  this.buildChildren = function (branch)
  {
    this.findChildren(branch,null);
  }

  this.findChildren = function(branch,index){
    if(index==null){
      index=0;
      branch.childrenObj=[];
    }
    if (!angular.equals(branch.children,null) && branch.children.length) {

    if(branch.children.indexOf(branches[index]._id)!=-1){
      if (angular.equals(branch.childrenObj,undefined)){
        branch.childrenObj=[];
      }
      if(branches[index].activeFlag){
      branch.childrenObj.push(branches[index]);
    }
      this.buildChildren(branches[index]);
    }
    }
    if (index < branches.length-1) {   
      this.findChildren(branch,++index);
    }
  }

});