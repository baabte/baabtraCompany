angular.module('baabtra').controller('forgotPassword',['$scope','forgotPassword','$alert', function($scope,forgotPassword,$alert) {
	$scope.user_email="";
	$scope.process=false;
	$scope.Error_msg_of_forgot_pwd=false; 
	$scope.login_frequency=0; 
	$scope.funGetPassword=function(){
		$scope.process=true;
		forgotPassword.funGetPassword($scope);
	};


	//callback functions 
	$scope.funGetPasswordCallBack=function(data){//callback function or forget password
		var password_check_result=angular.fromJson(JSON.parse(data));
		$scope.process=false;
		if(password_check_result=="success"){
			$scope.notifications("success","Please Check your E-mail Account for password","success");
			$scope.user_email="";
			$scope.password_reset_form.$setPristine();	
		}
		else if(password_check_result=="no_username"){

			$scope.Error_msg_of_forgot_pwd=true; 
			$scope.forgot_pwd_call_back_error="Please provide a valid username!";
			$scope.user_email="";
			$scope.password_reset_form.$setPristine();
		}
		$scope.login_frequency++;
	};

	$scope.Show_hide_error_msg=function(){
		if($scope.login_frequency>0){
			$scope.Error_msg_of_forgot_pwd=false; 
		}
	};

	//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };
}]);