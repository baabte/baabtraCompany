angular.module('baabtra').directive('fieldsOptionsButton',['$compile','courseElementFieldsManaging','$modal','$rootScope','bbConfig', function($compile,courseElementFieldsManaging,$modal, $rootScope, bbConfig) {
	return {
		restrict: 'EA',
		//templateUrl: 'angularModules/common/directives/Directive-fieldsOptionsButton.html',
		
		link: function(scope, element, attrs, fn) {

		
			

		if(angular.equals(bbConfig.MURID, $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId)) {
			return;
		}

			var optionsBtn = '<i class="pull-right mdi-av-playlist-add text-2x optionsBtn" bs-tooltip data-title="Click to add more fields" data-placement="left" style="margin-top:-20px; position:relative; z-index:99999; cursor:pointer;"></i>';

			// remove the attribute to prevent further compiling
			$(element).removeAttr('fields-options-button');

			//compiling the optionsBtn
			optionsBtn = $compile(optionsBtn)(scope.$parent);

			//adding the options button to the UI
			$(element).parents(".fieldContainer").append(optionsBtn);

		
			//show a popup on the click of the options button to select and add allowable fields below the element in focus
			optionsBtn.on("click", function(){

				//getting the existing fields shema into an array
	            var existingFields = scope.$parent.$parent.$parent.form.schema.fields;

	            // looping through the array to get the existing schema object so that the new schema  can be added after that
	            var currentIndex = 0;
	            var name = scope.$parent.fieldSchema.name;
	           
                    
	            for (var i in existingFields){

	            	if(angular.equals(name,existingFields[i].name)){
	            		currentIndex = i;

	            		break;
	            	}
	            }	            

	            var currentField = existingFields[i];



				//creating a unique id for the parent object this is to insert this along with sub elements so that the parents and sub elements can be connected at a later stage
				if(angular.equals(currentField.uniqueId, undefined)){
					var newDate = new Date();
					currentField.uniqueId = Math.floor(Math.random()*10)+newDate.getTime();
				}

				scope.parentId = currentField.uniqueId;
				scope.currentField = currentField; 
			

				// creating an array with the allowable fields to add

				if(angular.equals(scope.courseElementFieldsDropdown, undefined)){

					scope.courseElementFieldsDropdown = [];

				}

				if(angular.equals(scope.courseElementFieldsDropdown.length,0)){

					//getting the fields from database
					var courseElementFieldsResponse = courseElementFieldsManaging.fnGetCourseElementFields();
			  		
			  		courseElementFieldsResponse.then(function(response){
			  		var i =0;

				    var courseElements = angular.fromJson(JSON.parse(response.data));	

				    	angular.forEach(courseElements, function(courseElement){
				      		var name = courseElement.Name;
				      		var displayname = courseElement.DispalyName;

				      		courseElement.iconToShow = '<i class="m-r fa ' + courseElement.icon + '"></i>';
				      		
				      		if(courseElement.canAdd){
				        			scope.courseElementFieldsDropdown.push(courseElement);
				     		}
			  			});

			  				
			  		});
				}


				//showing a popup
				scope.addFieldsModal = $modal({scope: scope, title: 'Please select and configure the field to add', template: 'angularModules/courseElementFieldsManaging/partials/Popup-addCourseElementField.html',html:true, placement:'center', show: true});

				scope.addAt = [{value:'above',label:"Add above the field"},
							   {value:'below',label:"Add below the field"}]
				scope.addIndex = 'below';
				
			}); //. Click end


			// create a function to add the element to the specified z-index	
			scope.fnaddCourseElement = function(selectedField,displayName, addIndex, subElement, parentId){

				//getting the name of the field to a varaibale
	            var name = scope.$parent.field.name;

	            //getting the existing fields shema into an array
	            var existingFields = scope.$parent.$parent.$parent.form.schema.fields;

	            // looping through the array to get the existing schema object so that the new schema  can be added after that
	            var currentIndex = 0;
	            for (var i in existingFields){
	            	if(angular.equals(name,existingFields[i].name)){
	            		currentIndex = i;
	            		break;
	            	}
	            }



				//pushing the selected field into the specified index
	            currentIndex=currentIndex*1;
	            var debugObject = angular.fromJson(JSON.parse(selectedField[0].Debug));
	            
	           
	            debugObject.displayName = displayName+' ('+ debugObject.displayName +')';
        		var date=new Date();        		

        		if(angular.equals(debugObject.customlist, undefined)){
		        			debugObject.customlist = [];
		        		}
				debugObject.customlist.push({key:'cef-remove-button', text:'true'});

        		if(subElement){
		        				        	

		        		debugObject.customlist.push({key:'sub-element', text:'true'});
		        		
		        		debugObject.parentElementId = parentId;
        		}


        		// finding the index at which the field is to be added
        		var indexToAddAt;

        		if (angular.equals(addIndex,'below')){

        			// find out the index so that the added element comes after the sub elements of the element, if any
        			var indexIncrementCount = 0;
        			if(angular.isDefined(scope.currentField.uniqueId)){//the element has sub elements

        				for (var j in existingFields){
        					if(angular.equals(scope.currentField.uniqueId,existingFields[j].parentElementId))
        						indexIncrementCount++;
        				}

        			}


        			indexToAddAt = currentIndex+1 + indexIncrementCount;
        		}
        		else{
        			indexToAddAt = currentIndex;
        		}

        		debugObject.name ="field"+Math.floor(Math.random()*10)+date.getTime();
	            existingFields.splice(indexToAddAt,0,debugObject);

	            
	         

			}	



            

			

			//$(element).after($compile(optionsBtn)(scope.$parent));

		}
	};
}]);
