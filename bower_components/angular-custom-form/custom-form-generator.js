/*!
   angular-custom-form v0.1
   description : To add and load the custom form
*/
(function(angular) {
var acf=angular.module('custom-form',[]);
var responseData;

/* Storing the templates into $templateCache to load it in future*/
angular.module('custom-form').run(['$templateCache','loadTemplateSrv',function($templateCache,loadTemplateSrv){

  	//var responseData;
    /*promise for loading template service*/
   	var promise=loadTemplateSrv.loadFormTemplates();
   	promise.then(function(response){ 
   		responseData=angular.fromJson(JSON.parse(response.data));
      //adding the existing templates into templateCache.
   		angular.forEach(responseData, function(templateElement){
          var templateData=templateElement.DefaultTemplate;
            $templateCache.put('angular-custom-form/'+templateElement.Name+'.ng.html',templateData);
         });

  	});
  }]);


/* directive to load the dynamic form data*/
acf.directive('acfForm',['$templateCache','$compile','$sce',function($templateCache,$compile,$sce){
	 return {
    restrict: 'A',
    replace:true,
    require: ['^?acfForm','^?outputModel','^?inputModel'],
    scope: {
      inputModel:'=',
      outputObj:'=outputModel'
    },
   	//templateUrl: 'angular-custom-form/fieldView.ng.html', /*template url to field view */
    link: function (scope, element, attrs){
      scope.outputObj={};

      //watch function to notify the changes in the object
      scope.$watch('inputModel',function(newValue, oldValue){
          //checking for object length
            if(angular.equals(newValue, oldValue)){
                return; // simply skip that
            }
            else{ //takes the newest value
              if(Object.keys(scope.inputModel).length>0){

                //creating dynamic object as per the formname
                scope[scope.inputModel['formName'].replace(/ /g,'')]={};
                //passing the object into outputObj to get it in parent scope.
                scope.outputObj=scope[scope.inputModel['formName'].replace(/ /g,'')];
                //adding the template into templateChache for retrival
                $templateCache.put('angular-custom-form/template.ng.html',scope.inputModel.template);
                var templateData=$templateCache.get('angular-custom-form/template.ng.html');
                element.html(templateData);                                                      
                $compile(element.contents())(scope);   //compiles the specific element
              }
            }
      },true);

     }
    }
  }]);

/*directive to load the single field from template cache*/
acf.directive('acfField',['$templateCache','$compile',function($templateCache,$compile){
	 return {
    restrict: 'EA',
    require: ['^?acfForm','^?acfModel'],
    replace:true,
    scope: {
      fieldSchema: '=acfField',
      acfModel:"="
    },
    link: function ($scope, $element, $attrs) {
     /*Here the code to load the dynamic template in the page*/
    	var templateData = $templateCache.get('angular-custom-form/'+$scope.fieldSchema.type+'.ng.html');
      var beforeCustom = templateData.split(">");
      beforeCustom[0] = beforeCustom[0] + ' ng-model=acfModel[\''+$scope.fieldSchema.name+'\']'; //this line will add the ng-model to specific control
      templateData= beforeCustom.join('>');
      $element.html(templateData);              //adding the controle to the page.                                                        
    	$compile($element.contents())($scope);   //compiles the specific control
    }
  }


}]);


/*directive to load the editable fields for creating form*/
acf.directive('acfEditForm',['$templateCache','$compile',function($templateCache,$compile){
   return {
    restrict: 'EA',
    require: ['^?acfEditForm','^?acfModel','^?acfFields'],
    replace:true,
    scope: {
      fields: "=acfFields", //scope object to load the existing schema
      form:"=acfModel"
    },
    templateUrl: 'angularModules/common/customForm/formEdit.ng.html',
    link: function ($scope, $element, $attrs) {
   
      $scope.fieldList=responseData; //storing the list of fileds from response data to scope varible.
      //$scope.form={};
      //$scope.form={};
      //$scope.fields=[];
      $scope.customFieldId=0;
      $scope.currentTab='';
    //***validation patters ***
    $scope.validationPatterns=[
      {'name':'None','value': undefined},
       {'name':'Url','value': '/^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$/'},
       {'name':'Domain','value': '/^([a-z][a-z0-9\\-]+(\\.|\\-*\\.))+[a-z]{2,6}$/'},
       {'name':'IPv4 Address','value': '/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/'},
       {'name':'Email Address','value': '/^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$/'},
       {'name':'Positive Integers','value': '/^\\d+$/'},
       {'name':'Negative Integers','value': '/^-\\d+$/'},
       {'name':'Number','value': '/^-{0,1}\\d*\\.{0,1}\\d+$/'},
       {'name':'Positive Number','value': '/^\\d*\\.{0,1}\\d+$/'},
       {'name':'Negative Number','value': '/^-\\d*\\.{0,1}\\d+$/'},
       {'name':'Year (1920-2099)','value': '/^(19|20)[\\d]{2,2}$/'},
       {'name':'Password','value': '/(?=.*\\d)(?=.*[!@#$%^&*\\-=()|?.\"\';:]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$/'}
    ];

      //***function to add new field into the custom form ***
      $scope.addNewField=function(){
        $scope.customFieldId++; //to uniquely identify
        console.log($scope.selectedField);
        /*deleting unesessary fields*/
        delete $scope.selectedField[0]._id;
        delete $scope.selectedField[0].urmId;
        delete $scope.selectedField[0].crmId;
        delete $scope.selectedField[0].updatedDate;
        delete $scope.selectedField[0].ticked;
        delete $scope.selectedField[0].createdDate;
        delete $scope.selectedField[0].activeFlag;
       $scope.selectedField[0].validation={};
       /* $scope.selectedField[0].validation.messages={
          required: 'A value is required for this field.',
          minlength: 'The value does not match the minimum length.',
          maxlength: 'The value exceeds the maximum length',
          pattern: 'The value does not match the required format.',
          email: 'The value is not a valid email address.',
          unique: 'The value is already in use.',
          number: 'The value is not a number.',
          min: 'The value not met min',
          max: 'The value not met max'
      };*/
        var fieldObj=angular.copy($scope.selectedField[0]);
        //fieldObj.customAttributes=[{"text":"","key":"Attribute1"}]; //for custom attributes
        //fieldObj.options=[{"text":"","key":"option1"}]; //for options
        if(!angular.equals($scope.selectedField.length,0)){
          fieldObj.id='field'+$scope.customFieldId;
          console.log($scope.fields);
          //if(angular.equals($scope.fields, undefined)){
          //  $scope.fields = [];
          //}
          $scope.fields.push(fieldObj);
        }
      };

      //to remove the field from the form
      $scope.deleteField=function(index){
        $scope.fields.splice(index,1);
      };

      $scope.fnFieldItemClicked = function(field){
        $scope.selectedField = [];
        $scope.selectedField.push(field);
      };

      var displayNameChangeTimeout;
      $scope.displayNameChanged = function(DisplayName,index){
        if(!angular.equals(displayNameChangeTimeout, undefined)){
          clearTimeout(displayNameChangeTimeout);
        }
        displayNameChangeTimeout = setTimeout(function(){ 
          for(var attrIndex in $scope.fields[index].mandatoryAttributes){
            if(angular.equals($scope.fields[index].mandatoryAttributes[attrIndex].key, 'ng-model')){
              if(!angular.equals(DisplayName,undefined)){
                $scope.fields[index].mandatoryAttributes[attrIndex].text = DisplayName.replace(' ','');
              }
              else{
                $scope.fields[index].mandatoryAttributes[attrIndex].text = "";
              }
              $scope.$digest();
            }
          }
        }, 400);

      };



      //****field.otherPattern should be removed from the object while saving***
      
      /*save the custom form after configuration*/
      $scope.generateCustomiseForm=function(){
        /*creating the custom form object*/
        $scope.form.fields=$scope.fields;
        $scope.form.template='';

        /*loop to add each attributes into the element*/
        angular.forEach($scope.form.fields,function(item,index){
          delete $scope.form.fields[index].otherPattern;
          var templateData = item.DefaultTemplate;
          $scope.tempField=item;
          var optionsForAdd;

          //for adding options to select list
          if(angular.equals(item.Name,'select')){ 
           optionsForAdd =templateData.split('</select>')[0];
            angular.forEach(item.options,function(optAtt){
              optionsForAdd = optionsForAdd + '<option value=\"'+ optAtt.key +'\">'+optAtt.text+'</option>';
            });
            optionsForAdd=optionsForAdd+'</select>'; 
            templateData=optionsForAdd; //assigning the added option into a variable
          }
          //for radiobutton list
          if(angular.equals(item.Name,'radiobuttonlist')){
            angular.forEach(item.options,function(optAtt){//adding the nesessary attributes into the element by looping through each radiobutton in radiobuttonlist
              optionsForAdd = optionsForAdd + '<div class="radio radio-primary"><label><input type="radio" name=\"'+item.id+'optionsRadios\" value=\"'+optAtt.key+'\" checked="">'+optAtt.text+'</label></div>';
            });
            tempTemplateData=optionsForAdd; //assigning the added option into a variable
          }
          //checking for the input element is checkboxlist
          if(angular.equals(item.Name,'checkboxlist')){
            angular.forEach(item.options,function(optAtt){ //adding the nesessary attributes into the element by looping through each checkbox in checkboxlist
              optionsForAdd = optionsForAdd + '<div class="checkbox"><label><input name=\"'+item.id+'checkbox\" checklist-value=\"'+optAtt.key+'\" type="checkbox">'+optAtt.text+'</label></div>';
            });
            tempTemplateData=optionsForAdd; //assigning the added option into a variable
          }
          
          //split the template by '>' to add custom attributes
          var beforeCustom = templateData.split(">");
         //<label class="col-lg-2 control-label">'+item.DisplayName+'</label>
          var formLabel='<div class="form-group"><div class="col-lg-12">';

          //loping through custom attributes to add it into default template
          
          if(!angular.equals(item.customAttributes, undefined)){
            for(customAtt in item.customAttributes){
              console.log(item.customAttributes[customAtt]);
              beforeCustom[0] = beforeCustom[0] + ' '+ item.customAttributes[customAtt].key +(item.customAttributes[customAtt].text.length?item.customAttributes[customAtt].text:'');
            }
          }
          //loping through mandatory Attributes to add it into default template
          angular.forEach(item.mandatoryAttributes,function(mandAtt){
            if(angular.equals(mandAtt.key,'ng-model')){
              beforeCustom[0] = beforeCustom[0] + ' '+ mandAtt.key +'=\"'+$scope.form.formName.replace(/ /g,'')+'.'+mandAtt.text+'\"';
            }else{
              beforeCustom[0] = beforeCustom[0] + ' '+ mandAtt.key +'=\"'+mandAtt.text+'\"';
            }
            //checking if the element is radiobuttonlist
            if(angular.equals(item.Name,'radiobuttonlist')){
                tmpRdList=tempTemplateData.split('checked="">');
                angular.forEach(tmpRdList,function(rdItem,index){
                  if(!angular.equals(index+1,tmpRdList.length)){ //adding the mandatory attributes into the element.
                    tmpRdList[index]=tmpRdList[index]+' '+ mandAtt.key +'=\"'+$scope.form.formName.replace(/ /g,'')+'.'+mandAtt.text+'\" ';

                  }
                });
                tempTemplateData=tmpRdList.join('checked="">'); //joining the the splited string
                tempTemplateData=tempTemplateData.replace('undefined',''); //removing the undefined flag if exists

            }
            //checking the selected elemnt is radiobuttonlist or not 
            if(angular.equals(item.Name,'checkboxlist')){
                tmpCbList=tempTemplateData.split('type="checkbox">');
                angular.forEach(tmpCbList,function(cbItem,index){ //adding mandatory attributes into the element
                  if(!angular.equals(index+1,tmpCbList.length)){
                    tmpCbList[index]=tmpCbList[index]+' checklist-model=\"'+$scope.form.formName.replace(/ /g,'')+'.'+mandAtt.text+'\" ';
                  }
                });
                tempTemplateData=tmpCbList.join('type="checkbox">'); //joining the the splited string
                tempTemplateData=tempTemplateData.replace('undefined',''); //removing the undefined flag if exists
                
            }

            //checking the element type is file or not
            if(angular.equals(item.Name,'file')){ 
                if(angular.equals(mandAtt.key,'ng-model')){
                  beforeCustom[0] = beforeCustom[0] + ' fileupload-dir=\"'+$scope.form.formName.replace(/ /g,'')+'.'+mandAtt.text+'\"';
               
                }
            }
          });
          //loping through unEditableAttributes to add it into default template
          angular.forEach(item.unEditableAttributes,function(uneditAtt){
            beforeCustom[0] = beforeCustom[0] + ' '+ uneditAtt.key +'=\"'+uneditAtt.text+'\"';
          });

          //looping through object to get the each key,value
          angular.forEach(item, function(value , key) {
            //checking for unwanted attributes which remove from adding into elememnt 
            if(!angular.equals(key,'unEditableAttributes')&&!angular.equals(key,'customAttributes')&&!angular.equals(key,'mandatoryAttributes')&&!angular.equals(key,'DisplayName')&&!angular.equals(key,'$$hashKey')&&!angular.equals(key,'id')&&!angular.equals(key,'validation')&&!angular.equals(key,'DefaultTemplate')&&!angular.equals(key,'Name')&&!angular.equals(key,'options')){

                 beforeCustom[0] = beforeCustom[0] + ' '+key+'=\"'+value+'\"';
              }
              if(angular.equals(key,'tooltip')){
                 beforeCustom[0] = beforeCustom[0] + ' '+ 'data-title=\"'+value+'\"';
              }

          });
          //other attributes

          beforeCustom[0] = beforeCustom[0] + ' '+ 'name=\"'+item.id+'\"';

          //looping the validation object
          angular.forEach(item.validation, function(value , key) {
              if(!angular.equals(key,'message')){
                 beforeCustom[0] = beforeCustom[0] + ' '+key+'=\"'+value+'\"';
              }
              else{ //for validation messages
                if(item.validation.pattern){
                  beforeCustom[0] = beforeCustom[0] + ' msg-pattern=\"'+value+'\"';
                  beforeCustom[0] = beforeCustom[0] + ' ng-pattern=\"'+item.validation.pattern+'\"';
                }else{
                  beforeCustom[0] = beforeCustom[0] + ' msg-required=\"'+value+'\"';
                }
              }
          });

           templateData= beforeCustom.join('>'); //join the splited content

           if(angular.equals(item.Name,'radiobuttonlist')){
              templateData=tempTemplateData;
           }
           if(angular.equals(item.Name,'checkboxlist')){
              templateData=tempTemplateData;
           }
           if(angular.equals(item.Name,'checkbox')){
              templateData='<div class="checkbox no-padding"><label>'+templateData+'</label></div>';
           }
           if(angular.equals(item.Name,'radio')){
              templateData='<div class="togglebutton"><label>'+templateData+'</label></div>';
           }
          var footer="</div></div>";
          $scope.form.template=$scope.form.template+formLabel+templateData+footer;
             
        });
        $scope.form.template='<form name="myForm" role="form" class="form-horizontal" xt-form novalidate>'+$scope.form.template+'</form>'
      };

    }
  }

}]);

/*service to load the added build in templates from database*/
acf.service('loadTemplateSrv',['$http','bbConfig',function($http,bbConfig){

	this.loadFormTemplates = function(){
    var promise = $http({
      url: bbConfig.BWS+'fnLoadCustomFormTemplates/',
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

}]);

})(angular);