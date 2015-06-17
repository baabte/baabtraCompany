angular.module('baabtra').controller('QuestionbankviewCtrl',['$scope','bbConfig','$rootScope','$state','commonService','$alert','$modal','$aside','questionBankService',function($scope,bbConfig,$rootScope,$state,commonService,$alert,$modal,$aside,questionBankService){

if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}

var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;



var fnFetchAllQuestionBundlesCallBack=questionBankService.fnFetchAllQuestionBundles({companyId:companyId});

fnFetchAllQuestionBundlesCallBack.then(function(data){
    $scope.questionBundles=angular.fromJson(JSON.parse(data.data));
   
});

$scope.expand=false;

$scope.questionGroupModel=[];//array to keep the 
$scope.courseElement={index:1,tlPointInMinute:1000,Name:'Test'};
$scope.questionModel={mark:{}};
$scope.mark={totalMark:{}};


// Pre-fetch an external template populated with a custom scope
    var createQuestionsetAside = $aside({scope: $scope, template: 'angularModules/questionBank/partials/aside-CreateQuestionset.html', show: false,placement:'top'});
// Show when some event occurs (use $promise property to ensure the template has been loaded)



$scope.fnCreateQuestionsetModalActivate =function(){
createQuestionsetAside.$promise.then(createQuestionsetAside.show);
};

$scope.fnCreateQuestionsetModalDeactivate =function(){
$scope.questionGroupModel=[];
createQuestionsetAside.hide();
};

// Pre-fetch an external template populated with a custom scope
    var questionModal = $modal({scope: $scope, template: 'angularModules/questionRelated/questionGroup/directives/Modal-question.html', show: false,placement:'top'});
// Show when some event occurs (use $promise property to ensure the template has been loaded)



 $scope.questionShowActivate =function(){
		    	 questionModal.$promise.then(questionModal.show);
		    	
		    };

 $scope.questionShowDeactivate =function(){
            	$scope.questionModel={mark:{}};//questionmodel reset to default
		    	 questionModal.hide();		    	
		    };
		    
$scope.questionBundle={};		    
		   

$scope.dropDown=function (index) {
		    	var list=[];

		    list.push({text:"Edit",click:function() {
		    			$scope.placeindex=index;
		    			$scope.questionModel=angular.copy($scope.questionGroupModel[index]);
		    			$scope.position='edit';
			    	 	$scope.questionShowActivate();

		    		
		    		}});
		    list.push({text:"Insert before",click:function() {
		    		$scope.placeindex=index;
		    		$scope.position='before';
		    	 	$scope.questionShowActivate();

		    		}});
		    list.push({text:"Insert after",click:function() {
		    		$scope.placeindex=index;
		    		$scope.position='after';
		    	 	$scope.questionShowActivate();
		    		}});
		    list.push({text:"Remove",click:function() {
		    		$scope.placeindex=index;
		    		if($scope.questionGroupModel.length>=1){
			    		$scope.questionGroupModel.splice(index,1); //removes that object if 
		    			if(angular.equals(index,0)){
			    	 	$scope.questionShowActivate();
		    			}
		    		}
		    		}});

		    	return list;
		    };		

		   $scope.addQuestion =function(questionModel,placeindex){
          	var tempArray=[];
          	for(var key in questionModel.answer){
          		var tempObj={};
          		tempObj=questionModel.answer[key];
          		tempArray.push(tempObj);
          	}
          	questionModel.answer=tempArray;
            	if(angular.equals(placeindex,undefined)){
            		$scope.questionGroupModel.push(questionModel);//must pass questionmodel instead of scope.questionGroupModel
            	// console.log(scope.questionGroupModel);            		            		
            	}
            	//to add a question to a specific position 
            	else{

            		if(angular.equals($scope.position,'edit')){
            			// console.log(scope.position);
            			$scope.questionGroupModel[placeindex]=questionModel;            			            		
            		}
            		else if(!angular.equals($scope.position,'before')){
            			$scope.questionGroupModel.splice(placeindex+1,0,questionModel);            	            		
            		}
            		else if(!angular.equals(placeindex,'after')){
		    			$scope.questionGroupModel.splice(placeindex,0,questionModel);    
            		}
            	    delete $scope.placeindex;//deleted to set the index back to default state

            	}
            	$scope.questionBundle.questions=$scope.questionGroupModel;
            	$scope.questionBundle.noOfQuestions=$scope.questionBundle.questions.length;
            	$scope.questionShowDeactivate();

            };


            $scope.fnModifyQuestionSet=function(){
            	$scope.questionBundle.companyId=companyId;
            	$scope.questionBundle.loggedusercrmid=loggedusercrmid;
                

            	var fnModifyQuestionBundlesCallBack=questionBankService.fnModifyQuestionBundles($scope.questionBundle);
            	fnModifyQuestionBundlesCallBack.then(function(data){
            		var result=angular.fromJson(JSON.parse(data.data));
            		

	            	var fnFetchAllQuestionBundlesCallBack=questionBankService.fnFetchAllQuestionBundles({companyId:companyId});

					fnFetchAllQuestionBundlesCallBack.then(function(data){
					    $scope.questionBundles=angular.fromJson(JSON.parse(data.data));
					   
					});

            		$scope.fnCreateQuestionsetModalDeactivate();

            	});
            };

            $scope.fnEditQuestionBundle=function(index){
            	$scope.questionBundle=angular.copy($scope.questionBundles[index]);
            	$scope.questionGroupModel=$scope.questionBundle.questions;
            	$scope.fnCreateQuestionsetModalActivate();
            };

           $scope.fnFormatObj=function (question) {
            	return JSON.stringify({value:question});
            };   

		   


}]);