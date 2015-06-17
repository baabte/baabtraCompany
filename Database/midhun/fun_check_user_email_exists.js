db.system.js.save(
	{
		_id:"fun_check_user_email_exists",
		value:function(email)
		{
			data={};
		    userdata=db.clnUserLogin.find({userName:email,activeFlag:1},{userName:1,password:1}).toArray();
		    if(userdata.length>0)
		    {
		        data.userdata=userdata[0];
		        data.result=1;
		        return data;
		     }
		     else{
		         data.result=0;
		         return data;
		     }
	}});