package com.msi.dmsapp.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.msi.dmsapp.entity.DocumentEntity;
import com.msi.dmsapp.entity.NewsEntity;
import com.msi.dmsapp.repository.NewsDao;
import com.msi.dmsapp.repository.NewsRepository;

@Service
public class NewsService {

	@Autowired
	private NewsRepository newsRepository;
	
	@Autowired
	private NewsDao newsDao;

	public List<NewsEntity> findAll(String search, int page, int limit) throws JsonMappingException, JsonProcessingException{
		String newsTitle = "";
		String newsNumber = "";
		String newsInformation = "";
		if (search != null) {
			ObjectMapper mapper = new ObjectMapper();
			Map<String, Object> mapSearch = mapper.readValue(search, new TypeReference<Map<String, Object>>() {
			});
			if (mapSearch.get("data") != null) {
				Map<String, Object> mapSearchData = (Map<String, Object>) mapSearch.get("data");
				
				newsTitle = (mapSearchData.get("newsTitle") != null) ? mapSearchData.get("newsTitle").toString() : "";
				newsNumber = (mapSearchData.get("newsNumber") != null) ? mapSearchData.get("newsNumber").toString() : "";
				newsInformation = (mapSearchData.get("newsInformation") != null) ? mapSearchData.get("newsInformation").toString() : "";
			}
		}
		NewsEntity news = new NewsEntity();
		news.setNewsTitle(newsTitle);
		news.setNewsNumber(newsNumber);
		news.setNewsInformation(newsInformation);

		ExampleMatcher customExampleMatcher = ExampleMatcher.matching()
				.withMatcher("newsTitle", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
				.withMatcher("newsNumber", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
				.withMatcher("newsInformation", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());

		Example<NewsEntity> NewsExample = Example.of(news, customExampleMatcher);
		
		Pageable paging = PageRequest.of(page, limit);
		 
        Page<NewsEntity> pagedResult = newsRepository.findAll(NewsExample, paging);
        
        return pagedResult.getContent();
	}

	public Number getTotalData(String search) throws JsonMappingException, JsonProcessingException {
		String newsTitle = "";
		String newsNumber = "";
		String newsInformation = "";
		if (search != null) {
			ObjectMapper mapper = new ObjectMapper();
			Map<String, Object> mapSearch = mapper.readValue(search, new TypeReference<Map<String, Object>>() {
			});
			if (mapSearch.get("data") != null) {
				Map<String, Object> mapSearchData = (Map<String, Object>) mapSearch.get("data");
				
				newsTitle = (mapSearchData.get("newsTitle") != null) ? mapSearchData.get("newsTitle").toString() : "";
				newsNumber= (mapSearchData.get("newsNumber") != null) ? mapSearchData.get("newsNumber").toString() : "";
				newsInformation = (mapSearchData.get("newsInformation") != null) ? mapSearchData.get("newsInformation").toString() : "";
			}
		}
		NewsEntity news = new NewsEntity();
		news.setNewsTitle(newsTitle);
		news.setNewsNumber(newsNumber);
		news.setNewsInformation(newsInformation);

		ExampleMatcher customExampleMatcher = ExampleMatcher.matching()
				.withMatcher("documentName", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
				.withMatcher("documentNumber", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
				.withMatcher("documentType", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());

		Example<NewsEntity> newsExample = Example.of(news, customExampleMatcher);
		
		return newsRepository.count(newsExample);
	}

	public boolean insertNews(Map<String, Object> paramsData) {
		boolean status = false;
		try {
			NewsEntity newsEntity = new NewsEntity();
			newsEntity.setNewsTitle(paramsData.get("newsTitle").toString());
			newsEntity.setNewsNumber(paramsData.get("newsNumber").toString());
			newsEntity.setNewsInformation(paramsData.get("newsInformation").toString());
			newsEntity.setCreatedDate(new Date());
			newsEntity.setCreatedBy("admin");
			newsEntity.setNewsId(UUID.randomUUID().toString());
			
			newsRepository.save(newsEntity);
			status = true;
		} catch (Exception e) {
			e.getMessage();
		}
		return status;
	}

	public NewsEntity updateNews(Map<String, Object> paramsData) {
		NewsEntity newsEntity = newsRepository.findByNewsId(paramsData.get("newsId").toString());
		newsEntity.setNewsTitle(paramsData.get("newsTitle").toString());
		newsEntity.setNewsNumber(paramsData.get("newsNumber").toString());
		newsEntity.setNewsInformation(paramsData.get("newsInformation").toString());		
		newsEntity.setModifiedDate(new Date());
		newsEntity.setModifiedBy("admin");
		
		return newsRepository.save(newsEntity);
	}

	public boolean deleteNews(String newsId) {
		boolean status = false;
		try {
			newsRepository.delete(newsRepository.findByNewsId(newsId));
			status = true;
		} catch (Exception e) {
			e.getMessage();
		}
		return status;
	}


	public List<NewsEntity> listNews(Session session, Map<String, Object> paramsnews) {
		return newsDao.listNews(session, paramsnews);
	}

}
