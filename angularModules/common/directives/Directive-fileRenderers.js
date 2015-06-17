angular.module('baabtra').directive('renderImage', ['fileReader',function(fileReader) {
	return {
		restrict: 'A',
		require: ["^?form",'ngModel'],
		scope:{imgToRender:"="},
		link: function(scope, element, attrs, ctrls) {


			//keeping the form control in a variable
			var formCtrl = ctrls[0];
			var formName = formCtrl.$name;
			

			//taking the file source name to a variable (name of the control where the file is selected)
			var srcName = attrs.fileSource;

			// getting the file source control			
			var fileSource = formCtrl[srcName];
			var fileElement = angular.element($('[' + srcName + ']'));		

			//defining a function to get the file from the file input
			scope.getFile = function(){				
					var formContext = angular.element(fileElement.context[formName]);					
					// looping through the formContext to get the correct input field
					angular.forEach(formContext[0], function(formElem){
						if(angular.equals(formElem.name,srcName)){
							// taking the file into a scope variable
							scope.file = formElem.files[0];
						}
					});

				return scope.file;
			}
			
			

			// setting a watch on the file variable to change the source whenever the file changes
			scope.$watch(function (){return scope.getFile();/* define what to watch*/
				}, function(){
						if(!angular.equals(scope.file, undefined)){							
							fileReader.readAsDataUrl(scope.file, scope)
						                     .then(function(result) {             
						                         scope.imgToRender = result;      
					 		});
						}					

			});				

		}
	};
}]);