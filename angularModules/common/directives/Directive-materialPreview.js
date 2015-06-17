angular.module('baabtra').directive('materialPreview',['$modal', function($modal) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"=",
			addmaterial:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-materialPreview.html',
		link: function(scope, element, attrs, fn) {

			scope.$watch('addmaterial', function(){				
				if(scope.addmaterial){
					scope.buttonShow=true;
				}
			});
			// console.log(scope.data);
			scope.elementPreview=function(){
				
            	// Show when some event occurs (use $promise property to ensure the template has been loaded)
            	var modalPreview = $modal({scope: scope, template: 'angularModules/common/popup/popup-elementPreview.html', show: false});
             	modalPreview.$promise.then(modalPreview.show);
           
			};

		
		}
	};
}]);
