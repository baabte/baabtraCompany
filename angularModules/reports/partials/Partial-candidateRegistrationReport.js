angular.module('baabtra').controller('CandidateregistrationreportCtrl',['$scope','candidateReport','$rootScope','commonService',function($scope,candidateReport,$rootScope,commonService){


 if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

$scope.type = 'Pie';
$scope.data=[];
$scope.labels=[];
$scope.labelname=[];
$scope.hideOrShowChart=true;

$scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
$scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;

$scope.candidateRegistrationReport={};

$scope.dates={};
var candidateregReport={"companyId":$scope.companyId};
candidateregReport.type=0;
var CandidateRegistrationReportCallback=candidateReport.CandidateRegistrationReport(candidateregReport);
      CandidateRegistrationReportCallback.then(function(data){
      $scope.candidateregdata=angular.fromJson(JSON.parse(data.data)); 
      // console.log($scope.candidateregdata);
      // $scope.chartData=[];
      // var array=[];
      // array[0]="Candidates count";
      // array[1]="Time Period";
      // $scope.chartData.push(array);
      // array=[];
      // for (var i in $scope.candidateregdata) {
      //      array[0]=$scope.candidateregdata[i].registered;
      //      array[1]=$scope.candidateregdata[i].candidateCount;
      //      $scope.chartData.push(array);
      //      array=[];
      // }
      // $scope.CalctotalCount($scope.chartData);
      //  $scope.candidateRegistrationReport= { 
      //                             "type":"PieChart", 
      //                             "displayExactValues": true, 
      //                             "options": {
      //                               "is3D":true,  
      //                               "title": "Candidate Registration",
      //                               "vAxis":{
      //                                 "title":"Candidates"
      //                               },
      //                               "hAxis": {
      //                                   "title": "RegisteredOn"
      //                                 },
      //                               "tooltip": {
      //                                 "isHtml": true
      //                               },
      //                               'width':600,
      //                              'height':400
      //                             }
      //                   };   
      // $scope.candidateRegistrationReport.data=$scope.chartData; 
      $scope.datas=[];
        if($scope.candidateregdata.length)
          {
            var counter=0;
            $scope.hideOrShowChart=true;
            $scope.CalctotalCount($scope.candidateregdata);
            for (index in $scope.candidateregdata) {
              if($scope.candidateregdata[index].candidateCount>0){
                 
                  $scope.labels.push($scope.candidateregdata[index].registered);
                  $scope.data.push($scope.candidateregdata[index].candidateCount);
              }
               
            }

         }
         else{
            $scope.hideOrShowChart=false;
         }

     
});
$scope.UpdateReport=function(from,data){
	var dataToSend={};
	dataToSend.type=from;
	dataToSend.companyId=$scope.companyId;
    if(from=='DateRange'){
	     dataToSend.DateRange={};
	     dataToSend.DateRange.startDate=$scope.dates.startDate;     
	     dataToSend.DateRange.endDate=$scope.dates.endDate;
    }else{
    	 dataToSend.type='DateRange';
    	 dataToSend.week=$scope.dates.weekNumber;
         dataToSend.DateRange={};
         var weekstartdate=firstDayOfWeek($scope.dates.weekNumber,(new Date()).getFullYear(),'first');
         weekstartdate=new Date(weekstartdate);
         var weeklastdate=firstDayOfWeek($scope.dates.weekNumber,(new Date()).getFullYear(),'last');
         weeklastdate=new Date(weeklastdate);
         dataToSend.DateRange.startDate=weekstartdate;
         dataToSend.DateRange.endDate=weeklastdate;
    }
    var UpdateReportCallBack=candidateReport.CandidateRegistrationReport(dataToSend); 
     UpdateReportCallBack.then(function(data){
        $scope.UpdateReportObj = angular.fromJson(JSON.parse(data.data)); 
        // var arrayToPush=[];
        // var array=[];
        //     array[0]="Candidates count";
        //     array[1]="Time Period";
        // arrayToPush.push(array);
        // array=[];
        // for (var i in $scope.UpdateReportObj) {
        //        array[0]=$scope.UpdateReportObj[i].registered;
        //        array[1]=$scope.UpdateReportObj[i].candidateCount;
        //        arrayToPush.push(array);
        //        array=[];
        // }
        // $scope.CalctotalCount(arrayToPush);
        // $scope.candidateRegistrationReport.data=arrayToPush;
        console.log($scope.UpdateReportObj);
        $scope.labelname=[];
        $scope.labels=[];
        $scope.data=[];
        if($scope.UpdateReportObj.length)
          {
            var counter=0;
            $scope.hideOrShowChart=true;
            $scope.CalctotalCount($scope.UpdateReportObj);
            for (index in $scope.UpdateReportObj) {
                  if($scope.UpdateReportObj[index].candidateCount>0){
                      counter++;      
                      $scope.labels.push($scope.UpdateReportObj[index].registered);
                      $scope.data.push($scope.UpdateReportObj[index].candidateCount);
                  }
            }
              // $scope.tempArrarlabels=angular.copy($scope.labels);
          }else{
            $scope.hideOrShowChart=false;
          }
          if(angular.equals(counter,0))
            {$scope.hideOrShowChart=false; }
 });
};

$scope.CalctotalCount=function(ArrayVar)
{
  $scope.total=0;
  for (var i = 0; i < ArrayVar.length; i++) {
    if(i>0)
    {
      $scope.total= $scope.total+ArrayVar[i][1];
    }
  }

}
///////////////////////////////////////////////////

function firstDayOfWeek(week, year,type) {

    var date       = firstWeekOfYear(year,type),
        weekTime   = weeksToMilliseconds(week),
        targetTime = weekTime + date.getTime();

    return date.setTime(targetTime);

}


function weeksToMilliseconds(weeks) {
    return 1000 * 60 * 60 * 24 * 7 * (weeks - 1);
}

function firstWeekOfYear(year,type) {
    var date = new Date();
    date = firstDayOfYear(date,year);
    if(type=='first'){
      date = firstWeekday(date);
    }
    else{
      date = LastWeekday(date);
    }
    
    return date;
}

function firstDayOfYear(date, year) {
    date.setYear(year);
    date.setDate(1);
    date.setMonth(0);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

function firstWeekday(date) {
    
    var day = date.getDay(),
        day = (day === 0) ? 7 : day;
    if (day > 3) {

        var remaining = 8 - day,
            target    = remaining + 1;
                
        date.setDate(target);
    }
    
    return date;
}

function LastWeekday(date) {
    
    var day = date.getDay(),
        day = (day === 0) ? 7 : day;
    if (day > 3) {

        var remaining = 8 - day,
            target    = remaining + 7;
                
        date.setDate(target);
    }
    
    return date;
}

function getISOWeeks(y) {
    var d,
        isLeap;

    d = new Date(y, 0, 1);
    isLeap = new Date(y, 1, 29).getMonth() === 1;

    //check for a Jan 1 that's a Thursday or a leap year that has a 
    //Wednesday jan 1. Otherwise it's 52
    return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
}


$scope.changeChartType=function(chart){
  if(chart=='Bar'||chart=='Line'){
    if($scope.data[0].length){
      $scope.type=chart;
      // $scope.labels=[];
      // $scope.labels=$scope.labels.concat($scope.labelname);
    }else{
      var tempArrar=angular.copy($scope.data);
      $scope.data=[];
      $scope.data.push(tempArrar);
      // $scope.labels=[];
      // $scope.labels=$scope.labels.concat($scope.labelname);
      $scope.type=chart;
    }
     
  }else{
      if($scope.data[0].length){
        var tempArrar=[];
        tempArrar=tempArrar.concat($scope.data[0]);
        $scope.data=[];
        $scope.data=$scope.data.concat(tempArrar);
        $scope.type=chart;
        // $scope.labels=[];
        // $scope.labels=$scope.labels.concat($scope.tempArrarlabels);
      }else{
        $scope.type=chart;
        // $scope.labels=[];
        // $scope.labels=$scope.labels.concat($scope.tempArrarlabels);
      }
  }
  
}
$scope.CalctotalCount=function(ArrayVar)
{
  $scope.total=0;
  for (var i = 0; i < ArrayVar.length; i++) {
    // if(i>0)
    // {
    //   $scope.total= $scope.total+ArrayVar[i][1];
    // }
     $scope.total=$scope.total+ArrayVar[i].candidateCount;
  }

}

}]);