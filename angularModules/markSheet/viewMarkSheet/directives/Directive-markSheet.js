angular.module('baabtra').directive('markSheet', ['$compile', function ($compile) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			markSheetObj: '='
		},
		templateUrl: 'angularModules/markSheet/viewMarkSheet/directives/Directive-markSheet.html',
		link: function(scope, element, attrs, fn) {

		scope.settPadding = function(node){
			if(node.children.length){
				return 'margin-bottom: 10px;';
			}
		}	
		// var template = '<div><div class="col-xs-12 bg-white " style="{{settPadding(node)}};padding-right: 0px;" ng-if="node.mark.markScored"  ng-repeat="node in markSheetObj">'
		// 			  +'<div col-xs-1><i class="fa fa-plus-square"></i></a></div><div class="col-xs-7 no-padding font-normal b-b" style="{{settPadding(node)}}">{{node.name}}</div>'
		// 			  +'<div class="col-xs-2 no-padding text-center b-b" >{{node.mark.markScored}}</div>'
		// 			  +'<div class="col-xs-2 no-padding text-center b-b" >{{node.mark.maxMark}}</div>'
		// 			  +'<mark-sheet ng-if="node.children.length" mark-sheet-obj="node.children">'
		// 			  +'</mark-sheet>'
		// 			  +'</div></div>';

		var template = '<div ng-model="markSheetObj.activePanel" role="tablist" aria-multiselectable="true" bs-collapse>'
  						+'<div class=" b panel-default" ng-repeat="node in markSheetObj">'
    					+'<div class="panel-heading" role="tab">'
      					+'<h4 class="panel-title">'
        				+'<a bs-collapse-toggle><i ng-if="node.children.length" ng-class="{\'fa-minus-square\': markSheetObj.activePanel == $index}" class="fa fa-plus-square m-r"></i>{{node.name}}&nbsp;<span class="pull-right text-dark" >{{node.mark.markScored}}/{{node.mark.maxMark}}</span></a>'
        				+'</h4>'
        				+'</div>'
    					+'<div class="panel-collapse" role="tabpanel" bs-collapse-target>'
      					+'<div class="panel-body" ng-if="node.children.length"><mark-sheet  mark-sheet-obj="node.children">'
			 			+'</mark-sheet></div>'
      					+'</div>'
      					+'</div>'
      					+'</div>';

			element.html('').append( $compile( template )( scope ) );
		}
	};
}]);
