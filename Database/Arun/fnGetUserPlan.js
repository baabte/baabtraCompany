db.system.js.save({_id: "fnGetUserPlan",
                  value: function (data) { 
                  companyId=ObjectId(data);
                  userid=db.clnCompany.findOne({_id:companyId},{_id:0,fkuserLoginId:1});

                  userplan=db.clnUserLogin.findOne({_id:userid.fkuserLoginId},{_id:0,plan:1});
                  

                  return userplan;

}});