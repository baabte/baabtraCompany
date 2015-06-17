angular.module('baabtra').directive('cefRemoveButton',['$compile','$rootScope','bbConfig', function($compile, $rootScope, bbConfig) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {

			

		if(angular.equals(bbConfig.MURID, $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId)) {

			return;
		}

		

		var removeBtn = '<i class="pull-right mdi-action-delete text-2x" bs-tooltip data-title="Click to remove this field" data-placement="left" style="margin-top:-20px; position:relative; z-index:99999; cursor:pointer"></i>';

			// remove the attribute to prevent further compiling
			$(element).removeAttr('cef-remove-button');

			//compiling the button
			removeBtn = $compile(removeBtn)(scope.$parent);

			//adding the button to the UI
			$(element).parents(".fieldContainer").append(removeBtn);

		
			//removing the field from the UI as well as the list of fields on click of the button
			removeBtn.on("click", function(){


				//getting the name of the field to a varaibale
	            var name = scope.$parent.field.name;



	            //getting the existing fields shema into an array
	            var existingFields = scope.$parent.$parent.form.schema.fields;

	            console.log(existingFields)

	     
	            // looping through the array to get the existing schema object so that the new schema  can be added after that	          
	            for (var i in existingFields){

	            	if(angular.equals(name,existingFields[i].name)){

	            		existingFields.splice(i,1);
	            		scope.$apply();
	            		break;
	            	}
	            }

				
				
			}); //. Click end

		}
	};
}]);