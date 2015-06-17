angular.module('baabtra').controller('FormcreatorCtrl',['$scope', '$rootScope', 'commonService', '$state', 'formCreator', '$alert', 'bbConfig', function ($scope, $rootScope, commonService, $state, formCreator, $alert, bbConfig){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	$scope.roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/

	$scope.data = {};
	$scope.data.roleId = bbConfig.SARID;
	$scope.data.formSchema = {};
	$scope.data.formSchema.fields = [];
	$scope.data.forms = [];

	$scope.loadExitingCustomForms = function(){
		if(!$scope.data.forms.length){
			var formLoadResponse = formCreator.loadCustomFormsMain();
			formLoadResponse.then(function(response){
				$scope.data.forms = angular.fromJson(JSON.parse(response.data));
			});
		}
	};

	$scope.saveFormDetails = function(){
		if(!angular.equals($scope.data.form._id, undefined)){
			$scope.data.form._id = $scope.data.form._id.$oid;
				$scope.data.form.crmId = $scope.data.form.crmId.$oid;
				$scope.data.form.urmId = rm_id;
			}
			else{
				if(angular.equals($scope.data.form, undefined)){
					$scope.data.form = {};
				}
				
				$scope.data.form.formSchema = $scope.data.formSchema;
				$scope.data.form.createdDate = new Date();
				$scope.data.form.updatedDate = new Date();
				$scope.data.form.crmId = rm_id;
				$scope.data.form.urmId = rm_id;
				$scope.data.form.activeFlag = 1;
			}

		if(angular.equals($scope.data.roleId,$scope.roleId)){
			$scope.data.form.formStep = 1;
			var formCreatorResponse = formCreator.saveCustomFormMain($scope.data.form);
			formCreatorResponse.then(function(response){
				var responseData = angular.fromJson(JSON.parse(response.data));
				if($scope.data.form.activeFlag){
					$alert({title: responseData.result+'!', content: 'Custom Form ' + responseData.result + ' Successfuly...', placement: 'top-right', type: 'success', animation:'am-fade-and-slide-top', duration:3 ,show: true});
				}
				else{
					$alert({scope: $scope,container:'body',keyboard:true,animation:'am-fade-and-slide-top',template:'views/ui/angular-strap/alert.tpl.html',title:'Undo',content: $scope.data.form.formSchema.formName +' has been deleted', placement: 'top-right', type: 'warning'});
				}
			});
		}
		else{
			$scope.data.form.formStep = 2;
			$scope.data.form.companyId = companyId;
			var formCreatorResponse = formCreator.saveCompanyCustomForm($scope.data.form);
			formCreatorResponse.then(function(response){
				var responseData = angular.fromJson(JSON.parse(response.data));
				$alert({title: responseData.result+'!', content: 'Custom Form ' + responseData.result + ' Successfuly...', placement: 'top-right', type: 'success', animation:'am-fade-and-slide-top', duration:3 ,show: true});
			});
		}
		
	};//fn-saveFormDetails end

	$scope.editForm = function(form){
		$scope.data.form = form;
		$scope.data.formSchema = $scope.data.form.formSchema;
		$scope.data.fields = $scope.data.form.formSchema.fields;
	};

	$scope.removeForm = function(form, index){

		$scope.data.formsBackUp = angular.copy($scope.data.forms);
		$scope.data.formBackUp = angular.copy(form);

		form.activeFlag = 0;
		$scope.data.form = form;
		$scope.saveFormDetails();
		$scope.data.forms.splice(index, 1);
	};

	$scope.undo = function(){
		$scope.data.forms = angular.copy($scope.data.formsBackUp);
		$scope.data.form = angular.copy($scope.data.formBackUp);
		$scope.saveFormDetails();
	};

	$scope.addMoreFeilds = function(form){
		$scope.data.form = {};
		$scope.data.form.formId = form._id.$oid;
		var formLoadResponse = formCreator.LoadCompanyCustomForm(companyId, $scope.data.form.formId);
		formLoadResponse.then(function(response){
				var result = angular.fromJson(JSON.parse(response.data))[0];
				if(!angular.equals(result, undefined)){
					$scope.data.form = result;
					$scope.data.form.formId = $scope.data.form.formId.$oid;
					$scope.data.formSchema = $scope.data.form.formSchema;
					$scope.data.fields = $scope.data.form.formSchema.fields;
				}
				else{
					$scope.data.formSchema = {};
					$scope.data.formSchema.fields = [];
				}
			});	
		};

}]);