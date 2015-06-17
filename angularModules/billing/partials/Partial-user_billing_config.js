angular.module('baabtra').controller('UserBillingConfigCtrl',['$scope','$rootScope','commonService','userBillingConfigService','userFeatureConfigService','$location','$alert','$state','$modal','schemaForm', function ($scope,$rootScope,commonService,userBillingConfigService,userFeatureConfigService,$location,$alert,$state,$modal,schemaForm){


if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}


// console.log($rootScope.userinfo.ActiveUserData.roleMappingId.$oid);

 var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;



	$scope.companyId=$state.params.companyId;
	console.log($scope.companyId);
    userBillingConfigService.FnGetUserPlan($scope);
    userBillingConfigService.FnGetPlan($scope);
    userBillingConfigService.FnGetFeature($scope);

//to hide the custom billing field 
$scope.custombillfield=false;
//tool tip messages 
$scope.PlanChangeTT="Warning changing plan will lead loss of current plan";
$scope.PriceConfigTT="Click to edit Price";
$scope.BillConfigTT="Click to edit Billing";
//variables for iteration 
 $scope.userplan={};
 $scope.userplan.plan={};
 $scope.userplan.plan.features=[];
var i;

//funtion to change the user plan to some pre defined plan
$scope.fnChangeplan=function(plan){
	// console.log(plan);
	 if(plan.features.length>0){
	 // console.log($scope.userplan);
   $scope.userplan={};
   $scope.userplan.companyId=$scope.companyId;
   plan.planId=plan._id;
   delete plan._id;
	 $scope.userplan.plan=plan;
   $scope.userplan.plan.planId=$scope.userplan.plan.planId.$oid;
   var flen=$scope.userplan.plan.features.length;
      i=0;
      while(i<flen){
        $scope.userplan.plan.features[i].featureId=$scope.userplan.plan.features[i].featureId.$oid;
        i++;
      }

   $scope.userplan.loggedusercrmid=loggedusercrmid;     
      // console.log($scope.userplan);
	 userBillingConfigService.FnChangeUserPlan($scope);
	}

};

//to configure the feature billing details
$scope.fConfig = function(feature){
  $modal({ scope: $scope,
              template: 'angularModules/billing/partials/billing_setting_page.html',
              placement:'center',
              show: true});
 // $scope.featureSelected=true;
$scope.selectedFeature=feature;
// console.log(feature);
if((feature.billing.years===1)&&(feature.billing.months===0)&&(feature.billing.days===0))
{
  // console.log("yearly");
     i=0;
}
else if((feature.billing.years===0)&&(feature.billing.months===1)&&(feature.billing.days===0))
{
  // console.log("monthly");
      i=1;
}
else{
  // console.log("custom");
     i=2;
  }


$scope.bill = [
    "yearly",
    "monthly",
    "custom"
  ]; 
  $scope.sel={};
$scope.sel.freqency=$scope.bill[i];

if($scope.sel.freqency==='custom'){
  $scope.custombillfield=true;
}
else if($scope.sel.freqency!=='custom'){
  $scope.custombillfield=false;
}


};

//function to add a feature to user plan will update the clnuserbilling
//runs along with funtion featureValueConfig
 $scope.addFeature = function(feature ) {
  var feature1=JSON.parse(JSON.stringify(feature));
// console.log("feature1");
// console.log(feature1);

  var index = $scope.featurelist.indexOf(feature1);
   // console.log("feature @addfeature");
   // console.log(feature1);
   // feature1=[];

  $scope.userplan.plan.features.push( feature1 );
  if ( index >= 0 ) {
      $scope.featurelist.splice( index, 1 );
      }
       $scope.AddFeature={};
       $scope.AddFeature.companyId=$scope.companyId;
       $scope.AddFeature.feature=feature1;
       delete $scope.AddFeature.feature.configDetails;
       if (feature1._id===undefined) {
        $scope.AddFeature.feature.featureId=feature1.featureId;
       }
       else if (feature1.featureId===undefined) {
         $scope.AddFeature.feature.featureId=feature1._id.$oid;
          delete $scope.AddFeature.feature._id;
       }
      // console.log($scope.AddFeature.feature);
      // $scope.AddFeature.feature.featureId=feature._id.$oid;
      // delete $scope.AddFeature.feature._id;
      // console.log("addfeature");
      // console.log($scope.AddFeature);
      // console.log("featureconfig from addfeature")
      // console.log($scope.FeatureConfig);
      $scope.AddFeature.loggedusercrmid=loggedusercrmid;

      // userBillingConfigService.FnAddFeature($scope);
};
//function to add a feature to user plan will update the clnuserfeatureconfig
//runs along with funtion addfeature
$scope.featureValueConfig = function(feature){
   // console.log("feature @val config");
   // console.log(feature);
  $modal({ scope: $scope,
              template: 'angularModules/billing/partials/feature_values_config_page.html',
              placement:'center',
              show: true});
  // console.log(feature); 
  $scope.featuremodel = {};
  $scope.FeatureConfig=feature;
  // console.log("FeatureConfig");
  // console.log($scope.FeatureConfig)
  if (feature._id===undefined) {
        $scope.FeatureConfig.featureId=feature.featureId.$oid;
      }
      else if (feature.featureId===undefined) {
        $scope.FeatureConfig.featureId=feature._id.$oid;
         delete $scope.FeatureConfig._id;
      }
  // console.log("FeatureConfig after");
  // console.log($scope.FeatureConfig)
  $scope.schema={type: "object"};
  $scope.schema.properties={};
  $scope.schema.required=[];
  $scope.form=[];
  var flen=$scope.FeatureConfig.configDetails.length;
  var i=0;
  while(i<flen){
    if(angular.equals($scope.FeatureConfig.configDetails[i].inputType,'select')){
    $scope.schema.properties[$scope.FeatureConfig.configDetails[i].label]={type:"string",enum:$scope.FeatureConfig.configDetails[i].allowedValues};

  }
  else{
  $scope.schema.properties[$scope.FeatureConfig.configDetails[i].label]={type:"string"};
  }
  $scope.schema.required.push($scope.FeatureConfig.configDetails[i].label);

  $scope.form.push({key:$scope.FeatureConfig.configDetails[i].label,type:$scope.FeatureConfig.configDetails[i].inputType});
  i++;
  }

  $scope.form.push({
    "type": "submit",
    "style": "btn-info",
    "title": "Save Config"
  });
};

//funtion to save the newly added feature attributes to the user feature config 
$scope.saveFeature = function(){
  // console.log($scope.featuremodel);
  $scope.configValues={};
  $scope.configValues.fConfig=$scope.featuremodel;

  $scope.configValues.fConfig.featureId=$scope.FeatureConfig.featureId;
  $scope.configValues.companyId=$scope.companyId;

  // console.log($scope.configValues);
  // console.log("temp")      
  // console.log($scope.temp);
  // console.log("temp")
  // console.log($scope.featurelist.indexOf( $scope.temp ))
  $scope.configValues.loggedusercrmid=loggedusercrmid;
  
  userFeatureConfigService.FnSaveFeaturesConfig($scope);
 


};

// to delete a feature from user plan
 $scope.deleteFeature = function( feature ) {
  var index = $scope.userplan.plan.features.indexOf( feature );
  // console.log(feature);
  $scope.featurelist.push( feature );
  if ( index >= 0 ) {
      $scope.userplan.plan.features.splice( index, 1 );
      }
       $scope.DeleteFeature={};
       $scope.DeleteFeature.companyId=$scope.companyId;
       if (feature._id===undefined) {
        $scope.DeleteFeature.featureId=feature.featureId.$oid;
      }
      else if (feature.featureId===undefined) {
        $scope.DeleteFeature.featureId=feature._id.$oid;
         delete $scope.DeleteFeature._id;
      }
       // $scope.DeleteFeature.featureId=feature._id.$oid;
       // console.log("DeleteFeature");
       // console.log($scope.DeleteFeature);
      // $scope.DeleteFeature.featureId=feature._id.$oid;
        $scope.DeleteFeature.loggedusercrmid=loggedusercrmid;

       userBillingConfigService.FnDeleteFeature($scope);

};

//to edit pricing of a user feature 
$scope.editPricing = function(Pricing) {
  $scope.editPrice={};
  $scope.editPrice.companyId=$scope.companyId;
  $scope.editPrice.featureId=$scope.selectedFeature.featureId.$oid;
  $scope.editPrice.pricing=Pricing;
  $scope.editPrice.loggedusercrmid=loggedusercrmid;


  // console.log($scope.editPrice);
  userBillingConfigService.FnEditPricing($scope);

};
//edit billing of a user feature
$scope.editBill = function(Billing) {
  // console.log(Billing);
    $scope.editBilling={};
    $scope.editBilling.billing={};
    $scope.editBilling.companyId=$scope.companyId;
    $scope.editBilling.featureId=$scope.selectedFeature.featureId.$oid;
    $scope.editBilling.loggedusercrmid=loggedusercrmid;
  
  if(Billing==='yearly'){
    $scope.custombillfield=false;
    $scope.editBilling.billing.years=1;
    $scope.editBilling.billing.months=0;
    $scope.editBilling.billing.days=0;
    $scope.editBilling.billing.totalDays=365;

    userBillingConfigService.FnEditBilling($scope);
  }
  else if(Billing==='monthly'){
    $scope.custombillfield=false;
    $scope.editBilling.billing.years=0;
    $scope.editBilling.billing.months=1;
    $scope.editBilling.billing.days=0;
    $scope.editBilling.billing.totalDays=30;

    userBillingConfigService.FnEditBilling($scope);
  }
  else if(Billing==='custom'){
    $scope.custombillfield=true;
  }
  // console.log($scope.editBilling);
};
//to edit custom billing
$scope.editCustomBilling = function() {
$scope.editBilling={};
    $scope.editBilling.billing={};
    $scope.editBilling.companyId=$scope.companyId;
    $scope.editBilling.featureId=$scope.selectedFeature.featureId.$oid;
    $scope.editBilling.billing.years=$scope.selectedFeature.billing.years;
    $scope.editBilling.billing.months=$scope.selectedFeature.billing.months;
    $scope.editBilling.billing.days=$scope.selectedFeature.billing.days;
    $scope.editBilling.billing.totalDays=parseInt(($scope.selectedFeature.billing.years*365))+parseInt(($scope.selectedFeature.billing.months*30))+parseInt(($scope.selectedFeature.billing.days));
    userBillingConfigService.FnEditBilling($scope);
};
 

//call backs
$scope.fnGetUserPlanCallBack=function(result){
  if(result==='success'){
        // console.log($scope.userplan);
      }
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
      }

};
$scope.fnGetPlanCallBack=function(result){
  if(result==='success'){
        // console.log($scope.userplan);
      }
	
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
      }

};

