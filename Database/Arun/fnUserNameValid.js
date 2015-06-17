db.system.js.save({_id: "fnUserNameValid",
                  value: function (data) { 
check=db.clnUserLogin.findOne({userName:data.eMail});
if (check==null) {
	result={userCheck:0};
};
if (check!=null) {
	result={userCheck:1};
};
return result; }});

db.eval("return fnUserNameValid();");

