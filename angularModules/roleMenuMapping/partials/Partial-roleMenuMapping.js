
angular.module('baabtra').
	controller('RoleMenuMappingCtrl',['$location','commonService','$scope','$modal','$rootScope','RoleMenuMappingSrv','$alert','localStorageService','$state',function ($location,commonService,$scope,$modal,$rootScope,RoleMenuMappingSrv,$alert,localStorageService,$state) {

    if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if(angular.equals($rootScope.loggedIn,false)){
 $state.go('login');
}

    $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
    $scope.companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
$scope.IconName=["fa-adjust circle half","fa-anchor","fa-archive box","fa-arrows","fa-arrows-h","fa-arrows-v","fa-asterisk star","fa-at gmail","fa-automobile","fa-ban","fa-bank","fa-barcode","fa-bars","fa-beer","fa-bell","fa-bell-o","fa-bell-slash","fa-bell-slash-o","fa-bicycle","fa-binoculars","fa-birthday-cake","fa-bolt","fa-bomb","fa-book","fa-bookmark","fa-bookmark-o","fa-briefcase","fa-bug","fa-building","fa-building-o","fa-bullhorn","fa-bullseye i","fa-bus","fa-cab","fa-calculator","fa-calendar","fa-calendar-o","fa-camera","fa-camera-retro","fa-car","fa-caret-square-o-down","fa-caret-square-o-left","fa-caret-square-o-right","fa-caret-square-o-up","fa-cc","fa-certificate","fa-check","fa-check-circle","fa-check-circle-o","fa-check-square","fa-check-square-o","fa-child","fa-circle","fa-circle-o","fa-circle-o-notch","fa-circle-thin","fa-clock-o","fa-close","fa-cloud","fa-cloud-download","fa-cloud-upload","fa-code","fa-code-fork","fa-coffee","fa-cog","fa-cogs","fa-comment","fa-comment-o","fa-comments","fa-comments-o","fa-compass","fa-copyright","fa-credit-card","fa-crop","fa-crosshairs","fa-cube","fa-cubes","fa-cutlery","fa-dashboard","fa-database","fa-desktop","fa-dot-circle-o","fa-download","fa-edit","fa-ellipsis-h","fa-ellipsis-v","fa-envelope","fa-envelope-o","fa-envelope-square","fa-eraser","fa-exchange","fa-exclamation","fa-exclamation-circle","fa-exclamation-triangle","fa-external-link","fa-external-link-square","fa-eye i","fa-eye-slash i","fa-eyedropper i","fa-fax","fa-female","fa-fighter-jet","fa-file-archive-o","fa-file-audio-o","fa-file-code-o","fa-file-excel-o","fa-file-image-o","fa-file-movie-o","fa-file-pdf-o","fa-file-photo-o","fa-file-picture-o","fa-file-powerpoint-o","fa-file-sound-o","fa-file-video-o","fa-file-word-o","fa-file-zip-o","fa-film","fa-filter","fa-fire","fa-fire-extinguisher","fa-flag","fa-flag-checkered","fa-flag-o","fa-flash","fa-flask","fa-folder","fa-folder-o","fa-folder-open","fa-folder-open-o","fa-frown-o","fa-futbol-o","fa-gamepad","fa-gavel","fa-gear","fa-gears","fa-gift","fa-glass","fa-globe","fa-graduation-cap","fa-group","fa-hdd-o","fa-headphones","fa-heart","fa-heart-o","fa-history","fa-home","fa-image","fa-inbox","fa-info","fa-info-circle","fa-institution","fa-key","fa-keyboard-o","fa-language","fa-laptop","fa-leaf","fa-legal","fa-lemon-o","fa-level-down","fa-level-up","fa-life-bouy","fa-life-buoy","fa-life-ring","fa-life-saver","fa-lightbulb-o","fa-location-arrow","fa-lock","fa-magic","fa-magnet","fa-mail-forward","fa-mail-reply","fa-mail-reply-all","fa-male","fa-map-marker","fa-meh-o","fa-microphone","fa-microphone-slash","fa-minus","fa-minus-circle","fa-minus-square","fa-minus-square-o","fa-mobile","fa-mobile-phone","fa-money","fa-moon-o","fa-mortar-board","fa-music","fa-navicon","fa-newspaper-o","fa-paint-brush","fa-paper-plane","fa-paper-plane-o","fa-paw","fa-pencil","fa-pencil-square","fa-pencil-square-o","fa-phone","fa-phone-square","fa-photo","fa-picture-o","fa-plane","fa-plug","fa-plus","fa-plus-circle","fa-plus-square","fa-plus-square-o","fa-power-off","fa-print","fa-puzzle-piece","fa-qrcode","fa-question","fa-question-circle","fa-quote-left","fa-quote-right","fa-random","fa-recycle","fa-refresh","fa-remove","fa-reorder","fa-reply","fa-reply-all","fa-retweet","fa-road","fa-rocket","fa-rss","fa-rss-square","fa-search","fa-search-minus","fa-search-plus","fa-send","fa-send-o","fa-share","fa-share-alt","fa-share-alt-square","fa-share-square","fa-share-square-o","fa-shield","fa-shopping-cart","fa-sign-in","fa-sign-out","fa-signal","fa-sitemap","fa-sliders","fa-smile-o","fa-soccer-ball-o","fa-sort","fa-sort-alpha-asc","fa-sort-alpha-desc","fa-sort-amount-asc","fa-sort-amount-desc","fa-sort-asc","fa-sort-desc","fa-sort-down","fa-sort-numeric-asc","fa-sort-numeric-desc","fa-sort-up","fa-space-shuttle","fa-spinner","fa-spoon","fa-square","fa-square-o","fa-star","fa-star-half","fa-star-half-empty","fa-star-half-full","fa-star-half-o","fa-star-o","fa-suitcase","fa-sun-o","fa-support","fa-tablet","fa-tachometer","fa-tag","fa-tags","fa-tasks","fa-taxi","fa-terminal","fa-thumb-tack","fa-thumbs-down","fa-thumbs-o-down","fa-thumbs-o-up","fa-thumbs-up","fa-ticket","fa-times","fa-times-circle","fa-times-circle-o","fa-tint","fa-toggle-down","fa-toggle-left","fa-toggle-off","fa-toggle-on","fa-toggle-right","fa-toggle-up","fa-trash","fa-trash-o","fa-tree","fa-trophy","fa-truck","fa-tty","fa-umbrella","fa-university","fa-unlock","fa-unlock-alt","fa-unsorted","fa-upload","fa-user","fa-users","fa-video-camera","fa-volume-down","fa-volume-off","fa-volume-up","fa-warning","fa-wheelchair","fa-wifi","fa-wrench","fa-file","fa-adn","fa-android","fa-angellist","fa-apple","fa-behance","fa-behance-square","fa-bitbucket","fa-bitbucket-square","fa-bitcoin","fa-btc","fa-cc-amex","fa-cc-discover","fa-cc-mastercard","fa-cc-paypal","fa-cc-stripe","fa-cc-visa","fa-codepen","fa-css3","fa-delicious","fa-deviantart","fa-digg","fa-dribbble","fa-dropbox","fa-drupal","fa-empire","fa-facebook","fa-facebook-square","fa-flickr","fa-foursquare","fa-ge","fa-git","fa-git-square","fa-github","fa-github-alt","fa-github-square","fa-gittip","fa-google","fa-google-plus","fa-google-plus-square","fa-google-wallet","fa-hacker-news","fa-html5","fa-instagram","fa-ioxhost","fa-joomla","fa-jsfiddle","fa-lastfm","fa-lastfm-square","fa-linkedin","fa-linkedin-square","fa-linux","fa-maxcdn","fa-meanpath","fa-openid","fa-pagelines","fa-paypal","fa-pied-piper","fa-pied-piper-alt","fa-pinterest","fa-pinterest-square","fa-qq","fa-ra","fa-rebel","fa-reddit","fa-reddit-square","fa-renren","fa-skype","fa-slack","fa-slideshare","fa-soundcloud","fa-spotify","fa-stack-exchange","fa-stack-overflow","fa-steam","fa-steam-square","fa-stumbleupon","fa-stumbleupon-circle","fa-tencent-weibo","fa-trello","fa-tumblr","fa-tumblr-square","fa-twitch","fa-twitter","fa-twitter-square","fa-vimeo-square","fa-vine","fa-vk","fa-wechat","fa-weibo","fa-weixin","fa-windows","fa-wordpress","fa-xing","fa-xing-square","fa-yahoo","fa-yelp","fa-youtube","fa-youtube-play","fa-youtube-square","fa-ambulance","fa-h-square","fa-hospital-o","fa-medkit","fa-stethoscope","fa-user-md","fa-arrows-alt","fa-backward","fa-compress","fa-eject","fa-expand","fa-fast-backward","fa-fast-forward","fa-forward","fa-pause","fa-play","fa-play-circle","fa-play-circle-o","fa-step-backward","fa-step-forward","fa-stop","fa-angle-double-down","fa-angle-double-left","fa-angle-double-right","fa-angle-double-up","fa-angle-down","fa-angle-left","fa-angle-right","fa-angle-up","fa-arrow-circle-down","fa-arrow-circle-left","fa-arrow-circle-o-down","fa-arrow-circle-o-left","fa-arrow-circle-o-right","fa-arrow-circle-o-up","fa-arrow-circle-right","fa-arrow-circle-up","fa-arrow-down","fa-arrow-left","fa-arrow-right","fa-arrow-up","fa-caret-down","fa-caret-left","fa-caret-right","fa-caret-up","fa-chevron-circle-down","fa-chevron-circle-left","fa-chevron-circle-right","fa-chevron-circle-up","fa-chevron-down","fa-chevron-left","fa-chevron-right","fa-chevron-up","fa-hand-o-down","fa-hand-o-left","fa-hand-o-right","fa-hand-o-up","fa-long-arrow-down","fa-long-arrow-left","fa-long-arrow-right","fa-long-arrow-up","fa-align-center","fa-align-justify","fa-align-left","fa-align-right","fa-bold","fa-chain","fa-chain-broken","fa-clipboard","fa-columns","fa-copy","fa-cut","fa-dedent","fa-file-o","fa-file-text","fa-file-text-o","fa-files-o","fa-floppy-o","fa-font","fa-header","fa-indent","fa-italic","fa-link","fa-list","fa-list-alt","fa-list-ol","fa-list-ul","fa-outdent","fa-paperclip","fa-paragraph","fa-paste","fa-repeat","fa-rotate-left","fa-rotate-right","fa-save","fa-scissors","fa-strikethrough","fa-subscript","fa-superscript","fa-table","fa-text-height","fa-text-width","fa-th","fa-th-large","fa-th-list","fa-underline","fa-undo","fa-unlink","fa-area-chart","fa-bar-chart","fa-bar-chart-o","fa-line-chart","fa-pie-chart"];
$scope.createGroupModal = function()
{
  $modal({scope: $scope, template: 'views/ui/angular-strap/createGroup.html', show: true});
};
$scope.menuIcon="fa-info";
  $scope.setIcon = function(icon)
  {
    $scope.menuIcon=icon;
  };

  $scope.SearchType="Company";
  $scope.placeholderVal="Search Companies";
  //$scope.roleId=1;
  //$scope.rm_id='545aff95437b389ba554d6b7';
  $scope.activeLink=1;
  $scope.CompanySate="";
  var CurNewValue="";
  var dragStartStatus=false;
  var MeusStatus=false;
  var tree1dragStartStatus=false;
  var current_menu_type='';
  var menu_list_type='';
  if(angular.equals($scope.roleId,1))
{
  current_menu_type='role';
  menu_list_type='all';
  RoleMenuMappingSrv.FnLoadTopLevelRoles($scope);
  RoleMenuMappingSrv.FnGetCompanyDetails($scope,"","");
}
else if(angular.equals($scope.roleId,2))
{
  current_menu_type='role';
  menu_list_type='user';
  RoleMenuMappingSrv.FnGetRoles($scope,$scope.companyId,"","");

  $scope.SearchType="Roles";
      $scope.modelSearch="";
      $scope.placeholderVal="Search Roles";
}
	    
    $scope.ChangeCompanyState=function(cmp_id,cmp_name){//To changing the active company in company list
      $scope.SearchType="Roles";
      $scope.modelSearch="";
      $scope.placeholderVal="Search Roles";
      $scope.companyId=cmp_id;
      RoleMenuMappingSrv.FnGetRoles($scope,$scope.companyId,"","");
      $scope.CompanySate=-1;
      //$scope.CurrentCompany=cmp_name;
    };
    $scope.toLevelRoles=function()
    {
      $scope.comapany=false;
      $scope.ModelRoleBox=false;
      $scope.ShowNoDataFound=false;
      $scope.menudetails=false;
      $scope.RoleState=-1;
    };
    $scope.backToCompanies=function(){
      $scope.menudetails=false;
      $scope.modelSearch="";
      $scope.placeholderVal="Search Companies";
      $scope.SearchType="Company";
      $scope.ModelRoleBox=false;
      $scope.comapany=true;
      $scope.ShowNoDataFound=false;
      $scope.RoleState=-1;
      RoleMenuMappingSrv.FnGetCompanyDetails($scope,"","");
    };
    $scope.getRole=function(id){//To load current menus by active role
        $scope.RoleState=id;
        //$scope.AllCompanies=true;
        RoleMenuMappingSrv.FnGetRoleMenus($scope,id,current_menu_type);//function to call the service function to load the existing menu items
        RoleMenuMappingSrv.FnGetAllMenus($scope,menu_list_type);
    };
    var searchInProgress;
    $scope.$watch('modelSearch', function (newValue, oldValue) {//function which watces the change in text box and used  for searching companies and roles
      
      clearTimeout(searchInProgress);
      searchInProgress=setTimeout(function ()
        {
            if(!angular.equals(newValue,undefined)){
                  CurNewValue=newValue;
                  if($scope.SearchType==="Company"){//Search by Company
                    $scope.CompanySate=-1;
                    RoleMenuMappingSrv.FnGetCompanyDetails($scope,"",newValue);
                  }
                  else if ($scope.SearchType==="Roles"){//Search by Roles
                    $scope.menudetails=false;
                    $scope.RoleState=-1;
                    RoleMenuMappingSrv.FnGetRoles($scope,$scope.companyId,"",newValue);
                  }
                }
          },400);
          

    });
        /*---Starting Pagenation for loading companies and roles---*/
    $scope.next_one = function() {//To get Next page
      if($scope.roles_count>12 && $scope.SearchType==="Roles"){//Checking Search type is Roles
        $scope.menudetails=false;
        $scope.RoleState=-1;
        $scope.activeLink=$scope.activeLink+12;
        RoleMenuMappingSrv.FnGetRoles($scope,$scope.companyId,$scope.activeLink-1,CurNewValue);
      }
      else if($scope.companyCount>6 && $scope.SearchType==="Company"){//Checking Search type is Company
        $scope.activeLink=$scope.activeLink+6;
        RoleMenuMappingSrv.FnGetCompanyDetails($scope,$scope.activeLink-1,CurNewValue);
      }
    };
    $scope.prev_one = function() {//To get Previous page
      if($scope.activeLink>1 && $scope.SearchType==="Roles"){//Checking Search type is Roles
        $scope.menudetails=false;
        $scope.RoleState=-1;
        $scope.activeLink=$scope.activeLink-12;
        RoleMenuMappingSrv.FnGetRoles($scope,$scope.companyId,$scope.activeLink-1,CurNewValue);
      }
      else if($scope.activeLink>1 && $scope.SearchType==="Company"){//Checking Search type is Company
        $scope.activeLink=$scope.activeLink-6;
        RoleMenuMappingSrv.FnGetCompanyDetails($scope,$scope.activeLink-1,CurNewValue);
      }
    };
    /*---Ending Pagenation for loading companies and roles---*/
    $scope.remove = function(scope) {
      scope.remove();
    };
    $scope.toggle = function(scope) {
      scope.toggle();
    };
    $scope.newSubItem = function(scope) {
      var nodeData = scope.$modelValue;
      nodeData.childMenuStructure.push({
        fkMenuId: nodeData.fkMenuId * 10 + nodeData.childMenuStructure.length,
        MenuName: nodeData.MenuName + '.' + (nodeData.childMenuStructure.length + 1),
        childMenuStructure: []
      });
    };

        $scope.tree1NodesOptions = { 
      dragStart:function(sourceNodeScope, destNodesScope, destIndex) {
        MeusStatus=true;
        tree1dragStartStatus=true;
        dragStartStatus=false;
      },
      accept: function(sourceNodeScope, destNodesScope, destIndex) {
        if (destNodesScope.$nodeScope==null) {
          dragStartStatus=true;
        }
        else if(angular.equals(destNodesScope.$nodeScope.$modelValue.MenuLink,undefined))
        {
          dragStartStatus=true;
        }
        return dragStartStatus; 
      },
    };
     $scope.tree2NodesOptions = {
      dragStart:function(sourceNodeScope, destNodesScope, destIndex) {
        MeusStatus=true;
        dragStartStatus=true;
        tree1dragStartStatus=false;
      }
     };
     $scope.checkNewMenu=function(new_menu_id)
     {
            for (var menu_count = 0; menu_count < $scope.tree1.length; menu_count++) {
              if(angular.equals($scope.tree1[menu_count].fkMenuId,new_menu_id))//checking, new menu exists in current root menu
                {
                  MeusStatus=false;
                }
              if ($scope.tree1[menu_count].childMenuStructure.length) {
                var subMenu=$scope.tree1[menu_count].childMenuStructure;
                for (var submenu_count = 0; submenu_count < subMenu.length; submenu_count++) {
                  if(angular.equals(subMenu[submenu_count].fkMenuId,new_menu_id))//checking, new menu exists in current sub menu
                    {
                      MeusStatus=false;
                    }
                }
              }
            }
     };
    $scope.SaveChange=function(id){//To save new menus
      if ($scope.tree1.length) {
        RoleMenuMappingSrv.FnSaveNewRoleMenu($scope,$scope.tree1);
      }
    };

    $scope.createGroup = function(groupName)
    {
        $scope.tree1.push({"MenuName":groupName,
                       "menuIcon":$scope.menuIcon,
                       "childMenuStructure":[]});
    };
    $scope.removeFromTree1 = function(thisnode)
    {
        var menus=[];
        menus.push(thisnode.$nodeScope.$modelValue);
        addMenu(menus,null);
            function addMenu(menu,sub){
              if(sub==null){
                sub=0;
              }
              if(angular.equals(menu[sub],undefined))
                {return 0;}
              if(!angular.equals(menu[sub].MenuLink ,undefined))
              {
                $scope.tree2.push(menu[sub]);
              }
              if(menu[sub].childMenuStructure.length)
               {addMenu(menu[sub].childMenuStructure,null);}
              addMenu(menu,++sub);
            }      
    };
    $scope.removeFromTree2 = function(thisv)
    {
        $scope.tree1.push(thisv.$nodeScope.$modelValue);
    };
    $scope.moveRight = function(nodeVal){
        console.log(nodeVal);
    };

    $scope.fnActionExists = function(thisAction, actions){     
      for (var action_count = 0; action_count < actions.length; action_count++){
        if(actions[action_count]!=null){
          if (actions[action_count].actionName == thisAction){ 
                  return true;
                }
              }
            }
          };

          $scope.checkAction = function($menuItem, thisAction, index){
            if($menuItem.actionStatus[index]){
              $menuItem.actions.push(thisAction.action);
            }
            else {
              var  currIndex= $menuItem.actions.indexOf(thisAction.action);
              $menuItem.actions.splice(currIndex,1);
            }
          };

          var selectedMenuGroup = "";
          $scope.addMenuToGroup = function(groupName, index){
            $scope.selectedMenuGroup = groupName;
            selectedMenuGroup = $scope.tree1[index].childMenuStructure;
          };
          
          $scope.insertMenuToGroup = function(menu, index){
            selectedMenuGroup.push(menu);
            $scope.tree1.splice(index,1);
          };

          $scope.removeFromMenuGroup = function(menuGroup, index){
            $scope.tree1.push(menuGroup.childMenuStructure[index]);
            menuGroup.childMenuStructure.splice(index,1);
          };

          $scope.removeMenu = function(index){
            $scope.tree2.push($scope.tree1[index]);
            $scope.tree1.splice(index,1);
          };

          $scope.addMenu = function(index){
            $scope.tree1.push($scope.tree2[index]);
            $scope.tree2.splice(index,1);
          };

          $scope.removeMenuGroup = function(index){
            var menus = angular.copy($scope.tree1[index].childMenuStructure);
            $scope.tree1.splice(index,1);
            //$scope.tree1.push(menus);
            $scope.tree1 = $scope.tree1.concat(menus);
          };

          $scope.addMenuFromMenuGroup = function(menuGroup, index){
            $scope.tree1.push(menuGroup.childMenuStructure[index]);
            menuGroup.childMenuStructure.splice(index,1);
          };
}]);