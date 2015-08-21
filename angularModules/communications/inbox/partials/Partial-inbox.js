angular.module('baabtra').controller('InboxCtrl',['notification','communications','$alert','$modal','commonService','$scope','$rootScope',function(notification,communications,$alert,$modal,commonService,$scope,$rootScope){

if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
   return;
}

var loginId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkUserLoginId.$oid;
var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
$scope.data = {};

var gotMsgs = communications.loadInbox({filter:{to:loginId}});
	
	gotMsgs.then(function (response) {
		var msgs = angular.fromJson(JSON.parse(response.data));
		$scope.data.messages=msgs;
	});

$scope.openMessage = function (message) {
	$scope.data.thisMessage = message;
	if(!angular.equals(message.parentId,undefined)){
		var gotParentMsg = communications.loadSingleMessage(message.parentId);
			gotParentMsg.then(function (msgRes) {
				$scope.data.parentOfThisMsg = angular.fromJson(JSON.parse(msgRes.data));
			});
	}
	$modal({scope: $scope,backdrop:true, template: 'angularModules/communications/inbox/partials/popup-openMessage.html', show: true,placement:'center'});
};

$scope.openReplyWindow = function () {
	var parentId = $scope.data.thisMessage._id.$oid;
	var to = $scope.data.thisMessage.from;

	$scope.data.message = {to:[to],from:loginId,parentId:parentId,subject:'RE:'+$scope.data.thisMessage.subject};
	$modal({scope: $scope,backdrop:true, template: 'angularModules/communications/sendMessages/popup/popup-newMessage.html', show: true,placement:'center'});
};

$scope.sendMessage = function (hide) {
	$scope.data.message.fkcompanyId = companyId;
	$scope.data.message.read = []; //here communications
	var sendMsg = communications.newMessage($scope.data.message);
		sendMsg.then(function (response) {
			notification.newNotification({companyId:companyId,fkLoginIds:$scope.data.message.to,message:$scope.data.message.subject,link:{state:'home.main.inbox',params:{}},crmId:rm_id});
			$alert({title: '', content: 'Message sent.', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});
			hide();
		});
	
};

$scope.loadMore = function () {
	var lastId = $scope.data.messages[$scope.data.messages.length-1]._id.$oid;
	var gotMoreMsgs = communications.loadInbox({filter:{to:loginId},lastId:lastId});
		gotMoreMsgs.then(function (moreMsgs) {
			var dataMoreMsgs = angular.fromJson(JSON.parse(moreMsgs.data));
			$scope.data.messages = $scope.data.messages.concat(dataMoreMsgs);
		});
};

}]).filter('breakFilter', function () {
    return function (text) {
        if (text !== undefined) return text.replace(/\n/g, '<br />');
    };
});;