package com.msi.dmsapp.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
import com.msi.dmsapp.repository.DocumentRepository;

@Service
public class DocumentService {
	
	@Autowired
	private DocumentRepository documentRepository;

	public List<DocumentEntity> findAll(String search, int page, int limit) throws JsonMappingException, JsonProcessingException {
		String documentName = "";
		String documentNumber = "";
		String documentType = "";
		if (search != null) {
			ObjectMapper mapper = new ObjectMapper();
			Map<String, Object> mapSearch = mapper.readValue(search, new TypeReference<Map<String, Object>>() {
			});
			if (mapSearch.get("data") != null) {
				Map<String, Object> mapSearchData = (Map<String, Object>) mapSearch.get("data");
				
				documentName = (mapSearchData.get("documentName") != null) ? mapSearchData.get("documentName").toString() : "";
				documentNumber = (mapSearchData.get("documentNumber") != null) ? mapSearchData.get("documentNumber").toString() : "";
				documentType = (mapSearchData.get("documentType") != null) ? mapSearchData.get("documentType").toString() : "";
			}
		}
		DocumentEntity document = new DocumentEntity();
		document.setDocumentName(documentName);
		document.setDocumentNumber(documentNumber);
		document.setDocumentType(documentType);

		ExampleMatcher customExampleMatcher = ExampleMatcher.matching()
				.withMatcher("documentName", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
				.withMatcher("documentNumber", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
				.withMatcher("documentType", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());

		Example<DocumentEntity> documentExample = Example.of(document, customExampleMatcher);
		
		Pageable paging = PageRequest.of(page, limit);
		 
        Page<DocumentEntity> pagedResult = documentRepository.findAll(documentExample, paging);
        
        return pagedResult.getContent();
	}

	public boolean insertDocument(Map<String, Object> paramsData) {
		boolean status = false;
		try {
			DocumentEntity documentEntity = new DocumentEntity();
			documentEntity.setDocumentName(paramsData.get("documentName").toString());
			documentEntity.setDocumentNumber(paramsData.get("documentNumber").toString());
			documentEntity.setDocumentType(paramsData.get("documentType").toString());
			documentEntity.setCreatedDate(new Date());
			documentEntity.setCreatedBy("admin");
			documentEntity.setDocumentId(UUID.randomUUID().toString());
			
			documentRepository.save(documentEntity);
			status = true;
		} catch (Exception e) {
			e.getMessage();
		}
		return status;
	}

	public DocumentEntity updateDocument(Map<String, Object> paramsData) {
		DocumentEntity documentEntity = documentRepository.findByDocumentId(paramsData.get("documentId").toString());
		documentEntity.setDocumentName(paramsData.get("documentName").toString());
		documentEntity.setDocumentNumber(paramsData.get("documentNumber").toString());
		documentEntity.setDocumentType(paramsData.get("documentType").toString());		
		documentEntity.setModifiedDate(new Date());
		documentEntity.setModifiedBy("admin");
		
		return documentRepository.save(documentEntity);
	}

	public boolean deleteDocument(String documentId) {
		boolean status = false;
		try {
			documentRepository.delete(documentRepository.findByDocumentId(documentId));
			status = true;
		} catch (Exception e) {
			e.getMessage();
		}
		return status;
	}

	public Number getTotalData(String search) throws JsonMappingException, JsonProcessingException {
		String documentName = "";
		String documentNumber = "";
		String documentType = "";
		if (search != null) {
			ObjectMapper mapper = new ObjectMapper();
			Map<String, Object> mapSearch = mapper.readValue(search, new TypeReference<Map<String, Object>>() {
			});
			if (mapSearch.get("data") != null) {
				Map<String, Object> mapSearchData = (Map<String, Object>) mapSearch.get("data");
				
				documentName = (mapSearchData.get("documentName") != null) ? mapSearchData.get("documentName").toString() : "";
				documentNumber = (mapSearchData.get("documentNumber") != null) ? mapSearchData.get("documentNumber").toString() : "";
				documentType = (mapSearchData.get("documentType") != null) ? mapSearchData.get("documentType").toString() : "";
			}
		}
		DocumentEntity document = new DocumentEntity();
		document.setDocumentName(documentName);
		document.setDocumentNumber(documentNumber);
		document.setDocumentType(documentType);

		ExampleMatcher customExampleMatcher = ExampleMatcher.matching()
				.withMatcher("documentName", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
				.withMatcher("documentNumber", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
				.withMatcher("documentType", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());

		Example<DocumentEntity> documentExample = Example.of(document, customExampleMatcher);
		
		return documentRepository.count(documentExample);
	}
	
}
