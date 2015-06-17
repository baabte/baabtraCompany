db.system.js.save({_id: "fnEditPricing",
                  value: function (data) { 
                  companyId=ObjectId(data.companyId);
                  featureId=ObjectId(data.featureId);
                  userid=db.clnCompany.findOne({_id:companyId},{_id:0,fkuserLoginId:1});
                  

                  db.clnUserLogin.update({'_id':userid.fkuserLoginId,'plan.features.featureId':featureId},{'$set':{'plan.features.$.pricing':data.pricing,'updatedDate':Date()}});
                  
}});