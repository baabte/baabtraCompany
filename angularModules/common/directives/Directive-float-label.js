angular.module('baabtra').directive('floatLabel', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {


            $(element).removeAttr("float-label");
			

			//wrap the element in a full width div
			if(angular.equals(attrs.wrapperless,undefined))	{		
				$(element).wrap('<div class="col-xs-12 no-padding m-t-sm"></div>');
			}

			//hiding the label if the textbox has no value
			var html = $('<div class="col-xs-12 no-padding">');
			html.html('<label></label>');

			if(angular.equals($(element).parent().find('label').length, 0)) {

				$(element).parent().prepend(html);
			}
			var label = $(element).parent().parent().find('label');


			//label.addClass("am-slide-bottom");
			label.parent().height(20);

			if(angular.equals($.trim($(element).val()),"")){									
					label.hide();
			}



			function bindValChangeWatch(){
			
					//setting a watch on the elements value when data is loaded dynamically the watch will be unbound once executed
					var unbindThis=scope.$watch(function() {return $(element).val();},function () {             
						
						if(angular.equals($.trim($(element).val()),"")){									
							label.hide();
						}
						else{
							label.html(attrs.placeholder);
							label.show();
							unbindThis();
						}
						

						
					});
			}

			bindValChangeWatch();

			//End. setting a watch on the elements value when data is loaded dynamically the watch will be unbound once executed

			
			//hiding and showing the label on the basis of value in the textbox
			var actions=["keyup"];
			if (angular.equals(element.context.type,"number")){
				actions.push("change");
			}
			else if (angular.equals(element.context.type,"select")){
				actions.push("change");
			}


		for(var i=0; i<actions.length; i++) {		
			$(element).on(actions[i], function(){

				if(angular.equals($.trim($(element).val()),"")){									
					label.hide();
					bindValChangeWatch();
				}
				else{						
					label.html(attrs.placeholder);
					label.show();
				}
		
			});
		}
			
		}
	};
});