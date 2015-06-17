angular.module('baabtra').directive('menteeLoder',['$rootScope', 'commonSrv', function ($rootScope, commonSrv) {
	return {
		restrict: 'E',
		require:'ngModel',
		scope: {
			ngModel:'='
		},
		templateUrl: 'angularModules/common/directives/Directive-menteeLoder.html',
		link: function(scope, element, attrs, fn) {

			var companyId='';
			if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
			  companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;				
			}
			if(angular.equals(scope.mentessList,undefined)){
				var menteesResponse = commonSrv.fnLoadMentees(companyId);
				menteesResponse.then(function(response){
					var mentessList = angular.fromJson(JSON.parse(response.data));
					angular.forEach(mentessList,function(mentee){
						if(!angular.equals(mentee.profile.firstName,undefined)){
							mentee.Name = mentee.profile.firstName+ ' ' +mentee.profile.lastName;
						}
						else{
							mentee.Name = mentee.profile[0].firstName+ ' ' +mentee.profile[0].lastName;
						}
					});
					scope.mentessList = mentessList;
				});
			};
		}
	};
}]);
