angular.module('baabtra').directive('subElement', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {

			
			var parentClass = scope.field.schema.parentElementId;
						

			var parent = $(element).parents('.fieldContainer');
			parent.addClass("col-xs-push-1 col-xs-5");
			parent.find(".optionsBtn").remove();
			parent.removeClass("shadow-z-1 b-b");



			//for controlling the size in the preview
			parent = $(element).parents('.elementField');
			parent.addClass("col-xs-push-1 col-xs-5");
			parent.find(".optionsBtn").remove();
			



		}
	};
});