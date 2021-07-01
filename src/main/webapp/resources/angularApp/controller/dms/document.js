
define(['app'], function(dmsApp) {

	dmsApp
		.controller('documentController', function($scope, ModalService) {

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
			
			 $scope.status = true;
    		 $scope.headerCheckBox = function (){
         	 if($scope.header.selectedCheck){
         		angular.forEach($scope.tableData.data,function (value){
					value.checkStatus = true;
         		})
         	 }else{
         		angular.forEach($scope.tableData.data,function (value){
         			value.checkStatus = false;
         		})
         	}
         };

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
                             tableData : $scope.tableData
						}
					}
				}).then(function(modal) {
					modal.element.modal({
						backdrop: 'static',
						keyboard: false
					});

					modal.close.then(function(result) {
						console.log(result)
						if (result.success) {
							$scope.tableData.action.remove = true;
							
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

			$scope.deleteDocument = function(documentId) {
				 var deleteDocument = [];
	         	 angular.forEach($scope.tableData.data,function (value){
	         		if(value.checkStatus){
	         			deleteDocument.push(value);
	         		}
         		 });
				if(deleteDocument.length == 0){
						noty({
					layout: 'center',
				    theme: 'metroui', // or 'relax'
				    type: 'warning',
				    text: '<span><i class="fa fa-exclamation-circle"></i> Please select row in this table.</span>',
				    animation: {
				        open: 'animated fadeInUp', // Animate.css class names
				        close: 'animated fadeOut', // Animate.css class names
				    },
				    timeout: '3000',
				    closeWith: ['hover']
				});
					}else{
					ModalService.showModal({
					templateUrl: "deleteDocument.html",
					controller: "deleteDocumentController",
					inputs: {
						modalParams: {
							deleteDocument: deleteDocument
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
			}
			
			
		  	$scope.viewDocument = function (documentId){
	      		window.open("./viewDocument?documentId="+documentId+"#toolbar=0",
					"_blank",
					"toolbar=no,location=no,directories=no, status=no, menubar=no,copyhistory=no,scrollbars=yes,resizable=yes");
        	};

			$scope.bookmarkDocument = function(documentId) {
				ModalService.showModal({
					templateUrl: "bookmarkDocument.html",
					controller: "bookmarkDocumentController",
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
								text: '<span class="title"><i class="mdi mdi-check-circle"></i>Success</span><br><span> Document has been Bookmarked.</span>',
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
		
		

		.controller('insertDocumentController', function($scope,ModalService,$element,modalParams) {
			var tableData = modalParams.tableData
			$scope.display = {
				form: true,
				confirm: false,
				loading: false,
				error: false
			};
			
			$scope.btnUploadDocument = function(files){
				if (files && files.length) {
		        for (var i = 0; i < files.length; i++) {
		        	var filename = files[i].name.replace(/(.*)\.(.*?)$/, "$1");
		            var ext = files[i].name.substr(files[i].name.lastIndexOf('.') + 1);
					$scope.documentData = {
						documentName:filename,
						documentNumber: null,
						documentType: null,
						files:files[i],
		        		name:filename,
		        		ext:ext.toUpperCase(),
		        		progress:0,
		        		message:null
					}
					
					$scope.btnSave = function (){
						$element.modal('hide');
						 ModalService.showModal({
		                    templateUrl: "modalUploadBrowse.html",
		                    controller: "modalUploadBrowseController",
		                    inputs:{
		                        modalParams:{
		                        	document:$scope.documentData
		                        }
		                    }
		                }).then(function(modal) {
		                    modal.element.modal({
		                        backdrop: 'static',
		                        keyboard: false
		                    });

		                    modal.close.then(function(result) {
		                        if(result.success){
								tableData.action.remove = true;
								    noty({
		            					layout: 'bottomRight',
		            				    theme: 'metroui', // or 'relax'
		            				    type: 'success',
		            				    text: '<span class="title"><i class="fa fa-check-circle"></i> Success</span><span> Document has been uploaded.</span>',
		            				    animation: {
		            				        open: 'animated fadeInUp', // Animate.css class names
		            				        close: 'animated fadeOutRight', // Animate.css class names
		            				    },
		            				    timeout: '3000',
		            				    closeWith: ['hover']
		            				});
		                        }
		                    });
		                });
						
					}
					
		            }
		        }
			}
			

		})
		
		.controller('modalUploadBrowseController',function ($element,$scope,close,modalParams,$timeout,documentFactory,Upload){
			var document = modalParams.document;
			$scope.display = {
				loading:true,
				error:false
    	}
			$scope.bar = {
				message:'please wait',
				progress:null
    		};
	
			(function uploadDocument (){
	    		$scope.bar.message = 0 + '%';
	    		$scope.bar.progress = 0;
    		
			Upload.upload({
	            url: './insertDocument',
	           data : {
					file : document.files,
					fileName : document.name,
					documentNumber : document.documentNumber,
					documentType : document.documentType
			}
	        }).then(function (resp) {
	        	if(resp.data.success){
	        		
	        		$timeout(function (){
		        		var return_modal_close = {
	    					success:true
		    			};
		    			$element.modal('hide');
                        close(return_modal_close,500);
	        		},1000);
	        	}else{
	        		$scope.display.loading = false;
	        		$scope.display.error = true;
		            console.log('Error statusss: ' + resp.data );
	        	}
	        }, function (resp) {
	        	$scope.display.loading = false;
        		$scope.display.error = true;
	            console.log('Error statusss: ' + resp.data );
	            
	        }, function (evt) {
	        	if(evt.type == 'progress'){
	        		var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	        		$scope.bar.progress = progressPercentage;
	        		$scope.bar.message = progressPercentage + '%';
	        		
	        		
		            if($scope.bar.progress == 100){
		            	$timeout(function (){
		            		$scope.bar.message = "Moving to storage";
		            	},0);
		            }
	        	}
	        });
		})();
				
				
		
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
			var deleteDocument = modalParams.deleteDocument;

			$scope.display = {
				confirm: true,
				loading: false,
				error: false
			};

			$scope.btnDelete = function() {
				$scope.display.confirm = false;
				$scope.display.loading = true;

				var params = deleteDocument;
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
		
		.controller('bookmarkDocumentController', function($scope, documentFactory, modalParams, $timeout, $element, close) {
			$scope.documentId = modalParams.documentId;

			$scope.display = {
				confirm: true,
				loading: false,
				error: false
			};

			$scope.btnBookmark = function() {
				$scope.display.confirm = false;
				$scope.display.loading = true;

				var params = $scope.documentId;
				documentFactory.bookmarkDocument(params)
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