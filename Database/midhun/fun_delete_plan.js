db.system.js.save(
	{
		_id:"fun_delete_plan",
		value:function(plan_to_delete)
		{
			db.clnBillingPlan.update({'_id':ObjectId(plan_to_delete.plan_id)},{$set:{'activeFlag':0}});
	}});