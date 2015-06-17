db.system.js.save(
	{
		_id:"fnLoadCourseData",
		value:function(companyId)
		{
			 courses = db.clnCourses.find({_id:ObjectId(companyId),draftFlag:1, activeFlag:1}).toArray();
    		 return courses;

			 
	}});