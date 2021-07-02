<!DOCTYPE html>
<html lang="en">
<jsp:include page="partials/head.jsp" />
<body data-ng-controller="newsController">
	<div class="container-scroller">
		<!-- partial:partials/_navbar.html -->
		<jsp:include page="partials/navbar.jsp" />
		<!-- partial -->
		<div class="container-fluid page-body-wrapper">
			<!-- partial:partials/_sidebar.html -->
			<jsp:include page="partials/sidebar.jsp" />
			<!-- partial -->
			<div class="main-panel">
				<div class="content-wrapper">
					<div class="row">
						<div class="col-md-12 stretch-card">
							<div class="card">
								<div class="card-body">
									<h4>
										<i class="mdi mdi-newspaper menu-icon text-primary"></i>
										News List
									</h4>

									<form class="forms-sample"
										style="margin-top: 20px; margin-bottom: 20px">
										<div class="form-group row">
											<label for="inputNewsTitle"
												class="col-sm-2 col-form-label">News Title</label>
											<div class="col-sm-4">
												<input type="text" class="form-control form-control-sm"
													data-ng-model="tableData.search.data.newsTitle"
													placeholder="News Title">
											</div>
										</div>
										<div class="form-group row">
											<label for="inputNewsNumber"
												class="col-sm-2 col-form-label">News Number</label>
											<div class="col-sm-4">
												<input type="text" class="form-control form-control-sm"
													data-ng-model="tableData.search.data.newsNumber"
													placeholder="News Number">
											</div>
										</div>
										<div class="form-group row">
											<label for="inputNewsInformation"
												class="col-sm-2 col-form-label">News Information</label>
											<div class="col-sm-4">
												<input type="text" class="form-control form-control-sm"
													data-ng-model="tableData.search.data.newsInformation"
													placeholder="News Information">
											</div>
										</div>
										<div class="form-group row">
											<div class="col-sm-6" style="text-align: right">
												<button type="submit"
													class="btn btn-rounded btn-sm btn-primary"
													data-ng-click="btnSearch()">
													<i class="mdi mdi-magnify"></i> Search
												</button>
											</div>
											<div class="col-sm-6" style="text-align: right">
												<button type="submit"
													class="btn btn-rounded btn-sm btn-success"
													data-ng-click="insertNews()">
													<i class="mdi mdi-upload"></i> New Insert News
												</button>
											</div>
										</div>
									</form>

									<div master-table table-data="tableData">
										<div style="overflow-x: auto !important;"
											class="table-responsive col-md-12 no-padding">
											<table
												class="table table-striped table-hover table-bordered no-margin">
												<thead>
													<tr>
														<th class="text-center column-10">News Title</th>
														<th class="text-center column-10">News Number</th>
														<th class="text-center column-10">News Information</th>
														<th class="text-center column-10">Created Date</th>
														<th class="text-center column-10">Created By</th>
														<th class="text-center column-10">Modified Date</th>
														<th class="text-center column-10">Modified By</th>
														<th class="text-center column-10">Action</th>
													</tr>
												</thead>
												<tbody data-ng-cloak>
													<tr data-ng-repeat="nws in tableData.data">
														<td class="column-10 text-left"><span
															data-ng-show="nws.newsTitle != null">{{nws.newsTitle}}</span>
															<span data-ng-show="nws.newsTitle == null">-</span></td>
														<td class="column-10 text-left"><span
															data-ng-show="nws.newsNumber != null">{{nws.newsNumber}}</span>
															<span data-ng-show="nws.newsNumber  == null">-</span>
														</td>
														<td class="column-10 text-left"><span
															data-ng-show="nws.newsInformation != null">{{nws.newsInformation}}</span>
															<span data-ng-show="nws.newsInformation  == null">-</span></td>
														<td class="column-10 text-left"><span
															data-ng-show="nws.createdDate != null">{{nws.createdDate
																| date : "dd/MM/yyyy" }}</span> <span
															data-ng-show="nws.createdDate  == null">-</span></td>
														<td class="column-10 text-left"><span
															data-ng-show="nws.createdBy != null">{{nws.createdBy}}</span>
															<span data-ng-show="nws.createdBy  == null">-</span></td>	
														<td class="column-10 text-left"><span
															data-ng-show="nws.modifiedDate != null">{{nws.modifiedDate
																| date : "dd/MM/yyyy" }}</span> <span
															data-ng-show="nws.modifiedDate  == null">-</span></td>
														<td class="column-10 text-left"><span
															data-ng-show="nws.modifiedBy != null">{{nws.modifiedBy}}</span>
															<span data-ng-show="nws.modifiedBy  == null">-</span></td>
														<td class="column-10 text-center">
															<button type="button"
																data-ng-click="editNews(nws)"
																class="btn btn-rounded btn-info btn-sm btn-icon">
																<i class="mdi mdi mdi-pencil-box-outline"></i>
															</button>
															<button type="button"
																data-ng-click="deleteNews(nws.newsId)"
																class="btn btn-rounded btn-danger btn-sm btn-icon">
																<i class="mdi mdi-delete-forever"></i>
															</button>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- content-wrapper ends -->

