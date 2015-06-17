angular.module('baabtra').controller('SignupCtrl',['$scope','$rootScope','$state','$modal','formCustomizerService','userRegistrationService','LoginService','bbConfig','localStorageService',function($scope,$rootScope,$state,$modal,formCustomizerService,userRegistrationService,LoginService,bbConfig,localStorageService){


if(localStorageService.get('logDatas')){
  if(localStorageService.get('logDatas').length){
  $state.go('home.main');
}
}

$scope.btnSignupText="Sign Up";

$scope.allSync={}; //the variable to pass data in controller to syncdata
$scope.allSync.newUser=false;//as default the user won't be show password field 
$scope.allSync.FormData={}; // formdata to keep all form inserted data
var mandatoryFields=[]; //array to fetch all madatory fields name 

var formFetchData={};//object to pull data from custom forms
formFetchData.fkcompanyId='';//to fetch forms from clnCustomForms
formFetchData.formName='signUp';//to fetch all the froms give specific name to fetch that form only

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
    // console.log(mandatoryFields)   
});


//funtion to sign up a user 
$scope.fnSignUp= function(){

	var mandatoryData={};  //object to  keep mandatory data     
  //loop to insert data to madatory obj    
  for(var key in $scope.allSync.FormData){
    for(var n in mandatoryFields) {

      if(angular.equals(key,mandatoryFields[n])){
       
        mandatoryData[key]=$scope.allSync.FormData[key];
        delete $scope.allSync.FormData[key];

      }
    }
  }
  //creating a role object
  $scope.allSync.FormData.role={};
  $scope.allSync.FormData.role.roleId=bbConfig.MURID;
  // console.log(bbConfig.MURID);
  $scope.userSignUp=$scope.allSync.FormData;
  $scope.userSignUp.mandatoryData=mandatoryData;
  console.log($scope.userSignUp);

//service call to register user 
var fnRegisterUserCallBack=userRegistrationService.FnRegisterUser($scope.userSignUp);
 $scope.btnSignupText='In progress...';
fnRegisterUserCallBack.then(function(data){

 var result=angular.fromJson(JSON.parse(data.data));
 // console.log(result);
    //if success login the user 
    $scope.loginCredential={};  
    $scope.loginCredential.password=mandatoryData.password;
    $scope.loginCredential.userName=mandatoryData.eMail; 
    $scope.from_where="direct";
    $scope.socialData=undefined;
    LoginService.fnloginService($scope);
});

};

//call back of the user login if the resigtration is sucess
$scope.loginSuccessCallback=function(data){
    $scope.logData=angular.fromJson(JSON.parse(data));
    if($scope.logData.add_fb){
      if($scope.logData.add_fb=="facebook"){
        $scope.socialSiteName="facebook";
      $modal({ scope: $scope,
              template: 'angularModules/login/partials/Partial-addSocialInfo.html',
              placement:'center',
              show: true}); 
      }

    }else{


        if($scope.logData.result==='true') {
            var logdata=$scope.logData.ActiveUserDataId.$oid.concat($scope.logData.userLoginId);
            localStorageService.add('logDatas',logdata);
            $rootScope.userinfo=$scope.logData;//if login is ok put it in the login info variable.
            // console.log($rootScope.userinfo);
            $rootScope.loggedIn=true;//if login is ok ,changin the variable in rootscope.
          $state.go('home.main');//routing to home after success login by user
          $scope.login_or_not='login Success'; 
        }
        else
          {
            $scope.progress=false; //setting button enable
            $scope.btnSignupText='Sign in'; //re setting the value of nutton to signup
            $scope.loginCredential.password="";
            $scope.signinform.$setPristine();
            $scope.Error_msg=true; 
            $scope.login_error="wrong email or password. Try again!";   
            $scope.login_frequency++;  
            $scope.isLoggedIn = true;
          }
      }
  }; 



}]);


