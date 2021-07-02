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
@Table(name = "news")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewsEntity {
	
	@Id
	@Column(name = "news_id")
	private String newsId;
	
	@Column(name = "news_number")
	private String newsNumber;
	
	@Column(name = "news_title")
	private String newsTitle;
	
	@Column(name = "news_information")
	private String newsInformation;
	
	@Column(name = "created_date")
	private Date createdDate;
	
	@Column(name = "created_by")
	private String createdBy;
	
	@Column(name = "modified_date")
	private Date modifiedDate;
	
	@Column(name = "modified_by")
	private String modifiedBy;
}
