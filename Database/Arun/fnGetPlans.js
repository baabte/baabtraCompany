db.system.js.save({_id: "fnGetPlans",
                  value: function () { 

                  var plans=db.clnBillingPlans.find().toArray();

                  return plans;

}});