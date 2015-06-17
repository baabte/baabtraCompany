angular.module('baabtra').directive('roleLoader',['formCustomizerService','$rootScope', '$state',function(formCustomizerService, $rootScope, $state) {
	return {
		restrict: 'E',
		require:'ngModel',
		scope: {
			ngModel:"=",getForm:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-roleLoader.html',
		link: function(scope, element, attrs, ctrls) {
			
			var companyId='';
			if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
				
			  companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;				
			}
			
			if(angular.equals($state.current.name,"home.main.nominateEmployee")){
				scope.show = false;
			}
			else{
				scope.show = true;
			}

			if((!angular.equals(companyId,undefined))&&(!angular.equals(attrs.getForm,undefined))){
				// console.log('fetching role for db');
			// service call to fetch roles of company and specified toplevel role 
		
			 var FetchSpecificFormObj={companyId:companyId,fetchFormName:attrs.getForm};
			 var fnFetchSpecificCustomFormCallBack= formCustomizerService.FnFetchSpecificCustomForm(FetchSpecificFormObj);
			fnFetchSpecificCustomFormCallBack.then(function  (data) {

			  var result=angular.fromJson(JSON.parse(data.data));

			  scope.roleSchema=result.roleSchema.roleSchema;
			// console.log(scope.roleSchema);

			var FetchRoleObj={companyId:companyId,topRoleFetch:[3]};
			 var fnFetchRoleCallBack= formCustomizerService.FnFetchRoles(FetchRoleObj);
			fnFetchRoleCallBack.then(function  (data) {

			  scope.rolelist=angular.fromJson(JSON.parse(data.data));

		
			//combining role and role schema of that role for that company
			var menteeIndex = 0;
			for (var i = 0; i < scope.rolelist.length; i++) {
				if(angular.equals(scope.rolelist.roleId,3)){
					menteeIndex = i;
				}
    			for (var x = 0; x < scope.roleSchema.length; x++) {
      				if(angular.equals(scope.rolelist[i].roleId,scope.roleSchema[x].roleId)){
        					scope.rolelist[i].formSchema=scope.roleSchema[x].formSchema;
        					scope.rolelist[i].formSteps=scope.roleSchema[x].formSteps;           
      						}     
     				}
			}

			if(!scope.show){
				scope.ngModel = scope.rolelist[menteeIndex];
					ctrls.$setValidity('roleLoader',true);
			}
			// if(!angular.equals(scope.ngModel,undefined)) {
			// 	scope.ngModel=scope.ngModel;

			// };

			});

			
			});

			}
		    
			// service call to fetch roles of company and specified toplevel role 

			 
			// ctrls.$setValidity('roleLoader',false);
			


			scope.onRoleSelectionChanged = function(role){
				// console.log(role);
				// if(angular.equals(role,null)){
				// 	scope.ngModel=role;
										
				// }
				if(!angular.equals(role,null)){
					scope.ngModel=role;
					ctrls.$setValidity('roleLoader',true);
					
				}
				
			};

		}
	};
}]);
