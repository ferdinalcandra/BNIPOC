define(['app'], function(dmsApp) {

	'use strict';

	angular.module('commonFilterModule', [])
		.filter('startFrom', function() {
			return function(input, start) {
				if (input != undefined) {
					start = +start; //parse to int
					return input.slice(start);
				}
			}
		})
});