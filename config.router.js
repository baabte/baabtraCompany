(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name app.config:uiRouter
     * @description
     * # Config
     * Config for the router
     */
    angular.module('baabtra')
      .run(
        [           '$rootScope', '$state', '$stateParams',
          function ( $rootScope,   $state,   $stateParams ) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
          }
        ]
      )
      .config(
        [          '$stateProvider', '$urlRouterProvider',
          function ( $stateProvider,   $urlRouterProvider ) {
            $urlRouterProvider
              .otherwise('/login');
            $stateProvider
              .state('app', {
                abstract: true,
                url: '/app',
                views: {
                  '': {
                    templateUrl: 'angularModules/login/partials/Partial-Login_view.html'
                  }
                }
              })
                .state('app.dashboard', {
                  url: '/dashboard',
                  templateUrl: 'views/pages/dashboard.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['angularModules/template/controllers/chart.js','angularModules/template/controllers/vectormap.js']);
                    }]
                  }
                })
              .state('mail', {
                url: '/mail',
                views: {
                  '': {
                    templateUrl: 'views/layout.html'
                  },
                  'aside': {
                    templateUrl: 'views/partials/aside.nav.mail.html'
                  }
                }
              })
                .state('mail.inbox', {
                  url: '/inbox',
                  templateUrl: 'views/pages/mail.html'
                });
          }
        ]
      );
}());
