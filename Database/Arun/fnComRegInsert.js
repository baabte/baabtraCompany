//funtion to insert a company to database
db.system.js.save({_id: "fnComRegInsert",
                  value:function (data)
{
//ids to insert into clnUserRoleMapping,clnUserLogin,clnCompany
var companyAdminroleId=2;
var UserRoleMappingDataId= new ObjectId();
var userLoginDataId= new ObjectId();
var companyDataId=new ObjectId();
var companyLogo=companyDataId.valueOf();


//data to clnUserRoleMapping
UserRoleMappingData={_id:UserRoleMappingDataId,fkRoleId:companyAdminroleId,fkUserLoginId:userLoginDataId,fkCompanyId:companyDataId,fkEmployeeId:"",fkConsumerId:"",groups:[],createdDate:Date(),updatedDate:Date(),crmId:data.loggedusercrmid,urmId:data.loggedusercrmid,activeFlag:1}
// insertion to clnUserRoleMapping
db.clnUserRoleMapping.insert(UserRoleMappingData);

//data to clnUserLogin
UserLoginData={_id: userLoginDataId, userName: data.eMail, password: data.password, roleMappings:[UserRoleMappingDataId],lastLoggedRoleMapping:UserRoleMappingDataId,createdDate:Date(),updatedDate:Date(),crmId:data.loggedusercrmid,urmId:data.loggedusercrmid,activeFlag:1}
// insertion to clnUserLogin
db.clnUserLogin.insert(UserLoginData);



//data to clnCompany
companyData={_id:companyDataId ,fkuserLoginId: userLoginDataId ,companyName: data.companyName ,fkSectorId: data.fksectorId ,eMail: data.eMail,alternateEmail: data.alternateEmail  ,Phone: data.Phone ,Mobile: data.Mobile ,Fax: data.Fax ,webSite: data.webSite ,fkCountryId: data.fkcountryId,fkStateId: data.fkstateId ,fkDistrictId: data.fkdistrictId ,zipCode:data.zipCode,Address: data.Address ,facebook: data.Facebook ,gplus: data.Google ,twitter: data.Twitter ,linkedin: data.LinkedIn ,companyLogo:companyLogo,createdDate:Date(),updatedDate:Date(),crmId:data.loggedusercrmid,urmId:data.loggedusercrmid,activeFlag:1}
// insertion to clnCompany
db.clnCompany.insert(companyData);
result={cmail:companyData.eMail,cLogo:companyLogo};

return result;

}});

