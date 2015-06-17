db.system.js.save(
	{
		_id:"function_retriveCompany_Roles",
		value:function(data)
		{
			if(data.usertype==1){
				roles=db.clnRoleMaster.find( { companyId: { $exists: false },activeFlag:1 } ).toArray();
				return roles;
			}else{
				roles=db.clnRoleMaster.find({"companyId":ObjectId(data.companyId),activeFlag:1}).toArray();
				return roles;
			}
			
	}});