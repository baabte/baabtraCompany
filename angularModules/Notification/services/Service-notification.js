angular.module('baabtra').service('notification',['$http','bbConfig', function ($http, bbConfig) {

var socketio = io.connect(bbConfig.socketServer);

this.socket = function () {
  return socketio;
};
//


	this.fnLoadUserNotification = function(fkLoginId){
    var promise = $http({
      url: bbConfig.BWS+'loadUserNotification/',
      data: {fkLoginId:fkLoginId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

  this.fnLoadUserNotificationFull = function(filter,lastId){
    var promise = $http({
      url: bbConfig.BWS+'loadUserNotifications/',
      data: {filter:filter,lastId:lastId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

  this.markNotificationAsRead = function(fkLoginId,id){
    var promise = $http({
      url: bbConfig.BWS+'markNotificationAsRead/',
      data: {fkLoginId:fkLoginId,id:id},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

  this.newNotification = function (notificationObject) {
    var mandatoryData = ['companyId','fkLoginIds','message','link','crmId'];
    var missingData = [];
    var keys = Object.keys(notificationObject);
    for(key in mandatoryData){
      if(angular.equals(keys.indexOf(mandatoryData[key]),-1)){
        missingData.push(mandatoryData[key]);
      }
    }


var format={"companyId" : "<id here>","fkLoginIds" : ["<id(s) here>"],"message" : "message to be shown","link" : {"state" : "home.main.sample","params" : {}},"crmId" :"",};


    if(missingData.length){
      var missingMsg = "Missing "+missingData.toString()+" attributes in the input object of newNotification in notification service";
      console.groupCollapsed("%cMissing attributes..!","color:white;background:red;padding:5px;");
      console.error(missingMsg);
      console.log("Expected format is");
      console.log(format);
      console.groupEnd();
      return {};
    }

     var promise = $http({
      url: bbConfig.BWS+'newNotification/',
      data: notificationObject,
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });

     promise.then(function(response) {
       var ids=angular.fromJson(JSON.parse(response.data));
       socketio.emit('new_notification',{loginIds:notificationObject.fkLoginIds,data:notificationObject,ids:ids});
     });


  };

}]);