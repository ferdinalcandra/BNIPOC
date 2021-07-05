package com.msi.dmsapp.repository;

import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.msi.dmsapp.entity.NewsEntity;

@Repository
public interface NewsRepository extends JpaRepository<NewsEntity, String> {

	NewsEntity findByNewsId(String newsId);

//	List<NewsEntity> findBylistNews(Session session, Map<String, Object> paramsnews);

}
