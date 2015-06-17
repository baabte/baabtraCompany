angular.module('baabtra').directive('addAttrDir',['$compile', function($compile) {
	return function(scope, element, attrs){
		element.bind("click", function(){
			angular.element(document.getElementById('getattrs')).append($compile("<label class='col-sm-3 control-label m-t' ></label><div class='col-sm-8 m-t'><div class='col-sm-6' style='padding-left:0'><input type='text' class='form-control'  placeholder='attribute name' ng-model='attributename'></div><div class='col-sm-6' style='padding-right:0;'><input type='text' class='form-control' placeholder='attribute value' ng-model='attributevalue'></div></div><label class='col-sm-1 m-t' ><i href class='ui-icon m-t-sm fa fa-plus' bs-tooltip='attrTooltip'  ></i> </label>")(scope));
			
		});
	};
}]);