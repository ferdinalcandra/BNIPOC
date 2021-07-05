<!DOCTYPE html>
<html lang="en">
<jsp:include page="partials/head.jsp" />
<body data-ng-controller="generateDocumentController">
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
										<i class="mdi mdi-file-pdf menu-icon text-primary"></i>
										Generate Document
									</h4>

									<form class="forms-horizontal"
										style="margin-top: 30px; margin-bottom: 30px">
										<div class="form-group row">
											<div class="col-sm-12">
												<div class="document-editor">
													<div class="toolbar-container"></div>
													<div class="content-container">
														<div id="editor"></div>
													</div>
												</div>
											</div>
										</div>
										<div class="form-group row">
											<div class="col-sm-12" style="text-align: right">
												<button type="submit"
													class="btn btn-rounded btn-sm btn-primary"
													data-ng-click="btnGeneratePdf()">
													<i class="mdi mdi-file-pdf"></i> Generate PDF
												</button>
											</div>
										</div>
									</form>

								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- content-wrapper ends -->

<script type="text/ng-template" id="generateDocument.html">
<div class="modal fade" tabindex="-1" role="dialog" id="modalGenerateDocument">
	<div class="modal-dialog " role="document">
		<div class="modal-content">
			<div class="modal-header text-left">
				<h4>
					<i class="mdi mdi-file-pdf menu-icon text-dark"></i> Generate
					Document
				</h4>
			</div>
			<form name="hierarchyForm" class="form-horizontal">
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12 text-center"
							data-ng-show="display.confirm">
							<div class="col-md-12">Are you sure you want to Generate
								this Document?</div>
						</div>
						<message-loading data-ng-show="display.loading"></message-loading>
						<message-error data-ng-show="display.error"></message-error>
					</div>
				</div>
			</form>
			<div class="modal-footer" data-ng-hide="display.loading">
				<div data-ng-show="display.confirm">
					<button "type="button" data-ng-click="btnGenerate()"
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
	
	<script
		src="${pageContext.request.contextPath}/resources/assets/vendors/ckeditor5/ckeditor.js"></script>

	<script>
		var myEditor;
		DecoupledEditor
			.create( document.querySelector( '#editor' ), {
				// toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
			} )
			.then( editor => {
				const toolbarContainer = document.querySelector( '.toolbar-container' );
	
				toolbarContainer.prepend( editor.ui.view.toolbar.element );
	
				myEditor = editor;
				
			} )
			.catch( err => {
				console.error( err.stack );
			} );
	</script>

	<jsp:include page="partials/end_body.jsp" />

	

</body>
</html>