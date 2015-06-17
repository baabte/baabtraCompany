angular.module('baabtra')

//Add scope.icon to individual controls
.directive('indicateVal', function() {
	return {
		restrict: 'A',
		require :["^?form",'ngModel'],
		link: function(scope, elem, attrs, ctrls) {

	
		// console.log(ctrls[1].$error);
	

			scope.$watch(function (){return elem.context.value;/* define what to watch*/
}, function() { 
								

			  		// the array to hold the symbols
					scope.symbolCollection = {
						'required': 'ti-star',
						'email':'ti-email',
						'phone':'ti-mobile',
						'date' : 'ti-calendar',
						'facebook': 'ti-facebook',
						'twitter':'ti-twitter-alt',
						'google':'ti-google',
						'linkedin' : 'ti-linkedin',
						'amount' : 'ti-money',
						'youtube':'ti-youtube',
						'number':'fa fa-sort-numeric-asc'

					};

						//$(elem).parent().attr('class', 'input-group m-b col-xs-12');
						scope.icon=$('<span class="indicate-val-icon"></span>');

						scope.icon.addClass(scope.symbolCollection[attrs.indicateVal]);						
						add=true;

									

						
						if(add && !$(elem).parent().find("span").length){
							$(elem).parent().find("label").prepend(scope.icon);
						}

						
					delete 	ctrls[1].$error.messages;
					// console.log(ctrls[1].$error);
				

					//don't show any colors if the form is untouched
					if(!ctrls[0].$pristine)	{				

						if(Object.keys(ctrls[1].$error).length > 0){
							$(elem).parent().find("span").addClass('text-danger');
							$(elem).parent().addClass('md-input-invalid');							
						}
						else{ //otherwise the color of the existing scope.icon will change to blue							
							$(elem).parent().find("span").removeClass('text-danger').addClass('text-success');				
							$(elem).parent().removeClass('md-input-invalid');
						}
 					}						
			},true);

				// //setting a watch function on the elem.context.required attribute
				// scope.$watch(function (){return ctrls[1].$invalid;/* define what to watch*/
				// }, function(){

					

				// });	
//>>>>>>> e0d8f506ab7fad6f653d352b347009b3907fa2b0
							
			
		} 
	  
	}

})

//to set atleast one required field in a group of fields
.directive('validateOneInMany', ['$parse', function($parse) {
	return {
		restrict: 'A',
		require: ["^?form",'ngModel'],
		link: function(scope, elem, attrs, ctrls) {

			//checking for the existence of the "validation-group" attribute and throwing the error
			if(!attrs.validationGroup){
				throw new Error('The "validate-one-in-many" directive needs a "validation-group" attribute to work properly');
				return;
			}

			//defining an object to hold the validation groups in a form context
			if(angular.equals(scope.validationGroups, undefined)) {
				scope.validationGroups={};
			}		

		    
			//pushing the elements with the same validation groups into an array in the object with the validation group as the key
			if(angular.equals(scope.validationGroups[attrs.validationGroup], undefined)) {			
			scope.validationGroups[attrs.validationGroup]=[];
			}
			scope.validationGroups[attrs.validationGroup].push(ctrls[1]);
			//.End


			//binding a change event to validate when the text changes
			scope.$watch(function (){return elem.context.value;/* define what to watch*/
}, function(){				
			

				//defining a variable to hold the validation group name
				scope.vgName = attrs.validationGroup;
				
					
					//if the current element is valid
					if(!ctrls[1].$error.required) {	

						// if the control is valid setting the other controls in the same validation group to valid
						for (var i = 0; i < scope.validationGroups[scope.vgName].length; i++ ){	

								scope.validationGroups[scope.vgName][i].$setValidity("required", true);
						}
																		
						
	                } else{

	                	var setAllRequired = true;                	

	                	// checking whether the value of the element i null, if so validate other controls and set the validity to true if any of the other fields holds a value
	                	if(angular.equals(elem.context.value.trim(),"") && !ctrls[0].$pristine)	{

	                		for (var i = 0; i < scope.validationGroups[scope.vgName].length; i++ ){	
	                			if(!angular.equals($( "input[name='" + scope.validationGroups[scope.vgName][i].$name + "']" ).val().trim(), "")){
	                				setAllRequired = false;
	                			}	                		

	                		} //.End for (var i = 0; i < scope.validationGroups[scope.vgName].length; i++ )

	                		// 2nd loop to set the controls valid or invalid in accordance with the setAllRequiredVariable
	                		for (var i = 0; i < scope.validationGroups[scope.vgName].length; i++ ){
	                			
	                			scope.validationGroups[scope.vgName][i].$setValidity("required", !setAllRequired);

	                		} //.End 2nd loop
								
						} //.End if(angular.equals(elem.context.value.trim(),""))

	                }

	                //.End if(!ctrl.$invalid)

                // }

			});// .End scope.$watch(function (){return elem.context.value	


		} //.End link
	  
	}//. End return

}]); // .End directive('validateOneInMany'