angular.module('baabtra').controller('FeatureConfigCtrl',['$scope','featureConfig','localStorageService','$location','$alert','$rootScope',function($scope,featureConfig,localStorageService,$location,$alert,$rootScope){
if ($rootScope.loggedIn===false) {
        $location.path('/login');//redirecting path into login
  }


  var newFeature={};
  $scope.billings={};
  $scope.fields=[];
  var pricing={};
  $scope.atrributes=[];
  $scope.yearNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  $scope.monthNumbers = [0,1,2,3,4,5,6,7,8,9,10,11];
  $scope.weekNumbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  $scope.addAttrTooltip="add more attributes";
  $scope.RemoveAttrTooltip="remove this atribute";
  featureConfig.loadInputTypes($scope);
  $scope.customBilling=false;
  $scope.validations=[];
  $scope.field_length=true;
  $scope.attribut_length=true;

   $scope.avail_validations = [ "phone number" , "email" , "age" , "year" , "number","price","text","true/false" ];
 
  $scope.createFeature=function(){
  	// alert($scope.featureName+" "+$scope.featureDescription+" "+$scope.price+" "+$scope.units+" "+$scope.minUnits+" "+$scope.billing);
  	newFeature={"featureName":$scope.featureName,"featureDescription":$scope.featureDescription};
  	pricing={"price":$scope.price,"units":$scope.units,"minUnits":$scope.minUnits};
  	newFeature["pricing"]=pricing;
  	 if($scope.billing=="custom"){
	 		 var year=365*$scope.years;
		   var month=31*$scope.months;
		   var days=$scope.days;
		  	billings={"years":$scope.years,"months":$scope.months,"days":$scope.days,"totaldays":year+month+days};
	 		  var year=365*$scope.years;
		  	var month=31*$scope.months;
		  	var days=$scope.days;
		  	var billings={"years":$scope.years,"months":$scope.months,"days":$scope.days,"totaldays":year+month+days};
	 		  newFeature["billing"]=billings;
 		}
 		else{
 			newFeature["billing"]=$scope.billings;
 		}
 		  newFeature.configDetails=$scope.fields;
  		featureConfig.addNewFeature($scope,newFeature);
  };
  $scope.addField=function(){
  	if(typeof $scope.allowedvalue === 'undefined'){
  		$scope.allowedvalue=false;
  	}
  	var field={};
  	field={"label":$scope.labels,"InputType":$scope.typeOfInput.inputtypes,"allowedvalue":$scope.allowedvalue,"userConfigurable":$scope.userConfigurable};
  	field.atrributes=$scope.atrributes;
    field.validations=$scope.validations;
  	$scope.fields.push(field);

    $scope.labels="";
    $scope.typeOfInput.inputtypes="";
    $scope.allowedvalue="";
    $scope.allowedvalue="";
    $scope.userConfigurable="";
    $scope.field_length=false;
    $scope.labels="";
    $scope.feature_form.label.$setPristine();
    $scope.feature_form.typeOfInput.$setPristine();
    $scope.feature_form.validations.$setPristine();
    $scope.feature_form.attributename.$setPristine();
    $scope.feature_form.attributevalue.$setPristine();
    $scope.atrributes=[];
    $scope.validations=[];
    $scope.feature_form.validations.$setPristine();

      };

 $scope.BillingPlan=function(){
 	
 	if($scope.billing=="custom"){
 		$scope.customBilling=true;
 	}
 	else{
 		$scope.customBilling=false;
 		if($scope.billing=="yearly"){
 			$scope.billings={"years":1,"months":0,"days":0,"totaldays":365};
 			
 		}
 		else{
 			$scope.billings={"years":0,"months":1,"days":0,"totaldays":365};
 			
 		}
 	}
 	
 };
 $scope.createDivForAddAttr=function(){
  var atrribute={};
  atrribute[$scope.attributename]=$scope.attributevalue;
  if(!angular.equals($scope.attributename,undefined)&&!angular.equals($scope.attributevalue,undefined)&&!angular.equals($scope.attributename,"")&&!angular.equals($scope.attributevalue,"")){
    $scope.atrributes.push(atrribute);
    // $scope.feature_form.attributename.$setPristine();
    // $scope.feature_form.attributevalue.$setPristine();
    $scope.attributename=" ";
    $scope.attributevalue=" ";
  }
  $scope.attribut_length=false;
 };
 $scope.fun_validations=function(item){
     if(!item){
       console.log("empty");
    }
    else{
      
      if(item.avail_validations!=undefined&&item.avail_validations!=""){
          $scope.validations.push(item.avail_validations);        
         } 
      if(!angular.equals(item.avail_validations,undefined)&&!angular.equals(item.avail_validations,"")){
          $scope.validations.push(item.avail_validations);
          $scope.item.avail_validations="";
          // console.log($scope.validations);
        } 
    }
  };


 $scope.removeAttr = function(index){
    $scope.atrributes.splice(index, 1);
   }; 
$scope.remove_validation=function(index){
  $scope.validations.splice(index, 1);
};

//call back functions
  $scope.loadInputTypescallback=function(data){
  	 $scope.InputTypes=angular.fromJson(JSON.parse(data));
  };

//CALL BACK FUNCTIONS
$scope.fnCreateFeatureCallBack=function(data){ //call back function retrieve  plans 
  $scope.feature_call_back=angular.fromJson(JSON.parse(data));
 if($scope.feature_call_back=="success")
  {
   $scope.notifications("success","Feature successfully created","success");
    $scope.featureName="";
    $scope.featureDescription="";
    $scope.price="";
    $scope.units="";
    $scope.minUnits="";
    $scope.feature_form.$setPristine();
   }
   else if ($scope.feature_call_back=="error"||$scope.feature_call_back=="failed") 
     {$scope.notifications("Error","Ploblem in creating new feature","danger");};  
};

//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };



}]);