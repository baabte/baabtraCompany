fnSearchCompany

db.system.js.save({_id: "fnSearchCompany",value:function (data){

        
       var search = db.clnCompany.find({activeFlag :1,companyName:{$regex:data, $options:"i"}},{_id:1,companyName:1,Phone:1,Mobile:1,eMail:1,facebook:1,gplus:1,twitter:1,linkedin:1}).limit(6).toArray();

       return search;
  	}

});      




