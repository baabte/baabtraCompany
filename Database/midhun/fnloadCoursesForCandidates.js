db.system.js.save(
	{
		_id:"fnloadCoursesForCandidates",
		value:function(courseId)
		{
		     courses = db.clnUserCourseMapping.find({fkUserLoginId:ObjectId(courseId), activeFlag:1}, {fkCourseId:1, Name:1, fkCompanyId:1, Description:1,courseImg:1}).toArray();
    		 return courses;

	}});