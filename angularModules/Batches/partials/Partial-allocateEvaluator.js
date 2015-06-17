angular.module('baabtra').controller('AllocateevaluatorCtrl',['$scope', '$rootScope', '$state', '$alert', 'commonService', 'allocateEvaluator', function ($scope, $rootScope, $state, $alert, commonService, allocateEvaluator){

  /*login detils start*/

  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

  var rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/

  $scope.data = {};
  $scope.data.changesOccurred = false;
  $scope.data.evaluableElement = false;
  $scope.data.showMsg = false;

  var loadCourseBatchResponse = allocateEvaluator.LoadCoureBatchByBatchId($state.params.batchMappingId, companyId);
  loadCourseBatchResponse.then(function(response){
  	var coureBatch = angular.fromJson(JSON.parse(response.data));

  	$scope.data.courseTimeline = coureBatch.courseTimeline;
  });

  $scope.expandDetails = function(expandElem){
  	if(!angular.equals($scope.data.expandDetails, expandElem)){
  		$scope.data.expandDetails = expandElem;
  	}else{
  		$scope.data.expandDetails = "";
  	}
  };

  $scope.data.elementList = [];

  $scope.elementCheckBoxChange = function(element, elementCheckBox){
  	
  	if(elementCheckBox){
  		$scope.data.elementList.push(element);
  	}
  	else{

  		for(var elem in $scope.data.elementList){
  			if(angular.equals($scope.data.elementList[elem].code, element.code)){

  				$scope.data.elementList.splice(elem, 1);
  			}  			
  		}
  	}
  };

  $scope.saveEvaluatorList = function(){
  	
    saveEvaluatorList(function(){

      var saveCourseTimelineBatchResponse = allocateEvaluator.saveBatchTimelineChanges($state.params.batchMappingId, $scope.data.courseTimeline);
      saveCourseTimelineBatchResponse.then(function(response){
        var result = angular.fromJson(JSON.parse(response.data));
        if(angular.equals(result.result, "Success")){
          $alert({title: 'Success!', content: 'Evaluator details updated :)', placement: 'top-right', type: 'success', duration:3, show: true});
        }

      });

      $scope.data.elementList = [];
      $scope.data.elementCheckBox = [];
    });
  };

  function saveEvaluatorList (callBack) {
    
    var index = 0;
    if($scope.data.elementList.length){
      angular.forEach($scope.data.elementList, function(element){
        
        if(element.evaluable){

        var elem = $scope.data.courseTimeline[element.tlPointInMinute][element.Name][element.index];
        if(angular.equals(elem.evaluator,undefined)){
          elem.evaluator = [];
        }
        
        var evaluatorIndex = 0;
        for(var evaluator in elem.evaluator){
          if(angular.equals(elem.evaluator[evaluator].roleMappingId, $scope.data.evaluator[0].roleMappingId)){
            break;
          }

          evaluatorIndex++;
          if(angular.equals(evaluatorIndex,elem.evaluator.length)){
             elem.evaluator.push($scope.data.evaluator[0]);
          }

        }

        index++;
        
        if(angular.equals($scope.data.elementList.length, index)){
          callBack();
        }
        }
      })
    }
    else{
      callBack();
    }
  };

  $scope.removeEvaluator = function(index, element){
    element.evaluator.splice(index, 1);
    $scope.data.changesOccurred = true;
  };

  $scope.selectAllElements = function(status){
    $scope.data.elementCheckBox = {};
    if(status){
    angular.forEach($scope.data.courseTimeline, function(tlPoint){
      for (var elements in tlPoint) {
        if(tlPoint[elements].length){
          for(var element in tlPoint[elements]){
            if(tlPoint[elements][element].evaluable){
              if(tlPoint[elements][element].code){
                if(status){
                  $scope.data.elementList.push(tlPoint[elements][element]);
                  $scope.data.elementCheckBox[tlPoint[elements][element].code] = status;
                }
                
              }
            }
          }
        }
      }
      
    });
    }
    else{
       $scope.data.elementList = [];
    }
  };

}]);