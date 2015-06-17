(function() {

    'use strict';

    //window.addEventListener('polymer-ready', function() { angular.bootstrap(wrap(document), ['baabtra']); });

    /**
     * @ngdoc overview
     * @name app
     * @description
     * # app
     *
     * Main module of the application.
     */
    var baabtra = angular
      .module('baabtra', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngStorage',
        'ui.router',
        'ui.utils',
        'mgcrea.ngStrap',
        'pascalprecht.translate',
        'oc.lazyLoad',
        'ui.load',
        'ui.jp',
        'angular-loading-bar',
        'LocalStorageModule',
        'ui.tree',
        'xtForm',
        'xeditable',
        'angularFileUpload',
        'uiRouterStyles',
        'schemaForm',
        'ui.select',
        function(){  return 'fg';}(),
        // 'ui.bootstrap.contextMenu',
        // 'ngFacebook',
        'perfect_scrollbar',
        // 'googleplus',
        // 'ngLinkedIn',
        'perfect_scrollbar',
        'ngTagsInput',
        'ngQuill',
        'hierarchical-selector',
        'angularSpectrumColorpicker',       
        'multi-select',
        'ngImgCrop',
        'monospaced.qrcode',
        'masonry',
        'googlechart',
        'gettext',
        'timer',
        'internationalPhoneNumber',
        'checklist-model',
        'angular-flipclock',
        'angularTreeview',
        'chart.js',
        'datePicker',
        'ui-rangeSlider',
        function(){  return 'custom-form';}()
        
      ])

.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
})


.run(function(gettextCatalog, $rootScope){  


  // setting the user's preferred Language
  var unbindThis = $rootScope.$watch(function(){ return $rootScope.userinfo; }, function(){
    // if(!angular.equals($rootScope.userinfo.ActiveUserData.Preferedlanguage, undefined)){
    //     var preLang = $rootScope.userinfo.ActiveUserData.Preferedlanguage.langCode;
    // }
    // else{

    //     var preLang = 'en';
    // }
    if(angular.equals($rootScope.userinfo,undefined)){
      return;
    }

    
     if(!angular.equals($rootScope.userinfo.ActiveUserData.Preferedlanguage, null)&&!angular.equals($rootScope.userinfo.ActiveUserData.Preferedlanguage, undefined)){
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

    // setting up the direction for the preferred Language
    var rtlArray = ['ar'];  

  
     
      if(!angular.equals($.inArray( preLang, rtlArray), -1)){
        $('body').css("direction", 'rtl');
      }
      else {
        $('body').css("direction", 'ltl');
      }


      gettextCatalog.currentLanguage = preLang;
      gettextCatalog.debug = true;

      if(!angular.equals($rootScope.userinfo,undefined)){
        unbindThis();
      }
    
  });

  
})



//code to get the bootstrap-mterial-design working
  $.material.init();




}());

