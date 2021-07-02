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
import com.msi.dmsapp.entity.NewsEntity;
import com.msi.dmsapp.service.NewsService;

@RestController
public class NewsController {
	
	@Autowired
	private NewsService newsService;

	@GetMapping("/getAllNews")
	public ResponseEntity<Map<String, Object>> findAll(@RequestParam(value = "limit", required = false) String limit,
			@RequestParam(value = "start", required = false) String start,
			@RequestParam(value = "page", required = false) String page,
			@RequestParam(value = "sorting", required = false) String sorting,
			@RequestParam(value = "params", required = false) String params,
			@RequestParam(value = "search", required = false) String search) throws JsonMappingException, JsonProcessingException {
		Map<String, Object> returnData = new HashMap<>();
		
		List<NewsEntity> newsList = newsService.findAll(search, Integer.valueOf(page), Integer.valueOf(limit));
		
		Number totalResult = newsService.getTotalData(search);

		returnData.put("success", true);
		returnData.put("tableResult", newsList);
		returnData.put("total", totalResult);
		return new ResponseEntity<Map<String, Object>>(returnData, HttpStatus.OK);
	}
	
	@PostMapping("/insertNews")
	public ResponseEntity<Map<String, Object>> insertNews(@RequestBody Map<String, Object> params) {
		Map<String, Object> paramsData = (Map<String, Object>) params.get("params");
		
		boolean status = newsService.insertNews(paramsData);
		
		Map<String, Object> returnData = new HashMap<>();
		returnData.put("success", status);
		return new ResponseEntity<Map<String, Object>>(returnData, HttpStatus.OK);
	}
	
	@PostMapping("/editNews")
	public ResponseEntity<Map<String, Object>> updateNews(@RequestBody Map<String, Object> params) {
		Map<String, Object> paramsData = (Map<String, Object>) params.get("params");
		
		boolean status = false;
		NewsEntity newsEntity = null;
		try {
			newsEntity = newsService.updateNews(paramsData);
			status = true;
		} catch (Exception e) {
			e.getMessage();
		}
		Map<String, Object> returnData = new HashMap<>();
		returnData.put("success", status);
		returnData.put("newNewsData", newsEntity);
		return new ResponseEntity<Map<String, Object>>(returnData, HttpStatus.OK);
	}
	
	@PostMapping("/deleteNews")
	public ResponseEntity<Map<String, Object>> deleteNews(@RequestBody Map<String, Object> params) {
		String newsId = (String) params.get("params");
		
		boolean status = newsService.deleteNews(newsId);
		
		Map<String, Object> returnData = new HashMap<>();
		returnData.put("success", status);
		return new ResponseEntity<Map<String, Object>>(returnData, HttpStatus.OK);
	}
}
