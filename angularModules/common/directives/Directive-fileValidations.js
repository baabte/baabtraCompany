angular.module('baabtra')

// .directive("ngFileSelect",['fileReader','$rootScope',function(fileReader, $rootScope){  //directive for file onload preview

//  return {
//    scope:true,
//    link: function($scope,el,attr,ctrls){   



//      //console.log(ctrls);
//      el.bind("change", function(e){      
//           $scope.getFile();          
//      });

//      $scope.getFile = function () {
      
//        fileReader.readAsDataUrl($scope.file, $scope)
//                      .then(function(result) {                     
//                          $scope.$parent.imageSrc = result;       
//         });
//      };
//    }
   
//  }; 
 
// }])

//directive to validate the max size of the file
.directive('fMaxSize', ['$parse','fileReader', function($parse, fileReader) {
	return {
		restrict: 'A',
		require: ["^?form",'ngModel'],		
		link: function(scope, elem, attrs, ctrls) {

			// if there is no $error object in the control, define an error object to push our custom validation error
			if (angular.equals(ctrls[1].$error, undefined)){
				ctrls[1].$error = {};
			}



			//pushing our custom validity error into the $error object of the control, this decided the validity and invalidity of the control in accordance with the custom validations
			ctrls[1].$error.fMaxSize =  false;			

			// binding the change function to the control
			elem.bind("change", function(e){ 
				
					
				   //getting the file object of the control into a scope variable
			       scope.file = (e.srcElement || e.target).files[0];

			       // checking the validity of the control (f-max-size)		      
			       if(scope.validateFileSize()) {
			      
				       	// if the control is valid setting the validity of the control to true
				        ctrls[1].$setValidity("fMaxSize", true);			       

				       	//setting the tolltip to null if the file is valid
				       	scope.title = '';

				       	//removing the red danger class
				       	elem.removeClass('bg-danger lt');

			       }

			             
			});

				// To validate the file attributes
			     scope.validateFileSize = function () {     

						// file size checking
					      if ((scope.file.size) > parseInt(attrs.fMaxSize)*1024) { 


					     	  // if the file size has a size more than the defined f-max-size attribute, setting the property in the $error object of the control to false. This will in turn set the form invalid		  			
					      	  ctrls[1].$setValidity("fMaxSize", false);  	  
					      	  
					      	  //setting the corresponding title(tooltiop)
					      	  scope.title = 'This exceeds the maximum file size limit of ' + attrs.fMaxSize + 'Kb';
					      	  
					      	  // adding a danger class to the control
					          elem.addClass('bg-danger lt'); 

					          				         
					          // returning the flse status back
					          return false;             
					       }
					       else{

					       	  //else return true status
					       	  return true;
					       }       

			    };

		} //.End link
	  
	}//. End return

}]); // .End directive('fMaxSIze'