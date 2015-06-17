db.system.js.save({_id: "fnViewRegisteredCompany",
                  value: function () { 
myCur=db.clnCompany.find({"activeFlag":1}).limit(6).toArray();
return myCur; }});

db.eval("return fnViewRegisteredCompany();");


