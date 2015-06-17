db.system.js.save(
	{
		_id:"function_create_newFeature",
		value:function(newFeature)
		{
			companyId=db.clnFeatures.insert(newFeature);
	}});