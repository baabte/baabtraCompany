

(function() {

  'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('baabtra')  
  .controller('MainCtrl', ['$scope', '$translate', '$localStorage', '$window', '$rootScope', '$modal', 'commonSrv', 'bbConfig', '$state' ,'userProfile',
    function ($scope,   $translate,   $localStorage,   $window, $rootScope , $modal , commonSrv , bbConfig, $state,userProfile) {
      $scope.availlangualges=[{"language":"English","langCode":"en"},{"language":"Arabic","langCode":"ar"}];
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
      // isIE && angular.element($window.document.body).addClass('ie');
      // isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');
      if(isIE) {
        angular.element($window.document.body).addClass('ie');
      }

      if (isSmartDevice( $window )) {
       angular.element($window.document.body).addClass('smart');
      }

      // config
      $scope.app = {
        name: 'baabtra.com',
        version: '1.0.0',
        // for chart colors
        color: {
          primary: '#155abb',
          info:    '#2772ee',
          success: '#4bb622',
          warning: '#f88311',
          danger:  '#e11144',
          inverse: '#a66bee',
          light:   '#f1f2f3',
          dark:    '#202a3a'
        },
        settings: {
          headerColor: 'bg-light',
          headerFixed: true,
          headerShadow: true,
          asideColor: 'bg-dark lt',
          asideTop: true
        }
      };

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
     
      $scope.header ={} ;
      $scope.header.type = "Header";
      $scope.roleId = bbConfig.CURID;
      var appSettings = "";
      var companyId = "";
      var rmId = "";
      // $scope.roleid=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
      // console.log($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId);
      $scope.appSettings = function(){
        companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
        rmId = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
        //if not setting appsettings, create a null object for appSettings
        if(angular.equals($rootScope.userinfo.ActiveUserData.appSettings,null)){
          $rootScope.userinfo.ActiveUserData.appSettings = {};
        }

        //take copy of of appsettings for get old state of app settings

        appSettings = angular.copy($rootScope.userinfo.ActiveUserData.appSettings);
        
        $modal({scope: $scope, placement:"center" ,backdrop:'static' , template: 'angularModules/common/popup/popup-appSettings.html', show: true});
      };

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
        $hide();

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

      var unbindThis = $rootScope.$watch(function(){ return $rootScope.userinfo; }, function(){
     
            if(angular.equals($rootScope.userinfo,undefined)){
                return;
              }

            if(!angular.equals($rootScope.userinfo.ActiveUserData.Preferedlanguage, null)&&!angular.equals($rootScope.userinfo.ActiveUserData.Preferedlanguage, undefined)){
                // var preLang = $rootScope.userinfo.ActiveUserData.Preferedlanguage.langCode;
                if(!angular.equals($rootScope.userinfo.ActiveUserData.Preferedlanguage.langCode,undefined)&&!angular.equals($rootScope.userinfo.ActiveUserData.Preferedlanguage.langCode, null))
                {
                  var preLang = $rootScope.userinfo.ActiveUserData.Preferedlanguage.langCode;
                }
                else{
                  var preLang='en';
                }
            }
            else{

                var preLang = 'en';
            }
            $scope.selectedlanguage={};
            var matchFlag=0;
            for(var i in $scope.availlangualges){
                if($scope.availlangualges[i].langCode==preLang){
                   $scope.selectedlanguage=$scope.availlangualges[i];
                   $scope.userloginId=$rootScope.userinfo.userLoginId;
                   break;
                }
            }
      
    });

      $scope.changeLanguage=function(language){
        var data={};
        data.userloginId=$scope.userloginId;
        data.selectedlanguage=language;
        var changelang=userProfile.changelanguage(data);
        changelang.then(function(response){
            var returndata = angular.fromJson(JSON.parse(response.data));
            if(angular.equals(returndata,"success")){
              location.reload();
            }
        });
      }

//       $scope.$watch('selectedlanguage', function() {
//      console.log($scope.selectedlanguage);
// });
      // it will redirect to GlobalSettings
      $scope.redirectToGlobalSettings=function(){

            // $localStorage.currentMenuName="global Settings";//added by arun to make top bar menus work 
            $state.go('home.main.globalSettings');
      };

      $scope.redirectTobaabtraProfile=function(){

            // $localStorage.currentMenuName="";//added by arun to make top bar menus work 
            $state.go('home.main.baabtraProfile',{userLoginId:"54d84b55ef14f722f4890797"});
      };
      // it will redirect to theme settings
      $scope.redirectTothemeConfiguration=function(){

            // $localStorage.currentMenuName="theme Configuration"; //added by arun to make top bar menus work 
        $state.go('home.main.themeConfiguration');

      };

      //when click cancel button exicute this function and revert to previous theme
      $scope.cancelAppSettings = function($hide){
        $rootScope.userinfo.ActiveUserData.appSettings = angular.copy(appSettings);
        $hide();
      };

      $scope.setAsideColor = function(color){
        $scope.app.settings.asideColor = color;
      };

      // save settings to local storage
      if ( angular.isDefined($localStorage.appSettings) ) {
        $scope.app.settings = $localStorage.appSettings;
      } else {
        //$localStorage.appSettings = $scope.app.settings; commented by lijin for disabling automatic colour settings
      }
      $scope.$watch('app.settings', function(){ 
        //$localStorage.appSettings = $scope.app.settings; commented by lijin for disabling automatic colour settings
         }, true);

      // angular translate
      $scope.langs = {en:'English', zh_CN:'中文'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
      };

      function isSmartDevice( $window ) {
        // Adapted from http://www.detectmobilebrowsers.com
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }
    }
  ]);

}());
