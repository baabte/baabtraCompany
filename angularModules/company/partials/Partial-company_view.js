angular.module('baabtra').controller('CompanyViewCtrl',['$scope','commonService','companyViewService','localStorageService','$location','$alert','$state','$rootScope',function ($scope,commonService,companyViewService,localStorageService,$location,$alert,$state,$rootScope){
// if (localStorageService.get('loginLsCheck')===2||localStorageService.get('loginLsCheck')===null) {
//   $location.path('/');
// }  
 
 if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}


// console.log($rootScope.userinfo.ActiveUserData);

 var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
 $scope.superadminView=true;
 // console.log($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid)
 if(!angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId,1)){
  $scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  $state.params.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  $scope.superadminView=false;
 }


 
if(!angular.equals($state.params.companyId,undefined)){
  $scope.companyId=$state.params.companyId;
  $scope.companySelected={};
  $scope.companySelected._id=$scope.companyId;
  companyViewService.fnSelectedCompany($scope);

}

$scope.placeholderVal="Search Companies";
$scope.ShowNoDataFound=false;





      $scope.showTime=0;
     
      //to load registerd companies
     companyViewService.fnRegisteredCompanies($scope);

      //to edit a company
      $scope.editCompany=function(Field,Value){
      $scope.companyEdited={};
      $scope.companyEdited.Field=Field;
      $scope.companyEdited.Value=Value;
      $scope.companyEdited._id=$scope.companySelected._id;
      $scope.companyEdited.loggedusercrmid=loggedusercrmid;
      companyViewService.fnCompanyEdit($scope);

    };
    //search company
    $scope.searchCompany=function(key) {
      $scope.searchWord={};
      $scope.searchWord.key=key;
      companyViewService.fnSearchCompany($scope);
        
    };

      //to delete a company
    $scope.deleteCompany=function(company){
      company.loggedusercrmid=loggedusercrmid;
       companyViewService.fnCompanyDelete($scope,company);
    };
    
    //to load more companies
    $scope.showMore=function(){ 
      $scope.showTime=$scope.showTime+6;
      companyViewService.fnShowMore($scope,$scope.showTime); 
    };
    $scope.manageCompany=function(id){
        $scope.companySelected={};
        $scope.companyId=id;
        $scope.companySelected._id=id;
         // console.log($scope.companySelected);
        companyViewService.fnSelectedCompany($scope);
    };
    

  

//callbacks
$scope.fnRegisteredCompaniesCallBack=function(result){
  if(result==='error'){
    $scope.notifications('Error!','Error!! in Loading Companies','warning');
  }
};
$scope.fnSelectedCompanyCallBack=function(result){
   if(result==='success'){
    // $scope.companyId=$scope.companySelected._id.$oid;
    $scope.companySelected._id=$scope.companySelected._id.$oid;

    // console.log($scope.companySelected);
  }
  if(result==='error'){
    $scope.notifications('Error!','Error!! in Loading Selected Company','warning');
  }
};

$scope.editCompanyCallBack=function(result){
  if(result==='success'){
    $scope.notifications('Done',' Successfully Edited ','success');
    companyViewService.fnRegisteredCompanies($scope);
  }
  if(result==='error'){
    $scope.notifications('Error!',' Error!! in Edit Operation','warning');
  }
};

$scope.deleteCompanyCallBack=function(result){
  if(result==='success'){
    $scope.notifications('Done',' Successfully Deleted ','success');
    companyViewService.fnRegisteredCompanies($scope);
     $location.path('/home/company');
  }
  if(result==='error'){
    $scope.notifications('Error!',' Error!! in Deletion','warning');
  }
};

$scope.showMoreCallBack=function(result){
  if(result==='error'){
    $scope.notifications('Error!','Error!! in Show More','warning');
  }
};

 $scope.fnSearchCompanyCallBack=function(result){
  if(result==='error'){
    $scope.notifications('Error!','Error!! in Searching','warning');
  }
 };


//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };


}]);


// angular.module('baabtraApp')
//   .controller('RegisteredcompaniesCtrl',['$scope','localStorageService','companyViewService','$location', function ($scope,localStorageService,companyViewService,$location) {

//     if (localStorageService.get('loginLsCheck')===2||localStorageService.get('loginLsCheck')===null) {
//   $location.path('/');
// }      
// }]);
