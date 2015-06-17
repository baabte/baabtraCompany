db.system.js.save(
	{
		_id:"fun_load_publishedCourses",
		value:function()
		{
			courses=db.clnCourses.find({draftFlag:1,activeFlag:1}).toArray();
			return courses;
	}});