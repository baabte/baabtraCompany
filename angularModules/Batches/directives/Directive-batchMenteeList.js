angular.module('baabtra').directive('batchMenteeList', function() {
	return {
		restrict: 'E',
		replace: true,
		required: 'ngModel',
		scope: {
			userList:"=",
			ngModel:"="
		},
		templateUrl: 'angularModules/Batches/directives/Directive-batchMenteeList.html',
		link: function(scope, element, attrs, fn) {
			    scope.userObj = {
    				users: []
  				};
  			
  			scope.checkAll = function() {
			    scope.userObj.users = scope.userList.map(function(item) { return item.fkUserRoleMappingId.$oid; });
				scope.ngModel=scope.userObj.users;
			};

			scope.uncheckAll = function() {
			    scope.userObj.users = [];
			    scope.ngModel=scope.userObj.users;
			};

			scope.click=function(){
				scope.ngModel=scope.userObj.users;
			};
			scope.checkAll();
		}
	};
});
