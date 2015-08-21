/*
	@license Angular Treeview version 0.1.6
	ⓒ 2013 AHN JAE-HA http://github.com/eu81273/angular.treeview
	License: MIT
	[TREE attribute]
	angular-treeview: the treeview directive
	tree-id : each tree's unique id.
	tree-model : the tree model on $scope.
	node-id : each node's id
	node-label : each node's label
	node-children: each node's children
	<div
		data-angular-treeview="true"
		data-tree-id="tree"
		data-tree-model="roleList"
		data-node-id="roleId"
		data-node-label="roleName"
		data-node-children="children" >
	</div>
*/

(function ( angular ) {
	'use strict';

	angular.module( 'angularTreeview', [] ).directive( 'treeModel', ['$compile', function( $compile ) {
		return {
			restrict: 'A',
			link: function ( scope, element, attrs ) {
				
				//tree id
				var treeId = attrs.treeId;
				
				var nodeEdit = attrs.nodeEdit;
				
				var nodeOutput = attrs.nodeOutput;

				var treeMode=attrs.treeMode;

				var status = attrs.status;

				var nodeType = "";
				if(attrs.nodeType){
					nodeType = attrs.nodeType;
				}
				
				
				//for finding the output variable in the scope #created by lijin on 13-5-2015
				var	outKeyArray=nodeOutput.split('.');
				var outKey='';
					var outElem=scope;
					for(var index in outKeyArray){
						if(index<outKeyArray.length-1){
							outElem=outElem[outKeyArray[index]];	
						}
						else{
							outKey=outKeyArray[index]
						}
						
					}				
				//tree model
				var treeModel = attrs.treeModel;
				// console.log(scope.node)

				//node id
				var nodeId = attrs.nodeId || 'id';
				
				//node label
				var nodeLabel = attrs.nodeLabel || 'label';

				//children
				var nodeChildren = attrs.nodeChildren || 'children';

				//tree template

				if(status=='true'){
					var statusArray=["Pending Submission","Pending Evaluation","Evaluated"]
					// console.log(statusArray)
					var template =
					'<ul  >' +
						'<li data-ng-repeat="node in ' + treeModel + '">' +
							'<i class="fa fa-plus-square btn no-padding text-md"  data-ng-show="node.' + nodeChildren + '.length && node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)" ></i>' +
							'<i class="fa fa-minus-square btn no-padding text-md "  data-ng-show="node.' + nodeChildren + '.length && !node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
							'<i class="mdi-content-send text-md"  data-ng-hide="node.' + nodeChildren + '.length"></i> ' +
							'<span class="nodeItem " ng-if="!node.status" ng-class="{"font-normal":!node.children.length}" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +	
							'<span class="nodeItem text-warning" ng-if="node.status ==\'' +statusArray[0]+ '\'" ng-class="{"font-normal":!node.children.length}" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +
							'<span class="nodeItem text-info" ng-if="node.status ==\'' +statusArray[1]+ '\'" ng-class="{"font-normal":!node.children.length}" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +	
							'<span class="nodeItem text-success" ng-if="node.status ==\'' +statusArray[2]+ '\'" ng-class="{"font-normal":!node.children.length}" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +	
	

	

							'<div data-node-output="'+ nodeOutput +'" data-node-edit="'+ nodeEdit +'" data-tree-mode="'+ treeMode +'" data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + ' data-status=' + status + '></div>' +

						'</li>' +
					'</ul>';


				}else{

					var template =
					'<ul  >' +
						'<li ng-if="node.' + nodeLabel + '" data-ng-repeat="node in ' + treeModel + '">' +
							'<i class="fa fa-plus-square btn no-padding text-md"  data-ng-show="node.' + nodeChildren + '.length && node.collapsed"  data-ng-click="' + treeId + '.selectNodeHead(node)" ></i>' +
							'<i class="fa fa-minus-square btn no-padding text-md "  data-ng-show="node.' + nodeChildren + '.length && !node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
							'<i class="mdi-content-send text-md"  data-ng-hide="node.' + nodeChildren + '.length"></i> ' +
							'<span class="nodeItem " ng-class="{"font-normal":!node.children.length}" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +
							'<span class="p-h nodeEdit" ng-if="'+ nodeEdit +'">'+

							
							'<a href="" class="icon-grey p-h-xs"  data-nodrag ng-click="showPopupForAddChild(node)" data-placement="right" bs-tooltip data-title="Add a '+nodeType+' under {{node.name}}"><i class="ti  ti-layers-alt" ></i><a/>'+
							'<a  href="" class="icon-grey p-h-xs" data-nodrag ng-click="editChild(node)" data-placement="right" bs-tooltip data-title="Edit {{node.name}}"><i class="fa fa-edit" ></i></a>'+
							'<a href="" class="icon-grey p-h-xs" ng-if="node.parent !=\'root\'" data-nodrag ng-click="removeChild(node)" data-placement="right" bs-tooltip data-title="Remove {{node.name}}"><i class="fa fa-trash-o" ></i></a></span>'+
							'<div data-node-output="'+ nodeOutput +'" data-node-edit="'+ nodeEdit +'" data-tree-mode="'+ treeMode +'" data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren +'></div>' +

						'</li>' +
					'</ul>';


				}
				

				//check tree id, tree model
				if( treeId && treeModel ) {
					//root node
					if( attrs.angularTreeview ) {
					
						//create tree object if not exists
						scope[treeId] = scope[treeId] || {};

						//if node head clicks,
						scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function( selectedNode ){

							//Collapse or Expand
							selectedNode.collapsed = !selectedNode.collapsed;
							if(scope.fnLoadChild){
								scope.fnLoadChild(selectedNode);
							}
						};

						//if node label clicks,
						scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function( selectedNode ){

							if(!selectedNode.children.length||treeMode=='add'){

								outElem[outKey]=selectedNode;

								//remove highlight from previous node
								if( scope[treeId].currentNode && scope[treeId].currentNode.selected ) {
									scope[treeId].currentNode.selected = undefined;
								}

								//set highlight to selected node
								selectedNode.selected = 'selected';

								//set currentNode
								scope[treeId].currentNode = selectedNode;
							}
							else{
								outElem[outKey]=''
							}
						};
					}

					//Rendering template.
					element.html('').append( $compile( template )( scope ) );
				}
			}
		};
	}]);
})( angular );



        	