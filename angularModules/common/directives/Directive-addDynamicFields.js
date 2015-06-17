angular.module('baabtra').directive('addDynamicFields',['$sce','$templateCache','$modal','addCourseService','bbConfig', function($sce,$templateCache,$modal,addCourseService,bbConfig) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
		detailFields:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-addDynamicFields.html',
		link: function(scope, element, attrs, fn) {

       $templateCache.put('DynamicFields/popup.html','<div><input class=\"form-control\" type=\"text\"></div>');
  		 $templateCache.put('DynamicFields/editor.html', '<div><ng-quill-editor name=\"{{detail.title}}\" ng-model=\"newField.value\"  toolbar=\"true\" link-tooltip=\"true\" image-tooltip=\"true\" toolbar-entries=\"font size bold list bullet italic underline strike align color background link image\" error-class=\"input-error\"></ng-quill-editor>');
			 $templateCache.put('DynamicFields/inputText.html','<input  ng-model=\"detail.value\" class=\"form-control \" float-label placeholder=\"{{detail.title}}\" >');
			 $templateCache.put('DynamicFields/video.html','<input type=\"text\" readonly=\"\" class=\"form-control\" float-label placeholder=\"{{\'Please Choose a video\'|translate}}\"><input type=\"file\" ng-file-select=\"onFileSelect($files, newField)\" ng-model=\"newField.value\" ng-multiple=\"false\" accept=\"video/*\" resetOnClick=\"true\">');
       $templateCache.put('DynamicFields/ppt.html','<input type=\"text\" readonly=\"\" class=\"form-control\" float-label placeholder=\"{{\'Please Choose a ppt\'|translate}}\"><input type=\"file\" ng-file-select=\"onFileSelect($files, newField)\" ng-model=\"newField.value\" ng-multiple=\"false\" accept=\"*.pdf,*.xml,*.doc\" resetOnClick=\"true\">');
			
       scope.customDetailDropdown = [{value:"DynamicFields/editor.html",label:"Add a Description feild"},{value:"DynamicFields/video.html",label:"Add a video"},{value:"DynamicFields/ppt.html",label:"Add a ppt"}];
       scope.btnName = "Add";
       scope.enableButton = false;

       scope.addCustomDetail = function(selectedDetail){
        scope.newField.template = selectedDetail;
       }
       scope.fnAfterThisField = function(index){
        for (var i = 0; i < scope.detailFields.length; i++) {
          if(angular.equals(scope.detailFields[i].title,index)){
            scope.afterThisFieldSelected = i;
            break;
          }
        }
       }
			//setting default fields in daynamic field	
			if(!scope.detailFields.length){
			scope.detailFields = [{title:"Course Description",
								value:"",
                type:"content",
								template:'DynamicFields/editor.html',
								help:"A short description of the Course(Optional, recommended)",
								removable:false},
								{title:"Course Benefits",
								value:"",
                type:"content",
								template:'DynamicFields/editor.html',
								help:"Benefits of the Course(Optional, recommended)",
								removable:false}];
							}

      

      scope.$watch('detailFields', function(){
        scope.afterThisFieldDefault = scope.detailFields[scope.detailFields.length-1].title;
        scope.afterThisFieldSelected = scope.detailFields.length-1;
      },true);

      scope.addNewField = function(template, title){
				
				scope.newField = {title:title,
  										value:"",
  										template:template,
  										type:"content",
  										help:"",
  										removable:true};
        scope.selectedDetail = scope.newField.template;

				$modal({scope: scope, backdrop:"static", template: 'angularModules/common/directives/popup-addNewField.html', show: true});
  			};

  			scope.addThisField = function(newField, $hide){
  				if(angular.equals(newField.type,"video") || angular.equals(newField.type,"application")){
  					scope.btnName = "Uploading....";
            scope.enableButton = true;
            var path = "Course/"+newField.type;
  					var promise = addCourseService.fnCourseFileUpload(newField.value, path);
  					 promise.then(function(response){ // call back function for the fileupload
        			newField.value = bbConfig.BWS+'files/'+path+'/'+response.data.replace('"','').replace('"','');
        		  scope.btnName = "Add";
              scope.enableButton = false;
              $hide();
            });
        		}

  				scope.detailFields.splice(scope.afterThisFieldSelected+1,0,newField);
  			};

  			scope.onFileSelect = function($files, myModelObj){
  				myModelObj.value = $files[0];//setting the file as value of the feild
  				myModelObj.type = $files[0].type.split('/')[0];//for identify the type course detail
  			};

			scope.courseDetailsType = [{"text": "<div class=\"text-success\" style=\"cursor: default;!important\">Here you can add custom details to the course</div>",
										"click": '#'
  										},
  										{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Add a custom detail</div>",
										"click": 'this.addNewField(\"DynamicFields/editor.html\",\"\");'
  										},
  										{
  											"divider": true
  										},
  										{"text": "<div class=\"text-success\" style=\"cursor: default;!important\">However below are few suggestion from us</div>",
										"click": '#'
  										},
  										{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Add A Course Video</div>",
  										 "click": 'this.addNewField(\"DynamicFields/video.html\",\"Course Video\");'
  										},
                      {"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Add A PPT</div>",
                       "click": 'this.addNewField(\"DynamicFields/ppt.html\",\"Course PPT\");'
                      },	
  										{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Course Highlights</div>",
										"click": 'this.addNewField(\"DynamicFields/editor.html\",\"Course highlights\");'
  										},
  										{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Course Objectives</div>",
										"click": 'this.addNewField(\"DynamicFields/editor.html\",\"Course Objectives\");'
  										},
  										{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Course Delivery Method</div>",
										"click": 'this.addNewField(\"DynamicFields/editor.html\",\"Course Delivery Method\");'
  										},
  										{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Who can take this course</div>",
										"click": 'this.addNewField(\"DynamicFields/editor.html\",\"Who can take this course\");'
  										},
  										{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Pre-Requisites</div>",
										"click": 'this.addNewField(\"DynamicFields/editor.html\",\"Pre-Requisites\");'
  										},
  										{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Project & Certification Process</div>",
										"click": 'this.addNewField(\"DynamicFields/editor.html\",\"Project & Certification Process\");'
  										}];



  			}
  		};
  	}]);
