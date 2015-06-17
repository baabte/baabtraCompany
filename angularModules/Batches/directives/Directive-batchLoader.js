angular.module('baabtra').directive('batchLoader',['addBatches','$rootScope','$filter','$state' ,function (addBatches,$rootScope,$filter ,$state) {
  return {
    restrict: 'E',
    require: 'ngModel',
    scope:{
      ngModel:"=",
      courseobj:"="
    },
    templateUrl: 'angularModules/Batches/directives/Directive-batchLoader.html',
    link: function(scope, element, attrs, fn) { 
      
      //scope.test={};
   // scope.$watch('courseobj', function(){//adding watch to couse id 
   //    $scope.courseId=scope.courseobj.course._id
   //      if(!angular.equals(scope.courseobj.doj,undefined)){
   //        $scope.joinDate=scope.courseobj.doj 
   //      }
   //   }, true); 
  
      var companyId = "";    
      if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
        companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
             
      }
       var courseId;
       var courseType;
       var join=new Date();
       var joinDate="";
   //function for loading Batches
   //console.log(scope.coursedata);
  // var joinDate="2015-03-15T18:30:00.000Z";
   //coursedata='54fc31f443fa1fe885d3ad61';
   // scope.$watch('coursedoj', function(){//adding watch to couse id 
   //         if(!angular.equals(scope.coursedoj,undefined)){
   //            joinDate=scope.coursedoj.toISOString(); 
   //          }else{
   //             joinDate="2015-03-15T18:30:00.000Z";//Date();
              
   //15-03-2015          }
   //      }, true);


// scope.$watch('test', function(){//adding watch to couse id 
//            //if(!angular.equals(scope.batchObj,undefined)){
//               scope.courseobj.batch=scope.test;
//             //}
//         }, true);


  scope.$watch('courseobj.course', function(){//adding watch to couse id
     scope.fetchBatch();
        
   }); 

  // scope.courseobj.doj=new Date();
   scope.$watch('courseobj.doj', function(){//adding watch to date

   scope.fetchBatch();
        
   }, true); 

   scope.$watch('courseobj.coursetype', function(){//adding watch to couse id
    scope.fetchBatch();
        
   }, true); 


scope.fetchBatch =function(){

       
        if(!angular.equals($state.current.name,'home.main.nominateEmployee')){
             
             if(!angular.equals(scope.courseobj.course,undefined)){
               courseId=scope.courseobj.course._id;
             } 
             if(!angular.equals(scope.courseobj.doj,undefined)){
                  joinDate=scope.courseobj.doj.toISOString(); 

                 }else{
                     joinDate=join.toISOString(); 
                } 
           //joinDate=join.toISOString();

           courseType = scope.courseobj.coursetype?scope.courseobj.coursetype:'';
           scope.batchElements=[];
           if(!angular.equals(courseId,undefined)){
           
        
               var promise = addBatches.loadCourseRelatedBatches(companyId,courseId,joinDate,courseType);
            promise.then(function(response){
              scope.batchElements = angular.fromJson(JSON.parse(response.data));
              console.log(scope.batchElements);
               angular.forEach(scope.batchElements, function(batch){
                batch.Name = batch.batchName+batch._id.$oid;
                batch._id = batch._id.$oid;
                batch.startDate=batch.start.$date;
                batch.seats=batch.seat;
                batch.endDate=batch.end.$date;
                delete batch.start;
                delete batch.seat;
                delete batch.end;
                console.log(batch);
              //if(batch.batchMode=="onetime"){
               // batch.icon = '<div class="col-xs-12  text-xs">Starts on: '+$filter('date')(batch.startDate)+'<br/>Remaining seats:'+batch.seats+'<br/>Duration:'+batch.duration+'days</div>';
               if(batch.startTime ==undefined ||batch.endTime==undefined){
               batch.icon = '<div class="col-xs-12  text-xs">Starts on: '+$filter('date')(batch.startDate)+'<br/>Remaining seats:'+batch.seats+'<br/>Type:'+ batch.courseType+'</div>';
               }else{
               batch.icon = '<div class="col-xs-12  text-xs">Starts on: '+$filter('date')(batch.startDate)+'('+$filter('date')(batch.startTime,'shortTime')+ "-" +$filter('date')(batch.endTime,'shortTime') +')'+'<br/>Remaining seats:'+batch.seats+'<br/>Type:'+batch.courseType+'</div>';
               }
               /*}else{
                // batch.icon = '<div class="col-xs-12  text-xs">Starts on: '+$filter('date')(batch.startDate)+'<br/>Remaining seats:'+batch.seats+'<br/>Repeats After:'+batch.repeats.every +" "+ batch.repeats.repeatType +'</div>';
                if(batch.startTime ==undefined ||batch.endTime==undefined){
                batch.icon = '<div class="col-xs-12  text-xs">Starts on: '+$filter('date')(batch.startDate)+'<br/>Remaining seats:'+batch.seats+'</div>';
                }else{
                  batch.icon = '<div class="col-xs-12  text-xs">Starts on: '+$filter('date')(batch.startDate)+'('+$filter('date')(batch.startTime,'shortTime') + "-" +$filter('date')(batch.endTime,'shortTime') +')'+'<br/>Remaining seats:'+batch.seats+'</div>';
                }
                }*/
               });

             // console.log(scope.batchElements );
              
            }); 
         } 
        
    } 

};
  
scope.fetchBatch();
           

           
       
    
     // }, true);   
    } 
  };
}]);
