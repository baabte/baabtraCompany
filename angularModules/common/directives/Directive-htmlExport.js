angular.module('baabtra').directive('htmlExport', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {
			$(element).tableExport({type:'pdf',escape:'false',htmlContent:'false'});
		}
	};
});