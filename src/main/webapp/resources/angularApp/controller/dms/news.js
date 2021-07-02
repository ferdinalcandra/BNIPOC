
define(['app'], function(dmsApp) {

	dmsApp
		.controller('newsController', function($scope, ModalService) {

			var params = null;
			$scope.tableData = {
				url: 'getAllNews',
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

			$scope.insertNews = function() {
				ModalService.showModal({
					templateUrl: "insertNews.html",
					controller: "insertNewsController",
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
								text: '<span class="title"><i class="mdi mdi-check-circle"></i> Success</span><br><span> News has been Published.</span>',
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

			$scope.editNews = function(news) {
				ModalService.showModal({
					templateUrl: "editNews.html",
					controller: "editNewsController",
					inputs: {
						modalParams: {
							news: news
						}
					}
				}).then(function(modal) {
					modal.element.modal({
						backdrop: 'static',
						keyboard: false
					});

					modal.close.then(function(result) {
						if (result.success) {
							news.newsTitle = result.newNewsData.newsTitle;
							news.newsNumber = result.newNewsData.newsNumber;
							news.newsInformation = result.newNewsData.newsInformation;
							news.modifiedDate = result.newNewsData.modifiedDate;
							news.modifiedBy = result.newNewsData.modifiedBy;
							noty({
								layout: 'bottomRight',
								theme: 'metroui',
								type: 'success',
								text: '<span class="title"><i class="mdi mdi-check-circle"></i> Success</span><br><span> News has been Updated.</span>',
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

			$scope.deleteNews = function(newsId) {
				ModalService.showModal({
					templateUrl: "deleteNews.html",
					controller: "deleteNewsController",
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

					modal.close.then(function(result) {
						if (result.success) {
							$scope.tableData.action.remove = true;

							noty({
								layout: 'bottomRight',
								theme: 'metroui',
								type: 'success',
								text: '<span class="title"><i class="mdi mdi-check-circle"></i>Success</span><br><span> News has been Deleted.</span>',
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

		.controller('insertNewsController', function($scope, newsFactory, $timeout, $element, close) {
			$scope.display = {
				form: true,
				confirm: false,
				loading: false,
				error: false
			};

			$scope.newsData = {
				"newsTitle": null,
				"newsNumber": null,
				"newsInformation": null
			}

			$scope.btnSave = function() {
				$scope.submitted = true;
				if ($scope.newsForm.$invalid) {
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

				var params = $scope.newsData;
				newsFactory.insertNews(params)
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

		.controller('editNewsController', function($scope, newsFactory, modalParams, $timeout, $element, close) {
			$scope.display = {
				form: true,
				confirm: false,
				loading: false,
				error: false
			};

			$scope.newsData = {
				"newsId": modalParams.news.newsId,
				"newsTitle": modalParams.news.newsTitle,
				"newsNumber": modalParams.news.newsNumber,
				"newsInformation": modalParams.news.newsInformation
			}

			$scope.btnEdit = function() {
				$scope.submitted = true;
				if ($scope.newsForm.$invalid) {
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

				var params = $scope.newsData;
				newsFactory.editNews(params)
					.then(function successCallback(response) {
						$timeout(function() {
							if (response.data.success) {
								$timeout(function() {
									var paramsCloseModal = {
										success: true,
										newNewsData: response.data.newNewsData
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

		.controller('deleteNewsController', function($scope, newsFactory, modalParams, $timeout, $element, close) {
			$scope.newsId = modalParams.newsId;

			$scope.display = {
				confirm: true,
				loading: false,
				error: false
			};

			$scope.btnDelete = function() {
				$scope.display.confirm = false;
				$scope.display.loading = true;

				var params = $scope.newsId;
				newsFactory.deleteNews(params)
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