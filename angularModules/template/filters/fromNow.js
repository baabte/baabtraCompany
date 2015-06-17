(function() {

		'use strict';

		/**
		 * @ngdoc function
		 * @name app.filter:fromNow
		 * @description
		 * need load the moment.js to use this filter. 
		 * # fromNow
		 * filter of the app
		 */
		angular.module('baabtra')
		  .filter('fromNow', function() {
		    return function(date) {
		      return moment(date).fromNow();
		    };
		  });
}());