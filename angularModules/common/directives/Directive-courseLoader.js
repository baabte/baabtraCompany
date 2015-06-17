angular.module('baabtra').directive('courseLoader',['addCourseService','$rootScope', function(addCourseService,$rootScope) {
	return {
		restrict: 'E',
		require:'ngModel',
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-courseLoader.html',
		link: function(scope, element, attrs, ctrls) {
			
			scope.multi = false;
		
			if(!angular.equals(attrs.multiSelect,undefined)){
				scope.multi = true;
			}
			
		//------------------------------------------

			if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
			  companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;				
			  
			}
					
		//service call for course fetch
			var courseFetchData={fkcompanyId:companyId};

			var FetchCourseListCallBack= addCourseService.fnFetchCourseList(courseFetchData);

			FetchCourseListCallBack.then(function(data){

			 scope.courselist = angular.fromJson(JSON.parse(data.data));
			 for(var index in scope.courselist){
			 	scope.courselist[index]._id=scope.courselist[index]._id.$oid;
			 }
			       

			});

			// ctrls.$setValidity('courseLoader',false);


			scope.onCourseSelectionChanged = function(course){		

					scope.ngModel=course;
					ctrls.$setValidity('courseLoader',true);				
			};
        

		}
	};
}]);