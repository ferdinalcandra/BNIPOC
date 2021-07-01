define(['app'], function(dmsApp) {

	'use strict';

	angular.module('bookmarkFactoryModule', [])
		.factory('bookmarkFactory', function($http) {
			return {				
				removeBookmark: function(params) {
					return $http({
						method: 'POST',
						url: 'removeBookmark',
						data: {
							params: params
						}
					});
				}
			}
		});
});