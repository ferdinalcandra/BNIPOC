package com.msi.dmsapp.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.DocumentException;
import com.msi.dmsapp.service.GenerateDocumentService;

@RestController
public class GenerateDocumentController {
	
	@Autowired
	private GenerateDocumentService generateDocumentService;
	
	@PostMapping("/generateDocument")
	public ResponseEntity<Map<String, Object>> generateDocument(@RequestBody Map<String, Object> params) throws DocumentException, IOException {
		String documentContent = params.get("params").toString();
		boolean status = false;
		String path = null;
		try {
			path = generateDocumentService.generateDocument(documentContent.replace("<br>", "<br />"));
			status = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		Map<String, Object> returnData = new HashMap<>();
		returnData.put("success", status);
		returnData.put("path", path);
		return new ResponseEntity<Map<String, Object>>(returnData, HttpStatus.OK);
	}
	
	@GetMapping("/downloadGeneratedDocument")
	public void downloadGeneratedDocument(@RequestParam String path, HttpServletResponse response) {
		generateDocumentService.downloadGeneratedDocument(path, response);
	}
	
}
