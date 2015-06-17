angular.module('baabtra').controller('FeedbackreportCtrl',['$scope','$rootScope','$stateParams','feedbackList',function($scope,$rootScope,$stateParams,feedbackList){

$scope.chart = { //dummy object
  "type":"PieChart",	
  "options": {
    "title": "",
    "tooltip": {
      "isHtml": true
    },
    'width':600,
   'height':400
  }
};
//$scope.reportList=[{"chart":$scope.chart3},{"chart":$scope.chart3},{"chart":$scope.chart3}];
//to check login info to get the user details
if(!$rootScope.userinfo){
    //commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

//checking for feedbackId to load the feedback report
if(!angular.equals($stateParams.feedbackId,undefined)){
	var feedbackResponse = feedbackList.fnLoadFeedbackReport($stateParams.feedbackId);
		feedbackResponse.then(function(response){ //getting the promise of feedback response
			$scope.reportList=angular.fromJson(JSON.parse(response.data));
      // console.log($scope.reportList);
			$scope.feedbackList=[];
			angular.forEach($scope.reportList,function(value, key){ //forech to build the new object for loading the feedback report
				var obj={};
				obj.question=value.question;
				$scope.chart.data=value.data;
        // console.log($scope.chart);
				$scope.chart.options.title=value.question.replace(/<\/?[^>]+>/gi, ''); //to replace html tags
				obj.chart=angular.copy($scope.chart); //to copy the object
        // console.log(obj);
				$scope.feedbackList.push(obj);
			});
	});
}
//chart type object
$scope.chartTypes = [{"value":"PieChart","label":"PieChart"},{"value":"AreaChart","label":"Area Chart"},{"value":"ColumnChart","label":"Column Chart"},{"value":"LineChart","label":"Line Chart"},{"value":"Table","label":"Table"},{"value":"BarChart","label":"Bar Chart"}];

}]);