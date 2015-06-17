db.system.js.save({_id: "fnEditCompany",value:function (data){

		CompanyId=ObjectId(data._id);
        data.loggedusercrmid=ObjectId(data.loggedusercrmid);
        var set={};
        set[data.Field]=data.Value;
        set.urmId=data.loggedusercrmid;
        set.updatedDate=Date();
        db.clnCompany.update({'_id':CompanyId},{'$set':set});
  	}

});      



