<!DOCTYPE html>
<html lang="en">
<jsp:include page="partials/head.jsp" />
<body data-ng-controller="documentController">
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
										Document List
									</h4>

									<form  class="forms-horizontal" style="margin-top: 30px; margin-bottom: 30px">
										<div class="form-group row">
											<label for="inputDocumentName" class="col-sm-2 col-form-label">Document Name</label>
											<div class="col-sm-4">
												<input type="text" class="form-control form-control-sm" data-ng-model="tableData.search.data.documentName" placeholder="Document Name">
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
											<div class="col-sm-6" style="text-align: right">
												<button type="submit"
													class="btn btn-rounded btn-sm btn-success"
													data-ng-click="insertDocument()">
													<i class="mdi mdi-upload"></i> New Document
												</button>
												<button type="submit"
													class="btn btn-rounded btn-sm btn-success"
													data-ng-click="deleteDocument()">
													<i class="mdi mdi-delete"></i> Delete Document
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
														<th><input type="checkbox" data-ng-model="header.selectedCheck" data-ng-click="headerCheckBox()"/></th>
														<th class="text-center column-10">Document Name</th>
														<th class="text-center column-10">Document Number</th>
														<th class="text-center column-10">Document Type</th>
														<th class="text-center column-10">Created Date</th>
														 <th class="text-center column-10">Created By</th>
														<!-- <th class="text-center column-10">Modified Date</th> 
														<th class="text-center column-10">Modified By</th> -->
														<th class="text-center column-10">Action</th>
													</tr>
												</thead>
												<tbody data-ng-cloak>
													<tr data-ng-repeat="doc in tableData.data">
														<td><input data-ng-model="doc.checkStatus" type="checkbox"> </td>
														<td class="column-10 text-left"><span data-ng-show="doc.documentName != null">{{doc.documentName}}</span><span data-ng-show="doc.documentName == null">-</span></td>
														<td class="column-10 text-left"><span data-ng-show="doc.documentNumber != null">{{doc.documentNumber}}</span><span data-ng-show="doc.documentNumber  == null">-</span></td>
														<td class="column-10 text-left"><span data-ng-show="doc.documentType != null">{{doc.documentType}}</span><span data-ng-show="doc.documentType  == null">-</span></td>
														<td class="column-10 text-left"><span data-ng-show="doc.createdDate != null">{{doc.createdDate | date : "dd/MM/yyyy" }}</span> <spandata-ng-show="doc.createdDate  == null">-</span></td>
														<td class="column-10 text-left"><span data-ng-show="doc.createdBy != null">{{doc.createdBy}}</span><span data-ng-show="doc.createdBy  == null">-</span></td>
														<!-- <td class="column-10 text-left"><span data-ng-show="doc.modifiedDate != null">{{doc.modifiedDate | date : "dd/MM/yyyy" }}</span> <spandata-ng-show="doc.modifiedDate  == null">-</span></td>
														<td class="column-10 text-left"><span data-ng-show="doc.modifiedBy != null">{{doc.modifiedBy}}</span><span data-ng-show="doc.modifiedBy  == null">-</span></td> -->
														<td class="column-10 text-center">
															<!-- <button type="button"
																data-ng-click="editDocument(doc)"
																class="btn btn-rounded btn-info btn-sm btn-icon">
																<i class="mdi mdi mdi-pencil-box-outline"></i>
															</button> -->
															 <button type="button"
																data-ng-click="viewDocument(doc.documentId)"
																class="btn btn-rounded btn-danger btn-sm btn-icon">
																<i class="mdi mdi-book-open"></i>
															</button>
															<span data-ng-show="doc.bookmark == null">
																<button type="button"
																	data-ng-click="bookmarkDocument(doc.documentId)"
																	class="btn btn-rounded btn-success btn-sm btn-icon" enabled>
																	<i class="mdi mdi-bookmark-plus"></i>
																</button>
															</span>
															<span data-ng-show="doc.bookmark != null">
																<button  
																	type="button"
																	data-ng-click="bookmarkDocument(doc.documentId)"
																	class="btn btn-rounded btn-success btn-sm btn-icon" disabled>
																	<i class="mdi mdi-bookmark-check"></i>
																</button>
															</span>
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

<script type="text/ng-template" id="insertDocument.html">  
<div class="modal fade" tabindex="-1" role="dialog" id="modalInsert">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			 <div class="modal-header text-left">
                  <h4><i class="mdi mdi-file-document menu-icon text-dark"></i>New Document</h4>
             </div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md-12" data-ng-show="display.form">   
						<form  name="documentForm" class="form-horizontal" style="margin-top: 30px; margin-bottom: 30px">

							 <div class="form-group row">
								<label for="inputDocumentName" class="col-sm-3 col-form-label">Upload Document</label>
								<div class="col-sm-6">
									<input type="text" class="form-control form-control-sm" data-ng-model="documentData.documentName" name="documentName" placeholder="Document Name" required />
									<div data-ng-cloak data-ng-show="documentForm.documentName.$error.required && submitted" class="col-xs-12 msg-error"><i class="mdi mdi-close-circle"></i> Please, fill this field </div>
								</div>
								<div class="col-sm-1">
									<button type="button" ngf-select="btnUploadDocument($files)" class="btn btn-danger btn-sm"><i class="mdi mdi-dots-horizontal"></i></button>
								</div>
							</div>							
							<div class="form-group row">
								<label for="inputDocumentNumber" class="col-sm-3 col-form-label">Document Number</label>
								<div class="col-sm-9">
									<input type="text" class="form-control form-control-sm" data-ng-model="documentData.documentNumber" name="documentNumber" placeholder="Document Number" required />
									<div data-ng-cloak data-ng-show="documentForm.documentNumber.$error.required && submitted" class="col-xs-12 msg-error"><i class="mdi mdi-close-circle"></i> Please, fill this field </div>
								</div>
							</div>
							
							<div class="form-group row">
								<label for="inputDocumentType" class="col-sm-3 col-form-label">Document Type</label>
								<div class="col-sm-9">
									<input type="text" class="form-control form-control-sm" data-ng-model="documentData.documentType" name="documentType" placeholder="Document Type" required />
									<div data-ng-cloak data-ng-show="documentForm.documentType.$error.required && submitted" class="col-xs-12 msg-error"><i class="mdi mdi-close-circle"></i> Please, fill this field </div>
								</div>
							</div>
						</form>
				    </div>
					<div class="col-md-12 text-center" data-ng-show="display.confirm">
						<span>Are you sure you want to save this Document data?</span>
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

