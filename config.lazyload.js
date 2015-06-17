// lazyload config

angular.module('baabtra')
  .constant('MODULE_CONFIG', [
      {
          name: 'ui.select',
          module: true,
          files: [
              'vendor/modules/angular-ui-select/select.min.js',
              'vendor/modules/angular-ui-select/select.min.css'
          ]
      },
      {
          name: 'textAngular',
          module: true,
          files: [
              'vendor/modules/textAngular/textAngular-sanitize.min.js',
              'vendor/modules/textAngular/textAngular.min.js'
          ]
      },
      {
          name: 'vr.directives.slider',
          module: true,
          files: [
              'vendor/modules/angular-slider/angular-slider.min.js',
              'vendor/modules/angular-slider/angular-slider.css'
          ]
      },
      {
          name: 'angularBootstrapNavTree',
          module: true,
          files: [
              'vendor/modules/angular-bootstrap-nav-tree/abn_tree_directive.js',
              'vendor/modules/angular-bootstrap-nav-tree/abn_tree.css'
          ]
      },
      {
          name: 'angularFileUpload',
          module: true,
          files: [
              'vendor/modules/angular-file-upload/angular-file-upload.min.js'
          ]
      },
      {
          name: 'ngImgCrop',
          module: true,
          files: [
              'vendor/modules/ngImgCrop/ng-img-crop.js',
              'vendor/modules/ngImgCrop/ng-img-crop.css'
          ]
      },
      {
          name: 'smart-table',
          module: true,
          files: [
              'vendor/modules/angular-smart-table/smart-table.min.js'
          ]
      },
      {
          name: 'easyPieChart',
          module: false,
          files: [
              'vendor/jquery/easypiechart/jquery.easy-pie-chart.js'
          ]
      },
      {
          name: 'sparkline',
          module: false,
          files: [
              'vendor/jquery/sparkline/jquery.sparkline.min.js'
          ]
      },
      {
          name: 'plot',
          module: false,
          files: [
              'vendor/jquery/flot/jquery.flot.min.js',
              'vendor/jquery/flot/jquery.flot.resize.js',
              'vendor/jquery/flot/jquery.flot.tooltip.min.js',
              'vendor/jquery/flot/jquery.flot.spline.js',
              'vendor/jquery/flot/jquery.flot.orderBars.js',
              'vendor/jquery/flot/jquery.flot.pie.min.js'
          ]
      },
      {
          name: 'slimScroll',
          module: false,
          files: [
              'vendor/jquery/slimscroll/jquery.slimscroll.min.js'
          ]
      },
      {
          name: 'vectorMap',
          module: false,
          files: [
              'vendor/jquery/jvectormap/jquery-jvectormap.min.js', 
              'vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
              'vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
              'vendor/jquery/jvectormap/jquery-jvectormap.css'
          ]
      }
    ]
  )
  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
      $ocLazyLoadProvider.config({
          debug: false,
          events: false,
          modules: MODULE_CONFIG
      });
  }]);