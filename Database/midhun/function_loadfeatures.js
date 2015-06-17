db.system.js.save(
	{
		_id:"function_loadFeatures",
		value:function()
		{
			featues=db.clnFeatures.find().toArray();
			return featues;
	}});