db.system.js.save(
	{
		_id:"GetAuthUserDataThroughFacebook",
		value:function(data)
		{
		   
			ReturnData = {};
		    login_data = db.clnUserLogin.find({socialProfiles:{$elemMatch:data}}, {_id:1, roleMappings:1, lastLoggedRoleMapping:1}).limit(1).toArray();
		    role_id = db.clnUserRoleMapping.find({_id:login_data[0].lastLoggedRoleMapping}).toArray();
		    ReturnData.ActiveUserDataId = new ObjectId;
		    var user = {};
		    user._id = ReturnData.ActiveUserDataId;
		    user.userLoginId = login_data[0]._id;
		    user.roleMappingId = login_data[0].lastLoggedRoleMapping;
		    user.roleMappingObj = role_id[0];
		    ReturnData.ActiveUserData = user;
		    ReturnData.result = "true";
		    ReturnData.userLoginId = login_data[0]._id.valueOf();
		    db.clnActiveUserData.insert(user);
		    db.clnLoginHistory.insert(user);
		    LogUserData = db.clnUserLogin.find({_id:ObjectId(ReturnData.userLoginId)}).limit(1).toArray();
		    ReturnData.ActiveUserData.username = LogUserData[0].userName;
		    return ReturnData;
			

	}});