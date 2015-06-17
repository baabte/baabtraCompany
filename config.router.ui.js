(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name app.config:uiRouter
     * @description
     * # Config
     * Config for the uikit router
     */
    angular.module('baabtra')
      .config(
        [          '$stateProvider', '$urlRouterProvider',
          function ( $stateProvider,   $urlRouterProvider ) {
            $stateProvider
              .state('ui', {
                url: '/ui',
                views: {
                  // This shows off how you could populate *any* view within *any* ancestor state.
                  // Oopulating the ui-view="aside@"
                  'aside': {
                    templateUrl: 'views/partials/aside.nav.uikit.html'
                  },
                  // So this one is targeting the unnamed view within the parent state's template.
                  '': {
                    templateUrl: 'views/layout.html'
                  }
                }
              })
                // components router
                .state('ui.component', {
                  url: '/component',
                  template: '<div ui-view></div>'
                })
                  .state('ui.component.arrow', {
                    url: '/arrow',
                    templateUrl: 'views/ui/component/arrow.html'
                  })
                  .state('ui.component.badge-label', {
                    url: '/badge-label',
                    templateUrl: 'views/ui/component/badge-label.html'
                  })
                  .state('ui.component.button', {
                    url: '/button',
                    templateUrl: 'views/ui/component/button.html'
                  })
                  .state('ui.component.color', {
                    url: '/color',
                    templateUrl: 'views/ui/component/color.html'
                  })
                  .state('ui.component.grid', {
                    url: '/grid',
                    templateUrl: 'views/ui/component/grid.html'
                  })
                  .state('ui.component.icon', {
                    url: '/icons',
                    templateUrl: 'views/ui/component/icon.html'
                  })
                  .state('ui.component.list', {
                    url: '/list',
                    templateUrl: 'views/ui/component/list.html'
                  })
                  .state('ui.component.nav', {
                    url: '/nav',
                    templateUrl: 'views/ui/component/nav.html'
                  })
                  .state('ui.component.panel', {
                    url: '/panel',
                    templateUrl: 'views/ui/component/panel.html'
                  })
                  .state('ui.component.progressbar', {
                    url: '/progressbar',
                    templateUrl: 'views/ui/component/progressbar.html'
                  })
                  .state('ui.component.streamline', {
                    url: '/streamline',
                    templateUrl: 'views/ui/component/streamline.html'
                  })
                  .state('ui.component.timeline', {
                    url: '/timeline',
                    templateUrl: 'views/ui/component/timeline.html'
                  })
                // angular-strap routers
                .state('ui.angular-strap', {
                  url: '/angular-strap',
                  template: '<div ui-view class="fade-in"></div>',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['angularModules/template/controllers/angular-strap.js']);
                    }]
                  }
                })
                  .state('ui.angular-strap.affix', {
                    url: '/affix',
                    templateUrl: 'views/ui/angular-strap/affix.html'
                  })
                  .state('ui.angular-strap.alert', {
                    url: '/alert',
                    templateUrl: 'views/ui/angular-strap/alert.html'
                  })
                  .state('ui.angular-strap.aside', {
                    url: '/aside',
                    templateUrl: 'views/ui/angular-strap/aside.html'
                  })
                  .state('ui.angular-strap.button', {
                    url: '/button',
                    templateUrl: 'views/ui/angular-strap/button.html'
                  })
                  .state('ui.angular-strap.collapse', {
                    url: '/collapse',
                    templateUrl: 'views/ui/angular-strap/collapse.html'
                  })
                  .state('ui.angular-strap.dropdown', {
                    url: '/dropdown',
                    templateUrl: 'views/ui/angular-strap/dropdown.html'
                  })
                  .state('ui.angular-strap.datepicker', {
                    url: '/datepicker',
                    templateUrl: 'views/ui/angular-strap/datepicker.html'
                  })
                  .state('ui.angular-strap.timepicker', {
                    url: '/timepicker',
                    templateUrl: 'views/ui/angular-strap/timepicker.html'
                  })
                  .state('ui.angular-strap.modal', {
                    url: '/modal',
                    templateUrl: 'views/ui/angular-strap/modal.html'
                  })
                  .state('ui.angular-strap.select', {
                    url: '/select',
                    templateUrl: 'views/ui/angular-strap/select.html'
                  })
                  .state('ui.angular-strap.tab', {
                    url: '/tab',
                    templateUrl: 'views/ui/angular-strap/tab.html'
                  })
                  .state('ui.angular-strap.tooltip', {
                    url: '/tooltip',
                    templateUrl: 'views/ui/angular-strap/tooltip.html'
                  })
                  .state('ui.angular-strap.popover', {
                    url: '/popover',
                    templateUrl: 'views/ui/angular-strap/popover.html'
                  })
                  .state('ui.angular-strap.typeahead', {
                    url: '/typehead',
                    templateUrl: 'views/ui/angular-strap/typeahead.html'
                  })
                // form routers
                .state('ui.form', {
                  url: '/form',
                  template: '<div ui-view></div>'
                })
                  .state('ui.form.layout', {
                    url: '/layout',
                    templateUrl: 'views/ui/form/layout.html'
                  })
                  .state('ui.form.element', {
                    url: '/element',
                    templateUrl: 'views/ui/form/element.html'
                  })              
                  .state('ui.form.validation', {
                    url: '/validation',
                    templateUrl: 'views/ui/form/validation.html'
                  })
                  .state('ui.form.select', {
                    url: '/select',
                    templateUrl: 'views/ui/form/select.html',
                    controller: 'SelectCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                          function( $ocLazyLoad ){
                            return $ocLazyLoad.load('angularModules/template/controllers/select.js');
                        }]
                    }
                  })
                  .state('ui.form.editor', {
                    url: '/editor',
                    templateUrl: 'views/ui/form/editor.html',
                    controller: 'EditorCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                          function( $ocLazyLoad ){
                            return $ocLazyLoad.load('angularModules/template/controllers/editor.js');
                        }]
                    }
                  })
                  .state('ui.form.slider', {
                    url: '/slider',
                    templateUrl: 'views/ui/form/slider.html',
                    controller: 'SliderCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                          function( $ocLazyLoad ){
                            return $ocLazyLoad.load('angularModules/template/controllers/slider.js');
                        }]
                    }
                  })
                  .state('ui.form.tree', {
                    url: '/tree',
                    templateUrl: 'views/ui/form/tree.html',
                    controller: 'TreeCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                          function( $ocLazyLoad ){
                            return $ocLazyLoad.load('angularModules/template/controllers/tree.js');
                        }]
                    }
                  })
                  .state('ui.form.file-upload', {
                    url: '/file-upload',
                    templateUrl: 'views/ui/form/file-upload.html',
                    controller: 'UploadCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                          function( $ocLazyLoad ){
                            return $ocLazyLoad.load('angularFileUpload').then(
                              function(){
                                 return $ocLazyLoad.load('angularModules/template/controllers/upload.js');
                              }
                            );
                        }]
                    }
                  })
                  .state('ui.form.image-crop', {
                    url: '/image-crop',
                    templateUrl: 'views/ui/form/image-crop.html',
                    controller: 'ImgCropCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                          function( $ocLazyLoad ){
                            return $ocLazyLoad.load('ngImgCrop').then(
                              function(){
                                 return $ocLazyLoad.load('angularModules/template/controllers/imgcrop.js');
                              }
                            );
                        }]
                    }
                  })
                // table routers
                .state('ui.table', {
                  url: '/table',
                  template: '<div ui-view></div>'
                })
                  .state('ui.table.static', {
                    url: '/static',
                    templateUrl: 'views/ui/table/static.html'
                  })
                  .state('ui.table.smart', {
                    url: '/smart',
                    templateUrl: 'views/ui/table/smart.html',
                    controller: 'TableCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                          function( $ocLazyLoad ){
                            return $ocLazyLoad.load('smart-table').then(
                              function(){
                                 return $ocLazyLoad.load('angularModules/template/controllers/table.js');
                              }
                            );
                        }]
                    }
                  })
                // chart
                .state('ui.chart', {
                  url: '/chart',
                  templateUrl: 'views/ui/chart/chart.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('angularModules/template/controllers/chart.js');
                      }]
                  }
                })
                // map routers
                .state('ui.map', {
                  url: '/map',
                  template: '<div ui-view></div>'
                })
                  .state('ui.map.google', {
                    url: '/google',
                    templateUrl: 'views/ui/map/google.html',
                    controller: 'GoogleMapCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                          function( $ocLazyLoad ){
                            return $ocLazyLoad.load( [
                                {
                                  files: [                                  
                                  'vendor/jquery/load-google-maps.js',
                                  'angularModules/template/controllers/googlemap.js'
                                  ]
                                },
                                {
                                  name:'ui.map',
                                  files:['vendor/modules/angular-ui-map/ui-map.js']
                                }
                              ]).then(
                              function(){ 
                                return loadGoogleMaps(); 
                              }
                            );
                        }]
                    }
                  })
                  .state('ui.map.vector', {
                    url: '/vector',
                    templateUrl: 'views/ui/map/vector.html',
                    controller: 'VectorMapCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                          function( $ocLazyLoad ){
                            return $ocLazyLoad.load('angularModules/template/controllers/vectormap.js');
                        }]
                    }
                  });
          }
        ]
      );
}());