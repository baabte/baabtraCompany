angular.module('baabtra').directive('courseSummary', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			courseDetails:"=",
			summaryViewIn:"="
		},
		templateUrl: 'angularModules/course/directives/Directive-courseSummary.html',
		link: function(scope, element, attrs, fn) {
		var summaryViewTypes = {0:{id: "1",name: "Year(s)",mFactor:(1/525600),show:true},
                        		1:{id: "2",name: "Month(s)",mFactor:(1/43200),show:true},
                        		2:{id: "3",name: "Week(s)",mFactor:(1/10080),show:true},
                        		3:{id: "4",name: "Day(s)",mFactor:(1/1440),show:true},
                        		4:{id: "5",name: "Hour(s)",mFactor:1/60,show:true},
                        		5:{id: "6",name: "Minute(s)",mFactor:1,show:true}};//mFactor is multiplication factor
       	scope.summaryViewIn = summaryViewTypes[scope.summaryViewIn-1];
       	scope.summaryDetails = {};
			angular.forEach(scope.courseDetails, function(elements, key){
				if(angular.equals(scope.summaryDetails[Math.ceil(key*scope.summaryViewIn.mFactor)],undefined)){
					scope.summaryDetails[Math.ceil(key*scope.summaryViewIn.mFactor)] = [];
				}
				angular.forEach(elements, function(element){
					if(angular.equals(typeof element,"object")){
						angular.forEach(element, function(elem){
							if(!angular.equals(elem.Name,"Payment_checkpoint")){
								scope.summaryDetails[Math.ceil(key*scope.summaryViewIn.mFactor)].push({icon:elem.Icon,title:elem.elements[0].value});
							}
						})
					}
				});
			});
		}//link
	};
});
