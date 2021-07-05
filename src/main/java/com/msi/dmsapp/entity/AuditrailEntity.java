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
public class AuditrailEntity {

	@Id
	@Column(name = "dms_audit_trail_id")
	private String dmsAuditrailId;
	
	@Column(name = "dms_user_name")
	private String dmsUserName;
	
	@Column(name = "dms_action")
	private String dmsAction;
	
	@Column(name = "dms_status")
	private String dmsStatus;
	
	@Column(name = "dms_data_new")
	private String dmsDataNew;
	
	@Column(name = "dms_data_old")
	private String dmsDataOld;
	
	@Column(name = "dms_created_date")
	private Date dmsCreateDate;
	
	@Column(name = "dms_created_by")
	private String dmsCreatedBy;

}
