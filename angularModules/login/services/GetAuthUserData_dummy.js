//GetAuthUserData
function (data,ip_address) {
    
            ReturnData = {};
		    ip_addresses=[];
		    login_data = db.clnUserLogin.find(data, {_id:1, roleMappings:1, lastLoggedRoleMapping:1}).limit(1).toArray();
		    role_id = db.clnUserRoleMapping.find({_id:login_data[0].lastLoggedRoleMapping}).toArray();
		    ReturnData.ActiveUserDataId = new ObjectId;
		    var user = {};
		    user._id = ReturnData.ActiveUserDataId;
		    user.userLoginId = login_data[0]._id;
		    user.roleMappingId = login_data[0].lastLoggedRoleMapping;
		    user.roleMappingObj = role_id[0];
		    ip_addresses.push(ip_address);
                    user.ip_address=ip_addresses;
                    user.loginDate=new Date();
		    ReturnData.result = "true";
		    ReturnData.userLoginId = login_data[0]._id.valueOf();
            ReturnData.ActiveUserData = user;
		    if(role_id[0].fkRoleId==2){
		    	var userinfo= db.clnCompany.findOne({"_id" : role_id[0].fkCompanyId},{"companyName":1,"eMail":1}); 
		    			ReturnData.ActiveUserData.username =userinfo.companyName;
                        ReturnData.ActiveUserData.eMail =userinfo.eMail;
                        user.username=userinfo.companyName;
                        user.eMail=userinfo.eMail;
		    }
		    else if(role_id[0].fkRoleId==4){
		    	var userinfo=db.clnReseller.findOne({fkuserLoginId:login_data[0]._id},{resellerName:1,email:1});
		    	ReturnData.ActiveUserData.username =userinfo.resellerName;
                ReturnData.ActiveUserData.eMail =userinfo.email;
                user.username=userinfo.resellerName;
                user.eMail=userinfo.email;

		    }
                    else{
                        LogUserData = db.clnUserLogin.find({_id:ObjectId(ReturnData.userLoginId)}).limit(1).toArray();
                        ReturnData.ActiveUserData.username = LogUserData[0].userName;
                        user.username=LogUserData[0].userName;
                    }
		    userExistsOrNot=db.clnActiveUserData.find({"userLoginId":user.userLoginId}).limit(1).count();
		    if(userExistsOrNot==0){
		    	db.clnActiveUserData.insert(user);
                        db.clnLoginHistory.insert(user);
		    }
		    else{
		    	db.clnActiveUserData.update({"userLoginId":user.userLoginId},{ $push: { "ip_address": ip_address } });
                        db.clnLoginHistory.insert(user);
		    	ActiveUserDataId=db.clnActiveUserData.find({"userLoginId":user.userLoginId},{ "_id":1 }).limit(1).toArray();
		    	ReturnData.ActiveUserDataId=ActiveUserDataId[0]._id;
		    	ReturnData.ActiveUserData._id=ActiveUserDataId[0]._id;


		    }
		    
		    return ReturnData;
}