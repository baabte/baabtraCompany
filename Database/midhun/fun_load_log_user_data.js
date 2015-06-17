db.system.js.save(
	{
		_id:"fun_load_log_user_data",
		value:function(objId)
		{
			 
		    var userData={};
		    var activeObjId=objId.substr(0, objId.length-24); 
		    var activeUsrId=objId.substr(24);
		    userLoginData=db.clnActiveUserData.find({$and:[{"_id" : ObjectId(activeObjId)},{userLoginId:ObjectId(activeUsrId)}]}).limit(1).toArray();
		    userLoginData[0].userLoginId=userLoginData[0].userLoginId.valueOf();
		    userInfo=db.clnUserLogin.find({"_id":ObjectId(userLoginData[0].userLoginId)}).limit(1).toArray();
		    userData.ActiveUserDataId=userLoginData[0]._id;
		    userData.ActiveUserData=userLoginData[0];
		    userData.userLoginId=userLoginData[0].userLoginId;
		    userData.ActiveUserData.username=userInfo[0].userName;
		    userData.result="true";
		    return userData;
		    
	}});




// function () {
//     returnData = {};
//     a = ObjectId("54bfa18bef14f722f48904fc").getTimestamp();
//     b = ISODate();
//     returnData.docDate = a.getMinutes();
//     returnData.curDate = b.getMinutes();
//     return returnData.curDate-returnData.docDate;
// }