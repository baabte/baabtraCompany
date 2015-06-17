angular.module('baabtra').controller('ThemeconfigurationCtrl',['$scope','$rootScope','bbConfig','$modal','commonSrv','themeConfigurationSrv','$alert','localStorageService',function($scope,$rootScope,bbConfig,$modal,commonSrv,themeConfigurationSrv,$alert,localStorageService){

if(localStorageService.get('latestThemeState')){
  $scope.selectedTab=localStorageService.get('latestThemeState');
}
else{
  $scope.selectedTab="Customizetheme";
}
// $scope.selectedTab="Customizetheme";
// $scope.selectedTab="SubTitlesandBackground";
$scope.header ={} ;
$scope.header.type = "Header";
$scope.menutype="menuPrimaryColor";
$scope.SubTitleandBackcolor="SubTitlecolour";
$scope.roleId = bbConfig.CURID;
var appSettings = "";
var companyId = "";
var rmId = "";
$scope.activeBtn=false;
$scope.subtitleAndbackactiveBtn=false;
$scope.MenuColorproperties={};
$scope.subTitleAndBackColorProperpies={};
// temporary
// $scope.subTitAndBackg="custom";
// $scope.CustomizesubTitAndBackg=true;

 $scope.options = {
        headerColor:[
          "btn-material-red","btn-material-red-400","btn-material-red-500","btn-material-red-600","btn-material-red-700","btn-material-red-800","btn-material-red-900","btn-material-red-A100","btn-material-red-A200","btn-material-red-A400","btn-material-red-A700",
          "btn-material-pink","btn-material-pink-400","btn-material-pink-500","btn-material-pink-600","btn-material-pink-700","btn-material-pink-800","btn-material-pink-900","btn-material-pink-A100","btn-material-pink-A200","btn-material-pink-A400","btn-material-pink-A700",
          "btn-material-purple","btn-material-purple-400","btn-material-purple-500","btn-material-purple-600","btn-material-purple-700","btn-material-purple-800","btn-material-purple-900","btn-material-purple-A100","btn-material-purple-A200","btn-material-purple-A400","btn-material-purple-A700",
          "btn-material-deep-purple","btn-material-deep-purple-400","btn-material-deep-purple-500","btn-material-deep-purple-600","btn-material-deep-purple-700","btn-material-deep-purple-800","btn-material-deep-purple-900","btn-material-deep-purple-A100","btn-material-deep-purple-A200","btn-material-deep-purple-A400","btn-material-deep-purple-A700",
          "btn-material-indigo","btn-material-indigo-400","btn-material-indigo-500","btn-material-indigo-600","btn-material-indigo-700","btn-material-indigo-800","btn-material-indigo-900","btn-material-indigo-A100","btn-material-indigo-A200","btn-material-indigo-A400","btn-material-indigo-A700",
          "btn-material-blue","btn-material-blue-400","btn-material-blue-500","btn-material-blue-600","btn-material-blue-700","btn-material-blue-800","btn-material-blue-900","btn-material-blue-A100","btn-material-blue-A200","btn-material-blue-A400","btn-material-blue-A700",
          "btn-material-light-blue","btn-material-light-blue-400","btn-material-light-blue-500","btn-material-light-blue-600","btn-material-light-blue-700","btn-material-light-blue-800","btn-material-light-blue-900","btn-material-light-blue-A100","btn-material-light-blue-A200","btn-material-light-blue-A400","btn-material-light-blue-A700",
          "btn-material-cyan","btn-material-cyan-400","btn-material-cyan-500","btn-material-cyan-600","btn-material-cyan-700","btn-material-cyan-800","btn-material-cyan-900","btn-material-cyan-A100","btn-material-cyan-A200","btn-material-cyan-A400","btn-material-cyan-A700",
          "btn-material-teal","btn-material-teal-400","btn-material-teal-500","btn-material-teal-600","btn-material-teal-700","btn-material-teal-800","btn-material-teal-900","btn-material-teal-A100","btn-material-teal-A200","btn-material-teal-A400","btn-material-teal-A700",
          "btn-material-green","btn-material-green-400","btn-material-green-500","btn-material-green-600","btn-material-green-700","btn-material-green-800","btn-material-green-900","btn-material-green-A200","btn-material-green-A400","btn-material-green-A700",
          "btn-material-light-green","btn-material-light-green-400","btn-material-light-green-500","btn-material-light-green-600","btn-material-light-green-700","btn-material-light-green-800","btn-material-light-green-900","btn-material-light-green-A100","btn-material-light-green-A200","btn-material-light-green-A400","btn-material-light-green-A700",
          "btn-material-lime","btn-material-lime-400","btn-material-lime-500","btn-material-lime-600","btn-material-lime-700","btn-material-lime-800","btn-material-lime-900","btn-material-lime-A100","btn-material-lime-A200","btn-material-lime-A400","btn-material-lime-A700",
          "btn-material-yellow","btn-material-yellow-400","btn-material-yellow-500","btn-material-yellow-600","btn-material-yellow-700","btn-material-yellow-800","btn-material-yellow-900","btn-material-yellow-A100","btn-material-yellow-A200","btn-material-yellow-A400","btn-material-yellow-A700",
          "btn-material-amber","btn-material-amber-400","btn-material-amber-500","btn-material-amber-600","btn-material-amber-700","btn-material-amber-800","btn-material-amber-900","btn-material-amber-A100","btn-material-amber-A200","btn-material-amber-A400","btn-material-amber-A700",
          "btn-material-orange","btn-material-orange-400","btn-material-orange-500","btn-material-orange-600","btn-material-orange-700","btn-material-orange-800","btn-material-orange-900","btn-material-orange-A100","btn-material-orange-A200","btn-material-orange-A400","btn-material-orange-A700",
          "btn-material-deep-orange","btn-material-deep-orange-400","btn-material-deep-orange-500","btn-material-deep-orange-600","btn-material-deep-orange-700","btn-material-deep-orange-800","btn-material-deep-orange-900","btn-material-deep-orange-A100","btn-material-deep-orange-A200","btn-material-deep-orange-A400","btn-material-deep-orange-A700",
          "btn-material-grey-200","btn-material-blue-grey-200","btn-material-grey-600","btn-material-blue-grey-900","btn-material-blue-grey-600"
        ],
        asideColor:[
          'bg-primary dk',
          'bg-info dk',
          'bg-success dk',
          'bg-dark lt',
          'bg-dark',
          'bg-dark dk',
          'bg-black lt',
          'bg-black',
          'bg-black dk',
          'bg-white',
          'bg-light',
          'bg-light dk'
        ]
      };
      
unbindthis=$scope.$watch(function(){
				return $rootScope.userinfo;
			},function(){
				$rootScope.userinfo=$rootScope.userinfo;
				companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		        rmId = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		        //if not setting appsettings, create a null object for appSettings
		        if(angular.equals($rootScope.userinfo.ActiveUserData.appSettings,null)){
		          $rootScope.userinfo.ActiveUserData.appSettings = {};
		        }

		        //take copy of of appsettings for get old state of app settings
		        appSettings = angular.copy($rootScope.userinfo.ActiveUserData.appSettings);
		        
		        if(angular.equals($rootScope.userinfo.ActiveUserData.modernView,undefined)){
		        	$scope.menuType="modern";
		        }
		        else{
		        	$scope.menuType=$rootScope.userinfo.ActiveUserData.modernView;
		        }

            // determine what king color settings were used

             if(angular.equals($rootScope.userinfo.ActiveUserData.menuColor,undefined)||angular.equals($rootScope.userinfo.ActiveUserData.menuColor,"random")){
                $scope.menuColor="random";
              
            }
            else{
                $scope.menuColor="custom";
                $scope.CustomizeMenuColor=true;
                $scope.MenuColorproperties=$rootScope.userinfo.ActiveUserData.menuColor;
            }

             if(angular.equals($rootScope.userinfo.ActiveUserData.subTitleAndBackColor,undefined)||angular.equals($rootScope.userinfo.ActiveUserData.subTitleAndBackColor,"random")){
                $scope.subTitAndBackg="random";
              
            }
            else{
                $scope.subTitAndBackg="custom";
                $scope.CustomizesubTitAndBackg=true;
                $scope.subTitleAndBackColorProperpies=$rootScope.userinfo.ActiveUserData.subTitleAndBackColor;
            }
             
				if(!angular.equals($rootScope.userinfo,undefined)){
					  unbindthis();
				}
        // var abc=UnigueCodeGenerator.GetCode(companyId,"Orders");
        // abc.then(function(data){
        //     console.log(data.data);
        // });
			});


	$scope.setHeaderColor = function(color){
    
        if(angular.equals($scope.header.type,"Header")){
          $rootScope.userinfo.ActiveUserData.appSettings.headerColor = color;
        }
        else if(angular.equals($scope.header.type,"breadCrumb")){
          $rootScope.userinfo.ActiveUserData.appSettings.asideColor = color;
        }
        else{          
          $rootScope.userinfo.ActiveUserData.appSettings.backgroundColor = color;
        }
       
  };

 $scope.setMenuColor=function(color){

     if(angular.equals($scope.menutype,"menuPrimaryColor")){
            $scope.MenuColorproperties.menuPrimaryColor=color;
            $scope.activeBtn=true;
        }
      else{
            $scope.MenuColorproperties.menuSecondaryColor=color;
            $scope.activeBtn=true;
    }


 };

$scope.setSubTitAndBackground=function(color){
  if(angular.equals($scope.SubTitleandBackcolor,"SubTitlecolour"))
  {

        $scope.subTitleAndBackColorProperpies.SubTitlecolour=color;
        $scope.subtitleAndbackactiveBtn=true;
  }else{

        $scope.subTitleAndBackColorProperpies.Backgroundcolour=color;     
        $scope.subtitleAndbackactiveBtn=true;
  }
  
};


      $scope.backgroundImageChanged = function($file){
        var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
        var rmId = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
          if(!angular.equals($rootScope.userinfo.ActiveUserData.appSettings.backgroundImage,"")){
            if(!angular.equals($rootScope.userinfo.ActiveUserData.appSettings.backgroundImage,undefined)){
              var oldBackgroundImage = $rootScope.userinfo.ActiveUserData.appSettings.backgroundImage.split('(')[1].split(')')[0];
            }
            var fileRemoveResponse = commonSrv.fnRemoveFileFromServer(oldBackgroundImage);
        }
        var ImageUploadResponse = commonSrv.fnFileUpload($file[0],"backgroundImage");
        ImageUploadResponse.then(function(response){

          $rootScope.userinfo.ActiveUserData.appSettings.backgroundImage = 'url('+bbConfig.BWS+'files/backgroundImage/'+response.data.replace('"','').replace('"','') +')';
          commonSrv.fnSaveAppSettings(companyId, $rootScope.userinfo.ActiveUserData.appSettings, rmId);

        });
      };

   $scope.logoChanged = function($file){
        if(!angular.equals($rootScope.userinfo.ActiveUserData.appSettings.logo,"")){
          var oldLogo = $rootScope.userinfo.ActiveUserData.appSettings.logo;
          var fileRemoveResponse = commonSrv.fnRemoveFileFromServer(oldLogo);
        }
        var LogoUploadResponse = commonSrv.fnFileUpload($file[0],"companyLogo");
        LogoUploadResponse.then(function(response){
          $rootScope.userinfo.ActiveUserData.appSettings.logo = bbConfig.BWS+'files/companyLogo/'+response.data.replace('"','').replace('"','');
          appSettings.logo = bbConfig.BWS+'files/companyLogo/'+response.data.replace('"','').replace('"','');
          commonSrv.fnSaveAppSettings(companyId, $rootScope.userinfo.ActiveUserData.appSettings, rmId);
        });
      };

      $scope.saveAppSettings = function($hide){
        appSettings.headerColor = $rootScope.userinfo.ActiveUserData.appSettings.headerColor;
        appSettings.asideColor = $rootScope.userinfo.ActiveUserData.appSettings.asideColor;
        appSettings.backgroundColor = $rootScope.userinfo.ActiveUserData.appSettings.backgroundColor;
        var rmId = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
        if(angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId,2)){
          var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
          commonSrv.fnSaveAppSettings(companyId, $rootScope.userinfo.ActiveUserData.appSettings, rmId);
        }
        // $hide();

      };
// function for set menu coor
      $scope.saveMenuColor=function(data){
        var dataToSend={};
        dataToSend.companyId=companyId;
        dataToSend.userLoginId=$rootScope.userinfo.userLoginId;
        if(angular.equals(data,"random")){
          dataToSend.menuColor="random";
        }
        else{
          dataToSend.menuColor=$scope.MenuColorproperties;
        }
        var saveMenuColor=themeConfigurationSrv.saveMenuColor(dataToSend);
          saveMenuColor.then(function(data){
            var returndata = angular.fromJson(JSON.parse(data.data));
            if(angular.equals(returndata,"success")){
              $scope.activeBtn=false;
              $rootScope.userinfo.ActiveUserData.menuColor=$scope.MenuColorproperties;
              $scope.MenuColorproperties={};
              $scope.notifications("Success","","success");
            }

          });

      };

// function for set sub menu and background
      $scope.saveSubMenuAndBackgrounds=function(data){
        var dataToSend={};
        dataToSend.companyId=companyId;
        dataToSend.userLoginId=$rootScope.userinfo.userLoginId;
        if(angular.equals(data,"random")){
          dataToSend.subTitleAndBackColor="random";
        }
        else{
          dataToSend.subTitleAndBackColor=$scope.subTitleAndBackColorProperpies;
        }
        // console.log(dataToSend);
        var subTitleAndBackColor=themeConfigurationSrv.saveSubMenuAndBackgrounds(dataToSend);
          subTitleAndBackColor.then(function(data){
            var returndata = angular.fromJson(JSON.parse(data.data));
            if(angular.equals(returndata,"success")){
              $scope.CustomizesubTitAndBackg=false;
              $rootScope.userinfo.ActiveUserData.subTitleAndBackColor=$scope.subTitleAndBackColorProperpies;
              // console.log($rootScope.userinfo.ActiveUserData);
              $scope.subTitleAndBackColorProperpies={}
              $scope.notifications("Success","","success");
            }

          });

      };

      //function for remove background image
      $scope.removeBackgroundImage = function(){
        var imageToBeRemoved = $rootScope.userinfo.ActiveUserData.appSettings.backgroundImage.split('(')[1].split(')')[0];
        var fileRemoveResponse = commonSrv.fnRemoveFileFromServer(imageToBeRemoved);
        $rootScope.userinfo.ActiveUserData.appSettings.backgroundImage = "";
        appSettings.backgroundImage = "";
      };

      //function for remove Logo
      $scope.removeLogo = function(){
        var logoToBeRemoved = $rootScope.userinfo.ActiveUserData.appSettings.logo;
        var fileRemoveResponse = commonSrv.fnRemoveFileFromServer(logoToBeRemoved);
        $rootScope.userinfo.ActiveUserData.appSettings.logo = "";
        appSettings.logo = "";
      };

      $scope.setMenuType=function(data){
      	var datas ={};
      	datas.companyId=companyId;
      	datas.modernView=data;
      	datas.userLoginId=$rootScope.userinfo.userLoginId;
      		var setmenutype=themeConfigurationSrv.setMenuType(datas);
      		setmenutype.then(function(data){
      			var returndata = angular.fromJson(JSON.parse(data.data));
      			if(angular.equals(returndata,"success")){
      				location.reload();
      			}
      			
      		});
      };


      $scope.setState=function(state){
         localStorageService.add('latestThemeState',state);
      }

     //notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };


}]);