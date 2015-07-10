angular.module('baabtra').controller('RegisterparentCtrl',['$scope','bbConfig','$rootScope','$state','commonService','userRegistrationService','formCustomizerService','$alert',function($scope,bbConfig,$rootScope,$state,commonService,userRegistrationService,formCustomizerService,$alert){


	if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}

// $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
//   if($rootScope.userinfo)
//    {
//     $scope.currentState=toState.name;
//   }
// });

var companyId;
//getting user crmid and data companyid
 var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
 $scope.status={};
 if(angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId,bbConfig.SARID)){
  companyId='';
  $scope.status.selected=1;
}
else{
  companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;//
 $scope.status.selected=1;
}

 //loading branches of company 
// branchSrv.fnLoadBranch($scope,companyId);
$scope.allSync={}; //the variable to pass data in controller to syncdata
// $scope.status.selected=0;
$scope.allSync.newUser=false;
$scope.allSync.FormData={}; // formdata to keep all form inserted data
var mandatoryFields=[]; //array to keep the mandatory form data fields       
// formCustomizerService.FnFetchCustomForm($scope);



var formFetchData={};
formFetchData.fkcompanyId=companyId;//to fetch forms from clnCustomForms
formFetchData.formName='parentRegistration';//to fetch all the froms give specific name to fetch that form only
// formFetchData.formName='signUp';//to fetch all the froms give specific name to fetch that form only

//sevice call to fetch form 
var FnFetchCustomFormCallBack= formCustomizerService.FnFetchCustomForm(formFetchData);

FnFetchCustomFormCallBack.then(function(data){

 var result=angular.fromJson(JSON.parse(data.data));
// console.log(result);
 $scope.formlist=result.formlist;
 
      // console.log($scope.formlist);  
$scope.stepCount=$scope.formlist.formSteps;
//to get the mandtory from field name in an array 
    for(var i in $scope.formlist.formSchema){
      for(var x in $scope.formlist.formSchema[i].stepFormSchema.fields){
       if(angular.equals($scope.formlist.formSchema[i].stepFormSchema.fields[x].name,'role')||angular.equals($scope.formlist.formSchema[i].stepFormSchema.fields[x].name,'Branch'))
       {}
       else{
      mandatoryFields.push($scope.formlist.formSchema[i].stepFormSchema.fields[x].name);
     }
    } 
    }


         $scope.roleId=bbConfig.PUSRID; 

        if($scope.roleId){
            $scope.allSync.FormData.role={};
            $scope.allSync.FormData.role.roleId=$scope.roleId;
        }



    //nedd to improve the call with role id\\//
    if(!angular.equals(companyId,'')){
    var FetchSpecificFormObj={companyId:companyId,fetchFormName:"parentRegistration"};
       var fnFetchSpecificCustomFormCallBack= formCustomizerService.FnFetchSpecificCustomForm(FetchSpecificFormObj);
      fnFetchSpecificCustomFormCallBack.then(function  (data) {

        var result=angular.fromJson(JSON.parse(data.data));

        if(result.roleSchema){
	        $scope.roleSchema=result.roleSchema.roleSchema;        
        }

         
         
          
         console.log(bbConfig.PUSRID);

        $scope.role={};//to keep the schema of form

        if($scope.roleId){
        for(var index in $scope.roleSchema){
          if (angular.equals($scope.roleSchema[index].roleId,$scope.roleId)){
            $scope.role.roleId=$scope.roleId;
            $scope.role.formSchema=$scope.roleSchema[index].formSchema;
            $scope.role.formSteps=$scope.roleSchema[index].formSteps;
            $scope.allSync.FormData.role=$scope.role;                  
          }

        }
        
      }

      });
    }
    // console.log(mandatoryFields)   
});




      

// console.log($state.params)


// var fnGetCountryStateDistrictCallBack=companyRegistrationService.FnGetCountryStateDistrict();   
// fnGetCountryStateDistrictCallBack.then(function(data){

//   $scope.CSDlist=angular.fromJson(JSON.parse(data.data));


// });


$scope.$watch('allSync.FormData.role', function(){
if(!angular.equals($scope.formlist,undefined)){

        $scope.stepCount= $scope.formlist.formSteps;
        while(!angular.equals($scope.formlist.formSchema[++$scope.stepCount],undefined)){
          // console.log($scope.stepCount);
          delete $scope.formlist.formSchema[$scope.stepCount];
        }

        $scope.stepCount= $scope.formlist.formSteps;
        if($scope.allSync.FormData.role.formSchema){    
              for(var i in $scope.allSync.FormData.role.formSchema){

                  $scope.formlist.formSchema[++$scope.stepCount]=$scope.allSync.FormData.role.formSchema[i];
                             
              }
              // console.log($scope.formlist.formSteps);
            }
    }
                
    }, true);



//function for user registration 
$scope.fnUserRegister =function (argument) {

var mandatoryData={};            
  for(var key in $scope.allSync.FormData){
    for(var n in mandatoryFields) {

      if(angular.equals(key,mandatoryFields[n])){
       
        mandatoryData[key]=$scope.allSync.FormData[key];
        delete $scope.allSync.FormData[key];

      }
    }
  }

 if(!angular.equals($scope.allSync.FormData.batch,undefined)&&(angular.equals(Object.keys($scope.allSync.FormData.batch).length,0))){
  delete $scope.allSync.FormData.batch;
 }
 if(!angular.equals($scope.allSync.FormData.batch,undefined)&&($scope.allSync.FormData.batch.length>0)) { 
 
 delete $scope.allSync.FormData.batch[0].course;
 $scope.allSync.FormData.batchId=$scope.allSync.FormData.batch[0]._id;
 delete $scope.allSync.FormData.batch[0]._id;
 delete $scope.allSync.FormData.batch[0].companyId;
 delete $scope.allSync.FormData.batch[0].updatedDate;
 delete $scope.allSync.FormData.batch[0].createddDate;
 delete $scope.allSync.FormData.batch[0].crmId;
 delete $scope.allSync.FormData.batch[0].urmId;
 $scope.allSync.FormData.batch[0].startDate=new Date($scope.allSync.FormData.batch[0].startDate).toISOString();
 $scope.allSync.FormData.batch[0].endDate=new Date($scope.allSync.FormData.batch[0].endDate).toISOString();
 $scope.allSync.FormData.batch[0].enrollmentAfter=new Date($scope.allSync.FormData.batch[0].enrollmentAfter.$date).toISOString();
 $scope.allSync.FormData.batch[0].enrollmentBefore=new Date($scope.allSync.FormData.batch[0].enrollmentBefore.$date).toISOString();
 $scope.allSync.FormData.batch=$scope.allSync.FormData.batch[0];
 delete $scope.allSync.batch;
         var time=(new Date()).valueOf();
         hashids = new Hashids("this is a batch id");
         $scope.allSync.FormData.batch.batchCode = hashids.encode(time); 

} 
   
  $scope.userRegister=$scope.allSync.FormData;
  $scope.userRegister.mandatoryData=mandatoryData;
  $scope.userRegister.loggedusercrmid=loggedusercrmid;
  $scope.userRegister.companyId=companyId;

  //service call for user registration
 // console.log($scope.userRegister);
 if ($scope.userRegister.role.formSchema) {
  delete  $scope.userRegister.role.formSchema;
  delete  $scope.userRegister.role.formSteps;
  }
//  //console.log($scope.userRegister.phone);

 console.log($scope.userRegister);

var fnRegisterUserCallBack=userRegistrationService.FnRegisterUser($scope.userRegister);

fnRegisterUserCallBack.then(function(data){

 var result=angular.fromJson(JSON.parse(data.data));
//       //var senderId="BAABTR";
//       //var smsKey="10069q0x6jqk4pp61r5";
$scope.notifications('Yaay..!','Registered Successfully','success');   
      $state.go('home.main');
   
  var  userEmail  = $rootScope.userinfo.ActiveUserData.eMail;
  var  username   = $rootScope.userinfo.ActiveUserData.username;
  var menteeEmail = $scope.userRegister.mandatoryData.eMail;
  var menteeName  = $scope.userRegister.mandatoryData.firstName;
  var companyName = $rootScope.userinfo.ActiveUserData.username;
  var companyLogo = $rootScope.userinfo.ActiveUserData.appSettings.logo;
//var sendNotification=userRegistrationService.fnSendEmailSmsNotification("919567102617","vineeth@baabte.com",senderId,smsKey)
  var sendNotification=userRegistrationService.fnSendEmailSmsNotification(userEmail,username,menteeEmail,menteeName,result.evaluatorEmailLIst,companyName,companyLogo);
     
        
 });

};


$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };





}]);