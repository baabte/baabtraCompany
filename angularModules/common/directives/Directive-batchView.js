angular.module('baabtra').directive('batchView',['$filter','$state','$modal','viewBatches','$rootScope', function($filter,$state,$modal,viewBatches,$rootScope) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			batch:"=",
			actionFlag:"=",
			specificOption:"=",
			shadow: "="
		},
		templateUrl: 'angularModules/common/directives/Directive-batchView.html',
		link: function(scope, element, attrs, fn) {
			 var rmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;

  			 var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;//

			scope.$watch('batch',function(){

				scope.actions = [
				/*{
				"text": "<i class=\"fa fa-users\"></i>&nbsp;View mentees",
				"click": "fnViewMentees()"
				},*/
				{
				"text": "<i class=\"fa fa-hand-o-up\"></i>&nbsp;Mark attendance",
				 "click": "fnMarkAttendance()"
				},
				{
				"text": "<i class=\"fa fa-check\"></i>&nbsp;Evalute",
				"click": "fnEvaluate()"

				},
				{
				"text": "<i class=\"fa fa-bolt\"></i>&nbsp;View Results",
				"click": "fnViewREsults()"
				},
				{
				"text": "<i class=\"mdi-social-person-add\"></i>&nbsp;Allocate Evaluator",
				"click": "fnAllocateEvaluator()"
				},
				{
				"text": "<i class=\"fa fa-hand-o-up\"></i>&nbsp;Update attendance",
				 "click": "fnEditAttendance()"
				},
				{
				"text": "<i class=\"mdi-av-repeat\"></i>&nbsp;Change Status",
				 "click": "changeStatus()"
				}
				];
				
				/*if(scope.batch.batchMode=="onetime"){
					scope.description = 'Starting date '+$filter('date')(scope.batch.startDate.$date)+'<br />Total joinings:'+scope.batch.totalJoining+'<br />End date: '+$filter('date')(scope.batch.endDate.$date);
				}else{
					var days=scope.batch.repeats.every;
					scope.description = 'Starting date '+$filter('date')(scope.batch.startDate.$date)+'<br />Total joinings:'+scope.batch.totalJoining+'<br />Duration: Repeats each '+days+' months';
				}*/

				if(!angular.equals(scope.batch.materialAssignment,"automatic")){
					scope.actions.push({
					"text": "<i class=\"fa fa-paperclip\"></i>&nbsp;Assign a course material",
					"click": "fnAssignMaterial()"
					});
				}

				scope.dateConvertion=function(date){
					return $filter('date')(date);
				};


				//function to add course materials
				scope.fnAssignMaterial=function(){
					$state.go("home.main.batchAssignment",{batchMappingId:scope.batch._id.$oid});
				};

				//function to load the mark the batch attendance 
				scope.fnMarkAttendance=function(){
					// $state.go("home.main.batchAttendance",{batchMappingId:scope.batch._id.$oid});
					$state.go("home.main.markBatchAttendance",{batchMappingId:scope.batch._id.$oid,mode:0});
				};

				//function to load the mark the batch attendance 
				scope.fnEditAttendance=function(){
					// $state.go("home.main.batchAttendance",{batchMappingId:scope.batch._id.$oid});
					$state.go("home.main.markBatchAttendance",{batchMappingId:scope.batch._id.$oid,mode:1});
				};

				//function to load evaluation partial based on batchMappingId
				scope.fnEvaluate=function(){
					$state.go("home.main.batchEvaluation",{batchMappingId:scope.batch._id.$oid});
				};

				//function to load evaluation partial based on batchMappingId

				scope.fnViewREsults=function(){
					$state.go("home.main.viewResults",{batchMappingId:scope.batch._id.$oid});
				};
				
				scope.fnAllocateEvaluator=function(){
					$state.go("home.main.allocateEvaluator",{batchMappingId:scope.batch._id.$oid});

				};

				// function for executing functions from name
				scope.executeFunction=function (functionName) {
					functionName=functionName.replace('()','');
					scope[functionName]();
				};

				scope.changeStatus=function(){
					scope.statusChangeModalshowModal();
				};

				// Pre-fetch an external template populated with a custom scope
	            var statusChangeModal = $modal({scope: scope, template: 'angularModules/common/directives/statusChange-popup.html', show: false,placement:'center'});
	            // Show when some event occurs (use $promise property to ensure the template has been loaded)
	           
	            scope.statusChangeModalshowModal = function() {
	              statusChangeModal.$promise.then(statusChangeModal.show);
	            };

	             scope.fnDate= function(date){
	            	var isodatestring=new Date(date.$date).toISOString();
	            	return isodatestring;

	            };

	            if (scope.batch.status){
	             scope.status=scope.batch.status;

	            }
	            scope.date={};

	            if (scope.batch.startDate){
	            	scope.previousStartDate=scope.fnDate(scope.batch.startDate)
	            	// scope.previousEndDate=scope.fnDate(scope.batch.endDate)
	            	scope.previousStartDateFormated={};
	            	var date = new Date(scope.previousStartDate);
					scope.previousStartDateFormated=(date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();//prints expected format.
	            }

	            scope.fnChangeStatus= function(status,$hide){

	            	if((angular.equals(status,'postponed'))||(angular.equals(status,'advance'))){	

	            	}else{
	            		scope.date.startDate=null;
	            	}

	            	var ChangeBatchStatusPromise=viewBatches.ChangeBatchStatus(scope.batch._id.$oid,status,companyId,rmid,scope.date.startDate);
	            	ChangeBatchStatusPromise.then(function(data){
	            	 var response=angular.fromJson(JSON.parse(data.data));
	            	 scope.batch.status=response.status;
	            	 $hide();	            	 
	            	 if(!angular.equals(response.startDate,null)){
	            	 scope.batch.startDate.$date=scope.date.startDate.getTime();	

	            	scope.previousStartDate=scope.fnDate(scope.batch.startDate)
	            	// scope.previousEndDate=scope.fnDate(scope.batch.endDate)
	            	scope.previousStartDateFormated={};
	            	var date = new Date(scope.previousStartDate);
					scope.previousStartDateFormated=(date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();//prints expected format.
	                     	 	
	            	 }
	            	});
	            };

	           


			});


		}
	};
}]);
