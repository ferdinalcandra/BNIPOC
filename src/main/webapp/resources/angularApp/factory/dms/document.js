define(['app'], function(dmsApp) {

	'use strict';

	angular.module('documentFactoryModule', [])
		.factory('documentFactory', function($http) {
			return {
				insertDocument: function(params) {
					return $http({
						method: 'POST',
						url: 'insertDocument',
							params: params		
					});
				},
				editDocument: function(params) {
					return $http({
						method: 'POST',
						url: 'editDocument',
						data: {
							params: params
						}
					});
				},
				deleteDocument: function(params) {
					return $http({
						method: 'POST',
						url: 'deleteDocument',
						data: {
							params: params
						}
					});
				}
			}
		});
});