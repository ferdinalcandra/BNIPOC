<!DOCTYPE html>
<html lang="en">
<jsp:include page="partials/head.jsp" />
<body data-ng-controller="documentCountViewController">
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
										<i class="mdi mdi-file-document menu-icon text-primary"></i>
										Document Count View
									</h4>
									
								<div master-table table-data="tableData">
										<div style="overflow-x: auto !important;"
											class="table-responsive col-md-12 no-padding">
											<table
												class="table table-striped table-hover table-bordered no-margin">
												<thead>
													<tr>
														<th class="text-center column-10">Document Name</th>
														<th class="text-center column-10">Document Number</th>
														<th class="text-center column-10">Document Count View</th>
														<th class="text-center column-10">Last View</th>
													</tr>
												</thead>
												<tbody data-ng-cloak>
													<tr data-ng-repeat="doc in tableData.data | orderBy : '-documentCountView'">
														<td class="column-10 text-left"><span
															data-ng-show="doc.documentName != null">{{doc.documentName}}</span>
														<td class="column-10 text-left"><span
															data-ng-show="doc.documentNumber != null">{{doc.documentNumber}}</span>
															</td>
														<td class="column-10 text-left"><span
															data-ng-show="doc.documentCountView != null">{{doc.documentCountView}}</span>
														</td>
														<td class="column-10 text-left"><span
															data-ng-show="doc.lastView != null">{{doc.lastView
																| date : "dd/MM/yyyy HH:mm:ss" }}</span>
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