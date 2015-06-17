db.system.js.save({_id: "fnSelectedCompany",value:function (data) { 
    company=db.clnCompany.findOne({_id:ObjectId(data),activeFlag:1});
    return company; 
}

});      