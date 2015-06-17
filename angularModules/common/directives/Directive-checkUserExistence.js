angular.module('baabtra').directive('checkUserExistence',['companyRegistrationService','$alert', function (companyRegistrationService,$alert) {
	return {
		restrict: 'A',
		require :["^?form",'ngModel'],
		scope:{checkMode:"=",outObject:"=",newUser:"="},
		link: function(scope, element, attrs, ctrls) {
			// console.log(ctrls);
			 
			 

			scope.$watch(function (){return ctrls[1].$modelValue;/* define what to watch*/
				}, function(){
						if(ctrls[1].$invalid){
							scope.newUser=false;

						}
					//if the required attribute is set to true the color will change to red
						if(ctrls[1].$valid){
							// console.log(ctrls[1].$modelValue);

							var userValObj={eMail:$(element).val(),fetch:attrs.checkMode};
							var fnUserNameValidCallBack= companyRegistrationService.fnUserNameValid(userValObj);

								fnUserNameValidCallBack.then(function(data){

							var result=angular.fromJson(JSON.parse(data.data));
							// console.log(result);
 							if(result.userCheck===1){  
 								if(!angular.equals(result.UserDetails,undefined)){
       						scope.notifications('!','Already a user!','info');
       						result.UserDetails.profile._id=result.UserDetails._id.$oid;

       						for(var key in result.UserDetails.profile){
       							scope.outObject[key]=result.UserDetails.profile[key];
       						}
       						scope.newUser=false;
       						scope.outObject.password='password';
       						 ctrls[1].$setValidity("checkUserExistence", true);
       						 }
       						 else{
       						 	scope.notifications('!','Already a user!','info');
       						 	 scope.newUser=false;
       						 	 scope.outObject.password='';
       						 }
            				}
 							else if(result.userCheck===0){ 
 								scope.outObject.password='';
 								// for(var key1 in scope.outObject){
  							// 		if(angular.equals(key1,'eMail')){}	
  							// 		else{
  										
  							// 			scope.outObject[key1]='';
  							// 		}
  							// 	}
  							scope.newUser=true;
            				}

							});

						
										
						}

				});	
			

			

	scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };



		}
	};




}]);