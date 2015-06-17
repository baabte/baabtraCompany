angular.module('baabtra').directive('courseMultiSelect',['$rootScope','commonSrv', function($rootScope,commonSrv) {
	return {
		restrict: 'E',
		require:'ngModel',
		replace:true,
		scope: {
			ngModel : "=",
			courseId: "=",
			userId:"=",
			batchMappingId:"="
			
		},
		templateUrl: 'angularModules/common/directives/Directive-courseMultiSelect.html',
		link: function(scope, element, attrs, fn) {
			var companyId='';
			if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
				companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;				
			}

			if(angular.equals(scope.batchMappingId,undefined)){
				scope.$watch('courseId',function(){
					scope.loadMaterials();
				}); //watch end
			}
			else{

				scope.$watch('batchMappingId',function(){
					scope.loadMaterials();
				}); //watch end
			}

			scope.loadMaterials=function(){
				var courseMaterialResponse
					if(angular.equals(scope.batchMappingId,undefined)){
						courseMaterialResponse = commonSrv.loadCourseMaterial(scope.courseId,scope.userId);
					}else{
						courseMaterialResponse = commonSrv.loadCourseMaterial4Batch(scope.batchMappingId);
					}
					
					courseMaterialResponse.then(function(response){
						if(!angular.equals(angular.fromJson(JSON.parse(response.data)),'notfound')){
							scope.summaryDetails = [];	
							scope.summaryDetails = angular.fromJson(JSON.parse(response.data));
						}
						//console.log(scope.course.courseTimeline)
						/*angular.forEach(usersUnderRoles, function(user){

							user.Name = user.profile.firstName + ' ' + user.profile.lastName;
							delete user.profile;
						});*/
						//scope.usersUnderRoles = angular.copy(usersUnderRoles);
						/*var summaryViewTypes = {0:{id: "1",name: "Year(s)",mFactor:(1/525600),show:true},
                        		1:{id: "2",name: "Month(s)",mFactor:(1/43200),show:true},
                        		2:{id: "3",name: "Week(s)",mFactor:(1/10080),show:true},
                        		3:{id: "4",name: "Day(s)",mFactor:(1/1440),show:true},
                        		4:{id: "5",name: "Hour(s)",mFactor:1/60,show:true},
                        		5:{id: "6",name: "Minute(s)",mFactor:1,show:true}};
                       	scope.summaryViewIn = summaryViewTypes[scope.course.selectedDuration-1]; //getting the selected duration
						scope.summaryDetails = [];	
						angular.forEach(scope.course.courseTimeline, function(elements, key){
							
							if(angular.equals(scope.summaryDetails[Math.ceil(key*scope.summaryViewIn.mFactor)],undefined)){
								//scope.summaryDetails[Math.ceil(key*scope.summaryViewIn.mFactor)] = [];
							}
							angular.forEach(elements, function(element,key2){
								if(angular.equals(typeof element,"object")){
									angular.forEach(element, function(elem,key3){
										if(!angular.equals(elem.Name,"Payment_checkpoint")){
											var structureArr=[]
											structureArr.push(key);
											structureArr.push(key2);
											structureArr.push(key3);
											scope.summaryDetails.push({code:elem.code, Name:elem.elements[0].value,courseElem:elem,key:key,elemOrder:scope.course.elementOrder,structureArr:structureArr}); //[Math.ceil(key*scope.summaryViewIn.mFactor)]
										
										}
									})
								}
							});
						});*/
						
					}); //promise ends
			};

		}
	};
}]);
