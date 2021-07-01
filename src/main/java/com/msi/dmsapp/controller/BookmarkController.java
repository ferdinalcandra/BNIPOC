package com.msi.dmsapp.controller;

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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.msi.dmsapp.entity.DocumentEntity;
import com.msi.dmsapp.service.BookmarkService;

@RestController
public class BookmarkController {

	@Autowired
	private BookmarkService bookmarkService;

	@GetMapping("/getAllBookmarks")
	public ResponseEntity<Map<String, Object>> findAll(@RequestParam(value = "limit", required = false) String limit,
			@RequestParam(value = "start", required = false) String start,
			@RequestParam(value = "page", required = false) String page,
			@RequestParam(value = "sorting", required = false) String sorting,
			@RequestParam(value = "params", required = false) String params,
			@RequestParam(value = "search", required = false) String search) throws JsonMappingException, JsonProcessingException {
		Map<String, Object> returnData = new HashMap<>();
		
		List<DocumentEntity> bookmarkList = bookmarkService.findAll(search, Integer.valueOf(page), Integer.valueOf(limit));
		
		Number totalResult = bookmarkService.getTotalData(search);

		returnData.put("success", true);
		returnData.put("tableResult", bookmarkList);
		returnData.put("total", totalResult);
		return new ResponseEntity<Map<String, Object>>(returnData, HttpStatus.OK);
	}	
	
	@PostMapping("/removeBookmark")
	public ResponseEntity<Map<String, Object>> bookmarkDocument(@RequestBody Map<String, Object> params) {
		String documentId = (String) params.get("params");
		
		boolean status = bookmarkService.removeBookmark(documentId);
		
		Map<String, Object> returnData = new HashMap<>();
		returnData.put("success", status);
		return new ResponseEntity<Map<String, Object>>(returnData, HttpStatus.OK);
	}

}
