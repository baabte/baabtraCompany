db.system.js.save(
	{
		_id:"fnFetchCourseData",
		value:function(courseId)
		{
			course = db.clnUserCourseMapping.findOne({"_id":ObjectId(courseId), "activeFlag":1});
    		return course;
			
	}});