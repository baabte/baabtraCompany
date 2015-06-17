db.system.js.save(
	{
		_id:"function_Active_user_data",
		value:function(data)
		{
			userData=db.clnActiveUserData.find({"_id" : ObjectId(data)});
			return userData;
	}});