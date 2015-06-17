db.system.js.save({_id: "fnChangeUserPlan",
                  value: function (data) { 
                  companyId=ObjectId(data.companyId);
                  userid=db.clnCompany.findOne({_id:companyId},{_id:0,fkuserLoginId:1});
                  data.plan.planId=ObjectId(data.plan.planId);
                  var flen=data.plan.features.length;
                  i=0;
                  while(i<flen){
                        data.plan.features[i].featureId=ObjectId(data.plan.features[i].featureId);
                        i++;
                  }
                  var set={};
                  set.plan=data.plan;
                  set.updatedDate=Date();
                  db.clnUserLogin.update({'_id':userid.fkuserLoginId},{'$set':set});
}});