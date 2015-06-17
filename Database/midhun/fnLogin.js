db.system.js.save(
 	{
 		_id:"fnLogin",
 		value:function(data)
 		{			
			{			
			ReturnData={};
			if(data.from_where=="direct"){
                               
			    //user_valid_or_not=db.clnUserLogin.find(data.loginCredential).limit(1).count();
                            user_valid_or_not=db.clnUserLogin.find({$and:[{"userName":data.loginCredential.userName},{"password":data.loginCredential.password}]}).limit(1).count();
				if(user_valid_or_not==0)
				{
					ReturnData.result="false";
					return ReturnData;
                                        
				}
				else
				{
			                return GetAuthUserData(data.loginCredential,data.ip);
				}
			}
			else if(data.from_where=="facebook"){
				//user_id_exists_or_not=db.clnUserLogin.find({ socialProfiles: { $elemMatch:data.loginCredential} }).limit(1).count();
                                user_id_exists_or_not=db.clnUserLogin.find({$and:[{ socialProfiles: { $elemMatch:data.loginCredential} },{socialProfiles:{$elemMatch:{"mediaName":"facebook"}}}]}).limit(1).count();
				if(user_id_exists_or_not==0)
				{
					id=db.clnUserLogin.find({"userName":data.socialData.email},{_id:1}).map(function(item){ return item._id; });
                                        if(id[0]){
                                            db.clnUserLogin.update({_id:id[0]},{ $push: { socialProfiles: data.socialData } });
                                            return GetAuthUserDataThroughlinkedIn(data.loginCredential,data.ip);
                                         }
                                        else{
                                                db.clnUserLogin.save({"userName":data.socialData.email,	"roleMappings" : [
                                            ObjectId("5451e0636de0557a2e1a3221")
                                        ],
                                        "lastLoggedRoleMapping" : ObjectId("5451e0636de0557a2e1a3221"),
                                        "createdDate" : Date(),
                                        "updatedDate" : Date(),
                                        "crmId" : "",
                                        "urmId" : "",
                                        "activeFlag" : 1 ,
                                        "socialProfiles":[data.socialData]});
                                        return GetAuthUserDataThroughFacebook(data.loginCredential);
                                         }
					
				}
				else
				{
			                return GetAuthUserDataThroughFacebook(data.loginCredential);
				}
			}
			else if(data.from_where=="linkedIn"){
				 user_id_exists_or_not=db.clnUserLogin.find({$and:[{ socialProfiles: { $elemMatch:data.loginCredential} },{socialProfiles:{$elemMatch:{"mediaName":"linkedIn"}}}]}).limit(1).count();
				 if(user_id_exists_or_not==0)
				 {
				 	id=db.clnUserLogin.find({"userName":data.socialData.emailAddress},{_id:1}).map(function(item){ return item._id; });
                           
                                        if(id[0]){
                                            
                                            db.clnUserLogin.update({_id:id[0]},{ $push: { socialProfiles: data.socialData } });
                                            return GetAuthUserDataThroughlinkedIn(data.loginCredential,data.ip);
                                        }
                                        else{ 
                                           db.clnUserLogin.save({"userName":data.socialData.emailAddress,	"roleMappings" : [
                                            ObjectId("5451e0636de0557a2e1a3221")
                                         ],
                                         "lastLoggedRoleMapping" : ObjectId("5451e0636de0557a2e1a3221"),
                                         "createdDate" : Date(),
                                         "updatedDate" : Date(),
                                         "crmId" : "",
                                         "urmId" : "",
                                         "activeFlag" : 1 ,
                                         "socialProfiles":[data.socialData]});
                                         return GetAuthUserDataThroughlinkedIn(data.loginCredential); 
                                           
                                         }
                                        
	 }
				 else
				 {
			                 return GetAuthUserDataThroughlinkedIn(data.loginCredential);
				 }
				
			}

 	}});


// db.clnUserLogin.ensureIndex({"socialProfiles.mediaName" : 1})
// db.clnUserLogin.ensureIndex({"socialProfiles.id" : 1})