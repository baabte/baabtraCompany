angular.module('baabtra').controller('BillingPlansCtrl',['$scope','billingPlans','$alert','localStorageService','$location','$rootScope','commonService',function($scope,billingPlans,$alert,localStorageService,$location,$rootScope,commonService){
if ($rootScope.loggedIn===false) {//||$rootScope.loggedIn===undefined
        $location.path('/login');//redirecting path into login
  }
  
  console.log($rootScope.userinfo );
	// var loginInfo=localStorageService.get('loginInfo');
	// $scope.userLoginId=loginInfo.userLoginId.$oid;

$scope.tooltip = {  //tooltip for feature list
  "title": "Click to add this feature to the plan",
  "checked": false
};


$scope.custombilling=false;//ng-show variable for hide and show cusom form
$scope.planName="";
$scope.custom = false;
billingPlans.loadFeatures($scope);//function call for load features
billingPlans.retriveCurrentPlans($scope);//function call for retrive existing plans
$scope.current_plan=false;
$scope.features_to_billing_plan=[];
$scope.newPlan={};
$scope.feature_add_menu=false;

$scope.toggleCustom = function(index) { //function for plan list toggle
            $scope.toggle = $scope.toggle === undefined ? index: undefined;
        };

$scope.calculate_plan_prize = function(plan) { //function for plan list toggle
										 var plan_prize=0;
												for(count=0;count<plan.features.length;count++){
																	plan_prize=plan_prize+plan.features[count].pricing.units*plan.features[count].pricing.price;
												}
            return plan_prize;
           
        };

$scope.addfeature=function(index)//function for add feature
{

				if($scope.planName===""){ //notification for user to add atleast on feature to the plan
							$scope.notifications('Warning!',"Please add a plan!","warning");
				}	else{ //adding plan properties to the object
							$scope.this_feature={};
							$scope.this_feature.featureId=$scope.features[index]._id.$oid;
							$scope.this_feature.featureName=$scope.features[index].featureName;
							$scope.this_feature.featureDescription=$scope.features[index].featureDescription;	
							$scope.this_feature.pricing=$scope.features[index].pricing;	
							$scope.this_feature.billing=$scope.features[index].billing;	
							$scope.features_to_billing_plan.push($scope.this_feature);
							$scope.features.splice(index,1);
				}	
};
$scope.$watch(function(scope) { return scope.planName },//watch function to create a plan 
              function(newValue, oldValue) {
                 if($scope.planName!=""){
                 		$scope.current_plan=true;
                 		// $scope.features_to_billing_plan=[];
                 }
                 else{
                 		$scope.current_plan=false;
                 }
              }
);
$scope.$watchCollection(function(scope) { return scope.features_to_billing_plan },//watch function for show or hide add plan
              function(newValue, oldValue) {
                 if($scope.features_to_billing_plan.length==0){
                 		$scope.feature_add_menu=false;
                 }
                 else{
                 		$scope.feature_add_menu=true;
                 }

              }
);
$scope.addPlan=function()//function add a new plan
{
			$scope.newPlan.planName=$scope.planName;
			$scope.newPlan.features=$scope.features_to_billing_plan;
			$scope.newPlan.createdId=$scope.userLoginId;
			billingPlans.addNewBillingPlan($scope);//service call to add plan
};
$scope.removeFromFeaturelist=function(feature,index){ //function to remove a feature from the temporary list of plan
				$scope.features_to_billing_plan.splice(index,1);
				$scope.features.push(feature);
};

$scope.filterBillingPlan=function(feature){ //function to decide whic billing of a feature
			if(feature.billing.years>0&&feature.billing.days==0&&feature.billing.months==0	){
					select=0;
					
			}else if(feature.billing.months>0&&feature.billing.days==0&&feature.billing.years==0	){
				 select=1;
			}
			else{
				 select=2;
			}
			$scope.billings = [
    "yearly",
    "monthly",
    "custom"
  ];
  $scope.selection_={};
  $scope.selection_.frequency=$scope.billings[select];


		if($scope.selection_.frequency==='custom'){
		  $scope.custombilling=true;
		}
		else if($scope.selection_.frequency!=='custom'){
		  $scope.custombilling=false;
		}


};
$scope.editBill=function(data,feature){//function to edit the biilling plan a feature
    if(data=='yearly'){
    			feature.billing.years=1;
    			feature.billing.months=0;
    			feature.billing.days=0;
    			feature.billing.totaldays= 365;
    }else if(data=='monthly'){
    			feature.billing.years=0;
    			feature.billing.months=1;
    			feature.billing.days=0;
    			feature.billing.totaldays= 365;
    }
    else{
    			$scope.custombilling=true;
    }
};
$scope.delete_plan=function(plan,index){
	$scope.data_to_delete={};
	$scope.data_to_delete.plan_id=plan._id.$oid;
	$scope.data_to_delete.userLoginId=$scope.userLoginId;
	billingPlans.delete_plans($scope);//function call for retrive existing plans
	$scope.delete_index=index;
};

//callback functions
$scope.fnloadFeaturesBack=function(data){ //callback function for load existing plans         
 $scope.features=angular.fromJson(JSON.parse(data));
 // $scope.features_keeper.push($scope.features);  
 // console.log(typeof($scope.features));
   
 $scope.features_keeper=$scope.features;   
 // console.log(typeof($scope.features_keeper));          
};

$scope.fnaddNewPlanCallBack=function(data){ //callback function for add plan
 addNewBillingPlanBackResult=angular.fromJson(JSON.parse(data));
 if(addNewBillingPlanBackResult=="success")
    {
    	 $scope.current_plans.push($scope.newPlan);
     	$scope.notifications("Success","New Billing Plan created successfully","success");
     	$scope.planName="";
     	$scope.features_to_billing_plan=[];
     	console.log($scope.features);
     	// $scope.features=$scope.features_keeper;
     	    }
  else if (addNewBillingPlanBackResult=="error"||addNewBillingPlanBackResult=="failed") 
    {$scope.notifications('Warning!',"New billing Plan creation was failed","warning");};       
		            
};
$scope.fnretrieveCurrentPlans=function(data){ //call back function retrieve  plans 
	$scope.current_plans=angular.fromJson(JSON.parse(data));
};

$scope.fndeletePlanCallBack=function(data){ //call back function retrieve  plans 
	$scope.delete_call_back=angular.fromJson(JSON.parse(data));
 if($scope.delete_call_back=="success")
  {
   $scope.notifications("success","Plan successfully removed","success");
   $scope.current_plans.splice($scope.delete_index,1);}
   else if ($scope.delete_call_back=="error"||$scope.delete_call_back=="failed") 
     {$scope.notifications("Error","Error in removing","danger");};  
};

//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };


}]);