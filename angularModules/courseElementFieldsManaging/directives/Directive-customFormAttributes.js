angular.module('baabtra').directive('customFormAttributes',['$alert', function($alert) {
	return {
		restrict: 'E',
		replace: true,
		require: 'ngModel',
		scope: {
			attList:"=ngModel",
			attType:"=",
			parentFormObj:"=",
			indexRef:"="
		},
		templateUrl: 'angularModules/courseElementFieldsManaging/directives/Directive-customFormAttributes.html',
		link: function(scope, element, attrs) {
			optionCounter=1;
			scope.field={};
			valueCounter=0;
			//scope.attList=[{"text":"","value":"Attribute1"}];
			   scope.handleValueChange=function(newValue, oldValue) {

			    // Called by the watch collection
			    // Ensure that when the selected value is changed, this
			    // is synced to the field value.
			    

			    if (newValue !== oldValue) {
			      if (scope.multiple) {
			        scope.field.key[newValue] = scope.field.key[oldValue];
			        delete scope.field.key[oldValue];
			      } else {
			        if (oldValue === scope.field.key) {
			          scope.field.key = newValue;
			        }
			      }
			    }
			  };
				// Monitor for changes in the options array and ensure a
  				// watch for every option value.
  				// Watchers are deleted when removing options from the array.
			 /* scope.$watchCollection('attList', function(options) {
			  
			    if (options) {
			      angular.forEach(options, function(option) {

			        if (!option.$_valueWatchFn) {
			          option.$_valueWatchFn = scope.$watch(function() {
			            return option.key;
			          }, handleValueChange);
			        }
			      });
			    }
			  });*/
				//watch ngModel list to check validation
				scope.$watch('attList',function(){
					if(!angular.equals(scope.parentFormObj,undefined)){
			    		var obj=angular.copy(scope.parentFormObj);
			    		obj.splice(scope.indexRef,1);
			    		angular.forEach(obj,function(field){
			       				if(angular.equals(field.mandatoryAttributes[0].text,scope.attList[0].text)){
			       					//scope.attList[0]= scope.attList[0] + valueCounter++;
			    					$alert({title: 'Already exist!', content: 'This ngModel is already used. Please use another', placement: 'top-right', type: 'warning', show: true, animation:'am-fade-and-slide-right', duration:5});
			    				}
			    		});
			    	}
				},true);

			  //to add new attribute
			  scope.addOption = function() {

			    if (!scope.attList) {
			      scope.attList = [];
			    }

			    var option = {
			      key: 'Attribute' + optionCounter++,
			      text:""
			    };

			    scope.attList.push(option);

			    var count = scope.attList.length;

			    /*if(!scope.multiple && count === 1) {
			      scope.field.value = option.value;
			    }*/

			  };

			  //to remove the attrribute
			  scope.removeOption = function(index) {
			    var options = scope.attList.splice(index, 1);

			    if (options && options.length) {

			      var option = options[0];

			      if (scope.multiple) {

			        if(scope.field.key[option.key] !== undefined)
			          delete scope.field.key[option.key];

			      } else {

			        if (option.key === scope.field.key && scope.attList.length) {
			          scope.field.key = scope.attList[0].key;
			        }

			        option.$_valueWatchFn();
			      }
			    }
			  };
		}
	};
}]);
