angular.module('baabtra').controller('ViewbatchwithoptionCtrl',['$scope','viewBatches','$rootScope','$state',function($scope,viewBatches,$rootScope,$state){
	//getting the user role mapping id
	$scope.currentOption=$state.params.key;
	$rootScope.$watch('userinfo',function(){
		$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		$scope.batchObj.blastId='';
		$scope.batchObj.bfirstId='';
		loadBatchPromise=viewBatches.viewBatchesForManage($scope,$scope.batchObj.bfirstId,'initial',$scope.batchObj.blastId,'');
		loadBatchPromise.then(function(response){ //promise for batch load
			$scope.batchObj.batchList=angular.fromJson(JSON.parse(response.data)).batchList;
			$scope.batchObj.bfirstId=angular.fromJson(JSON.parse(response.data)).firstId.$oid;
			$scope.batchObj.blastId=angular.fromJson(JSON.parse(response.data)).lastId.$oid;
			
		});
	});

	$scope.batchObj={}; 		//main object
	$scope.activeTab="true"; 	//indicates the active tab
	var loadBatchPromise,loadMenteePromise;
	//call the function to load the batches
	$scope.viewBatches=function(){
		$scope.activeTab="true";
		if(angular.equals($scope.batchObj.batchList,undefined)||angular.equals($scope.batchObj.batchList.length,0)){
			loadBatchPromise=viewBatches.viewBatchesForManage($scope,$scope.batchObj.bfirstId,'initial',$scope.batchObj.blastId,'');
			loadBatchPromise.then(function(response){ //promise for batch load
				$scope.batchObj.batchList=angular.fromJson(JSON.parse(response.data)).batchList;
				$scope.batchObj.bfirstId=angular.fromJson(JSON.parse(response.data)).firstId.$oid;
				$scope.batchObj.blastId=angular.fromJson(JSON.parse(response.data)).lastId.$oid;
				
			});
		}
	};

	$scope.prevButtonDesabled=true; //initialy disable the prev button 
	
	$scope.$watch('batchObj.menteeList + activeTab + batchObj.batchList',function(){
		if(angular.equals($scope.activeTab,'true')){
			if(angular.equals($scope.batchObj.batchList,undefined)||$scope.batchObj.batchList.length<9){
				$scope.nextButtonDesabled=true;
			}else{
				$scope.nextButtonDesabled=false;
			}
		}else{
			
			if(angular.equals($scope.batchObj.menteeList,undefined)||$scope.batchObj.menteeList.length<9){
					$scope.nextButtonDesabled=true;
				}else{
					$scope.nextButtonDesabled=false;
				}
		}
	});


	$scope.viewMentees=function(){ /*function to load the mentees*/
		$scope.activeTab="false";
		$scope.batchObj.mtype='initial'
		$scope.batchObj.mlastId='';
		$scope.batchObj.mfirstId='';
		/*Checking for first load. ie by checking its length or the list is undefind */
		if(angular.equals($scope.batchObj.menteeList,undefined)||angular.equals($scope.batchObj.menteeList.length,0)){
			loadMenteePromise=viewBatches.viewMenteesForManage($scope,$scope.batchObj.mfirstId,'initial',$scope.batchObj.mlastId,'');
			loadMenteePromise.then(function(response){ //promise for mentee load
				$scope.batchObj.menteeList=angular.fromJson(JSON.parse(response.data)).userList;
				$scope.batchObj.mfirstId=angular.fromJson(JSON.parse(response.data)).firstId.$oid;
				$scope.batchObj.mlastId=angular.fromJson(JSON.parse(response.data)).lastId.$oid;
				
			});
		}
	};

	//search function
	var searchInProgress;
	$scope.fnSearchBatchMentee=function(searchKey){//for seaeching the available courses
		clearTimeout(searchInProgress);
	
		searchInProgress=setTimeout(function(){
			if(angular.equals($scope.activeTab,'false')){ //chcking for which tab is active
				loadMenteePromise=viewBatches.viewMenteesForManage($scope,$scope.batchObj.mfirstId,'initial',$scope.batchObj.mlastId,searchKey);
				loadMenteePromise.then(function(response){ //promise for batch load
					$scope.batchObj.menteeList=angular.fromJson(JSON.parse(response.data)).userList;
					$scope.batchObj.mfirstId=angular.fromJson(JSON.parse(response.data)).firstId.$oid;
					$scope.batchObj.mlastId=angular.fromJson(JSON.parse(response.data)).lastId.$oid;


					
				});
			}else{
				loadBatchPromise=viewBatches.viewBatchesForManage($scope,$scope.batchObj.bfirstId,'initial',$scope.batchObj.blastId,searchKey);
				loadBatchPromise.then(function(response){ //promise for mentee load
					var batchResponse = angular.fromJson(JSON.parse(response.data));
					if(batchResponse.batchList.length){
						$scope.batchObj.batchList = batchResponse.batchList;
						$scope.batchObj.bfirstId = batchResponse.firstId.$oid;
						$scope.batchObj.blastId = batchResponse.lastId.$oid;
						
					}
					
					
				});
			}

		},500)
	};


	/*pagination function */
	$scope.pagination=function(type){
		$scope.prevButtonDesabled = false;
		if(angular.equals($scope.activeTab,'true')){ //checking for which tab is active. here if activeTab is true then it will be batch view
			//$scope.batchObj.btype=type;
			loadBatchPromise=viewBatches.viewBatchesForManage($scope,$scope.batchObj.bfirstId,type,$scope.batchObj.blastId,'');
			loadBatchPromise.then(function(response){ //promise for batch load
				var result = angular.fromJson(JSON.parse(response.data));
				if(result.batchList.length){
					$scope.prevButtonDesabled = false;
					$scope.nextButtonDesabled = false;

					$scope.batchObj.batchList = result.batchList;
					$scope.batchObj.bfirstId = result.firstId.$oid;
					$scope.batchObj.blastId = result.lastId.$oid;
				}
				else{
					if(angular.equals(type, "prev")){
							$scope.prevButtonDesabled = true;
						}
						else if(angular.equals(type, "next")){
							$scope.nextButtonDesabled = true;
						}
					}
			});
		}else{ //activeTab false means the second tab is active
			$scope.prevButtonDesabled=false;
			//$scope.batchObj.mtype=type;
			loadMenteePromise=viewBatches.viewMenteesForManage($scope,$scope.batchObj.mfirstId,type,$scope.batchObj.mlastId,'');
			loadMenteePromise.then(function(response){ //promise for mentee load
				$scope.batchObj.menteeList=angular.fromJson(JSON.parse(response.data)).userList;
				$scope.batchObj.mfirstId=angular.fromJson(JSON.parse(response.data)).firstId.$oid;
				$scope.batchObj.mlastId=angular.fromJson(JSON.parse(response.data)).lastId.$oid;
			});

		}
	};


}]);
