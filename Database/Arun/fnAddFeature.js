db.system.js.save({_id: "fnAddFeature",
      value: function (data) { 
      companyId=ObjectId(data.companyId);
      userid=db.clnCompany.findOne({_id:companyId},{_id:0,fkuserLoginId:1});

      data.feature.featureId=ObjectId(data.feature.featureId);                  
      db.clnUserLogin.update({'_id':userid.fkuserLoginId},{'$push':{'plan.features':data.feature,''}});
      return data;                  
}});