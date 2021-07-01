package com.msi.dmsapp.controller;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.msi.dmsapp.entity.DocumentEntity;
import com.msi.dmsapp.service.DocumentService;

@RestController
public class DocumentController {

	@Autowired
	private DocumentService documentService;

	@GetMapping("/getAllDocuments")
	public ResponseEntity<Map<String, Object>> findAll(@RequestParam(value = "limit", required = false) String limit,
			@RequestParam(value = "start", required = false) String start,
			@RequestParam(value = "page", required = false) String page,
			@RequestParam(value = "sorting", required = false) String sorting,
			@RequestParam(value = "params", required = false) String params,
			@RequestParam(value = "search", required = false) String search) throws JsonMappingException, JsonProcessingException {
		Map<String, Object> returnData = new HashMap<>();
		
		List<DocumentEntity> documentList = documentService.findAll(search, Integer.valueOf(page), Integer.valueOf(limit));
		
		Number totalResult = documentService.getTotalData(search);

		returnData.put("success", true);
		returnData.put("tableResult", documentList);
		returnData.put("total", totalResult);
		return new ResponseEntity<Map<String, Object>>(returnData, HttpStatus.OK);
	}
	
	  @PostMapping("/insertDocument") public ResponseEntity<Map<String, Object>>
	  insertDocument( 
		  @RequestParam(value = "file") MultipartFile  file,
		  @RequestParam(value = "fileName") String  fileName,
		  @RequestParam(value = "documentNumber") String  documentNumber,
		  @RequestParam(value = "documentType") String  documentType) throws IOException { 
		  
	  
		  boolean status = documentService.insertDocument(file,fileName,documentNumber,documentType);
		  
		  Map<String, Object> returnData = new HashMap<>();
		  returnData.put("success", status); 
		  return new ResponseEntity<Map<String, Object>>(returnData,
		  HttpStatus.OK); }

	@SuppressWarnings("unchecked")
	@PostMapping("/editDocument")
	public ResponseEntity<Map<String, Object>> updateDocument(@RequestBody Map<String, Object> params) {
		Map<String, Object> paramsData = (Map<String, Object>) params.get("params");
		
		boolean status = false;
		DocumentEntity documentEntity = null;
		try {
			documentEntity = documentService.updateDocument(paramsData);
			status = true;
		} catch (Exception e) {
			e.getMessage();
		}
		Map<String, Object> returnData = new HashMap<>();
		returnData.put("success", status);
		returnData.put("newDocumentData", documentEntity);
		return new ResponseEntity<Map<String, Object>>(returnData, HttpStatus.OK);
	}

	@SuppressWarnings("unchecked")
	@PostMapping("/deleteDocument")
	public ResponseEntity<Map<String, Object>> deleteDocument(@RequestBody Map<String, Object> params) {
		List<Map<String, Object>> listDeleteDocument = (List<Map<String, Object>>) params.get("params");
		boolean status = false;
		if(listDeleteDocument.size() > 0) {
			for (int i = 0; i < listDeleteDocument.size(); i++) {
				String documentId = listDeleteDocument.get(i).get("documentId").toString();
					 status = documentService.deleteDocument(documentId);
			}
		}
		Map<String, Object> returnData = new HashMap<>();
		returnData.put("success", status);
		return new ResponseEntity<Map<String, Object>>(returnData, HttpStatus.OK);
	}
	
	
	@GetMapping("/viewDocument")
	public ResponseEntity<Map<String, Object>> viewDocument(
			@RequestParam(value = "documentId", required = false) String documentId) throws IOException {
		if(documentId!= null) {
			documentService.viewDocument(documentId);
		}
		Map<String, Object> returnData = new HashMap<>();
		return new ResponseEntity<Map<String, Object>>(returnData, HttpStatus.OK);
	}
	
	@PostMapping("/bookmarkDocument")
	public ResponseEntity<Map<String, Object>> bookmarkDocument(@RequestBody Map<String, Object> params) {
		String documentId = (String) params.get("params");
		
		boolean status = documentService.bookmarkDocument(documentId);
		
		Map<String, Object> returnData = new HashMap<>();
		returnData.put("success", status);
		return new ResponseEntity<Map<String, Object>>(returnData, HttpStatus.OK);
	}

}
