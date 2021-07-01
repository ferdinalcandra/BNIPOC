
define(['app'], function(dmsApp) {

	dmsApp
		.controller('bookmarkController', function($scope, ModalService) {

			var params = null;
			$scope.tableData = {
				url: 'getAllBookmarks',
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

			$scope.btnSearch = function() {
				$scope.tableData.validForm = true;
				$scope.tableData.search.status = true;
				$('.message-error').remove();
			}
						
			$scope.removeBookmark = function(documentId) {
				ModalService.showModal({
					templateUrl: "removeBookmark.html",
					controller: "removeBookmarkController",
					inputs: {
						modalParams: {
							documentId: documentId
						}
					}

				}).then(function(modal) {

					modal.element.modal({
						backdrop: 'static',
						keyboard: false
					});

					modal.close.then(function(result) {
						if (result.success) {
							$scope.tableData.action.remove = true;

							noty({
								layout: 'bottomRight',
								theme: 'metroui',
								type: 'success',
								text: '<span class="title"><i class="mdi mdi-check-circle"></i>Success</span><br><span> Bookmark has been removed.</span>',
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutRight',
								},
								timeout: '3000',
								closeWith: ['hover']
							});
						}
					});
				});
			}

		})
		
		.controller('removeBookmarkController', function($scope, bookmarkFactory, modalParams, $timeout, $element, close) {
			$scope.documentId = modalParams.documentId;

			$scope.display = {
				confirm: true,
				loading: false,
				error: false
			};

			$scope.btnRemoveBookmark = function() {
				$scope.display.confirm = false;
				$scope.display.loading = true;

				var params = $scope.documentId;
				bookmarkFactory.removeBookmark(params)
					.then(function successCallback(response) {
						$timeout(function() {
							if (response.data.success) {
								$timeout(function() {
									var return_modal_close = {
										success: true,
									};
									$element.modal('hide');
									close(return_modal_close, 500);
								}, 500);
							} else {
								$scope.display.loading = false;
								$scope.display.error = true;
							}
						}, 500);
					}, function errorCallback(response) {
						$scope.display.loading = false;
						$scope.display.error = true;
					});
			}

		})
});