<script type="text/ng-template" id="insertNews.html">  
<div class="modal fade" tabindex="-1" role="dialog" id="modalInsert">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			 <div class="modal-header text-left">
                  <h4><i class="mdi mdi-newspaper menu-icon text-dark"></i>
						Input News
				  </h4>
              </div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md-12" data-ng-show="display.form">   
						<form name="newsForm" class="form-horizontal"
							style="margin-top: 30px; margin-bottom: 30px">
							<div class="form-group row">
								<label for="inputNewsTitle"
									class="col-sm-3 col-form-label">News Title</label>
								<div class="col-sm-9">
									<input type="text" class="form-control form-control-sm"
										data-ng-model="newsData.newsTitle" name="newsTitle"
										placeholder="News Title" required />
									<div data-ng-cloak data-ng-show="newsForm.newsTitle.$error.required && submitted" class="col-xs-12 msg-error"><i class="mdi mdi-close-circle"></i> Please, fill this field </div>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputNewsNumber"
									class="col-sm-3 col-form-label">News Number</label>
								<div class="col-sm-9">
									<input type="text" class="form-control form-control-sm"
										data-ng-model="newsData.newsNumber" name="newsNumber"
										placeholder="News Number" required />
									<div data-ng-cloak data-ng-show="newsForm.newsNumber.$error.required && submitted" class="col-xs-12 msg-error"><i class="mdi mdi-close-circle"></i> Please, fill this field </div>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputNewsInformation"
									class="col-sm-3 col-form-label">News Information</label>
								<div class="col-sm-9">
									<input type="text" class="form-control form-control-sm"
										data-ng-model="newsData.newsInformation" name="newsInformation"
										placeholder="News Information" required />
									<div data-ng-cloak data-ng-show="newsForm.newsInformation.$error.required && submitted" class="col-xs-12 msg-error"><i class="mdi mdi-close-circle"></i> Please, fill this field </div>
								</div>
							</div>
						</form>
				    </div>
					<div class="col-md-12 text-center" data-ng-show="display.confirm">
						<span>Are you sure you want to save this News Form data?</span>
					</div>
					<message-loading data-ng-show="display.loading"></message-loading>
					<message-error data-ng-show="display.error"></message-error>
				</div>
			</div>
			<div class="modal-footer" data-ng-hide="display.loading">
				<div data-ng-show="display.form">
					<button data-ng-click="btnSave()" type="button"
						class="btn btn-rounded btn-primary btn-sm">
						<i class="mdi mdi-file-check"></i> Save
					</button>
					<button type="button" class="btn btn-rounded btn-danger btn-sm"
						data-dismiss="modal">
						<i class="mdi mdi-close"></i> Close
					</button>
				</div>
				<div data-ng-show="display.confirm">
					<button data-ng-click="btnYes()" type="button"
						class="btn btn-rounded btn-primary btn-sm">
						<i class="mdi mdi-check"></i> Yes
					</button>
					<button data-ng-click="btnNo()" type="button"
						class="btn btn-rounded btn-danger btn-sm">
						<i class="mdi mdi-close"></i> No
					</button>
				</div>
				<div data-ng-show="display.error">
					<button type="button" class="btn btn-rounded btn-danger btn-sm"
						data-dismiss="modal">
						<i class="mdi mdi-close"></i> Close
					</button>
				</div>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
</script>

