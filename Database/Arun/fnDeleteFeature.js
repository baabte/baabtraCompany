db.system.js.save({_id: "fnDeleteFeature",
      value: function (data) { 
      companyId=ObjectId(data.companyId);
      userid=db.clnCompany.findOne({_id:companyId},{_id:0,fkuserLoginId:1});
      data.featureId=ObjectId(data.featureId);                  
      db.clnUserLogin.update({'_id':userid.fkuserLoginId},{'$pull':{'plan.features':{'featureId':data.featureId}}});                 
}});