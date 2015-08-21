angular.module('baabtra').controller('MarkbatchattendanceCtrl',['$scope','$rootScope','commonService','batchAttendance','$state','$alert','notification', 'communications',function($scope,$rootScope,commonService,batchAttendance,$state,$alert, notification, communications){

    /*login detils start*/
    if(!$rootScope.userinfo){
        commonService.GetUserCredentials($scope);
        $rootScope.hide_when_root_empty=false;
        return;
    }

    if(angular.equals($rootScope.loggedIn,false)){
        $state.go('login');
    }

    var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
    var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    var username = $rootScope.userinfo.ActiveUserData.username?$rootScope.userinfo.ActiveUserData.username:"";
    /*login detils ends*/
    

    $scope.batchAttendance = {};
    var today = new Date();
    $scope.batchAttendance.attendanceTakingDate = today.toISOString();
    $scope.batchAttendance.batchId = $state.params.batchMappingId;
    $scope.batchAttendance.today = Date.parse((today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear());

    var first = today.getDate() - today.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    $scope.batchAttendance.weekFirstDay = new Date(today.setDate(first)).toISOString();
    $scope.batchAttendance.weekLastDay = new Date(today.setDate(last)).toISOString();
    $scope.batchAttendance.dayInWeek = [{day:0, date:""}, {day:1, date:""}, {day:2, date:""}, {day:3, date:""}, {day:4, date:""}, {day:5, date:""}, {day:6, date:""}];
    //console.log(firstday, lastday);

    var menteesListResponse = batchAttendance.fnLoadMenteesMarkedAttendanceFromBatch($scope.batchAttendance.batchId);
    menteesListResponse.then(function(response){
        var result = angular.fromJson(JSON.parse(response.data));
        $scope.batchAttendance.userDetails = result;
       
    });

    $scope.batchAttendance.batchAttendanceDropdown = [{key:'Present'}, {key:'Planned leave'}, {key:'Absent'}];

    $scope.getWeekDate = function(dayInWeek){
        var currentDate = new Date(today.setDate(first));
        currentDate.setDate(currentDate.getDate()+(1 * dayInWeek.day));
        var dd = currentDate.getDate();
        var mm = currentDate.getMonth()+1; //January is 0!
        var yyyy = currentDate.getFullYear();
        dayInWeek.date = Date.parse(mm+'-'+dd+'-'+yyyy);
        return currentDate;
    };

    $scope.attendanceChanged = function(attendanceObj, dayInWeek, attendanceTrack, cndAtdnsId, cndLoginId, cndProfile){
        
        var date = new Date(today.setDate(first));
        date.setDate(date.getDate()+(1 * dayInWeek.day));

        var attendanceObjLength = attendanceObj.length;
        
        if(angular.equals(attendanceTrack[dayInWeek.date],'Absent')){
            var message = "DEAR PARENT: Your child "+ cndProfile.firstName +" "+ cndProfile.lastName +" is absent today – "+username;
            var gotParents = communications.fnLoadParent(cndLoginId);
            var parentsLoginIds = [];
            gotParents.then(function (response) {
                var result = angular.fromJson(JSON.parse(response.data));
                for(var parent in result){
                    parentsLoginIds.push(result[parent].fkUserLoginId.$oid);
                }
                if(parentsLoginIds.length){
                    notification.newNotification({companyId:companyId,fkLoginIds:['55d435f465f384694144b808'], message:message,link:{state:'home.main.menteeAttendance',params:{userId:cndLoginId, batchId:$state.params.batchMappingId}},crmId:rm_id});
                } 
            });
        }


        
        for(var attendance in attendanceObj){
            if(angular.equals(attendanceObj[attendance].attendanceTrackKey, dayInWeek.date+'')){
                attendanceObj[attendance].attendanceStatus =  attendanceTrack[dayInWeek.date];
                attendanceObj[attendance].markedOn = new Date().toISOString();
                attendanceObj[attendance].markedBy = rm_id;
                break;
            }
            if(angular.equals(attendanceObjLength, parseInt(attendance)+1)){
                var attendanceDetail = {};
                attendanceDetail.attendanceStatus =  attendanceTrack[dayInWeek.date];
                attendanceDetail.date = date.toISOString();
                attendanceDetail.attendanceStatusHistory = [];
                attendanceDetail.markedOn = new Date().toISOString();
                attendanceDetail.markedBy = rm_id;
                attendanceDetail.attendanceTrackKey = dayInWeek.date+'';
                attendanceObj.push(attendanceDetail);
            }
        }
        if(!attendanceObjLength){
            var attendanceDetail = {};
            attendanceDetail.attendanceStatus =  attendanceTrack[dayInWeek.date];
            attendanceDetail.date = date.toISOString();
            attendanceDetail.attendanceStatusHistory = [];
            attendanceDetail.markedOn = new Date().toISOString();
            attendanceDetail.markedBy = rm_id;
            attendanceDetail.attendanceTrackKey = dayInWeek.date+'';
            attendanceObj.push(attendanceDetail);
        }
        
        var objectToBeSavedInDb = {cndAtdnsId:cndAtdnsId, attendanceObj:attendanceObj, attendanceTrack:attendanceTrack};
        var attendanceMarkResponse = batchAttendance.saveCandidatesAttendance(objectToBeSavedInDb);
        attendanceMarkResponse.then(function(response){
            var result = angular.fromJson(JSON.parse(response.data));
        });

        // console.log(JSON.stringify($scope.batchAttendance.userDetails));
    };

}]);