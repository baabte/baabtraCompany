db.system.js.save(
	{
		_id:"fun_update_company_role",
		value:function(RoleId,role,data)
		{
			var set={};
			RoleId=ObjectId(RoleId);
			set[role]=data;
			set.updatedDate=Date();
			db.clnRoleMaster.update({'_id':RoleId},{'$set':set}); 
	}});