<script type="text/ng-template" id="editDocument.html">  
<div class="modal fade" tabindex="-1" role="dialog" id="modalEdit">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			 <div class="modal-header text-left">
                  <h4><i class="mdi mdi-pencil-box-outline menu-icon text-dark"></i>
						Edit Document
				  </h4>
              </div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md-12" data-ng-show="display.form">   
						<form name="documentForm" class="form-horizontal"
							style="margin-top: 30px; margin-bottom: 30px">
							<div class="form-group row">
								<label for="inputDocumentName"
									class="col-sm-3 col-form-label">Document Name</label>
								<div class="col-sm-9">
									<input type="text" class="form-control form-control-sm"
										data-ng-model="documentData.documentName" name="documentName"
										placeholder="Document Name" required />
									<div data-ng-cloak data-ng-show="documentForm.documentName.$error.required && submitted" class="col-xs-12 msg-error"><i class="mdi mdi-close-circle"></i> Please, fill this field </div>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputDocumentNumber"
									class="col-sm-3 col-form-label">Document Number</label>
								<div class="col-sm-9">
									<input type="text" class="form-control form-control-sm"
										data-ng-model="documentData.documentNumber" name="documentNumber"
										placeholder="Document Number" required />
									<div data-ng-cloak data-ng-show="documentForm.documentNumber.$error.required && submitted" class="col-xs-12 msg-error"><i class="mdi mdi-close-circle"></i> Please, fill this field </div>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputDocumentType"
									class="col-sm-3 col-form-label">Document Type</label>
								<div class="col-sm-9">
									<input type="text" class="form-control form-control-sm"
										data-ng-model="documentData.documentType" name="documentType"
										placeholder="Document Type" required />
									<div data-ng-cloak data-ng-show="documentForm.documentType.$error.required && submitted" class="col-xs-12 msg-error"><i class="mdi mdi-close-circle"></i> Please, fill this field </div>
								</div>
							</div>
						</form>
				    </div>
					<div class="col-md-12 text-center" data-ng-show="display.confirm">
						<span>Are you sure you want to save this Document data?</span>
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

<script type="text/ng-template" id="deleteDocument.html">
<div class="modal fade" tabindex="-1" role="dialog" id="modalDelete">
	<div class="modal-dialog " role="document">
		<div class="modal-content">
			<div class="modal-header text-left">
				<h4>
					<i class="mdi mdi-delete-forever menu-icon text-dark"></i> Delete
					Document
				</h4>
			</div>
			<form name="hierarchyForm" class="form-horizontal">
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12 text-center"
							data-ng-show="display.confirm">
							<div class="col-md-12">Are you sure you want to delete
								this Document data?</div>
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


<script type="text/ng-template" id="modalUploadBrowse.html">
        <div class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header text-left">
                        <h4 class="modal-title"><i class="fa fa-spinner fa-pulse"></i> Upload </h4>
                    </div>
                    <div class="modal-body text-left">
                        <div class="row">
							<div class="col-md-12 text-center" data-ng-show="display.loading">
                                <div class="progress progress-striped active no-margin">
									<div class="progress-bar progress-bar-danger" data-ng-style="{'width': bar.progress + '%'}">
										<span data-ng-style="bar.progress == 0 ? { 'color':'black' } : {'color':'white'}">{{bar.message}}</span>
									</div>
								</div>
                            </div>
							<message-error data-ng-show="display.error"></message-error>
                        </div>
                    </div>
                    <div class="modal-footer" data-ng-hide="display.loading">
						<div data-ng-show="display.error">
                        	<button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">
                            	<i class="fa fa-close"></i> Close
                        	</button>
						</div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
    </script>
    
<script type="text/ng-template" id="bookmarkDocument.html">
<div class="modal fade" tabindex="-1" role="dialog" id="modalBookmark">
	<div class="modal-dialog " role="document">
		<div class="modal-content">
			<div class="modal-header text-left">
				<h4>
					<i class="mdi mdi-bookmark menu-icon text-dark"></i> Bookmark
					Document
				</h4>
			</div>
			<form name="hierarchyForm" class="form-horizontal">
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12 text-center"
							data-ng-show="display.confirm">
							<div class="col-md-12">Are you sure you want to bookmark
								this Document?</div>
						</div>
						<message-loading data-ng-show="display.loading"></message-loading>
						<message-error data-ng-show="display.error"></message-error>
					</div>
				</div>
			</form>
			<div class="modal-footer" data-ng-hide="display.loading">
				<div data-ng-show="display.confirm">
					<button type="button" data-ng-click="btnBookmark()"
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