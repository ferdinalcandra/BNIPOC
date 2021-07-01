define(['app'], function(dmsApp) {

	'use strict';

	angular.module('commonDirectiveModule', [])
		.directive('messageError', function() {
			return {
				restrict: 'E',
				compile: function(element, attrs) {
					var htmlText = '<div class="col-md-12 animated fadeIn message-error" style="color: #db3e3e">' +
						'<span>' +
						'<i class="mdi mdi-exclamation"></i>' +
						' Error on application, please try again or contact your IT Administrator' +
						'</span>' +
						'</div>';
					element.replaceWith(htmlText);
				}
			};
		})
		.directive('messageLoading', function() {
			return {
				restrict: 'E',
				compile: function(element, attrs) {
					var htmlText = '<div class="col-md-12 message-loading text-center" style="padding:40px 0px">' +
						'<span><i class="mdi mdi-reload"></i> please wait ...</span>' +
						'</div>';
					element.replaceWith(htmlText);
				}
			};
		})
		.directive('messageEmpty', function() {
			return {
				restrict: 'E',
				compile: function(element, attrs) {
					$('.message-error').remove();
					var htmlText = '<div class="col-md-12 message-error text-center text-danger" style="color: #db3e3e; margin-top: 10px">' +
						'<span>no data available.</span><br>' +
						'</div>';
					element.replaceWith(htmlText);
				}
			};
		})
		.directive('datePicker', function() {
			return {
				require: 'ngModel',
				link: function(scope, element, attrs, ngModel) {

					element.keypress(function(event) {
						event.preventDefault();
					});

					$(element[0]).datepicker({
						format: 'mm/dd/yyyy',
						useCurrent: false,
						autoclose: true,
						todayHighlight: true
					}).on('changeDate', function(e) {
						ngModel.$setViewValue($(this).val());
					});
				}
			};
		})
		.directive('monthPicker', function() {
			return {
				require: 'ngModel',
				link: function(scope, element, attrs, ngModel) {

					element.keypress(function(event) {
						event.preventDefault();
					});

					$(element[0]).datepicker({
						format: "MM yyyy",
						viewMode: "months",
						minViewMode: "months",
						useCurrent: false,
						autoclose: true,
						todayHighlight: true
					}).on('changeDate', function(e) {
						ngModel.$setViewValue($(this).val());
					});
				}
			};
		})
		.directive('datepickerSchedulePlan', function($parse, additionalService, $rootScope) {
			return {
				require: 'ngModel',
				scope: {
					activity: '=activityData',
					treeListActivity: '=treeListActivity'
				},
				link: function(scope, element, attrs, ngModel) {

					element.keypress(function(event) {
						event.preventDefault();
					});

					$(element[0]).datepicker({
						format: 'dd/mm/yyyy',
						useCurrent: false,
						autoclose: true,
						todayHighlight: true
					}).on('changeDate', function(e) {

						ngModel.$setViewValue($(this).val());

						/*if($rootScope.currentMilestone.activityTurn == "serial"){
							var key = attrs.ngModel.substr(attrs.ngModel.lastIndexOf('.')+1);
							additionalService.setAllLastChildValue(scope.activity,key,$(this).val());
							additionalService.setAllLastChildParentValue(scope.treeListActivity,scope.activity,key,$(this).val());
						}*/
					});

					$(element[0]).closest(".table-responsive").scroll(function() {
						$(element[0]).datepicker('hide');
					});
				}
			};
		})
		.directive('schedulePlanTooltip', function($parse, additionalService, $timeout) {
			return {
				scope: {
					treeListActivity: '=treeListActivity'
				},
				restrict: 'EA',
				link: function(scope, element, attrs) {

					$timeout(function() {
						if (!attrs.disabled) {

							var filterTreeActivity = additionalService.searchTreeArray(scope.treeListActivity, "planDate", null);
							var allTreeActivity = additionalService.convertTreeArrayToListArray(scope.treeListActivity);
							if (filterTreeActivity.length == allTreeActivity.length) {

								element.tooltipster({
									animation: 'grow',
									delay: 200,
									theme: 'tooltipster-light',
									trigger: 'hover',
									timer: 3000,
									side: 'bottom',
									contentAsHTML: true,
									maxWidth: 230,
									content: "<div class='text-center'><span>You can not upload a document before you set schedule plan of activities</span></div>"
								});

								element.tooltipster('open');
							} else {
								return false;
							}
						} else {
							return false;
						}
					}, 0);
				}
			};
		})
		.directive('commonTooltip', function($parse, additionalService, $timeout) {
			return {
				link: function(scope, element, attrs) {

					$timeout(function() {
						if (!attrs.disabled) {

							element.tooltipster({
								animation: 'grow',
								delay: 200,
								theme: 'tooltipster-light',
								trigger: 'hover',
								timer: 1000,
								contentAsHTML: true,
								maxWidth: 140,
								content: "<div class='text-center'><span>" + attrs.tooltipMsg + "</span></div>"
							})
						} else {
							return false;
						}
					}, 0);
				}
			};
		})
		.directive('numberOnly', function() {
			return {
				restrict: 'A',
				link: function(scope, elm, attrs, ctrl) {
					elm.on("propertychange input", function(event) {
						if (!event.target.value.search(/[^0-9]/g)) {
							$(".number-only").notify(
								"Number Only",
								{ position: "top center" });
						}
						event.target.value = event.target.value.replace(/[^0-9]/g, '');
					});
				}
			};
		})
		.directive('numberOnlyOld', function() {
			return {
				link: function(scope, element, attrs) {

					element.keydown(function(e) {
						// Allow: backspace, delete, tab, escape, enter and .
						if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
							// Allow: Ctrl+A, Command+A
							(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
							// Allow: home, end, left, right, down, up
							(e.keyCode >= 35 && e.keyCode <= 40)) {
							// let it happen, don't do anything
							return;
						}
						// Ensure that it is a number and stop the keypress
						if ((e.shiftKey || (e.keyCode < 48) || (e.keyCode > 57)) && (e.keyCode < 96) || (e.keyCode > 105)) {
							e.preventDefault();
						}
					})

				}
			};
		})
		.directive('composeTextarea', function() {
			return {
				restrict: "A",
				require: 'ngModel',
				transclude: true,
				link: function(scope, element, attrs, ngModel, ctrl) {

					$(element[0]).wysihtml5({
						"html": true,
						events: {
							"change": function(value) {
								ngModel.$setViewValue(this.getValue());
							}
						}
					});
				}
			};
		})
		.directive('pagingTable', function() {
			return {
				restrict: 'EAC',
				replace: true,
				transclude: true,
				scope: {
					tableData: '=tableData',
					paging: '=pagingData'
				},
				link: function(scope, element, attrs) {
					scope.$watch('tableData', function(data) {
						if (data != undefined) {
							if (data.length > 0) {
								var pagingCount = Math.ceil(data.length / scope.paging.limit);
								scope.arrayPaging = [];
								for (var i = 0; i < pagingCount; i++) {
									var pagingObject = {
										number: i + 1,
										active: i == 0 ? true : false
									};
									scope.arrayPaging.push(pagingObject);
								}

								scope.pagingClick = function(paging_number) {
									angular.forEach(scope.arrayPaging, function(value) {
										value.active = value.number == paging_number.number ? true : false
									});
									var currentPage = paging_number.number - 1;
									scope.paging.start = currentPage * scope.paging.limit;
								}
							}
						}

					})
				},
				template: '<div class="col-md-12 no-padding">' +
					'<div class="btn-group">' +
					'<button class = "btn btn-sm btn-outline-secondary" data-ng-class="{active:paging_number.active}" data-ng-repeat="paging_number in arrayPaging" ng-click="pagingClick(paging_number)">{{paging_number.number}}</button>' +
					'</div>' +
					'</div>'
			};
		})
		.directive('masterTable', function($compile, $filter, $http) {
			return {
				restrict: 'EAC',
				replace: true,
				transclude: false,
				scope: {
					tableData: '=tableData'
				},
				link: function(scope, element, attrs) {

					scope.$watch('tableData', function(tableData) {
						if (tableData != undefined) {
							var el = $(element[0]);
							var tableEL = $(element[0]).find("table");
							var tableContent = $(element[0]).find(".table-responsive");

							scope.sorting = {
								status: false,
								key: null
							};

							scope.limitOption = [5, 10, 25, 50, 100];
							//scope.limitOption = [1,2,4,8,12];

							var loadingEl = angular.element('<message-loading></message-loading>');
							tableEL.after(loadingEl);
							$compile(loadingEl)(scope);

							scope.tableDataTemp = {
								url: scope.tableData.url,
								data: scope.tableData.data,
								limit: scope.tableData.limit,
								start: scope.tableData.start,
								page: scope.tableData.page
							};

							scope.$watch('tableData.data', function(data, oldData) {
								if (data.length > 0) {

									if ($('.message-empty')[0] != undefined) {
										$('.message-error').remove();
										$('.message-empty').remove();
									}

									// footer
									if ($('#table_footer')[0] == undefined) {

										var footerEl =
											'<div id="table_footer" style="margin-top: 40px">' +
											'<div class="row">' +
											'<div class="col-md-6">' +
											'<div class="form-group row">' +
											'<div class="col-sm-1">' +
											'<button data-ng-click="btnRefresh()" class="btn btn-icon btn-sm btn-rounded btn-secondary"><i class="mdi mdi-refresh"></i></button>' +
											'</div> ' +

											'<div class="col-sm-2">' +
											'<select data-ng-model="tableData.limit" ng-change="selectTotal()" class="form-control form-control-sm" style="width: 80px" data-ng-options="limit for limit in limitOption"></select>' +
											'</div> ' +

											'<div class="col-sm-9" style="padding-top: 20px">' +
											'<span>' +
											'Displaying topics <span id="paging_start">0</span> - <span id="paging_limit">0</span> of <span id="paging_total">0</span>' +
											'</span>' +
											'</div> ' +
											'</div> ' +
											'</div> ' +
											'<div class="col-md-6" style="text-align:right">' +
											'</div> ' +
											'</div> ' +
											'</div>';

										var footerElCompile = $compile(footerEl)(scope);
										tableContent.after(footerElCompile);
									}

									//paging table
									if ($(el).find("#paging_table")[0] == undefined) {

										scope.arrayPaging = [];
										scope.pagingActive = null;
										var pagingCount = Math.ceil(scope.tableData.total / scope.tableData.limit);
										for (var i = 0; i < pagingCount; i++) {

											if (pagingCount > 5) {

												if (i > 4) {
													break;
												} else {
													var pagingObject = {
														number: i + 1,
														active: i == 0 ? true : false
													};
												}
												scope.arrayPaging.push(pagingObject);

											} else {
												var pagingObject = {
													number: i + 1,
													active: i == 0 ? true : false
												};
												scope.arrayPaging.push(pagingObject);
											}
										}

										scope.pagingActive = scope.arrayPaging[0];
										var table_footer = $(el).find("#table_footer");
										var rightFooter = $(table_footer).children()[1];

										var pagingEl = angular.element('<div id="paging_table" class = "btn-group" role="group">' +
											'<button type="button" class="btn btn-sm btn-outline-secondary" data-ng-disabled="" ng-click="pagingFirst(paging_number)"><i class="mdi mdi-chevron-double-left"></i></button>' +
											'<button type="button" class="btn btn-sm btn-outline-secondary" ng-click="pagingPrev(paging_number)"><i class="mdi mdi-chevron-left"></i></button>' +
											'<button type="button" class="btn btn-sm btn-outline-secondary" data-ng-class="{active:paging_number.active}" data-ng-repeat="paging_number in arrayPaging" ng-click="pagingClick(paging_number)">{{paging_number.number}}</button>' +
											'<button type="button" class="btn btn-sm btn-outline-secondary" ng-click="pagingNext(paging_number)"><i class="mdi mdi-chevron-right"></i></button>' +
											'<button type="button" class="btn btn-sm btn-outline-secondary" ng-click="pagingLast(paging_number)"><i class="mdi mdi-chevron-double-right"></i></button>' +
											'</div>');

										$compile(pagingEl)(scope);
										$(rightFooter).append(pagingEl);

										$("#table_footer").find("#paging_start").text(scope.tableData.start + 1);

										var paging_active = $filter('filter')(scope.arrayPaging, { active: true })[0];
										var limitPaging = scope.tableData.limit * paging_active.number;
										if (limitPaging > scope.tableData.data.length) {
											$("#table_footer").find("#paging_limit").text(scope.tableData.total);
										} else {
											$("#table_footer").find("#paging_limit").text(limitPaging);
										};

										$("#table_footer").find("#paging_total").text(scope.tableData.total);
									}

									//sorting
									if (!scope.sorting.status) {
										var th = tableEL.find("thead").find("th");
										th.each(function() {
											if ($(this).attr("sortBy") != "" && $(this).attr("sortBy") != null && $(this).attr("sortBy") != undefined) {
												var textTH = $(this).text();
												var sortBy = $(this).attr("sortBy");
												$(this).empty();

												var sorting = angular.element('<a data-ng-click="btnSorting($event,' + th.index(this) + ')" href="">' + textTH + ' <i style="margin-left: 4px" class="fa fa-sort"></i></a>');
												$compile(sorting)(scope);
												$(this).append(sorting);
											}
										});
									}

									if (tableContent.hasClass("table-border-color")) {
										tableContent.removeClass("table-border-color");
									}

								} else {
									if (el.find(".message-loading").length == 0) {
										var emptyEl = angular.element('<message-empty></message-empty>');
										tableEL.after(emptyEl);
										$compile(emptyEl)(scope);

									}

									tableContent.addClass("table-border-color");

									$("#table_footer").find("#paging_start").text(0);
									$("#table_footer").find("#paging_limit").text(0);
									$("#table_footer").find("#paging_total").text(0);

									// footer
									if ($('#table_footer')[0] == undefined) {

										var footerEl =
											'<div id="table_footer" style="margin-top: 40px" ' +
											'<div class = "row">' +

											'<div class="col-md-6">' +
											'<div class="form-group row">' +
											'<div class="col-sm-1">' +
											'<button data-ng-click="btnRefresh()" class="btn btn-icon btn-sm btn-rounded btn-secondary"><i class="mdi mdi-refresh"></i></button>' +
											'</div> ' +

											'<div class="col-sm-2">' +
											'<select data-ng-model="tableData.limit" ng-change="selectTotal()" class="form-control form-control-sm" style="width: 80px" data-ng-options="limit for limit in limitOption"></select>' +
											'</div> ' +

											'<div class="col-sm-9" style="padding-top: 10px">' +
											'<span>' +
											'Displaying topics <span id="paging_start">0</span> - <span id="paging_limit">0</span> of <span id="paging_total">0</span>' +
											'</span>' +
											'</div> ' +

											'</div> ' +
											'</div> ' +
											'<div class="col-md-6 pull-right" style="text-align:right">' +
											'</div> ' +

											'</div> ' +
											'</div>';

										var footerElCompile = $compile(footerEl)(scope);
										tableContent.after(footerElCompile);
									}
								}
							}, true);
						}
					});

				},
				controller: function($scope, $timeout, $element, $filter) {

					$scope.$watch('tableData', function(tableData) {

						$scope.data_loading = false;
						var el = $($element[0]);
						var tableEL = $($element[0]).find("table");
						var tableContent = $($element[0]).find(".table-responsive");

						var params = {
							limit: $scope.tableData.limit,
							start: $scope.tableData.start,
							page: $scope.tableData.page,
							sorting: $scope.sorting,
							params: $scope.tableData.params,
							search: $scope.tableData.search.data
						};

						if (tableData.emptyData) {
							(function getTableData() {

								$timeout(function() {
									$scope.tableData.data = [];
									$scope.tableData.total = 0;

									$(".message-loading").remove();
									if ($scope.tableData.data.length == 0) {
										var emptyEl = angular.element('<message-empty></message-empty>');
										tableEL.after(emptyEl);
										$compile(emptyEl)($scope);
									}
								}, 0);
							})();
						} else {
							(function getTableData() {

								$http({ method: 'GET', url: $scope.tableData.url, params: params }).then(function(result) {
									$timeout(function() {
										$scope.tableData.data = result.data.tableResult;
										$scope.tableData.total = result.data.total;

										$(".message-loading").remove();
										if ($scope.tableData.data.length == 0) {
											var emptyEl = angular.element('<message-empty></message-empty>');
											tableEL.after(emptyEl);
											$compile(emptyEl)($scope);
										}
									}, 0);
								}, function(result) {
									console.log(result);
								});
							})();
						}

						$scope.pagingClick = function(paging_number) {

							if (!$scope.data_loading) {
								$scope.data_loading = true
							} else {
								return false;
							}

							if (paging_number.active) {
								return false;
							} else {
								$scope.pagingActive = paging_number;
								$scope.tableData.data = [];

								var loadingEl = angular.element('<message-loading></message-loading>');
								$(tableEL).after(loadingEl);
								$compile(loadingEl)($scope);

								var th = tableEL.find("thead").find("th");
								th.each(function() {
									if ($(this).children().attr('type') == 'checkbox') {
										$(this).children().prop('checked', false);
									}
								});

								angular.forEach($scope.arrayPaging, function(paging) {
									paging.active = false;
								});
								paging_number.active = true;

								if (paging_number.number == 1) {
									$scope.tableData.start = 0;
								} else {
									var start = (paging_number.number - 1) * $scope.tableData.limit;
									$scope.tableData.start = start;
								}

								var params = {
									limit: $scope.tableData.limit,
									start: $scope.tableData.start,
									page: paging_number.number - 1,
									sorting: $scope.sorting,
									params: $scope.tableData.params,
									search: $scope.tableData.search
								};

								$http({ method: 'GET', url: $scope.tableData.url, params: params }).then(function(result) {

									$timeout(function() {
										$scope.tableData.data = result.data.tableResult;
										$scope.tableData.total = result.data.total;

										$("#table_footer").find("#paging_start").text($scope.tableData.start + 1);
										var limitPaging = ($scope.tableData.start) + $scope.tableData.limit;
										if (limitPaging > $scope.tableData.total) {
											$("#table_footer").find("#paging_limit").text($scope.tableData.total);
										} else {
											$("#table_footer").find("#paging_limit").text(limitPaging);
										};

										$("#table_footer").find("#paging_total").text($scope.tableData.total);

										$(".message-loading").remove();
										$scope.data_loading = false;
									}, 0);

								}, function(result) {
									alert("Error: No data returned");
								});
							}
						};


						$scope.pagingFirst = function() {

							if ($scope.pagingActive.number == 1) {
								return false;
							} else {

								if (!$scope.data_loading) {
									$scope.data_loading = true
								} else {
									return false;
								}

								$scope.arrayPaging = [];
								var pagingCount = Math.ceil($scope.tableData.total / $scope.tableData.limit);
								for (var i = 0; i < pagingCount; i++) {

									if (pagingCount > 5) {

										if (i > 4) {
											break;
										} else {
											var pagingObject = {
												number: i + 1,
												active: i == 0 ? true : false
											};
										}
										$scope.arrayPaging.push(pagingObject);

									} else {
										var pagingObject = {
											number: i + 1,
											active: i == 0 ? true : false
										};
										$scope.arrayPaging.push(pagingObject);
									}
								}

								$scope.pagingActive = $scope.arrayPaging[0];

								//get ajax data
								$scope.tableData.data = [];
								var loadingEl = angular.element('<message-loading></message-loading>');
								$(tableEL).after(loadingEl);
								$compile(loadingEl)($scope);

								if ($scope.pagingActive.number == 1) {
									$scope.tableData.start = 0;
								} else {
									var start = ($scope.pagingActive.number - 1) * $scope.tableData.limit;
									$scope.tableData.start = start;
								}

								var params = {
									limit: $scope.tableData.limit,
									start: $scope.tableData.start,
									page: 0,
									sorting: $scope.sorting,
									params: $scope.tableData.params,
									search: $scope.tableData.search
								};

								$http({ method: 'GET', url: $scope.tableData.url, params: params }).then(function(result) {

									$timeout(function() {
										$scope.tableData.data = result.data.tableResult;
										$scope.tableData.total = result.data.total;

										$("#table_footer").find("#paging_start").text($scope.tableData.start + 1);
										var limitPaging = ($scope.tableData.start) + $scope.tableData.limit;
										if (limitPaging > $scope.tableData.total) {
											$("#table_footer").find("#paging_limit").text($scope.tableData.total);
										} else {
											$("#table_footer").find("#paging_limit").text(limitPaging);
										};

										$("#table_footer").find("#paging_total").text($scope.tableData.total);

										$(".message-loading").remove();
										$scope.data_loading = false;
									}, 0);

								}, function(result) {
									alert("Error: No data returned");
								});
							}
						}

						$scope.pagingPrev = function() {

							if ($scope.pagingActive.number == 1) {
								return false
							} else {

								if (!$scope.data_loading) {
									$scope.data_loading = true
								} else {
									return false;
								}

								angular.forEach($scope.arrayPaging, function(value) {
									value.active = false;
								});

								var prevPaging = $filter('filter')($scope.arrayPaging, { number: $scope.pagingActive.number - 1 })[0];
								if (prevPaging != undefined) {
									prevPaging.active = true;
									$scope.pagingActive = prevPaging;
								} else {
									$scope.arrayPaging[0].active = true;
									$scope.pagingActive = $scope.arrayPaging[0];
									angular.forEach($scope.arrayPaging, function(value, index) {
										value.number = value.number - 1;
									});
								}
							}

							//get ajax data
							$scope.tableData.data = [];
							var loadingEl = angular.element('<message-loading></message-loading>');
							$(tableEL).after(loadingEl);
							$compile(loadingEl)($scope);

							if ($scope.pagingActive.number == 1) {
								$scope.tableData.start = 0;
							} else {
								var start = ($scope.pagingActive.number - 1) * $scope.tableData.limit;
								$scope.tableData.start = start;
							}

							var params = {
								limit: $scope.tableData.limit,
								start: $scope.tableData.start,
								page: $scope.pagingActive.number - 1,
								sorting: $scope.sorting,
								params: $scope.tableData.params,
								search: $scope.tableData.search
							};

							$http({ method: 'GET', url: $scope.tableData.url, params: params }).then(function(result) {

								$timeout(function() {
									$scope.tableData.data = result.data.tableResult;
									$scope.tableData.total = result.data.total;

									$("#table_footer").find("#paging_start").text($scope.tableData.start + 1);
									var limitPaging = ($scope.tableData.start) + $scope.tableData.limit;
									if (limitPaging > $scope.tableData.total) {
										$("#table_footer").find("#paging_limit").text($scope.tableData.total);
									} else {
										$("#table_footer").find("#paging_limit").text(limitPaging);
									};

									$("#table_footer").find("#paging_total").text($scope.tableData.total);

									$(".message-loading").remove();
									$scope.data_loading = false;
								}, 0);

							}, function(result) {
								alert("Error: No data returned");
							});

						}

						$scope.pagingNext = function() {

							var pagingCount = Math.ceil($scope.tableData.total / $scope.tableData.limit);

							if (pagingCount == ($scope.pagingActive.number)) {
								return false;
							} else {

								if (!$scope.data_loading) {
									$scope.data_loading = true
								} else {
									return false;
								}

								angular.forEach($scope.arrayPaging, function(value) {
									value.active = false;
								});

								var nextPaging = $filter('filter')($scope.arrayPaging, { number: $scope.pagingActive.number + 1 })[0];
								if (nextPaging != undefined) {
									nextPaging.active = true;
									$scope.pagingActive = nextPaging;
								} else {
									$scope.arrayPaging[4].active = true;
									$scope.pagingActive = $scope.arrayPaging[4];
									angular.forEach($scope.arrayPaging, function(value, index) {
										value.number = value.number + 1;
									});
								}
							}

							//get ajax data
							$scope.tableData.data = [];
							var loadingEl = angular.element('<message-loading></message-loading>');
							$(tableEL).after(loadingEl);
							$compile(loadingEl)($scope);

							if ($scope.pagingActive.number == 1) {
								$scope.tableData.start = 0;
							} else {
								var start = ($scope.pagingActive.number - 1) * $scope.tableData.limit;
								$scope.tableData.start = start;
							}

							var params = {
								limit: $scope.tableData.limit,
								start: $scope.tableData.start,
								page: $scope.pagingActive.number - 1,
								sorting: $scope.sorting,
								params: $scope.tableData.params,
								search: $scope.tableData.search
							};

							$http({ method: 'GET', url: $scope.tableData.url, params: params }).then(function(result) {

								$timeout(function() {
									$scope.tableData.data = result.data.tableResult;
									$scope.tableData.total = result.data.total;

									$("#table_footer").find("#paging_start").text($scope.tableData.start + 1);
									var limitPaging = ($scope.tableData.start) + $scope.tableData.limit;
									if (limitPaging > $scope.tableData.total) {
										$("#table_footer").find("#paging_limit").text($scope.tableData.total);
									} else {
										$("#table_footer").find("#paging_limit").text(limitPaging);
									};

									$("#table_footer").find("#paging_total").text($scope.tableData.total);

									$(".message-loading").remove();
									$scope.data_loading = false;
								}, 0);

							}, function(result) {
								alert("Error: No data returned");
							});

						}

						$scope.pagingLast = function() {

							var pagingCount = Math.ceil($scope.tableData.total / $scope.tableData.limit);
							if (pagingCount == $scope.pagingActive.number) {
								return false
							} else {

								if (!$scope.data_loading) {
									$scope.data_loading = true
								} else {
									return false;
								}

								$scope.arrayPaging = [];
								for (var a = pagingCount; a > 0; --a) {

									if (pagingCount > 5) {
										if (a < (pagingCount - 4)) {
											break;
										} else {
											var pagingObject = {
												number: a,
												active: a == pagingCount ? true : false
											};
										}
										$scope.arrayPaging.unshift(pagingObject);

									} else {
										var pagingObject = {
											number: a,
											active: a == pagingCount ? true : false
										};
										$scope.arrayPaging.unshift(pagingObject);
									}
								}

								$scope.pagingActive = $scope.arrayPaging[$scope.arrayPaging.length - 1];

								//get ajax data
								$scope.tableData.data = [];
								var loadingEl = angular.element('<message-loading></message-loading>');
								$(tableEL).after(loadingEl);
								$compile(loadingEl)($scope);

								if ($scope.pagingActive.number == 1) {
									$scope.tableData.start = 0;
								} else {
									var start = ($scope.pagingActive.number - 1) * $scope.tableData.limit;
									$scope.tableData.start = start;
								}

								var params = {
									limit: $scope.tableData.limit,
									start: $scope.tableData.start,
									page: pagingCount - 1,
									sorting: $scope.sorting,
									params: $scope.tableData.params,
									search: $scope.tableData.search
								};

								$http({ method: 'GET', url: $scope.tableData.url, params: params }).then(function(result) {

									$timeout(function() {
										$scope.tableData.data = result.data.tableResult;
										$scope.tableData.total = result.data.total;

										$("#table_footer").find("#paging_start").text($scope.tableData.start + 1);
										var limitPaging = ($scope.tableData.start) + $scope.tableData.limit;
										if (limitPaging > $scope.tableData.total) {
											$("#table_footer").find("#paging_limit").text($scope.tableData.total);
										} else {
											$("#table_footer").find("#paging_limit").text(limitPaging);
										};

										$("#table_footer").find("#paging_total").text($scope.tableData.total);

										$(".message-loading").remove();
										$scope.data_loading = false;
									}, 0);

								}, function(result) {
									alert("Error: No data returned");
								});
							}
						}

						$scope.btnSorting = function($event, index) {

							if (!$scope.data_loading) {
								$scope.data_loading = true
							} else {
								return false;
							}

							$scope.sorting.status = true;
							$scope.tableData.data = [];

							var loadingEl = angular.element('<message-loading></message-loading>');
							$(tableEL).after(loadingEl);
							$compile(loadingEl)($scope);

							var th = tableEL.find("thead").find("th");
							th.each(function() {
								if ($(this).children().attr('type') == 'checkbox') {
									$(this).children().prop('checked', false);
								}
							});

							var el = $event.currentTarget;
							var th = $(tableEL).find("thead").find("th");
							var sortBy;
							th.each(function() {
								if (th.index(this) == index) {
									sortBy = $(this).attr("sortBy");
									$scope.sorting.key = sortBy;
								};

								var icon = $(this).find("i");
								if (!$(this).find("a").is($(el))) {
									if (icon.hasClass('fa-sort-asc')) {
										icon.removeClass('fa-sort-asc');
										icon.addClass('fa-sort');
									} else if (icon.hasClass('fa-sort-desc')) {
										icon.removeClass('fa-sort-desc');
										icon.addClass('fa-sort');
									}
								} else {
									$scope.sorting.key = sortBy;
									if (icon.hasClass('fa-sort')) {
										icon.removeClass('fa-sort');
										icon.addClass('fa-sort-asc');
										$scope.sorting.type = 'asc';
									} else if (icon.hasClass('fa-sort-asc')) {
										icon.removeClass('fa-sort-asc');
										icon.addClass('fa-sort-desc');
										sortBy = "-" + sortBy;
										$scope.sorting.type = 'desc';
									} else if (icon.hasClass('fa-sort-desc')) {
										icon.removeClass('fa-sort-desc');
										icon.addClass('fa-sort-asc');
										$scope.sorting.type = 'asc';
									}
								}
							});

							var params = {
								limit: $scope.tableData.limit,
								start: $scope.tableData.start,
								sorting: $scope.sorting,
								params: $scope.tableData.params,
								search: $scope.tableData.search
							};

							$http({ method: 'GET', url: $scope.tableData.url, params: params }).then(function(result) {
								$timeout(function() {
									var dataTable = result.data.tableResult;
									if (dataTable.length > 0) {
										var firstData = dataTable[0];
										$scope.tableData.data = result.data.tableResult;
										$scope.tableData.total = result.data.total;
									}

									$("#table_footer").find("#paging_start").text($scope.tableData.start + 1);
									var limitPaging = ($scope.tableData.start) + $scope.tableData.limit;
									if (limitPaging > $scope.tableData.total) {
										$("#table_footer").find("#paging_limit").text($scope.tableData.total);
									} else {
										$("#table_footer").find("#paging_limit").text(limitPaging);
									};

									$("#table_footer").find("#paging_total").text($scope.tableData.total);


									$(".message-loading").remove();
									$scope.data_loading = false;
								}, 0);
							}, function(result) {
								alert("Error: No data returned");
							});
						};

						$scope.selectTotal = function() {

							if (!$scope.data_loading) {
								$scope.data_loading = true
							} else {
								return false;
							}

							if ($('.message-empty')[0] != undefined) {
								$('.message-empty').remove();
							}

							$scope.tableData.data = [];
							$("#paging_table").remove();

							var loadingEl = angular.element('<message-loading></message-loading>');
							$(tableEL).after(loadingEl);
							$compile(loadingEl)($scope);

							var th = tableEL.find("thead").find("th");
							th.each(function() {
								if ($(this).children().attr('type') == 'checkbox') {
									$(this).children().prop('checked', false);
								}
							});

							$scope.tableData.start = 0;

							var params = {
								limit: $scope.tableData.limit,
								start: $scope.tableData.start,
								page: 0,
								sorting: $scope.sorting,
								params: $scope.tableData.params,
								search: $scope.tableData.search
							};

							$http({ method: 'GET', url: $scope.tableData.url, params: params }).then(function(result) {
								$timeout(function() {
									$scope.tableData.data = $filter('orderBy')(result.data.tableResult, $scope.sorting.key);
									$scope.tableData.total = result.data.total;
									$scope.tableData.start = 0;
									var th = $(tableEL).find("thead").find("th");
									th.each(function() {
										var icon = $(this).find("i");
										if (icon.hasClass('fa-sort-asc')) {
											icon.removeClass('fa-sort-asc');
											icon.addClass('fa-sort');
										} else if (icon.hasClass('fa-sort-desc')) {
											icon.removeClass('fa-sort-desc');
											icon.addClass('fa-sort');
										}
									});
									$scope.sorting.status = false;
									$scope.sorting.key = null;

									$(".message-loading").remove();
									$scope.data_loading = false;
								}, 0);
							}, function(result) {
								alert("Error: No data returned");
							});
						};

						function refresh() {

							if (!$scope.data_loading) {
								$scope.data_loading = true
							} else {
								return false;
							}

							$scope.tableData.validForm = true;
							$scope.tableData.refresh = true;

							if ($('.message-empty')[0] != undefined) {
								$('.message-empty').remove();
							}

							var th = tableEL.find("thead").find("th");
							th.each(function() {
								if ($(this).children().attr('type') == 'checkbox') {
									$(this).children().prop('checked', false);
								}
							});

							$scope.sorting.status = false;
							$scope.sorting.key = null;

							$scope.tableData.url = $scope.tableDataTemp.url;
							$scope.tableData.data = $scope.tableDataTemp.data;
							$scope.tableData.limit = $scope.tableDataTemp.limit;
							$scope.tableData.start = $scope.tableDataTemp.start;
							$scope.tableData.page = $scope.tableDataTemp.page;

							$scope.tableData.data = [];
							$("#paging_table").remove();

							var loadingEl = angular.element('<message-loading></message-loading>');
							$(tableEL).after(loadingEl);
							$compile(loadingEl)($scope);

							$scope.tableData.search.status = false;
							$scope.tableData.search.data = null;

							var params = {
								limit: $scope.tableData.limit,
								start: $scope.tableData.start,
								page: $scope.tableData.page,
								sorting: $scope.sorting,
								params: $scope.tableData.params,
								search: $scope.tableData.search
							};

							if ($scope.tableData.emptyData) {
								$timeout(function() {
									$scope.tableData.data = [];
									$scope.tableData.total = 0;
									var th = $(tableEL).find("thead").find("th");
									th.each(function() {
										var icon = $(this).find("i");
										if (icon.hasClass('fa-sort-asc')) {
											icon.removeClass('fa-sort-asc');
											icon.addClass('fa-sort');
										} else if (icon.hasClass('fa-sort-desc')) {
											icon.removeClass('fa-sort-desc');
											icon.addClass('fa-sort');
										}
									});

									$(".message-loading").remove();
									if ($scope.tableData.data.length == 0) {
										var emptyEl = angular.element('<message-empty></message-empty>');
										tableEL.after(emptyEl);
										$compile(emptyEl)($scope);
									}

									$scope.tableData.refresh = false;
									$scope.data_loading = false;

								}, 0);
							} else {
								$http({ method: 'GET', url: $scope.tableData.url, params: params }).then(function(result) {
									$timeout(function() {
										$scope.tableData.data = result.data.tableResult;
										$scope.tableData.total = result.data.total;
										var th = $(tableEL).find("thead").find("th");
										th.each(function() {
											var icon = $(this).find("i");
											if (icon.hasClass('fa-sort-asc')) {
												icon.removeClass('fa-sort-asc');
												icon.addClass('fa-sort');
											} else if (icon.hasClass('fa-sort-desc')) {
												icon.removeClass('fa-sort-desc');
												icon.addClass('fa-sort');
											}
										});

										$(".message-loading").remove();
										if ($scope.tableData.data.length == 0) {
											var emptyEl = angular.element('<message-empty></message-empty>');
											tableEL.after(emptyEl);
											$compile(emptyEl)($scope);
										}

										$scope.tableData.refresh = false;
										$scope.data_loading = false;

									}, 0);
								}, function(result) {
									alert("Error: No data returned");
								});
							}
						}

						$scope.btnRefresh = function() {
							refresh();
							$('.message-error').remove();
						};

						$scope.$watch("tableData.search.status", function(searchStatus) {
							if (searchStatus) {

								if (!$scope.data_loading) {
									$scope.data_loading = true
								} else {
									return false;
								}

								if ($('.message-empty')[0] != undefined) {
									$('.message-empty').remove();
								}

								$scope.tableData.data = [];
								$("#paging_table").remove();

								var loadingEl = angular.element('<message-loading></message-loading>');
								tableEL.after(loadingEl);
								$compile(loadingEl)($scope);

								var th = tableEL.find("thead").find("th");
								th.each(function() {
									if ($(this).children().attr('type') == 'checkbox') {
										$(this).children().prop('checked', false);
									}
								});

								$scope.tableData.start = 0;

								var params = {
									limit: $scope.tableData.limit,
									start: $scope.tableData.start,
									page: 0,
									sorting: $scope.sorting,
									params: $scope.tableData.params,
									search: $scope.tableData.search
								};

								$http({ method: 'GET', url: $scope.tableData.url, params: params }).then(function(result) {
									$timeout(function() {

										if (result.data.success) {
											$scope.tableData.data = result.data.tableResult;
											$scope.tableData.total = result.data.total;
											$(".message-loading").remove();
											if ($scope.tableData.data.length == 0) {
												var emptyEl = angular.element('<message-empty></message-empty>');
												tableEL.after(emptyEl);
												$compile(emptyEl)($scope);
											}

											$scope.tableData.search.status = false;
											$scope.data_loading = false;
										} else {
											window.location.href = '../';
										}

									}, 0);
								}, function(result) {
									$scope.tableData.search.status = false;
									console.log(result);
								});
							}
						});


						$scope.$watch("tableData.action.add", function(actionAdd) {
							if (actionAdd) {
								$scope.tableData.total = $scope.tableData.total + 1;
								$("#paging_table").find("#paging_total").text($scope.tableData.total);

								var currentPagingCount = Math.ceil(($scope.tableData.total - 1) / $scope.tableData.limit);
								var nextPagingCount = Math.ceil($scope.tableData.total / $scope.tableData.limit);
								if (nextPagingCount > currentPagingCount) {
									var pagingObject = {
										number: $scope.arrayPaging.length + 1,
										active: false
									};
									$scope.arrayPaging.push(pagingObject);
								}

								$scope.tableData.action.add = false;
							}
						});

						$scope.$watch("tableData.action.remove", function(actionRemove) {
							if (actionRemove) {
								refresh();
								$('.message-error').remove();
								$scope.tableData.action.remove = false;
							}
						});
					});
				}
			};
		});
});