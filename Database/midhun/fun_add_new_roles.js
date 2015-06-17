db.system.js.save(
	{
		_id:"fun_add_new_roles",
		value:function(data)
		{			
			if(data.role==1){
				data.createdDate=Date();
				data.updatedDate=Date();
				data.activeFlag=1;
				db.clnRoleMaster.insert(data);
			}
			else{
				data.createdDate=Date();
				data.updatedDate=Date();
				data.activeFlag=1;
				data.companyId=ObjectId(data.companyId),
				db.clnRoleMaster.insert(data);

			}
	}});


db.clnRoleMaster.find().sort({_id:-1}).limit(1);

db.clnRoleMaster.find( { companyId: { $exists: false } } );