package com.msi.dmsapp.repository;

import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.msi.dmsapp.entity.NewsEntity;

@Repository
public class NewsDao {

	public List<NewsEntity> listNews(Session session, Map<String, Object> paramsnews) {
		Criteria cr = session.createCriteria(NewsEntity.class);
		if (paramsnews.containsKey("newsId")) {
			if (paramsnews.get("newsId") != null) {
				if (!paramsnews.get("newsId").toString().isEmpty()) {
					cr.add(Restrictions.eq("newsId",  paramsnews.get("newsId").toString()));
				}
			}
		}

//		if(paramsList.containsKey("remove")){
//			if(!paramsList.get("remove").toString().isEmpty()){
//				cr.add(Restrictions.ne("remove","1"));
//			}	
//		}

		
		this.additionalParams(cr, paramsnews);
		List<NewsEntity> list = (List<NewsEntity>) cr.list();
		return list;

	}

	public void additionalParams(Criteria cr, Map<String, Object> params) {

		if (params.containsKey("start")) {
			if (params.get("start") != null) {
				if (!params.get("start").toString().isEmpty()) {
					cr.setFirstResult(Integer.parseInt(params.get("start").toString()));
				} else {
					cr.setFirstResult(0);
				}
			} else {
				cr.setFirstResult(0);
			}
		} else {
			cr.setFirstResult(0);
		}

		if (params.containsKey("limit")) {
			if (params.get("limit") != null) {
				if (!params.get("limit").toString().isEmpty()) {
					cr.setMaxResults(Integer.parseInt(params.get("limit").toString()));
				}
			}
		}
		if (params.containsKey("sorting")) {
			if (params.get("sorting") != null) {
				Map<String, Object> mapSorting = (Map<String, Object>) params.get("sorting");
				if (mapSorting.get("type") != null) {
					if (mapSorting.get("type").toString().equalsIgnoreCase("asc")) {
						cr.addOrder(Order.asc((String) mapSorting.get("key")));
					} else if (mapSorting.get("type").toString().equalsIgnoreCase("desc")) {
						cr.addOrder(Order.desc((String) mapSorting.get("key")));
					}
				} else {
					cr.addOrder(Order.desc("modifiedDate"));
				}
			} else {
				cr.addOrder(Order.desc("modifiedDate"));
			}
		} else {
			cr.addOrder(Order.desc("modifiedDate"));
		}
	}
	
}
