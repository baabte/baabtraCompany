db.system.js.save(
	{
		_id:"fun_logout",
		value:function(objId)
		{
			db.clnActiveUserData.remove({_id:ObjectId(objId)});
	}});