define(['app'], function(dmsApp) {

	'use strict';

	angular.module('generateDocumentFactoryModule', [])
		.factory('generateDocumentFactory', function($http) {
			return {
				generateDocument: function(params) {
					return $http({
						method: 'POST',
						url: 'generateDocument',
						data: {
							params: params
						}	
					});
				}
			}
		});
});