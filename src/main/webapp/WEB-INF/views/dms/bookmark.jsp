<!DOCTYPE html>
<html lang="en">
<jsp:include page="partials/head.jsp" />
<body data-ng-controller="bookmarkController">
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
										<i class="mdi mdi-bookmark menu-icon text-primary"></i>
										Bookmark
									</h4>

									<form class="forms-sample"
										style="margin-top: 30px; margin-bottom: 30px">
										<div class="form-group row">
											<label for="inputDocumentName"
												class="col-sm-2 col-form-label">Document Name</label>
											<div class="col-sm-4">
												<input type="text" class="form-control form-control-sm"
													data-ng-model="tableData.search.data.documentName"
													placeholder="Document Name">
											</div>
										</div>
										<div class="form-group row">
											<label for="inputDocumentNumber"
												class="col-sm-2 col-form-label">Document Number</label>
											<div class="col-sm-4">
												<input type="text" class="form-control form-control-sm"
													data-ng-model="tableData.search.data.documentNumber"
													placeholder="Document Number">
											</div>
										</div>
										<div class="form-group row">
											<label for="inputDocumentType"
												class="col-sm-2 col-form-label">Document Type</label>
											<div class="col-sm-4">
												<input type="text" class="form-control form-control-sm"
													data-ng-model="tableData.search.data.documentType"
													placeholder="Document Type">
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
										</div>
									</form>

									<div master-table table-data="tableData">
										<div style="overflow-x: auto !important;"
											class="table-responsive col-md-12 no-padding">
											<table
												class="table table-striped table-hover table-bordered no-margin">
												<thead>
													<tr>
														<th class="text-center column-10">Document Name</th>
														<th class="text-center column-10">Document Number</th>
														<th class="text-center column-10">Document Type</th>
														<th class="text-center column-10">Created Date</th>
														<th class="text-center column-10">Created By</th>
														<th class="text-center column-10">Modified Date</th>
														<th class="text-center column-10">Modified By</th>
														<th class="text-center column-10">Action</th>
													</tr>
												</thead>
												<tbody data-ng-cloak>
													<tr data-ng-repeat="doc in tableData.data">
														<td class="column-10 text-left"><span
															data-ng-show="doc.documentName != null">{{doc.documentName}}</span>
															<span data-ng-show="doc.documentName == null">-</span></td>
														<td class="column-10 text-left"><span
															data-ng-show="doc.documentNumber != null">{{doc.documentNumber}}</span>
															<span data-ng-show="doc.documentNumber  == null">-</span>
														</td>
														<td class="column-10 text-left"><span
															data-ng-show="doc.documentType != null">{{doc.documentType}}</span>
															<span data-ng-show="doc.documentType  == null">-</span></td>
														<td class="column-10 text-left"><span
															data-ng-show="doc.createdDate != null">{{doc.createdDate
																| date : "dd/MM/yyyy" }}</span> <span
															data-ng-show="doc.createdDate  == null">-</span></td>
														<td class="column-10 text-left"><span
															data-ng-show="doc.createdBy != null">{{doc.createdBy}}</span>
															<span data-ng-show="doc.createdBy  == null">-</span></td>
														<td class="column-10 text-left"><span
															data-ng-show="doc.modifiedDate != null">{{doc.modifiedDate
																| date : "dd/MM/yyyy" }}</span> <span
															data-ng-show="doc.modifiedDate  == null">-</span></td>
														<td class="column-10 text-left"><span
															data-ng-show="doc.modifiedBy != null">{{doc.modifiedBy}}</span>
															<span data-ng-show="doc.modifiedBy  == null">-</span></td>
														<td class="column-10 text-center">															
															<button type="button"
																data-ng-click="removeBookmark(doc.documentId)"
																class="btn btn-rounded btn-success btn-sm btn-icon">
																<i class="mdi mdi-bookmark-remove"></i>
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

<script type="text/ng-template" id="removeBookmark.html">
<div class="modal fade" tabindex="-1" role="dialog" id="modalBookmark">
	<div class="modal-dialog " role="document">
		<div class="modal-content">
			<div class="modal-header text-left">
				<h4>
					<i class="mdi mdi-bookmark menu-icon text-dark"></i> Remove Bookmark
				</h4>
			</div>
			<form name="hierarchyForm" class="form-horizontal">
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12 text-center"
							data-ng-show="display.confirm">
							<div class="col-md-12">Are you sure you want to remove this Bookmark?</div>
						</div>
						<message-loading data-ng-show="display.loading"></message-loading>
						<message-error data-ng-show="display.error"></message-error>
					</div>
				</div>
			</form>
			<div class="modal-footer" data-ng-hide="display.loading">
				<div data-ng-show="display.confirm">
					<button "type="button" data-ng-click="btnRemoveBookmark()"
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