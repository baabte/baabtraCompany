angular.module('baabtra').controller('ManagebatchesCtrl',['$scope','$modal','bbConfig','$rootScope','$http','$state','commonService','addBatches','$alert','$filter',function($scope,$modal,bbConfig,$rootScope,$http,$state,commonService,addBatches,$alert,$filter){
    if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
    }
    if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
    }
    $scope.Batch = {};
    $scope.buttonType="Add Batch";
   // $scope.repeatName={};
    //$scope.Batch.oneTime={};
    // console.log();
    var courseId = $state.params.courseId;
    $scope.Batch.repeats={};
    $scope.Batch.Admission={};
    $scope.Batch.repeats={};
    $scope.Batch.Admission={};
    $scope.Batch.repeats.excludedDaysRepeat=[];
    $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.cmp_id=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    $scope.fnLoadPopupRepeat=function(batchMode,type){
      if(angular.equals(batchMode,"repeat")){
           // $scope.Batch.oneTime={};
           if(type!="edit"){
           $scope.Batch.repeats={};
           $scope.Batch.repeats.excludedDaysRepeat=[];
           }
           
         $modal({scope: $scope, template: 'angularModules/Batches/partials/partial-popupRepeatBatch.html',
          show: true  
         });
      }else{
           $scope.Batch.repeats={};
           $scope.summary=null; 
           $scope.excluded='';
           $scope.Batch.repeats.excludedDaysRepeat=[];
           
         // $modal({scope: $scope, template: 'angularModules/Batches/partials/partial-popuponeTimeBatch.html',
         // show: true
         //});
      }

      
    };
   $scope.repeatArrays=[{id:0,text:'Daily',totalDays:1},{id:1,text:'Weekly',totalDays:7},{id:2,text:'Monthly',totalDays:30},{id:3,text:'Yearly',totalDays:365}];  
   $scope.repeatEvery=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
   $scope.repeatTypeArray=[{id:0,text:'Days'},{id:1,text:'Weeks'},{id:2,text:'Months'},{id:3,text:'Years'}];
   $scope.days=[{id:'Sunday',text:'S'},{id:'Monday',text:'M'},{id:'Tuesday',text:'T'},{id:'Wednesday',text:'W'},{id:'Thursday',text:'Th'},{id:'Friday',text:'F'},{id:'Saturday',text:'S'}];
   $scope.fnLoadsubItem=function(id){
   	$scope.Batch.repeats.repeatType=$scope.repeatTypeArray[id].text;
    $scope.Batch.repeats.repeatTypeName=$scope.repeatArrays[id].text;
   // console.log($scope.Batch.repeats.repeatType);
    //console.log( $scope.Batch.repeats.repeatTypeName);
    //console.log($scope.repeatArrays[id].totalDays);
    $scope.totalDays=$scope.repeatArrays[id].totalDays;
   }; 
   //$scope.saveRepeatfn=function(hide){
   // hide();
  // }
  // $scope.saveOnetimefn=function(hide){
  //  hide();
  // }
    $scope.savepopUpfn=function(hide){
      $scope.batchMode="repeat";
      $scope.excluded=$scope.excluded.substring(0, $scope.excluded.length - 1);
   $scope.summary ='(Repeats Every '+ $scope.Batch.repeats.every +' '+ $scope.Batch.repeats.repeatType;
   if($scope.excluded!==""){
    $scope.summary=$scope.summary+ ' ,Dont start on '+$scope.excluded+')';
   }
   hide();
   };
   $scope.saveBatch=function(){//for saving the Batch
    $scope.Batch.crmId = $scope.rm_id;
    $scope.Batch.companyId =  $scope.cmp_id;
    $scope.Batch.urmId = $scope.rm_id;
    $scope.Batch.activeFlag=1;
    if($scope.buttonType=="Update Batch"){
    $scope.Batch.startDate=new Date($scope.Batch.startDate).toISOString();
    $scope.Batch.endDate=new Date($scope.Batch.endDate).toISOString();
    $scope.Batch._id =$scope.Batch._id.$oid; 
    }else{
    $scope.Batch.startDate=$scope.Batch.startDate.toISOString();    
    $scope.Batch.endDate=$scope.Batch.endDate.toISOString();  
    }
    $scope.Batch.createdDate = Date();
    $scope.Batch.updatedDate = Date();
    $scope.Batch.Admission.beforeDaysCount=0;
     $scope.Batch.Admission.afterDaysCount=0;
  if(angular.equals($scope.Batch.Admission.beforeType,'Days')){
    $scope.Batch.Admission.beforeDaysCount=1;
   }else if(angular.equals($scope.Batch.Admission.beforeType,'Months')){
    $scope.Batch.Admission.beforeDaysCount=30;
   }else if(angular.equals($scope.Batch.Admission.beforeType,'Weeks')){
    $scope.Batch.Admission.beforeDaysCount=7;
   }else{
    $scope.Batch.Admission.beforeDaysCount=365;
   } 

   $scope.Batch.Admission.beforeDaysCount=parseInt($scope.Batch.Admission.onBefore)*$scope.Batch.Admission.beforeDaysCount;
   if(angular.equals($scope.Batch.Admission.afterType,'Days')){
    $scope.Batch.Admission.afterDaysCount=1;
   }else if(angular.equals($scope.Batch.Admission.afterType,'Months')){
    $scope.Batch.Admission.afterDaysCount=30;
   }else if(angular.equals($scope.Batch.Admission.afterType,'Weeks')){
    $scope.Batch.Admission.afterDaysCount=7;
   }else{
    $scope.Batch.Admission.afterDaysCount=365;
   } 
   $scope.Batch.Admission.afterDaysCount=parseInt($scope.Batch.Admission.onAfter)*$scope.Batch.Admission.afterDaysCount;
      $scope.Batch.Codes=[];

      for(var index in $scope.Batch.course){
         var time=(new Date()).valueOf();
      var hashids = new Hashids("this is a batch id "+index);
      $scope.Batch.Codes.push(hashids.encode(time));
      }

   var promise=addBatches.addNewBatches($scope.Batch,$scope.buttonType);
   promise.then(function(response){
    if(response.data){
      if($scope.buttonType=="Update Batch"){
        $alert({title: 'Done..!', content: 'Successfuly updated the Batch :-)', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});
        $scope.buttonType="Add Batch";
        $scope.summary=null; 
      }else{
        $alert({title: 'Done..!', content: 'Successfuly added the Batch :-)', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});
      }
      }   
         //$scope.Batch.oneTime={};
         
        // $scope.Batch.oneTime.excludedDaysOnetime=[];
         $scope.Batch.repeats.excludedDaysRepeat=[];
         //$scope.Batch.repeats={};
         //$scope.Batch.Admission={};
         //$scope.Batch.repeatName={};
         $scope.Batch.repeats={};
         $scope.Batch.Admission={};
         $scope.Batch = {};
          $scope.Batch.course=[];
         //$scope.newCourse={};
         
   });
   };
   $scope.Batch.repeats.excludedDaysRepeat=[];
   $scope.excluded='';
   $scope.fnExcludedDays=function(id){
       var idsel = $scope.Batch.repeats.excludedDaysRepeat.indexOf(id);
        // is currently selected
        if (idsel > -1) {
           $scope.Batch.repeats.excludedDaysRepeat.splice(idsel, 1);
        }else {// is newly selected
           $scope.Batch.repeats.excludedDaysRepeat.push(id);
           $scope.excluded= $scope.excluded + id +',';
        }
   
    //console.log( $scope.Batch.repeats.excludedDaysRepeat)
   };      
   //$scope.Batch.oneTime.excludedDaysOnetime=[];
   /*$scope.fnexcludeDaysOneTime=function(id){
    var idsel=$scope.Batch.oneTime.excludedDaysOnetime.indexOf(id);
     if(idsel>-1){
       $scope.Batch.oneTime.excludedDaysOnetime.splice(idsel, 1);
     }else{
       $scope.Batch.oneTime.excludedDaysOnetime.push(id);
     }    
   }*/
   //$scope.totalClicks=0;
  $scope.fnLoadBatches=function(){

      var promise=addBatches.loadBatches($scope.cmp_id);
      promise.then(function(response){
      $scope.batchEelements = angular.fromJson(JSON.parse(response.data));
       //$scope.totalClicks=$scope.totalClicks+1;

      });  
  }; 
  $scope.fnCalcDays = function(num){
   $scope.Batch.repeats.repeatsAfter=parseInt(num)* parseInt($scope.totalDays);
  };
 
  
  $scope.fnEditBatches=function(id){
      $scope.Batch={};
        $scope.Batch.course=[];
   var batchInfo= addBatches.editBatch(id);
      batchInfo.then(function(response){
      $scope.batchInfo= angular.fromJson(JSON.parse(response.data));
     //console.log($scope.batchInfo[0]);
      $scope.Batch=$scope.batchInfo[0];
      $scope.Batch.startDate= $filter('date')($scope.batchInfo[0].startDate.$date);
      $scope.Batch.endDate= $filter('date')($scope.batchInfo[0].endDate.$date);
      //$scope.Batch.batchMode=$scope.batchInfo[0].courseType
      if($scope.batchInfo[0].batchMode=="repeat"){
      $scope.summary="";  
      }else{
      $scope.summary=null;  
      }
      if($scope.batchInfo[0].courseType=="offline"){
        $scope.Batch.offline=true;
        $scope.Batch.instructorLead=false;
      }else{
        $scope.Batch.instructorLead=true;
        $scope.Batch.offline=false;
      }
      
      $scope.excluded='';
      //$scope.Batch.repeats.every=$scope.batchInfo[0].repeats.every; 
       angular.forEach($scope.batchInfo[0].repeats.excludedDaysRepeat, function(item) {//for looping through the excluded days to show the excluded days
        $scope.excluded= $scope.excluded + item +',';
       });
        //$scope.excluded=$scope.excluded.substring(0, $scope.excluded.length - 1);
         $scope.buttonType="Update Batch";  
      });
    
  };
  $scope.fnDeleteBatches=function(id){
   var deletedBatch= addBatches.deleteBatch(id,$scope.cmp_id);
   deletedBatch.then(function(response){
    $scope.batchEelements=angular.fromJson(JSON.parse(response.data));
    $alert({title: 'Done..!', content: 'Successfuly Deleted the Batch :-)', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});
         // hide();

   });

  };
  $scope.fnLoadMoreOptions =function(id){
      $scope.batchId=id;

      var existingCourses= addBatches.loadExistingCoursesUnderBatch($scope.batchId);
        existingCourses.then(function(response){
        $scope.existingCourses=angular.fromJson(JSON.parse(response.data));
        //console.log($scope.existingCourses[0]) 
       });
      $modal({scope: $scope, template: 'angularModules/Batches/partials/partial-popUpOptions.html',
          show: true
         });
  };
  $scope.addCoursestoBatch=function(hide){//updating the batch details
    // console.log($scope.existingCourses[0]); 
     //console.log($scope.Batch.newCourse);
    $scope.existingCourses[0].course= $scope.existingCourses[0].course.concat($scope.Batch.newCourse);
    $scope.existingCourses[0]._id=  $scope.existingCourses[0]._id.$oid; 
    $scope.existingCourses[0].crmId=  $scope.existingCourses[0].crmId.$oid; 
    $scope.existingCourses[0].urmId=  $scope.existingCourses[0].urmId.$oid; 
    $scope.existingCourses[0].companyId=  $scope.existingCourses[0].companyId.$oid; 
    $scope.existingCourses[0].startDate=  new Date($scope.existingCourses[0].startDate.$date).toISOString(); 
    $scope.existingCourses[0].endDate=  new Date($scope.existingCourses[0].endDate.$date).toISOString(); 
    $scope.existingCourses[0].updatedDate=Date();
    delete $scope.Batch.newCourse;
   // console.log($scope.existingCourses);
    var addCourse=addBatches.addCoursesToBatch($scope.existingCourses);
    addCourse.then(function(response){
       $alert({title: 'Done..!', content: 'Successfuly updated the Batch :-)', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});
         hide();
    
    });
  };

  $scope.fnRemoveCourse=function(index){//fn for  remove the selected item 
    //var index = $scope.existingCourses[0].course.indexOf(id);
    $scope.existingCourses[0].course.splice(index, 1);
    //console.log($scope.existingCourses[0].course);
  };
$scope.resetBatch =function(){
  delete $scope.batchInfo[0];
  $scope.Batch={};  
  $scope.Batch.course=[];
  $scope.summary=null; 
   $scope.buttonType="Add Batch";
   $scope.excluded='';
};
$scope.fnChangeMode=function(hide){
  hide();
  $scope.Batch.batchMode="onetime";
};
 $scope.batchDropdown = [
  {
    "text": "<i class=\"fa fa-plus-square-o \" ></i>&nbsp;Add Courses",
    "click": "this.fnLoadMoreOptions(batch._id.$oid);"
  },
  {
    "text": "<i class=\"fa fa-fw fa-edit\"></i>&nbsp;Edit Batch",
    "click": "this.fnEditBatches(batch._id.$oid);"
  },
  {
    "text": "<i class=\"fa fa-fw fa-trash\"></i>&nbsp;Delete Batch",
    "click": "this.fnDeleteBatches(batch._id.$oid);"
  }];
 
  
}]);