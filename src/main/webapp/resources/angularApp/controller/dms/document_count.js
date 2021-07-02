
define(['app'], function(dmsApp) {

	dmsApp
		.controller('documentCountViewController', function($scope, ModalService) {

			var params = null;
			$scope.tableData = {
				url: 'getAllDocuments',
				data: [],
				limit: 10,
				start: 0,
				page: 0,
				params: params,
				action: {
					add: false,
					remove: false,
					refresh: false
				},
				search: {
					status: false,
					data: null
				}
			};
			
				
			
			

		})
   });