$scope.fnGetFeatureCallBack=function(result){
  if(result==='success'){
       // console.log($scope.featurelist);
      }

	 if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
        // console.log($scope.featurelist);
      }

};

$scope.fnChangeUserPlanCallBack=function(result){
  if(result==='success'){
        userBillingConfigService.FnGetUserPlan($scope);
        userBillingConfigService.FnGetFeature($scope);
      $scope.notifications('Done!','User Plan Switched Successfully','info');

      }

   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
        
      }

};

$scope.fnEditPricingCallBack=function(result){
if(result==='success'){
        
      }

   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }

};

$scope.fnAddFeatureCallBack=function(result){
if(result==='success'){
      userBillingConfigService.FnGetUserPlan($scope);
        userBillingConfigService.FnGetFeature($scope);
      $scope.notifications('Done!','Feature Added Successfully','info');
      }

   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }

};

$scope.fnEditBillingCallBack=function(result){
if(result==='success'){
      userBillingConfigService.FnGetUserPlan($scope);
        userBillingConfigService.FnGetFeature($scope);
        
      }

   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }

};
$scope.fnDeleteFeatureCallBack=function(result){
if(result==='success'){
      userBillingConfigService.FnGetUserPlan($scope);
        userBillingConfigService.FnGetFeature($scope);
        
      }

   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }

};

$scope.fnSaveFeaturesConfigCallBack=function(result){
  if(result==='success'){
        
         userBillingConfigService.FnAddFeature($scope);
        //$scope.notifications('Done!','Feature configured successfully','info');
      }
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }

};




//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };


}]);