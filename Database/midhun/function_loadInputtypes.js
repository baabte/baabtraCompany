db.system.js.save(
	{
		_id:"function_loadInputTypes",
		value:function()
		{
			InputTypes=db.clnInputTypes.find({},{_id:0,inputtypes:1}).toArray();
return InputTypes;
	}});