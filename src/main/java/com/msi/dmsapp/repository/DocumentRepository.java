package com.msi.dmsapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.msi.dmsapp.entity.DocumentEntity;


@Repository
public interface DocumentRepository extends JpaRepository<DocumentEntity, String> {

	DocumentEntity findByDocumentId(String documentId);
	
}
