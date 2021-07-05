
define(['app'], function(dmsApp) {

	dmsApp
		.controller('generateDocumentController', function($scope, ModalService) {
			
			$scope.btnGeneratePdf = function() {
				ModalService.showModal({
						templateUrl: "generateDocument.html",
						controller: "generateController",
						inputs: {
							modalParams: {
								content: myEditor.getData()
							}
						}

					}).then(function(modal) {

						modal.element.modal({
							backdrop: 'static',
							keyboard: false
						});

						modal.close.then(function(result) {
							if (result.success) {
					      		window.open("./downloadGeneratedDocument?path="+result.path,
				  					"_self",
				  					"toolbar=yes, location=no, directories=no, status=no, menubar=no, copyhistory=no, scrollbars=yes, resizable=yes");
								noty({
									layout: 'bottomRight',
									theme: 'metroui',
									type: 'success',
									text: '<span class="title"><i class="mdi mdi-check-circle"></i>Success</span><br><span> Document has been Generated.</span>',
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

		.controller('generateController', function($scope, generateDocumentFactory, modalParams, $timeout, $element, close) {
			var content = modalParams.content;

			$scope.display = {
				confirm: true,
				loading: false,
				error: false
			};

			$scope.btnGenerate = function() {
				
				$scope.display.confirm = false;
				$scope.display.loading = true;

				var params = content;
				generateDocumentFactory.generateDocument(params)
					.then(function successCallback(response) {
						$timeout(function() {
							if (response.data.success) {
								$timeout(function() {
									var return_modal_close = {
										success: true,
										path: response.data.path
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