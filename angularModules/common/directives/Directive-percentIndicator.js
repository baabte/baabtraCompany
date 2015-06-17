angular.module('baabtra').directive('percentIndicator', function() {
	return {
		restrict: 'EA',
		scope:{totalValue:"=",obtainValue:"=",showPercentage:'=',valueSuffix:'@'},
		templateUrl: 'angularModules/common/directives/Directive-percentIndicator.html',
		link: function(scope, element, attrs, ctrls) {

			// console.log(scope.totalValue);
			// console.log(scope.obtainValue);
			scope.$watch(function(){ return scope.totalValue+''+scope.obtainValue },function(){
				if(isNaN(scope.totalValue*1)){
					scope.totalValue=0;
				}
				if(isNaN(scope.obtainValue*1)){
					scope.obtainValue=0;
				}
				if(angular.equals(scope.totalValue,0)||angular.equals(scope.obtainValue,0)){
					scope.percentage=0;
					scope.totalValueData=scope.totalValue;
			    	scope.obtainValueData=scope.obtainValue;
				}
				else{
				// if(!isNaN(scope.totalValue*1)&&!isNaN(scope.obtainValue*1)){
					scope.totalValueData=scope.totalValue*1;
			    	scope.obtainValueData=scope.obtainValue*1;
			    	scope.percentage=Math.floor((scope.obtainValueData/scope.totalValueData)*100);
					}
					if(scope.percentage==100){
						scope.textColour='text-success';
						scope.badgeColour='btn-success';
						scope.progressColour='progress-bar progress-bar-success';
					}
					else if(scope.percentage>=80){
						scope.textColour='text-info';
						scope.badgeColour='btn-info';
						scope.progressColour='progress-bar progress-bar-info';				
					}
					else if(scope.percentage>=60){
						scope.textColour='text-primary';
						scope.badgeColour='btn-primary';
						scope.progressColour='progress-bar progress-bar-primary';
					}
					else if(scope.percentage>=30){
						scope.textColour='text-warning';
						scope.badgeColour='btn-warning';
						scope.progressColour='progress-bar progress-bar-warning';
					}
					else if(scope.percentage<30){
						scope.textColour='text-danger';
						scope.badgeColour='btn-danger';
						scope.progressColour='progress-bar progress-bar-danger';
					}
				// }
			});
			

			
			
		}
	};
});
