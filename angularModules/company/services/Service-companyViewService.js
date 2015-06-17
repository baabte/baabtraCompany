angular.module('baabtra').service('companyViewService',['$http','bbConfig',function companyViewService($http,bbConfig) {

	
	//fnc to get registered companies default count 6
    this.fnRegisteredCompanies=function($scope){
    
     var result;
      $http({
           url: bbConfig.BWS+'RegisteredCompanies/',
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
          
                $scope.companylist=angular.fromJson(JSON.parse(data));
         
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnRegisteredCompaniesCallBack(result);
             });  
      return result;
   };

   //fnc to get selected companies default count 6
    this.fnSelectedCompany=function($scope){
    
     var result;
      $http({
           url: bbConfig.BWS+'SelectedCompany/',
           data: JSON.stringify($scope.companySelected._id),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
          
                $scope.companySelected=angular.fromJson(JSON.parse(data));
                result='success';
                $scope.fnSelectedCompanyCallBack(result);
         
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnSelectedCompanyCallBack(result);
             });  
      return result;
   };

   //fnc to get search companies default count 6
    this.fnSearchCompany=function($scope){
    
     var result;
      $http({
           url: bbConfig.BWS+'SearchCompany/',
           data: JSON.stringify($scope.searchWord.key),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
                var objArray=angular.fromJson(JSON.parse(data));
                        for(var obj=0;obj<objArray.length;obj++)
                        {
                          $scope.companylist.push(objArray[obj]);
                        }
         
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnSearchCompanyCallBack(result);
             });  
      return result;
   };


   //function to delete company
   this.fnCompanyDelete=function($scope,company){
     var result;
      $http({
           url: bbConfig.BWS+'CompanyDelete/',
           data: JSON.stringify(company),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
                result='success';
                $scope.deleteCompanyCallBack(result);
             
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.deleteCompanyCallBack(result);
                
             });  
      return result;
   };


   this.fnShowMore=function($scope,showTime)
    {
        var result;
        $http({
           url: bbConfig.BWS+'ShowMoreCompanies/',
           data:JSON.stringify({'showtime':showTime}),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
             success(function(data, status, headers, config) {
                        var objArray=angular.fromJson(JSON.parse(data));
                        for(var obj=0;obj<objArray.length;obj++)
                        {
                          $scope.companylist.push(objArray[obj]);
                        }
               
             }).
              error(function(data, status, headers, config) {
                result='error';
             }); 
      return result;

    };
  
   //function to edit company
   this.fnCompanyEdit=function($scope){
     
     var result;
    
      $http({
           url: bbConfig.BWS+'CompanyEdit/',
           data: JSON.stringify($scope.companyEdited),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
                result='success';
                $scope.editCompanyCallBack(result);
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.editCompanyCallBack(result);

             });  

      return result;

   };


}]);


// angular.module('baabtraApp')
//   .service('Registeredcompanies',['$http', function Registeredcompanies($http) {
//     // AngularJS will instantiate a singleton by calling "new" on this function
    

//   }]);
