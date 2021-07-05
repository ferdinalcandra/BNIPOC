
define(['app'], function(dmsApp) {

	dmsApp
		.controller('documentController', function($scope, ModalService, newsFactory) {
			
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
			
			$scope.listNews = [];
			var params = null;
    		newsFactory.getListNews(params)
    		.then(function successCallback(response){
    			$scope.listNews = response.data.listNews;
    		  }, function errorCallback(response){
    		  		console.log(response.data);
    		  })

			$scope.btnSearch = function() {
				$scope.tableData.validForm = true;
				$scope.tableData.search.status = true;
				$('.message-error').remove();
			}

			$scope.insertDocument = function() {
				ModalService.showModal({
					templateUrl: "insertDocument.html",
					controller: "insertDocumentController",
					inputs: {
						modalParams: {

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
								text: '<span class="title"><i class="mdi mdi-check-circle"></i> Success</span><br><span> Document has been Uploaded.</span>',
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

			$scope.editDocument = function(document) {
				ModalService.showModal({
					templateUrl: "editDocument.html",
					controller: "editDocumentController",
					inputs: {
						modalParams: {
							document: document
						}
					}
				}).then(function(modal) {
					modal.element.modal({
						backdrop: 'static',
						keyboard: false
					});

					modal.close.then(function(result) {
						if (result.success) {
							document.documentName = result.newDocumentData.documentName;
							document.documentNumber = result.newDocumentData.documentNumber;
							document.documentType = result.newDocumentData.documentType;
							document.modifiedDate = result.newDocumentData.modifiedDate;
							document.modifiedBy = result.newDocumentData.modifiedBy;
							noty({
								layout: 'bottomRight',
								theme: 'metroui',
								type: 'success',
								text: '<span class="title"><i class="mdi mdi-check-circle"></i> Success</span><br><span> Document has been Updated.</span>',
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
			
			$scope.listNews = function(newsId) {
				ModalService.showModal({
					controller: "ListNewsController",
					inputs: {
						modalParams: {
							newsId: newsId
						}
					}

				}).then(function(modal) {

					modal.element.modal({
						backdrop: 'static',
						keyboard: false
					});
				});
			}
			
			$scope.deleteDocument = function(documentId) {
				ModalService.showModal({
					templateUrl: "deleteDocument.html",
					controller: "deleteDocumentController",
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
								text: '<span class="title"><i class="mdi mdi-check-circle"></i>Success</span><br><span> Document has been Deleted.</span>',
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

		.controller('insertDocumentController', function($scope, documentFactory, $timeout, $element, close) {
			$scope.display = {
				form: true,
				confirm: false,
				loading: false,
				error: false
			};

			$scope.documentData = {
				"documentName": null,
				"documentNumber": null,
				"documentType": null
			}

			$scope.btnSave = function() {
				$scope.submitted = true;
				if ($scope.documentForm.$invalid) {
					$scope.display.form = true;
					$scope.display.confirm = false;
					return false;
				}
				$scope.display.form = false;
				$scope.display.confirm = true;
			}

			$scope.btnYes = function() {
				$scope.display.confirm = false;
				$scope.display.loading = true;

				var params = $scope.documentData;
				documentFactory.insertDocument(params)
					.then(function successCallback(response) {
						$timeout(function() {
							if (response.data.success) {
								$timeout(function() {
									var paramsCloseModal = {
										success: true
									};
									$element.modal('hide');
									close(paramsCloseModal, 500);
								}, 500);
							} else {
								$scope.display.loading = false;
								$scope.display.error = true;
							}
						}, 500);
					}, function errorCallback(response) {
					});
			}

			$scope.btnNo = function() {
				$scope.display.form = true;
				$scope.display.confirm = false;
			}

		})

		.controller('editDocumentController', function($scope, documentFactory, modalParams, $timeout, $element, close) {
			$scope.display = {
				form: true,
				confirm: false,
				loading: false,
				error: false
			};

			$scope.documentData = {
				"documentId": modalParams.document.documentId,
				"documentName": modalParams.document.documentName,
				"documentNumber": modalParams.document.documentNumber,
				"documentType": modalParams.document.documentType
			}

			$scope.btnEdit = function() {
				$scope.submitted = true;
				if ($scope.documentForm.$invalid) {
					$scope.display.form = true;
					$scope.display.confirm = false;
					return false;
				}
				$scope.display.form = false;
				$scope.display.confirm = true;
			}

			$scope.btnYes = function() {
				$scope.display.confirm = false;
				$scope.display.loading = true;

				var params = $scope.documentData;
				documentFactory.editDocument(params)
					.then(function successCallback(response) {
						$timeout(function() {
							if (response.data.success) {
								$timeout(function() {
									var paramsCloseModal = {
										success: true,
										newDocumentData: response.data.newDocumentData
									};
									$element.modal('hide');
									close(paramsCloseModal, 500);
								}, 500);
							} else {
								$scope.display.loading = false;
								$scope.display.error = true;
							}
						}, 500);
					}, function errorCallback(response) {
					});
			}

			$scope.btnNo = function() {
				$scope.display.form = true;
				$scope.display.confirm = false;
			}

		})

		.controller('deleteDocumentController', function($scope, documentFactory, modalParams, $timeout, $element, close) {
			$scope.documentId = modalParams.documentId;

			$scope.display = {
				confirm: true,
				loading: false,
				error: false
			};

			$scope.btnDelete = function() {
				$scope.display.confirm = false;
				$scope.display.loading = true;

				var params = $scope.documentId;
				documentFactory.deleteDocument(params)
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