<script type="text/ng-template" id="editNews.html">  
<div class="modal fade" tabindex="-1" role="dialog" id="modalEdit">
	<div class="modal-dialog modal-lg" role="news">
		<div class="modal-content">
			 <div class="modal-header text-left">
                  <h4><i class="mdi mdi-pencil-box-outline menu-icon text-dark"></i>
						Edit News
				  </h4>
              </div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md-12" data-ng-show="display.form">   
						<form name="newsForm" class="form-horizontal"
							style="margin-top: 30px; margin-bottom: 30px">
							<div class="form-group row">
								<label for="inputNewsTitle"
									class="col-sm-3 col-form-label">News Title</label>
								<div class="col-sm-9">
									<input type="text" class="form-control form-control-sm"
										data-ng-model="newsData.newsTitle" name="newsTitle"
										placeholder="News Title" required />
									<div data-ng-cloak data-ng-show="newsForm.newsTitle.$error.required && submitted" class="col-xs-12 msg-error"><i class="mdi mdi-close-circle"></i> Please, fill this field </div>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputNewsNumber"
									class="col-sm-3 col-form-label">News Number</label>
								<div class="col-sm-9">
									<input type="text" class="form-control form-control-sm"
										data-ng-model="newsData.newsNumber" name="newsNumber"
										placeholder="News Number" required />
									<div data-ng-cloak data-ng-show="newsForm.newsNumber.$error.required && submitted" class="col-xs-12 msg-error"><i class="mdi mdi-close-circle"></i> Please, fill this field </div>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputNewsInformation"
									class="col-sm-3 col-form-label">News Information</label>
								<div class="col-sm-9">
									<input type="text" class="form-control form-control-sm"
										data-ng-model="newsData.newsInformation" name="newsInformation"
										placeholder="News Information" required />
									<div data-ng-cloak data-ng-show="newsForm.newsInformation.$error.required && submitted" class="col-xs-12 msg-error"><i class="mdi mdi-close-circle"></i> Please, fill this field </div>
								</div>
							</div>
						</form>
				    </div>
					<div class="col-md-12 text-center" data-ng-show="display.confirm">
						<span>Are you sure you want to save this News Form data?</span>
					</div>
					<message-loading data-ng-show="display.loading"></message-loading>
					<message-error data-ng-show="display.error"></message-error>
				</div>
			</div>
			<div class="modal-footer" data-ng-hide="display.loading">
				<div data-ng-show="display.form">
					<button data-ng-click="btnEdit()" type="button"
						class="btn btn-rounded btn-primary btn-sm">
						<i class="mdi mdi-file-check"></i> Save
					</button>
					<button type="button" class="btn btn-rounded btn-danger btn-sm"
						data-dismiss="modal">
						<i class="mdi mdi-close"></i> Close
					</button>
				</div>
				<div data-ng-show="display.confirm">
					<button data-ng-click="btnYes()" type="button"
						class="btn btn-rounded btn-primary btn-sm">
						<i class="mdi mdi-check"></i> Yes
					</button>
					<button data-ng-click="btnNo()" type="button"
						class="btn btn-rounded btn-danger btn-sm">
						<i class="mdi mdi-close"></i> No
					</button>
				</div>
				<div data-ng-show="display.error">
					<button type="button" class="btn btn-rounded btn-danger btn-sm"
						data-dismiss="modal">
						<i class="mdi mdi-close"></i> Close
					</button>
				</div>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
</script>

<script type="text/ng-template" id="deleteNews.html">
<div class="modal fade" tabindex="-1" role="dialog" id="modalDelete">
	<div class="modal-dialog " role="news">
		<div class="modal-content">
			<div class="modal-header text-left">
				<h4>
					<i class="mdi mdi-delete-forever menu-icon text-dark"></i> Delete
					News
				</h4>
			</div>
			<form name="hierarchyForm" class="form-horizontal">
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12 text-center"
							data-ng-show="display.confirm">
							<div class="col-md-12">Are you sure you want to delete
								this News Form data?</div>
						</div>
						<message-loading data-ng-show="display.loading"></message-loading>
						<message-error data-ng-show="display.error"></message-error>
					</div>
				</div>
			</form>
			<div class="modal-footer" data-ng-hide="display.loading">
				<div data-ng-show="display.confirm">
					<button "type="button" data-ng-click="btnDelete()"
						class="btn btn-rounded btn-primary btn-sm">
						<i class="mdi mdi-check"></i> Yes
					</button>
					<button data-dismiss="modal" type="button"
						class="btn btn-rounded btn-danger btn-sm" data-dismiss="modal">
						<i class="mdi mdi-close"></i> No
					</button>
				</div>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
</script>

				<!-- partial:partials/_footer.html -->
				<jsp:include page="partials/footer.jsp" />
				<!-- partial -->
			</div>
			<!-- main-panel ends -->
		</div>
		<!-- page-body-wrapper ends -->
	</div>
	<!-- container-scroller -->

	<jsp:include page="partials/end_body.jsp" />
</body>
</html>