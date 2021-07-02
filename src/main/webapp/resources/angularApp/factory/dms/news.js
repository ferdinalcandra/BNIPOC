define(['app'], function(dmsApp) {

	'use strict';

	angular.module('newsFactoryModule', [])
		.factory('newsFactory', function($http) {
			return {
				insertNews: function(params) {
					return $http({
						method: 'POST',
						url: 'insertNews',
						data: {
							params: params
						}
					});
				},
				editNews: function(params) {
					return $http({
						method: 'POST',
						url: 'editNews',
						data: {
							params: params
						}
					});
				},
				deleteNews: function(params) {
					return $http({
						method: 'POST',
						url: 'deleteNews',
						data: {
							params: params
						}
					});
				}
			}
		});
});