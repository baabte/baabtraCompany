db.system.js.save(
	{
		_id:"fun_delete_company_role",
		value:function(RoleId)
		{
			db.clnRoleMaster.update({'_id':ObjectId(RoleId)},{$set:{'activeFlag':0}});
	}});