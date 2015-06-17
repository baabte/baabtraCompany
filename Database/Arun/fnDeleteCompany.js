db.system.js.save({_id: "fnDeleteCompany",value:function (data){

        data.loggedusercrmid=ObjectId(data.loggedusercrmid);
        db.clnCompany.update({'_id':ObjectId(data._id)},{'$set':{'activeFlag':0,'urmId':data.loggedusercrmid,'updatedDate':Date()}})
  	}

});      