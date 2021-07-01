package com.msi.dmsapp.entity;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "document")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocumentEntity {
	
	@Id
	@Column(name = "document_id")
	private String documentId;
	
	@Column(name = "document_number")
	private String documentNumber;
	
	@Column(name = "document_name")
	private String documentName;
	
	@Column(name = "document_type")
	private String documentType;
	
	@Column(name = "created_date")
	private Date createdDate;
	
	@Column(name = "created_by")
	private String createdBy;
	
	@Column(name = "modified_date")
	private Date modifiedDate;
	
	@Column(name = "modified_by")
	private String modifiedBy;
	
	@Column(name = "doc_image")
	private byte [] docImage;

	
}
