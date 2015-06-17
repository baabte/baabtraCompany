angular.module('baabtra').directive('durationSelector', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {duration:"=",
				durationInMinutes:"=",
				totDurationInUnits:"="},
		templateUrl: 'angularModules/durationSelector/directives/Directive-durationSelector.html',
		link: function(scope, element, attrs, fn) {

			scope.unitsArray={
				Minutes:{'Year(s)':525600, 'Month(s)':43200, 'Week(s)':10080, 'Day(s)':1440, 'Hour(s)':60, 'Minute(s)':1},
				Hours:{'Year(s)':8760, 'Month(s)':720, 'Week(s)':168, 'Day(s)':24, 'Hour(s)':1, 'Minute(s)':0},
				Days:{'Year(s)':365, 'Month(s)':30, 'Week(s)':7, 'Day(s)':1, 'Hour(s)':0, 'Minute(s)':0},
				Weeks:{'Year(s)':52, 'Month(s)':4, 'Week(s)':1, 'Day(s)':0, 'Hour(s)':0, 'Minute(s)':0},
				Months:{'Year(s)':12, 'Month(s)':1, 'Week(s)':0, 'Day(s)':0, 'Hour(s)':0, 'Minute(s)':0},
				Years:{'Year(s)':1, 'Month(s)':0, 'Week(s)':0, 'Day(s)':0, 'Hour(s)':0, 'Minute(s)':0}
			}

			scope.durationTypes = [{id: "1",name: "Year(s)"},
									{id: "2",name: "Month(s)"},
									{id: "3",name: "Week(s)"},
									{id: "4",name: "Day(s)"},
									{id: "5",name: "Hour(s)"},
									{id: "6",name: "Minute(s)"}];

			// function to get the id of the key
			scope.getDurationIdByName = function(durName){
				var id = 0;
				for (var i =0; i < scope.durationTypes.length; i++) {					
					
					if (angular.equals(scope.durationTypes[i].name, durName)){
						id = scope.durationTypes[i].id;
						break;
					}
					
				}
				return id;
			}


			if(!angular.equals(scope.duration,undefined)){
			    scope.addeddurationTypes = [];				
				for(key in scope.duration ){					
				scope.addeddurationTypes.push({id: scope.getDurationIdByName(key),name: key,Duration:scope.duration[key], selected:{id: scope.getDurationIdByName(key),name: key}});
				}
			}
			else{
				scope.addeddurationTypes = [{id: "1",name: "Year(s)",Duration:1, selected:{id: "1",name: "Year(s)"}}];
			}
			
			


			
			//scope.Duration = scope.addeddurationTypes;

			scope.durationTypesLength = Object.keys(scope.durationTypes).length;


			scope.removeDuration = function(singleDurationIndex){
				scope.addeddurationTypes.splice(singleDurationIndex,1);
			};

			scope.addDuration = function(singleDuration){
				var name;
				for (var i=0; i<scope.durationTypes.length; i++){
					if(angular.equals(scope.durationTypes[i].name, singleDuration.name)){
						name = scope.durationTypes[i+1].name;
					}
				}

				scope.addeddurationTypes.push({id: scope.addeddurationTypes.length + 1 ,name: name,Duration:1, selected : {id: scope.addeddurationTypes.length + 1 ,name: name}});
			};

			scope.$watch('addeddurationTypes', function(){				
				scope.duration = {};
				for (var i = 0; i < scope.addeddurationTypes.length; i++) {
					if(angular.equals(scope.duration[scope.addeddurationTypes[i].selected.name],undefined)){
						scope.duration[scope.addeddurationTypes[i].selected.name] = scope.addeddurationTypes[i].Duration;
					}else{
						 scope.duration[scope.addeddurationTypes[i].selected.name] = parseInt(scope.duration[scope.addeddurationTypes[i].selected.name]) + parseInt(scope.addeddurationTypes[i].Duration);
					}					
				}	


			},true);

			scope.$watch('duration', function(){

				if(!angular.equals(scope.duration,undefined)){
					scope.totDurationInUnits = 0;
					scope.durationInMinutes = 0;			
					for(key in scope.duration ){				
						scope.totDurationInUnits = scope.totDurationInUnits + (parseInt(scope.duration[key]))*(parseInt(scope.unitsArray[attrs.returnIn][key]));
					}
					scope.durationInMinutes = scope.totDurationInUnits;

					var tempDuration = JSON.stringify(scope.duration);					
					tempDuration = JSON.parse(tempDuration);
					scope.addeddurationTypes=[];
					var i = 1;
					for (key in tempDuration) {	
							scope.addeddurationTypes.push({id:i, name:key, Duration:tempDuration[key],selected:{id:i, name:key, Duration:tempDuration[key]}})
							i++;			
					};			
				}
			},true);	

			}//link end
		}
	});
