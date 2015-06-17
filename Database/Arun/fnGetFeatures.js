db.system.js.save({_id: "fnGetFeatures",
                  value: function (data) { 
                  companyId=ObjectId(data);
                  userid=db.clnCompany.findOne({_id:companyId},{_id:0,fkuserLoginId:1});

                  var temp=db.clnUserLogin.aggregate([{$match:{_id:userid.fkuserLoginId}},{$group:{_id:userid.fkuserLoginId,featureids:{$first:"$plan.features.featureId"}}}]);
                  var featureids=temp.result[0].featureids;

                  featurelist=db.clnFeatures.find({_id:{ $nin:featureids}},{_id:1,featureName:1,pricing:1,billing:1}).toArray();

                  return featurelist;

}});