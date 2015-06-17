angular.module('baabtra').directive('questionBankLoader',['questionBankService','$rootScope',function(questionBankService,
$rootScope) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-questionBankLoader.html',
		link: function(scope, element, attrs, fn) {
			
			var companyId ='';
		// var companyId = "54978cc57525614f6e3e70d3"
			if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
			  companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;							  
			}
					
		//service call for course fetch
		if(angular.equals(scope.ngModel,undefined)){
			var questionFetchData={fkcompanyId:companyId};

			var FetchQuestionBankListCallBack= questionBankService.fnFetchQuestionBankList(questionFetchData);

			FetchQuestionBankListCallBack.then(function(data){

			 scope.questionBanklist = angular.fromJson(JSON.parse(data.data));

			 for(var index in scope.questionBanklist){

               scope.questionBanklist[index].icon = '<div class="col-xs-12  text-xs">Total Questions: '+scope.questionBanklist[index].noOfQuestions+'</div>';
			   }

			});

			}else{
				
			var temp=angular.copy(scope.ngModel)

			var questionFetchData={fkcompanyId:companyId};
			
			var FetchQuestionBankListCallBack= questionBankService.fnFetchQuestionBankList(questionFetchData);

			FetchQuestionBankListCallBack.then(function(data){

			 scope.questionBanklist = angular.fromJson(JSON.parse(data.data));

			 for(var index in scope.questionBanklist){

               scope.questionBanklist[index].icon = '<div class="col-xs-12  text-xs">Total Questions: '+scope.questionBanklist[index].noOfQuestions+'</div>';
			   }

			   scope.ngModel=temp;

			});


			}




		}
	};
}]);
