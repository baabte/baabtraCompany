db.system.js.save({_id: "fnShowMoreCompany",
                  value: function (showTime) { 
myCur=db.clnCompany.find({activeFlag:1}).skip(showTime).limit(6).toArray();
return myCur; }});

db.eval("return fnShowMoreCompany();");

