angular.module('baabtra')
.directive('contextMenu', ['$parse','$state','$aside','$alert','$templateCache','addCourseService','$rootScope','bbConfig','$modal',function ($parse,$state,$aside,$alert,$templateCache,addCourseService,$rootScope,bbConfig,$modal) {
    var renderContextMenu = function ($scope, event, options) {
        // taking current state for loading context menu
        var state=$state.current.name.split('.');
        state=state[state.length-1];
        if (!$) { var $ = angular.element; }

         // if contextmenucontents are not present don't render the menu
        if(options.length<1 || angular.equals(options[state].courseElementlist, undefined)){
            return 0;
        }
       
        
        //adding a class to the container of context menu
        $(event.currentTarget).parent().parent().parent().parent().addClass('context');
        var $contextMenu = $('<div id="tlContextMenu">');
        //$contextMenu.attr({'ng-class':'{\'hide-dropdown\':true}'});
        $contextMenu.addClass('dropdown clearfix');
        $contextMenu.css({height:'0px !important'});
        var $ul = $('<ul>');
        $ul.addClass('dropdown-menu');
        $ul.attr({ 'role': 'menu' });
        $ul.css({
            display: 'block',
            position: 'absolute',
            left: (event.pageX-75) + 'px',
            top: (event.pageY/2.1)-130+'px'
        });

      // $scope.ExistingMaterials=angular.copy($scope.$parent.$parent.$parent.$parent.$parent.ExistingMaterials);
      // $scope.ExistingMaterials.searchTextCourse='';
      // $scope.ExistingMaterials.searchTextMaterial='';
      $scope.status={};
      $scope.selectedCourse={};
      $scope.selectedSyllabus={};
      $scope.selectedSyllabus.syllabus='';
      $scope.syllabusElements={};
      $scope.selectedElements=[];
      $scope.searchText={};
      $scope.courseElements=[];
      $scope.selection=false;


      $scope.fnselectCourse =function(course){
        if((!course.courseTimeline)||(!course.syllabus)){
        var promiseExistingMaterials=addCourseService.getExistingMaterials(course._id.$oid); // fetching exsisting course Material
                      promiseExistingMaterials.then(function(data){
                      $scope.selectedCourse=angular.fromJson(JSON.parse(data.data));
                      course.courseTimeline=angular.copy($scope.selectedCourse.courseTimeline);
                      course.syllabus=angular.copy($scope.selectedCourse.syllabus);
        });
        }else{
           $scope.selectedCourse=angular.copy(course);
        }
        $scope.selectedSyllabus.syllabus='';
        $scope.syllabusElements={};
        $scope.selectedElements=[];
        $scope.courseElements=[];

      };

      $scope.previewOut={};

      $scope.$watch('selectedSyllabus', function(){

        if(angular.equals($scope.selectedSyllabus.syllabus,'')){
            return;
        }
        else{
                      var syllabusElements=[];
                         syllabusElements=$scope.fetchElementsInSyllabus($scope.selectedSyllabus.syllabus,syllabusElements);
                         var syllabusElementsArray=[];
                         for(var index in syllabusElements){                
                         var tempArray=syllabusElements[index].split('.');
                         syllabusElementsArray.push(tempArray);
                         }
                         $scope.syllabusElements=syllabusElementsArray;

        }

      },true);

            // $scope.elementAddType = 1;
            // $modal({scope: $scope, template:'angularModules/contextMenu/partials/Popup-syllabusSelector.html', placement:"top", animation:"am-slide-top aside-open-backdrop", html:true});
            //$scope.fnSaveElement(courseElement);

      $scope.fnAddElements=function(){
         
         $scope.selectedElements=[];
        for(var index in $scope.syllabusElements){

            if(($scope.selectedCourse.courseTimeline[$scope.syllabusElements[index][0]])&&($scope.selectedCourse.courseTimeline[$scope.syllabusElements[index][0]][$scope.syllabusElements[index][1]])&&($scope.selectedCourse.courseTimeline[$scope.syllabusElements[index][0]][$scope.syllabusElements[index][1]][$scope.syllabusElements[index][2]])){

               if(angular.equals($scope.selectedCourse.courseTimeline[$scope.syllabusElements[index][0]][$scope.syllabusElements[index][1]][$scope.syllabusElements[index][2]].selection,true)){

              if($scope.selectedCourse.courseTimeline[$scope.syllabusElements[index][0]][$scope.syllabusElements[index][1]][$scope.syllabusElements[index][2]].tlSelectedPoint){
                delete $scope.selectedCourse.courseTimeline[$scope.syllabusElements[index][0]][$scope.syllabusElements[index][1]][$scope.syllabusElements[index][2]].tlSelectedPoint;
              }
                $scope.selectedElements.push($scope.selectedCourse.courseTimeline[$scope.syllabusElements[index][0]][$scope.syllabusElements[index][1]][$scope.syllabusElements[index][2]]);

             }


            }

            

          }


          if (angular.equals($scope.selectedElements.length,0)) {
                  $scope.notifications('','None of the elements has been selected','danger'); 

          }else{
            $scope.elementAddType = 1;
            $modal({scope: $scope, template:'angularModules/contextMenu/partials/Popup-syllabusSelector.html', placement:"top", animation:"am-slide-top aside-open-backdrop", html:true});

          }
      };     

      $scope.fnSaveElements = function(courseElements){
        $scope.courseElements=[];
        for(var index in courseElements){
        var courseElementvalue=courseElements[index];
        var courseElementskey=courseElementvalue.Name;
        var key=$scope.instance+'.'+courseElementskey;
        var obj={key:key};
        courseElementvalue.courseId = $scope.selectedCourse._id.$oid;
        delete courseElementvalue.order;
        if(($scope.syncData.courseTimeline)&&($scope.syncData.courseTimeline[$scope.instance])){
          if($scope.syncData.courseTimeline[$scope.instance][courseElementskey]){
          courseElementvalue.index=$scope.syncData.courseTimeline[$scope.instance][courseElementskey].length;
          }
          else{
            courseElementvalue.index=0;
          }
        }else{
          courseElementvalue.index=0;
        }
        courseElementvalue.tlPointInMinute=$scope.instance;
        courseElementvalue.syllabus = $scope.data.nodePath;

        obj[key]=courseElementvalue;

         $scope.courseElements.push({courseId:$scope.$parent.courseId,courseElement:obj});
         
         }

         var saveExistingElementPromise= addCourseService.saveExistingElement($scope.courseElements);//saving to database

         saveExistingElementPromise.then(function(data){
          var updatedElementOrder = angular.fromJson(JSON.parse(data.data));
          $scope.syncData.elementOrder=updatedElementOrder;
                  if(!$scope.syncData.courseTimeline){
                        $scope.syncData.courseTimeline={};
                    }
                  if(!$scope.syncData.courseTimeline[$scope.instance]){
                        $scope.syncData.courseTimeline[$scope.instance]={};
                    }
                  for(var index in $scope.courseElements){
                      var courseElement=$scope.courseElements[index].courseElement;
                     if(!$scope.syncData.courseTimeline[$scope.instance][courseElement[courseElement.key].Name]){
                        $scope.syncData.courseTimeline[$scope.instance][courseElement[courseElement.key].Name]=[];
                      }
                  $scope.syncData.courseTimeline[$scope.instance][courseElement[courseElement.key].Name].push(courseElement[courseElement.key]);

                  }
                  $scope.notifications('','Material Added Successfully','info');   
                  $scope.disableAdd=false;
                  $scope.selectedElements=[];
                  $scope.selection=false;
                  $scope.fnSelectAll($scope.selection);

                  


          });


      };

      
      $scope.fetchElementsInSyllabus = function(syllabus,Elements){
            if(!angular.equals(syllabus.element,undefined)){
            Elements=Elements.concat(syllabus.element);
            }

            if(syllabus.children.length>0){
                for(var index in syllabus.children){
                 var tmpElements=[];
                 tmpElements=$scope.fetchElementsInSyllabus(syllabus.children[index],tmpElements);
                 Elements=Elements.concat(tmpElements);
                }
            }

            return Elements;

      };

      $scope.fnSelectAll= function(selection){
        if(angular.equals(selection,true)){
          for(var index in $scope.syllabusElements){
            if(($scope.selectedCourse.courseTimeline[$scope.syllabusElements[index][0]])&&($scope.selectedCourse.courseTimeline[$scope.syllabusElements[index][0]][$scope.syllabusElements[index][1]])&&($scope.selectedCourse.courseTimeline[$scope.syllabusElements[index][0]][$scope.syllabusElements[index][1]][$scope.syllabusElements[index][2]])){
             $scope.selectedCourse.courseTimeline[$scope.syllabusElements[index][0]][$scope.syllabusElements[index][1]][$scope.syllabusElements[index][2]].selection=true;
           }
          }
        }
        if(angular.equals(selection,false)){
           for(var index in $scope.syllabusElements){
            if(($scope.selectedCourse.courseTimeline[$scope.syllabusElements[index][0]])&&($scope.selectedCourse.courseTimeline[$scope.syllabusElements[index][0]][$scope.syllabusElements[index][1]])&&($scope.selectedCourse.courseTimeline[$scope.syllabusElements[index][0]][$scope.syllabusElements[index][1]][$scope.syllabusElements[index][2]])){
             $scope.selectedCourse.courseTimeline[$scope.syllabusElements[index][0]][$scope.syllabusElements[index][1]][$scope.syllabusElements[index][2]].selection=false;
           }
          }

        }
      };


 $scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:2, type: type});// calling notification message function
    };


        //creating a header for context menu
        var $headerA = $('<li>');
             $headerA.text($scope.ddlBindObject[$scope.selectedDuration-1].name.replace('(s)','')+" "+$scope.$parent.tlpoint);
             $headerA.addClass('font-bold p-xs bg-'+options[state].colorClass );
             $ul.append($headerA);
             
            //creating context menu elements
        angular.forEach(options[state].courseElementlist, function (item, i) {
            var $li = $('<li>');

            if (angular.equals(item, null)) {
                $li.addClass('divider');
            }
            else{
                var $a = $('<a>');

                $a.addClass('context-menu-icon');
                $a.attr({ tabindex: '-1', href: '#' });
                var $i = $('<i>');
                $i.addClass('fa text-lt text-lg pull-left m-r-xs '+item.Icon);
                $a.append($i);
                var $span = $('<span>');
                $span.text(item.menuDisplayName);
                $span.addClass('font-normal m-l');
                $a.append($span);

                 

                $li.on('click', function ($event) {
                    $event.preventDefault();
                    $scope.randomKey=Math.floor(Math.random()*1000,1000); // used to override some scope errors due to duplication
                    $scope.$parent.formData[$scope.instance]={};//used to save datas from timeline
                    $scope.$parent.formData[$scope.randomKey]={};
                    $scope.$parent.formData[$scope.randomKey].mainData={};
                    clickedChiled=true;
                    $scope.$apply(function () {
                         $(event.currentTarget).parent().parent().parent().parent().removeClass('context');
                         $contextMenu.remove();
                         $scope.item=item;
                         //taking template for form builder to take required inputs of 
                         //selected context menu
                         $scope.itemTemplate = item.courseElementTemplate;
                         //elements that comes under this element
                         $scope.subElements = item.nestableElements;
                         $scope.attendenceTrack = item.attendenceTrack;
                        

                         if(angular.equals($scope.attendenceTrack,undefined)){
                            $scope.attendenceTrack=false;
                         }

                         if(angular.equals(item.evaluable,undefined)){
                            $scope.attendenceTrack = false;
                         }
                         else{
                             $scope.evaluable = item.evaluable;
                         }

                         // if(!angular.equals($scope.item.Name,"Payment_checkpoint")){
                         // $scope.evaluator=angular.copy($scope.$parent.$parent.$parent.syncData.evaluator);
                         // }
                         // else{
                         //   $scope.evaluator=[];
                         // }
                       

                         //clearing data in preview object that is previously created
                         $scope.coursePreviewObj={};
                         $templateCache.put('course-element-popup.html','<ng-if="ExistingMaterials" div style="padding: 0px;" class="aside" role="dialog">'
                            +'<div class="box">'
                            +'<div class="p bg-'+options[state].colorClass+' font-bold">'
                              +'<a ng-click="$hide()" class="pull-right text-white"><i class="fa fa-times"></i></a>'
                              +'<i class="fa '+ item.Icon +' text-md m-r"></i>'
                              +item.menuDisplayName
                              +'<div style="margin-top: -5px;" class="pull-right m-r p-xs  bg-white text-'+options[state].colorClass+'">'+$scope.ddlBindObject[$scope.selectedDuration-1].name.replace('(s)','')+" "+$scope.$parent.tlpoint
                            +'</div></div>'
                            +'<div class="box-row">'
                             +'<div class="form-group col-xs-6">'
                             //+'test' to be edit by arun 
                                +'<label  class="font-bold" for="definpu" >Attendence Tracking</label><br>'
                                  +'<em class="text-muted" >Enable this feature to activate attendence tracking on this course element</em><br>'
                                  +'<div class="togglebutton">'
                                    +'<label>'
                                      +'<input ng-model="attendenceTrack" class="toggle" type="checkbox">'
                                    +'</label>'
                                  +'</div>'
                                  +'<label  class="font-bold" for="definpu">Evaluable element</label><br>'
                                  +'<div class="togglebutton">'
                                    +'<label>'
                                      +'<input ng-model="evaluable" class="toggle" type="checkbox">'
                                    +'</label>'
                                  +'</div>'
                              +'</div>'
                                +'<div class="form-group col-xs-12 m-t-md">'      
                                  +'<form xt-form novalidate class="form" name="courseElement" enctype="multipart/form-data">'
                                   +'<div class="p" sync-data="$parent.syncData" fg-form fg-form-data="myFormData" form-data="$parent.formData['+$scope.randomKey+'].mainData" fg-schema="itemTemplate"></div>'
                                   +'<div ng-if="subElements.length>0" on-item-click="selectedNestedElem(data,$parent.formData['+$scope.randomKey+'])" selection-mode="single" multi-selectable input-model="subElements" button-label="icon menuDisplayName" item-label="icon menuDisplayName" tick-property="tick" class="m-v col-xs-12"></div>'//multiselect to be added
                                   +'<button class="btn baab-btn pull-right m-v-lg btn-info" ng-class = "{\''+options[state].colorClass+'\':!(courseElement.$invalid)}" ng-click="saveMyFormData($hide)" type="button" ng-disabled = "courseElement.$invalid">save</button>'
                                   //+'<button class="btn baab-btn pull-left m-v-lg btn-info btn-material-green-A700" ng-class = "{\''+options[state].colorClass+'\':!(courseElement.$invalid)}" ng-click="createPreviewElement(\'tempCourseDocs\')" type="button" ng-disabled = "courseElement.$invalid">Preview</button>'
                                  +'</form>'
                                  //+'<div class="clearfix m-v-lg"><course-element-preview tl-position="'+$scope.ddlBindObject[$scope.selectedDuration-1].name.replace('(s)','')+' '+$scope.$parent.tlpoint+'" preview-data="coursePreviewObj"></course-element-preview></div>'
                            +'</div></div></div>'
                          +'</div>');
              $scope.selection = '';
              $scope.elementAddType = 0;
              $modal({scope: $scope, template:'angularModules/contextMenu/partials/Popup-syllabusSelector.html', placement:"top", animation:"am-slide-top aside-open-backdrop", html:true});
                                                        //item.call($scope,$scope.$parent.tlpoint/$scope.ddlBindObject[$scope.selectedDuration-1].mFactor);
                               });
                          });



                $li.append($a)
            }
            $ul.append($li);
            

        });
         
    var $footerA = $('<li>');

                var $a1 = $('<a>');

                $a1.addClass('context-menu-icon');
                $a1.attr({ tabindex: '-1'});
                var $i1 = $('<i>');
                $i1.addClass('fa text-lt text-lg pull-left m-r-xs ');
                $a1.append($i1);
                var $span1 = $('<span>');
                $span1.text('Add exsisting Course material');
                $span1.addClass('font-normal m-l');
                $a1.append($span1);

                  $footerA.on('click', function ($event) {

                     // var promiseExistingMaterials=addCourseService.getExistingMaterials($scope.$parent.$parent.$parent.$parent.$parent.cmp_id); // fetching exsisting course Material
        
                     //  promiseExistingMaterials.then(function(data){

                     //     $scope.ExistingMaterials = angular.fromJson(JSON.parse(data.data));
                     // $modal({scope: $scope, template:'angularModules/contextMenu/partials/course-material-popup.html', placement:"top", animation:"am-slide-top aside-open-backdrop", html:true});

                     //  });

                    var promiseGetCourses=addCourseService.getCourses($scope.$parent.$parent.$parent.$parent.$parent.cmp_id); // fetching exsisting course Material
        
                      promiseGetCourses.then(function(data){
                         $scope.Courses = angular.fromJson(JSON.parse(data.data));
                     $modal({scope: $scope, template:'angularModules/contextMenu/partials/course-material-popup.html', placement:"top", animation:"am-slide-top aside-open-backdrop", html:true});

                      });

                    $event.preventDefault();
                    $scope.randomKey=Math.floor(Math.random()*1000,1000); // used to override some scope errors due to duplication
                    $scope.$parent.formData[$scope.instance]={};//used to save datas from timeline
                    $scope.$parent.formData[$scope.randomKey]={};
                    $scope.$parent.formData[$scope.randomKey].mainData={};
                    clickedChiled=true;
                    $scope.$apply(function () {
                         $(event.currentTarget).parent().parent().parent().parent().removeClass('context');
                         $contextMenu.remove();
                
$scope.elementAddType = 0;
 // $modal({scope: $scope, template:'angularModules/contextMenu/partials/course-material-popup.html', placement:"top", animation:"am-slide-top aside-open-backdrop", html:true});
                        //item.call($scope,$scope.$parent.tlpoint/$scope.ddlBindObject[$scope.selectedDuration-1].mFactor);
                     });
                });



                $footerA.append($a1)
            $ul.append($footerA);

        $contextMenu.append($ul);
        var height = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        $contextMenu.css({
            width: '100%',
            height: height + 'px',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 9999
        });
        $(event.currentTarget).parent().parent().parent().parent().append($contextMenu);
        $contextMenu.on("mousedown", function (e) {
            if ($(e.target).hasClass('dropdown')) {
                $(event.currentTarget).parent().parent().parent().parent().removeClass('context');
                $contextMenu.remove();
            }
        }).on('contextMenu', function (event) {
            $(event.currentTarget).parent().parent().parent().parent().removeClass('context');
            event.preventDefault();
            $contextMenu.remove();
        });
    };
    var clickedChiled=false;
    return {
        scope:true,
        link:function ($scope, element, attrs) {


        // if contextmenucontents are not present don't render the menu
        if(angular.equals($scope.callbackFunctions, undefined)){
            return 0;
        }
        $scope.instance = $scope.$parent.tlpoint/$scope.ddlBindObject[$scope.selectedDuration-1].mFactor-((1/$scope.ddlBindObject[$scope.selectedDuration-1].mFactor))+1;

        $scope.ItsTimeToSaveDataToDB=false;
        $scope.weHaveGotAfile=false;

        //function for creating preview object
        $scope.createPreviewElement=function (path) {
        $scope.instance = $scope.$parent.tlpoint/$scope.ddlBindObject[$scope.selectedDuration-1].mFactor-((1/$scope.ddlBindObject[$scope.selectedDuration-1].mFactor))+1;

            $scope.ItsTimeToSaveDataToDB=false; // check for object built successfully or not
            $scope.weHaveGotAfile=false;
            var fieldsTraversedCount=0;
            var totalFields=$scope.itemTemplate.fields.length;
            var temp = {}; // temp object for storing each elements in a course element
                    $scope.coursePreviewObj.elements=[]; // array for storing elements
                    $scope.coursePreviewObj.Name=$scope.item.Name; // course element name
                    $scope.coursePreviewObj.Icon=$scope.item.Icon; // course element icon
                    $scope.coursePreviewObj.iconBackground=$scope.item.iconBackground; // icon bg colour
                    $scope.coursePreviewObj.iconColor=$scope.item.iconColor; //icon colour
                    
               angular.forEach($scope.itemTemplate.fields,function(item){ // looping through item template
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
                                temp[item.name].value=$scope.$parent.formData[$scope.randomKey].mainData[item.name];
                                temp[item.name].type=customProperty.text;
                                if(angular.equals(customProperty.text,"doc-viewer")){ // if it is a file, it should be stored in server to show preview through
                                                                                      // google doc preview
                                    $scope.weHaveGotAfile=true;
                                    var promise=addCourseService.fnCourseFileUpload(temp[item.name].value, path); // uploading file to the server
                                    promise.then(function(data){ // call back function for the fileupload
                                          temp[item.name].fileType = temp[item.name].value.type;
                                          temp[item.name].value='http://docs.google.com/gview?url='+bbConfig.BWS+'files/'+path+'/'+data.data.replace('"','').replace('"','')+'&embedded=true';
                                          temp[item.name].url=bbConfig.BWS+'files/'+path+'/'+data.data.replace('"','').replace('"','');
                                          $scope.ItsTimeToSaveDataToDB=true;
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
                                    temp[item.name]=$scope.$parent.formData[$scope.randomKey].mainData[item.name];
                                }

                            }
                        });
                        
                        
                    }
                    else{
                        temp[item.name]=$scope.$parent.formData[$scope.randomKey].mainData[item.name];
                    }
                    if(!$scope.weHaveGotAfile&&(fieldsTraversedCount==totalFields)){
                                    $scope.ItsTimeToSaveDataToDB=true;
                                }
                    $scope.coursePreviewObj.elements.push(temp[item.name]);

                   

                    if($scope.$parent.formData[$scope.randomKey].nestedElements){
                        $scope.coursePreviewObj.nestedElements=$scope.$parent.formData[$scope.randomKey].nestedElements;
                    }
                });
                    
        };

        $scope.data = {};

        $scope.addCourseElement = function(addCourseElement, hide){

          if(!addCourseElement){
            buildNodePath($scope.syncData.syllabus, $scope.data.selectednSyllabusItem.nodeId,'','',function(){
              $aside({scope: $scope, template:'course-element-popup.html', placement:"top", animation:"am-slide-top aside-open-backdrop", html:true});

            });
          }else{
            buildNodePath($scope.syncData.syllabus, $scope.data.selectednSyllabusItem.nodeId,'','',function(){
                $scope.fnSaveElements($scope.selectedElements);
                 $scope.disableAdd=true;
            });
          }
          hide();
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
            $scope.data.nodePath = data ;

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

        $scope.onSyllabusSelectionChanged = function(items){
          if(!angular.equals(items,undefined)){
            $scope.data.selectednSyllabusItem = items[0];
          }
          else{
            $scope.data.selectednSyllabusItem = '';
          }
        };
        
        //function for triggering when save button in aside 
        $scope.saveMyFormData = function ($hide) {
           

            $scope.createPreviewElement('courseDocs'); // building the needed object

            var courseObj={};
            
            if(!$scope.syncData.courseTimeline){
                $scope.syncData.courseTimeline={};
            }

            courseObj.key=$scope.instance+'.'+$scope.item.Name;
            courseObj[courseObj.key]=$scope.coursePreviewObj;

            
                if(!$scope.syncData.courseTimeline[$scope.instance]){
                    $scope.syncData.courseTimeline[$scope.instance]={};
                }
                if(!$scope.syncData.courseTimeline[$scope.instance][$scope.item.Name]){
                    $scope.syncData.courseTimeline[$scope.instance][$scope.item.Name]=[];
                }

              //commented by arun and added below to build the time line after database promise 
              // $scope.syncData.courseTimeline[$scope.instance][$scope.item.Name].push($scope.coursePreviewObj);

              //adding attendence tack to timeline arun

               courseObj[courseObj.key].attendenceTrack = $scope.attendenceTrack;

               courseObj[courseObj.key].evaluable = $scope.evaluable;

               if($scope.syncData.courseTimeline[$scope.instance]){
                  if($scope.syncData.courseTimeline[$scope.instance][$scope.item.Name]){
                      courseObj[courseObj.key].index=$scope.syncData.courseTimeline[$scope.instance][$scope.item.Name].length;
                   }
                   else{
                        courseObj[courseObj.key].index=0;
                      }
              }
                else{
                  courseObj[courseObj.key].index=0;
                }
        
              courseObj[courseObj.key].tlPointInMinute=$scope.instance;
              courseObj[courseObj.key].syllabus = $scope.data.nodePath;

              //end adding attendence track
              //adding attendence tack to timeline arun

               // courseObj[courseObj.key].evaluator=$scope.evaluator;
              
              //end adding attendence track
              // below function will trigger only when the object is built
              var unbindWatchOnThis=$scope.$watch('ItsTimeToSaveDataToDB',function(){
                if($scope.ItsTimeToSaveDataToDB===true){
                    //---by arun to create unique code 
                     var time=new Date().valueOf();//date in millisecs11
                     var hashids = new Hashids(courseObj.key,8);//
                     var code = hashids.encode(time);  
                     courseObj[courseObj.key].code=code;
                    //--- end by arun to create unique code 
                    var saveCourseTimelineElementPromise= addCourseService.saveCourseTimelineElement($scope, $scope.$parent.courseId,courseObj);//saving to database
                     saveCourseTimelineElementPromise.then(function(data){
                      var updatedElementOrder = angular.fromJson(JSON.parse(data.data));
                     $scope.syncData.elementOrder=updatedElementOrder;
                     $scope.syncData.courseTimeline[$scope.instance][$scope.item.Name].push($scope.coursePreviewObj);

                    unbindWatchOnThis(); // used to unbind this watch after triggering it once
                    $hide();
                  });
                }
              });
        };


        //=========== managing nested list of elements ==================

        //this will trigger when an item in the nested list is selected
        $scope.selectedNestedElem=function (selectedObj,$formModal) {
            if(!$scope.formModal){
                $scope.formModal={};
            }
            if(!$scope.nestedElemSelected){
                $scope.nestedElemSelected={};
            }
        var randomKeyForNested=Math.floor(Math.random()*100000,1000); // used to override some scope errors due to duplication
        $scope.formModal[randomKeyForNested]=$formModal; // object where the formdata to be stored
        $scope.nestedElemSelected[randomKeyForNested]=selectedObj;
            if(!$scope.formModal[randomKeyForNested].nestedElements){
                $scope.formModal[randomKeyForNested].nestedElements={};
            }
            if(!$scope.formModal[randomKeyForNested].nestedElements[$scope.nestedElemSelected[randomKeyForNested].Name]){
                $scope.formModal[randomKeyForNested].nestedElements[$scope.nestedElemSelected[randomKeyForNested].Name]=[];
            }

        $scope.tempFormData={};
        $scope.tempFormData[randomKeyForNested]={};
        var state=$state.current.name.split('.');
            state=state[state.length-1];

            $templateCache.put('course-element-nested-popup.html','<div style="padding: 0px;" class="aside" role="dialog">'
            +'<div class="box" >'
            +'<div class="p '+$scope.callbackFunctions[state].colorClass+' font-bold">'
              +'<a ng-click="$hide()" class="pull-right text-white"><i class="fa fa-times"></i></a>'
              +'<i class="fa '+ selectedObj.Icon +' text-md m-r"></i>'
              +selectedObj.menuDisplayName
            +'</div>'
            +'<div class="box-row">'
              +'<div class="box-cell m-t">'
                +'<div class="box-inner col-xs-12">'
                  +'<form novalidate xt-form class="form" name="courseElement" enctype="multipart/form-data">'
                   +'<div sync-data="$parent.syncData" fg-form fg-form-data="" form-data="tempFormData['+randomKeyForNested+']" fg-schema="nestedElemSelected['+randomKeyForNested+'].courseElementTemplate"> </div>'
                   +'<div ng-if="nestedElemSelected['+randomKeyForNested+'].nestableElements.length>0" on-item-click="selectedNestedElem(data,formModal['+randomKeyForNested+'])" selection-mode="single" multi-selectable input-model="subElements" button-label="icon menuDisplayName" item-label="icon menuDisplayName" tick-property="tick"></div>'//multiselect to be added
                   //+'<button type="submit" ng-click="pushNestedObject(\'courseDocs\',nestedElemSelected,formModal,tempFormData.'+randomKeyForNested+')" style="color:#fff!important;" ng-disabled = "courseElement.$invalid || !$root.valid" class="pull-right btn '+$scope.callbackFunctions[state].colorClass+'">Save</button>'
                   +'<button type="submit" ng-click="createFormatedElement($hide,\'tempCourseDocs\',nestedElemSelected['+randomKeyForNested+'],formModal['+randomKeyForNested+'],tempFormData['+randomKeyForNested+'])" style="color:#fff!important;" ng-disabled = "courseElement.$invalid" class="pull-right btn '+$scope.callbackFunctions[state].colorClass+'">Embed</button>'
                  +'</form>'
                  +'<div class="clearfix m-v-lg"><course-element-preview tl-position="'+$scope.ddlBindObject[$scope.selectedDuration-1].name.replace('(s)','')+' '+$scope.$parent.tlpoint+'" preview-data="coursePreviewObj"></course-element-preview></div>'
                +'</div></div></div></div></div>');
 $aside({scope: $scope, template:'course-element-nested-popup.html', placement:"top", animation:"am-slide-top aside-open-backdrop", html:true});
        };



        // // function triggers when user clicks save button in nested element's aside
        // $scope.pushNestedObject=function(path,schemaDesign,formModal,formData) {
        //     if(!formModal.nestedElements){
        //         formModal.nestedElements={};
        //     }
        //     if(!formModal.nestedElements[schemaDesign.Name]){
        //         formModal.nestedElements[schemaDesign.Name]=[];
        //     }
        //      $scope.createFormatedElement(path,schemaDesign,formModal,formData);
        // };



        $scope.createFormatedElement=function ($hide,path,schemaDesign,formModal,formData) {
            
            $scope.ItsTimeToSaveNestedDataToDB=false; // check for object built successfully or not
            $scope.weHaveGotNestedfile=false;
            var fieldsTraversedCount=0;
            var totalFields=schemaDesign.courseElementTemplate.fields.length;
            var temp = {}; // temp object for storing each elements in a course element
            var coursePreviewObj={};
                    coursePreviewObj.elements=[]; // array for storing elements
                    coursePreviewObj.Name=schemaDesign.Name; // course element name
                    coursePreviewObj.Icon=schemaDesign.Icon; // course element icon
                    coursePreviewObj.iconBackground=schemaDesign.iconBackground; // icon bg colour
                    coursePreviewObj.iconColor=schemaDesign.iconColor; //icon colour
                    
               angular.forEach(schemaDesign.courseElementTemplate.fields,function(item){ // looping through item template
                    fieldsTraversedCount++;
                    if(!angular.equals(item.customlist,undefined)) //checking if it is having a custom attrib or not
                    {
                        temp[item.name]={}; // each elements in a course element will be stored like this (Ex: Title, file ..etc.)
                        var loopCounter=0; // a counter for all loops comes inside custom list of properties
                        var maxLoopValue=item.customlist.length;
                        var weHaveGotPreviewKey=false;
                        angular.forEach(item.customlist,function(customProperty){
                            loopCounter++;
                            // here we build object to store into db and to push into timeline
                            if(angular.equals(customProperty.value,'previewkey')){ // checking is there have a value for previewkey
                                weHaveGotPreviewKey=true;
                                temp[item.name].value=formData[item.name];
                                temp[item.name].type=customProperty.text;
                                if(angular.equals(customProperty.text,"doc-viewer")){ // if it is a file, it should be stored in server to show preview through
                                                                                      // google doc preview
                                    $scope.weHaveGotNestedfile=true;
                                    var promise=addCourseService.fnCourseFileUpload(temp[item.name].value, path); // uploading file to the server
                                    promise.then(function(data){ // call back function for the fileupload
                                          temp[item.name].fileType = temp[item.name].value.type;
                                          temp[item.name].value='http://docs.google.com/gview?url='+bbConfig.BWS+'files/'+path+'/'+data.data.replace('"','').replace('"','')+'&embedded=true';
                                          temp[item.name].url=bbConfig.BWS+'files/'+path+'/'+data.data.replace('"','').replace('"','');
                                          $scope.ItsTimeToSaveNestedDataToDB=true;
                                    });
                                }

                        }
                            else{

                                if((loopCounter==maxLoopValue)&&!weHaveGotPreviewKey){ // when count meets length of custom list and still
                                    temp[item.name]=formData[item.name];
                                }

                            }
                        });
                        
                        
                    }
                    else{
                        temp[item.name]=formData[item.name];
                    }
                    if(!$scope.weHaveGotNestedfile&&(fieldsTraversedCount==totalFields)){
                                    $scope.ItsTimeToSaveNestedDataToDB=true;
                                }
                    coursePreviewObj.elements.push(temp[item.name]);
                });

            formModal.nestedElements[schemaDesign.Name].push(coursePreviewObj);
            $hide();
            
        };



        //============= end of nested list of elements ===================


            element.on('click', function (event) {
                 event.preventDefault();
                setTimeout(function(){
                    if(!clickedChiled)
                    {
                                    $scope.$apply(function () {
                                    var options = $scope.callbackFunctions;
                                    if (options instanceof Object) {
                                        renderContextMenu($scope, event, options);
                                    } else {
                                        throw '"' + attrs.contextMenu + '" not an array';
                                    }
                                });
                    }
                    clickedChiled=false;
                },100);
            });
        }};
}]);