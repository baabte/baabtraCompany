angular.module('baabtra').controller('UserprofileCtrl',['$scope','$rootScope','userProfile','$state','commonService','$modal','$alert','$stateParams','bbConfig', 'branchSrv',function($scope,$rootScope,userProfile,$state,commonService,$modal,$alert,$stateParams,bbConfig, branchSrv){

$scope.updatepicmsg=true;
$scope.showHideAbtPic=false;
$scope.showHidelocationPic=false;
$scope.showHideDobAndPlacePic=false;
$scope.selectedTab='AccountSettings';
$scope.saveButton="save";
$scope.nameicon=false;
$scope.emailicon=false;
$scope.toggle=true;
$scope.pwdicon=false;
$scope.lange=false;
$scope.availlangualges=[{"language":"English","langCode":"en"},{"language":"Arabic","langCode":"ar"}];
$scope.languageActiveOrNot=true;
userLoginId="";
if(!$rootScope.userinfo){ //checking for the login credentilas is present or not
      $rootScope.hide_when_root_empty=true;
      commonService.GetUserCredentials($scope);
}
$scope.userinfo = $rootScope.userinfo;
  var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
var profile; 
if(!angular.equals($stateParams.userId,"")){
	profile = userProfile.loadProfileData($stateParams.userId);
	userLoginId=$stateParams.userId;

}
else{

	profile = userProfile.loadProfileData($scope.userinfo.userLoginId);
	userLoginId=$scope.userinfo.userLoginId;
}
profile.then(function (data) {
	$scope.profileData = angular.fromJson(JSON.parse(data.data));
	$scope.profileObj = {};
			
			if(!$scope.profileData.profile.Preferedlanguage){
				$scope.profileData.profile.Preferedlanguage=$scope.availlangualges[0];
				$scope.oldLang=$scope.availlangualges[0].langCode;	
			}
			else{

				if($scope.profileData.profile.Preferedlanguage.langCode=="en"){
					$scope.profileData.profile.Preferedlanguage=$scope.availlangualges[0];

				}
				else{
					$scope.profileData.profile.Preferedlanguage=$scope.availlangualges[1];
				}
				$scope.oldLang=$scope.profileData.profile.Preferedlanguage.langCode;
			}
			if(!angular.equals($scope.profileData.passwordChanges,undefined))
			{
				$scope.passwordChangeFrequency=$scope.profileData.passwordChanges.$date;
			}
			else{
				$scope.passwordChangeFrequency="never changed";
			}

});


$scope.convertDate=function(date){
	var date=new Date(date);
	var cur = new Date();
	var diff = cur-date; // This is the difference in milliseconds
    var age = Math.floor(diff/31536000000); 
    date=date.toDateString();
	return "Born on "+date+" ("+age+" years old)";
};



$scope.updateinfo=function(){
	 $state.go('home.main.updateUserProfile');
};

$scope.showHideFotoDive=function(){
	$scope.updatepicmsg=$scope.updatepicmsg===false? true:false;
};
$scope.updateUserProfileDatas=function(data){

	if(!$scope.profileData._id){
		$scope.profileDataId=undefined;	
					
	}
	else{
		$scope.profileDataId=$scope.profileData._id.$oid;
	}

	var profileUpdateConfirmation = userProfile.updateUserProfileData($scope.profileDataId,userLoginId,$scope.profileData.profile);
		profileUpdateConfirmation.then(function (data) {
			if(data.status==200&&data.statusText=="OK"){
				$scope.notifications("Success","Updated","success");
				if($scope.profileData.profile.Preferedlanguage){
					$rootScope.userinfo.ActiveUserData.Preferedlanguage=$scope.profileData.profile.Preferedlanguage;
				}

			}
		});

};

$scope.onBranchChange = function(){
	$scope.profileData.showBranchSaveButton = true;
};

$scope.editAboutOpt=function(variable){
	if(variable=='about'){
		$scope.showHideAbtPic=$scope.showHideAbtPic===false? true:false;
	}
	else if(variable=='location'){
		$scope.showHidelocationPic=$scope.showHidelocationPic===false? true:false;
	} 
	else if(variable=='DobAndPlace'){
		$scope.showHideDobAndPlacePic=$scope.showHideDobAndPlacePic===false? true:false;
	}
	else if(variable=='nameicon'){
		$scope.nameicon=$scope.nameicon===false? true:false;
	}
	else if(variable=='emailicon'){
		$scope.emailicon=$scope.emailicon===false? true:false;
	}
	else if(variable=='pwdicon'){
		$scope.pwdicon=$scope.pwdicon===false?true:false;
	}
	else if(variable=='lange'){
		$scope.lange=$scope.lange===false?true:false;
	}

};


$scope.changePassword=function(){

	var changePwdObj = userProfile.changeUserPassword(userLoginId,$scope.currentPassword,$scope.newPassword);
		changePwdObj.then(function (data) {
			if(data.status==200&&data.statusText=="OK"){
				var response=angular.fromJson(JSON.parse(data.data));
				if(angular.equals(response.response,"success")){
					$scope.profileData.profile.passwordChanges=response.changedate;
					$scope.notifications("Success","Password Changed","success");
					$scope.currentPassword=$scope.retypedPassword=$scope.newPassword="";
					$scope.changePwd.$setPristine();
				}
				else{
					$scope.notifications("Warning","Incorrect Password","warning");
					$scope.currentPassword="";
				}
			}
		});
	
};


$scope.checkPasswordMatch=function(){
	$scope.changePwd.retypedPassword.$invalid= $scope.newPassword !== $scope.retypedPassword;
};

$scope.$watch(function(scope) { return scope.profileData.profile.Preferedlanguage.langCode },
              function(newValue, oldValue) {
                  if($scope.oldLang!=newValue){
                  		$scope.languageActiveOrNot=false;
                  }
                  else{
                  		$scope.languageActiveOrNot=true;
                  }
              }
  );


 $scope.$watch(function(scope) { return scope.profileData.profile.passwordChanges },
              function(newValue, oldValue) {
                  if(angular.equals(response.response,undefined)){
                  		date=new Date($scope.profileData.profile.passwordChanges.$date)
						var diff = new Date(date).toString();
						$scope.passwordChangeFrequency="Last Changed in".concat(diff);
                  }
   				}
  );

//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };

}]);
