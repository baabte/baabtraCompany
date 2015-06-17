angular.module('baabtra').directive('editCourseElement',['addCourseService','bbConfig', function(addCourseService,bbConfig) {
	return {
		restrict: 'E',
		replace: true,
		//scope:{selectedTpoint:'='},
		templateUrl: 'angularModules/courseElements/directives/Directive-editCourseElement.html',
		link: function(scope, element, attrs, fn) {

			var randomKey=Math.floor(Math.random()*100000,1000);
			//scope.instance = scope.selectedTpoint/scope.$parent.ddlBindObject[scope.$parent.selectedDuration-1].mFactor-((1/scope.$parent.ddlBindObject[scope.$parent.selectedDuration-1].mFactor))+1;
            scope.instance = scope.selectedTpoint;
            scope.attendenceTrack = scope.$parent.syncData.courseTimeline[scope.instance][scope.$parent.courseElement.Name][scope.$parent.selectedIndex].attendenceTrack;
            scope.evaluable = scope.$parent.syncData.courseTimeline[scope.instance][scope.$parent.courseElement.Name][scope.$parent.selectedIndex].evaluable;
            var code = scope.$parent.syncData.courseTimeline[scope.instance][scope.$parent.courseElement.Name][scope.$parent.selectedIndex].code;
            //scope.evaluator=scope.$parent.syncData.courseTimeline[scope.instance][scope.$parent.courseElement.Name][scope.$parent.selectedIndex].evaluator;
            //scope.$parent.syncData.courseTimeline[scope.instance][scope.$parent.courseElement.Name][scope.$parent.selectedIndex].code;
             // if(angular.equals(scope.evaluator,undefined)){
             //    scope.evaluator=[];
             // }
             if(angular.equals(code,undefined)){
                        var time=new Date().valueOf();//date in millisecs11
                        var key=[scope.instance]+'.'+[scope.$parent.courseElement.Name];
                        var hashids = new Hashids(key,8);
                        code = hashids.encode(time);
                     }
            scope.createPreviewElement = function(path){
				scope.ItsTimeToSaveDataToDB=false; // check for object built successfully or not
				scope.weHaveGotAfile=false;
            	var fieldsTraversedCount=0;
            	var totalFields = scope.$parent.courseElement.courseElementTemplate.fields.length;
            	var temp = {}; // temp object for storing each elements in a course element
            	scope.coursePreviewObj.elements=[]; // array for storing elements
            	scope.coursePreviewObj.Name=scope.$parent.courseElement.Name; // course element name
            	scope.coursePreviewObj.Icon=scope.$parent.courseElement.Icon; // course element icon
            	scope.coursePreviewObj.iconBackground=scope.$parent.courseElement.iconBackground; // icon bg colour
               
            	scope.coursePreviewObj.iconColor=scope.$parent.courseElement.iconColor; //icon colour
                   

                    

            	angular.forEach(scope.$parent.courseElement.courseElementTemplate.fields,function(item){ // looping through item template
                    fieldsTraversedCount++;
                    if(!angular.equals(item.customlist,undefined)) //checking if it is having a custom attrib or not
                    {
                    	temp[item.name]={}; // each elements in a course element will be stored like this (Ex: Title, file ..etc.)
                    	var loopCounter=0; // a counter for all loops comes inside custom list of properties
                    	var maxLoopValue=item.customlist.length;
                    	var weHaveGotPreviewKey=false;
                        temp[item.name].displayName = item.displayName;
                        if(!angular.equals(item.uniqueId, undefined)){
                           temp[item.name].uniqueId = item.uniqueId;
                        }
                        if(!angular.equals(item.parentElementId, undefined)){
                           temp[item.name].parentElementId = item.parentElementId;
                        }

                    	angular.forEach(item.customlist,function(customProperty){

                         

                    		loopCounter++;
                            // here we build object to store into db and to push into timeline
                            if(angular.equals(customProperty.value,'previewkey')){ // checking is there have a value for previewkey
                                weHaveGotPreviewKey=true;
                                temp[item.name].value=scope.formData[item.name];
                                temp[item.name].type=customProperty.text;
                                if(angular.equals(customProperty.text,"doc-viewer")){ // if it is a file, it should be stored in server to show preview through
                                                                                     // google doc preview
                                    scope.weHaveGotAfile = true;
                                    var promise=addCourseService.fnCourseFileUpload(temp[item.name].value, path); // uploading file to the server
                                    promise.then(function(data){ // call back function for the fileupload
                                          temp[item.name].fileType = temp[item.name].value.type;
                                          temp[item.name].value='http://docs.google.com/gview?url='+bbConfig.BWS+'files/'+path+'/'+data.data.replace('"','').replace('"','')+'&embedded=true';
                                          temp[item.name].url=bbConfig.BWS+'files/'+path+'/'+data.data.replace('"','').replace('"','');
                                          scope.ItsTimeToSaveDataToDB = true;
                                    });
                                }
                            }
                            else if(angular.equals(customProperty.key,'sub-element')){
                              if(!temp[item.name].customAttributes){
                                  temp[item.name].customAttributes ={};
                                }
                                temp[item.name].customAttributes['sub-element'] ='true';
                            }
                            else if(angular.equals(customProperty.key,'cef-remove-button')){
                              if(!temp[item.name].customAttributes){
                                  temp[item.name].customAttributes ={};
                                }
                                temp[item.name].customAttributes['cef-remove-button'] ='true';
                            }
                            else{
                            	if((loopCounter==maxLoopValue)&&!weHaveGotPreviewKey){ // when count meets length of custom list and still
                                    temp[item.name]=scope.formData[item.name];
                                }
                            }
                    	});
                    }
                    // else{
                    //     temp[item.name]=scope.formData[randomKey].mainData[item.name];
                    // }
                    if(!scope.weHaveGotAfile&&(fieldsTraversedCount==totalFields)){
                                    scope.ItsTimeToSaveDataToDB=true;
                    }
                    scope.coursePreviewObj.elements.push(temp[item.name]);
                    // if(scope.formData[randomKeyForNested].nestedElements){
                    //     scope.coursePreviewObj.nestedElements = scope.formData[randomKeyForNested].nestedElements;
                    // }

                   

                });
			};
			//function for triggering when save button in aside
			scope.saveMyFormData = function($hide){
				scope.createPreviewElement('courseDocs'); // building the needed object
				var courseObj = {};
				if(!scope.$parent.syncData.courseTimeline){
					scope.$parent.syncData.courseTimeline = {};
				}
				courseObj.key=scope.instance+'.'+scope.$parent.courseElement.Name;
				courseObj[courseObj.key]=scope.coursePreviewObj;
        console.log(scope.data.nodePath);
        courseObj[courseObj.key].syllabus = scope.data.nodePath;

				if(!scope.$parent.syncData.courseTimeline[scope.instance]){
					scope.$parent.syncData.courseTimeline[scope.instance] = {};
                }

                if(!scope.$parent.syncData.courseTimeline[scope.instance][scope.$parent.courseElement.Name]){
                    scope.$parent.syncData.courseTimeline[scope.instance][scope.$parent.courseElement.Name]=[];
                }

                scope.$parent.syncData.courseTimeline[scope.instance][scope.$parent.courseElement.Name][scope.selectedIndex] = scope.coursePreviewObj;
                // scope.$parent.syncData.courseTimeline[scope.instance][scope.$parent.courseElement.Name]

                // below function will trigger only when the object is built
              var unbindWatchOnThis=scope.$watch('ItsTimeToSaveDataToDB',function(){
                if(scope.ItsTimeToSaveDataToDB===true){
                     scope.coursePreviewObj.attendenceTrack=scope.attendenceTrack; // attendece track
                     scope.coursePreviewObj.evaluable=scope.evaluable; 
                     scope.coursePreviewObj.code=code; // code backto object
                     //scope.coursePreviewObj.evaluator=scope.evaluator; //adding evaluator to course element
                     if(scope.coursePreviewObj.datas){
                        delete scope.coursePreviewObj.datas;
                     }

                    var promise = addCourseService.editCourseTimelineElement(scope.$parent.courseId, scope.$parent.courseElement.Name, scope.instance,{index:scope.selectedIndex,element:scope.coursePreviewObj}, scope.$parent.$parent.rm_id);//saving to database
                    promise.then(function(response){
                        scope.$parent.syncData = angular.fromJson(JSON.parse(response.data))[0];

                    });

                    unbindWatchOnThis(); // used to unbind this watch after triggering it once
                    $hide();
                }
              });
                //scope.$parent.syncData.courseTimeline[scope.instance][scope.$parent.courseElement.Name].push(scope.coursePreviewObj);
			};
		}
	};
}]);
