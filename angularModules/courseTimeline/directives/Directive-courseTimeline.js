angular.module('baabtra').directive('courseTimeline',['$state','$rootScope','$popover','$templateCache','$aside','addCourseService','addCourseElementService','courseElementFieldsManaging','bbConfig', '$modal', '$alert', function($state,$rootScope,$popover,$templateCache,$aside,addCourseService,addCourseElementService,courseElementFieldsManaging,bbConfig, $modal, $alert) {
	return {
		restrict: 'E', // to use as an element . Use 'A' to use as an attribute
		scope: {
		totalDuration:"=totalDuration",
		callbackFunctions:"=callbackFunctions",
		syncData:"=",
		tlElements:"=tlElements",
		courseId:"=courseId",
		coursePreviewObj:"="
		},
		templateUrl: 'angularModules/courseTimeline/directives/Directive-courseTimeline.html',
		link: function(scope, element, attrs, fn) {
		scope.MURID = bbConfig.MURID;//mentee role id 

		var courseElementFieldsResponse = courseElementFieldsManaging.fnGetCourseElementFields();
			courseElementFieldsResponse.then(function(response){
				scope.courseElements = angular.fromJson(JSON.parse(response.data));
			});
			scope.ddlBindObject = {0:{id: "1",name: "Year(s)",mFactor:(1/525600),show:true},
                        1:{id: "2",name: "Month(s)",mFactor:(1/43200),show:true},
                        2:{id: "3",name: "Week(s)",mFactor:(1/10080),show:true},
                        3:{id: "4",name: "Day(s)",mFactor:(1/1440),show:true},
                        4:{id: "5",name: "Hour(s)",mFactor:1/60,show:true},
                        5:{id: "6",name: "Minute(s)",mFactor:1,show:true}};//mFactor is multiplication factor
			//setting selected duration type as first object

			scope.$watch('syncData.selectedDuration',function(){
				if(!angular.equals(scope.syncData.selectedDuration,undefined)){
					scope.selectedDuration = scope.syncData.selectedDuration;
					scope.changeDuration(scope.selectedDuration);
				}
				else{
					scope.selectedDuration="4";
				}
			});

			scope.formData={};//used to save datas from timeline

			//These are kept in rootscope as these are to be availble throughout the application
			$rootScope.valid=true;
			$rootScope.errTooltip = "Please choose an image to be shown for the course";


			//saving current state for loading callback functions accordingly - lijin
			scope.currentState=$state.current.name.split('.');
			scope.currentState=scope.currentState[scope.currentState.length-1];

			//set a duration in minutes (initially) *Note: totalDuration will come from the database and it will be in mintutes
			scope.duration=0;//scope.totalDuration/1440; 

			// Set a minimum width for each individual point
			scope.tlPointMinWidth = 5;


			scope.buildTlObject = function(selectedDuration){//function for building timeline object
				// var selectedDuration = selectedDuration;
				scope.$watch(function(){return scope.syncData.courseTimeline},function(){
				if(!angular.equals(scope.syncData.courseTimeline,undefined)){
					var name=scope.ddlBindObject[scope.selectedDuration-1].name.replace('(s)','');
					var newTlPoint = 1;
					scope.timeLineView = {};

					// buliding the element order according to tlpoint 
					var elementOrderOldFormat = angular.copy(scope.syncData.elementOrder);

					var elementOrderNewFormat={};//variable to store the new element order formatted in the basis of timelinr point 
					//tlpoint also changed according to the showing points mFactor method
					for (var key in elementOrderOldFormat){
						var elementOrderSplitArray=elementOrderOldFormat[key].split('.');	
						var tlPoint=Math.ceil(elementOrderSplitArray[0]/(1/scope.ddlBindObject[scope.selectedDuration-1].mFactor));
						elementOrderSplitArray.splice(0,1);
						if (elementOrderNewFormat[tlPoint]){
							elementOrderNewFormat[tlPoint].push(elementOrderSplitArray);
						}else{
							elementOrderNewFormat[tlPoint]=[];
							elementOrderNewFormat[tlPoint].push(elementOrderSplitArray);							
						}
					}
					scope.elementOrderNewFormat={};
					scope.elementOrderNewFormat=elementOrderNewFormat;
					// console.log(scope.elementOrderNewFormat)

					var containerCount = 0;
					scope.containerHeight = 95;

					for (var index in scope.elementOrderNewFormat ){
						if(containerCount < scope.elementOrderNewFormat[index].length){
							containerCount = scope.elementOrderNewFormat[index].length;
						}
					}
					// console.log(containerCount)
					scope.containerHeight = 70/containerCount + (containerCount*70);
					
					if(angular.equals(name,'Minute')){
						scope.timeLineView = angular.copy(scope.syncData.courseTimeline);
					}
					else{
						angular.forEach(scope.syncData.courseTimeline, function (crsElements, timePoint){
							newTlPoint = Math.ceil(timePoint/(1/scope.ddlBindObject[scope.selectedDuration-1].mFactor));
							if(angular.equals(scope.timeLineView[newTlPoint],undefined)){
								scope.timeLineView[newTlPoint] = {};
								}

							angular.forEach(crsElements,function (crsElement,elemType) {
								if(angular.equals(scope.timeLineView[newTlPoint][elemType],undefined) && crsElement.length){
								scope.timeLineView[newTlPoint][elemType] = [];
								}
								angular.forEach(crsElement,function (item, index) {
								item.tlPointInMinute = timePoint*1;
								item.index = index;
								scope.timeLineView[newTlPoint][elemType].push(item);

								//commented by arun to change the height calculation in the basic of 
								// if(containerCount < Object.keys(scope.timeLineView[newTlPoint]).length){
								// 	containerCount = Object.keys(scope.timeLineView[newTlPoint]).length;
								// }
							});

							});
							//commented and placed out side 
							// scope.containerHeight = 30/containerCount + (containerCount*90);
						});
					}
				}
			  }, true);
			};


			//building the object for the first time
			var unbindFirstWatch=scope.$watch('syncData',function () {
				if(!angular.equals(scope.syncData,undefined)){
					scope.buildTlObject(scope.selectedDuration);
					unbindFirstWatch();
				}
			});
			


			//function to change the appearance of the timeline whilst the change in the dropdownlist		 
			scope.durationIn=[];
			scope.changeDuration=function(selectedDuration){
				
				if(!angular.equals(selectedDuration,undefined))
				{	
					scope.syncData.selectedDuration = selectedDuration;
					scope.selectedDuration=selectedDuration;
					// scope.buildTlObject(selectedDuration);//calling function for building timeline object
					var unbindFirstWatch=scope.$watch('syncData',function () {
					if(!angular.equals(scope.syncData,undefined)){
						scope.buildTlObject(selectedDuration);
						unbindFirstWatch();
					}
					});
					
					
				}
				if(scope.durationIn.length<1){
					scope.duration=scope.totalDuration;
				}
				else{
				var name=scope.ddlBindObject[scope.selectedDuration-1].name;
				name = name.replace('(s)','');
				scope.selectedDurType=name;
				scope.duration=Math.ceil(scope.totalDuration*scope.ddlBindObject[scope.selectedDuration-1].mFactor);
				
				}
				scope.setMinWidth(35);
				scope.tlPointList=[];
				scope.buildTlPointList(1);
				
			};

			//function to set the min width of each timeline unit while the selected data in the dropdown changes
			scope.setMinWidth=function(minWidthofTlPnt) {
				scope.tlContainerWidth = element.parent().innerWidth();
				scope.tlPointMinWidth = parseInt((scope.tlContainerWidth-(scope.duration*9)-115)/(scope.duration+1));
				scope.tlPointMinWidth = (scope.tlPointMinWidth<minWidthofTlPnt)?minWidthofTlPnt:scope.tlPointMinWidth;

			};

			/*create a tlPointList object to create the timeline
			*Note: This will be only for visual representation, when
			the user adds a course element it will get added to the 
			courseTimeLine object which will be pushed into the database*/
			scope.tlPointList=[];
			scope.buildTlPointList = function(start){
				scope.tlPointCount = Math.floor(scope.tlContainerWidth/scope.tlPointMinWidth);

				for (var i=start; i<start+scope.tlPointCount&&i<=scope.duration;i++)
				{
					scope.tlPointList.push(i);
				}
				if(i-1==scope.duration){
					scope.toBeLoaded=false;
				}
				else{
					scope.toBeLoaded=true;
				}

			};
			
			scope.toBeLoaded=true;

			//setting the min width of each repeating timeline unit
			scope.changeDuration(scope.selectedDuration);

			// scroll event of the container
			var delay = 200;
			var timeout = null;
			 element[0].querySelector('.tl-container').onscroll=function(e) {
              clearTimeout(timeout);
			    timeout = setTimeout(function(){
			    	//current position of end point of timeline
			    	var endPointPos=element[0].querySelector('.end-of-tl').getBoundingClientRect().left;
			    	
			        if(endPointPos<scope.tlContainerWidth){
			        	scope.buildTlPointList(scope.tlPointList.length+1);
			        	scope.$digest();	
			        }
			    },delay);
            };
            // rebuild the scrollbar
  			 scope.$broadcast('rebuild:me');
  scope.$on('scrollbar.show', function(){
      //console.log('Scrollbar show');
    });
    scope.$on('scrollbar.hide', function(){
      //console.log('Scrollbar hide');
      scope.flag=true;
    });

             scope.$watch('totalDuration',function(){ // for executing when the value of total duration is changed
           	
           	if(!angular.equals(scope.totalDuration,0)&&!angular.equals(scope.ddlBindObject,undefined))
           		{
           		           	//duration dropdown data
           		           			 scope.durationIn=[];
           							 angular.forEach(scope.ddlBindObject,function(obj){
           							 	if(obj.show){
           							 		scope.durationIn.push(obj);
           							 	}
           							 });
									scope.changeDuration(scope.selectedDuration);
									
           		}
           		else
           		{
           			scope.changeDuration();
           		}
           		        });
             if(!angular.equals(scope.callbackFunctions,undefined)){
             	 scope.popoverObject=scope.callbackFunctions[scope.currentState]; //popover object
             	}else{
             		scope.popoverObject=[];
             	}
            

			
            scope.callbackOfTlPointClick=function(selectedPoint){
            	var tlSelectedPoint = scope.ddlBindObject[scope.selectedDuration-1].name.replace('(s)','');
            	tlSelectedPoint = tlSelectedPoint + ' ' + selectedPoint;

            	var startPoint=((selectedPoint/scope.ddlBindObject[scope.selectedDuration-1].mFactor)-(1/scope.ddlBindObject[scope.selectedDuration-1].mFactor)+1);
            	var endPoint=(((selectedPoint)/scope.ddlBindObject[scope.selectedDuration-1].mFactor));
            	scope.coursePreviewObj.datas=[];
            	scope.coursePreviewObj.tlSelectedPoint = tlSelectedPoint;
            	// console.log(scope.elementOrderNewFormat);

				var elementOrderOldFormat = angular.copy(scope.syncData.elementOrder);
					for (var key in elementOrderOldFormat){

						var elementOrderSplitArray=elementOrderOldFormat[key].split('.');	
							if(elementOrderSplitArray[0] >= startPoint && elementOrderSplitArray[0] <= endPoint){
								scope.coursePreviewObj.datas.push(scope.syncData.courseTimeline[elementOrderSplitArray[0]][elementOrderSplitArray[1]][elementOrderSplitArray[2]]);
							
							}
						
					}
		            		

            	//commented by arun to rebuild the course previewobj according to the 
            	// angular.forEach(scope.syncData.courseTimeline, function(CourseElements, key){
            	// 	if(key >= startPoint && key <= endPoint){
            	// 		angular.forEach(CourseElements,function(courseElemType){
            	// 			angular.forEach(courseElemType, function(courseElem){
	            // 				scope.coursePreviewObj.datas.push(courseElem);
	            // 				scope.coursePreviewObj.tlSelectedPoint = tlSelectedPoint;
            	// 			});
            	// 		});
            	// 	}
            	// });
            };

            var selectedCourseElement = {};
            //var selectedTpoint = 0;
              var tlPopOverEditObject=addCourseElementService.FnGetCourseElements("");//calling course element function
      			tlPopOverEditObject.then(function(data){
        			scope.tlPopOverEditObject = angular.fromJson(JSON.parse(data.data));
      			});
            scope.manageCourseElement = function(element,tPoint,selectedIndex){
            	scope.tPoint = tPoint;
            	selectedCourseElement = element;
            	scope.selectedTpoint = element.tlPointInMinute;
            	scope.selectedIndex = selectedIndex;
            };

            scope.editCourseElement = function(){
            	if(!angular.equals(scope.coursePreviewObj,undefined))
            	{
            		scope.coursePreviewObjAside = angular.copy(selectedCourseElement);
            	}
            	angular.forEach(scope.tlPopOverEditObject,function(courseElement){
            		if(angular.equals(selectedCourseElement.Name,courseElement.Name)){
            			scope.courseElement = courseElement;
            			scope.courseElement.courseElementTemplate.fields = [];
            		}
            	});
            	
            	 for(var elementCount=0;elementCount < selectedCourseElement.elements.length; elementCount++){
            	 	if(!angular.equals(selectedCourseElement.elements[elementCount],null)&&!angular.equals(selectedCourseElement.elements[elementCount],undefined)){
            	 		
            	 		angular.forEach(scope.courseElements,function(courseElement){

            	 			if(angular.equals($(courseElement.DefaultTemplate).attr('previewKey'),selectedCourseElement.elements[elementCount].type)){
            	 				var elementTo = angular.fromJson(JSON.parse(courseElement.Debug));
            	 				var date=new Date();
            	 				elementTo.name = "field"+Math.floor(Math.random()*10)+date.getTime();
            	 				elementTo.value = selectedCourseElement.elements[elementCount].value;
            	 				elementTo.displayName = selectedCourseElement.elements[elementCount].displayName;
            	 				if(!angular.equals(selectedCourseElement.elements[elementCount].uniqueId, undefined)){
            	 					elementTo.uniqueId = selectedCourseElement.elements[elementCount].uniqueId;
            	 				}

            	 				if(!angular.equals(selectedCourseElement.elements[elementCount].parentElementId, undefined)){
            	 					elementTo.parentElementId = selectedCourseElement.elements[elementCount].parentElementId;
            	 				}
            	 				
            	 				

            	 				// setting custom attributes, if any
            	 				if(!angular.equals(selectedCourseElement.elements[elementCount].customAttributes, undefined)){
            	 					
            	 					if(angular.equals(elementTo.customlist, undefined)){

            	 						elementTo.customlist = [];
            	 					}

            	 					for(var keyAttrib in selectedCourseElement.elements[elementCount].customAttributes){
            	 						elementTo.customlist.push({key:keyAttrib, text:selectedCourseElement.elements[elementCount].customAttributes[keyAttrib]});
            	 					}
            	 				}

            	 				scope.courseElement.courseElementTemplate.fields.push(elementTo);
            	 			}
            	 			});

            	 	}
            	 }

             	if(!angular.equals(scope.syncData.courseTimeline[scope.selectedTpoint][scope.courseElement.Name][scope.selectedIndex].syllabus, undefined)){
 				 var keyArray = scope.syncData.courseTimeline[scope.selectedTpoint][scope.courseElement.Name][scope.selectedIndex].syllabus.key.split('.');
 				// console.log(keyArray);
 				 var syllabus = scope.syncData.syllabus;
 				 var index = 0;
 				 for(var key in keyArray){
 				 	syllabus = syllabus[keyArray[key]];
 				 	index++;
 				 	if(angular.equals(keyArray.length, index)){
 				 		 syllabus.selected = true;
 				 		 scope.selection = [syllabus];
 				 	}
 				 }
 				 }



 				 $modal({scope: scope, template:'angularModules/contextMenu/partials/Popup-syllabusSelector.html', placement:"top", animation:"am-slide-top aside-open-backdrop", html:true});
 				
            };
            scope.data = {};
            scope.addCourseElement = function(addCourseElement, hide){
            	$templateCache.put('course-element-popup.html','<edit-course-element></edit-course-element>');
            	
            	buildNodePath(scope.syncData.syllabus,  scope.selection[0].nodeId,'','',function(){
	            	
	            	$aside({scope: scope, template:'course-element-popup.html', placement:"top", animation:"am-slide-top aside-open-backdrop", html:true});
            		hide();
            	});
            };

            scope.onSyllabusSelectionChanged = function(items){
	          if(!angular.equals(items,undefined)){
	            scope.selection = items;
	          }
	          else{
	            scope.selection = '';
	          }
	        };


        var obj = '';
        var name = '';
        var data = {};
       function buildNodePath(syllabus, nodeId,key,name, fnCallback){
       

        for(var node in syllabus){
          if(!angular.equals(obj, '')){
             //obj = obj + '.' +  syllabus[node].name;//nodeId;
          }

          if(!angular.equals(syllabus[node].selected, undefined)){
          	delete syllabus[node].selected;
          	delete syllabus[node]. _hsmeta;
          }

          if(angular.equals(syllabus[node].nodeId, nodeId)){
            
            data.key = key+node;
            data.name=name+syllabus[node].name;
            scope.data.nodePath = data ;

            fnCallback();
            break;
          }
          else{
            if(syllabus[node].children.length){
              buildNodePath(syllabus[node].children, nodeId,key+node+'.children.',name+syllabus[node].name+'.', fnCallback);
            }
          }
        }
      }

            scope.removeCourseElement = function(ev) {
            		angular.forEach(scope.popoverObject.courseElementlist,function(courseElement){
            		if(angular.equals(selectedCourseElement.Name,courseElement.Name)){
            			scope.courseElement = courseElement;
            		}
            	});
            	var removeCourseTimelineElementCallback=addCourseService.removeCourseTimelineElement(scope.courseId, selectedCourseElement.Name, scope.selectedTpoint, scope.selectedIndex, scope.$parent.$parent.rm_id);
            	
            	removeCourseTimelineElementCallback.then(function(data){
				var updatedElementOrder = angular.fromJson(JSON.parse(data.data));
				if(angular.equals(updatedElementOrder,"Error")){
					$alert({title: 'Error', content: 'Something went wrong :)', placement: 'top-right', type: 'danger', duration:3,show: true});
				}
				else{
					scope.syncData.elementOrder=updatedElementOrder;
	            	//scope.syncData.courseTimeline=updatedElementOrder.courseTimeline;
	            	scope.syncData.courseTimeline[scope.selectedTpoint][selectedCourseElement.Name].splice(scope.selectedIndex,1);
            	}
				});
            };

            scope.moveCourseElement = function(element){
            	scope.data.selectedElement = angular.copy(element);
            	element.moveable = true;
            	scope.data.moveable = true;
            };
            scope.moveTo = function(element, addType){
            	
            	if(element.moveable){
	            	delete element.moveable;
	            	scope.data.moveable = false;
            	}
            	else if(!angular.equals(addType, undefined)){
            		if(angular.equals(addType,'new')){
            			var elementTo = Math.ceil((element*(1/scope.ddlBindObject[scope.selectedDuration-1].mFactor))-1439) + '.' + scope.data.selectedElement.Name + '.0';
	            		var elementFrom = scope.data.selectedElement.tlPointInMinute + '.' + scope.data.selectedElement.Name + '.' + scope.data.selectedElement.index;
            		}
            		else{
	            		//[element.tlPointInMinute][element.Name][element.Name]

	            		var elemIndex = 0;
	            		var elementTo = element.tlPointInMinute + '.' + element.Name + '.' + element.index;
	            		var elementFrom = scope.data.selectedElement.tlPointInMinute + '.' + scope.data.selectedElement.Name + '.' + scope.data.selectedElement.index;
            		}
            		var moveObject = {courseId:scope.courseId, elementFrom:elementFrom, elementTo:elementTo, addType:addType};
            		var courseElementMoveCallback = addCourseService.moveCourseElement(moveObject);
            		courseElementMoveCallback.then(function(response){
            			var course = angular.fromJson(JSON.parse(response.data));
            			//scope.syncData.courseTimeline = course.courseTimeline;
            			//scope.syncData.elementOrder = course.elementOrder;
            			//scope.data.moveable = false;
            			
            		})
            	}
            	
            }

		}

	};
}]);
