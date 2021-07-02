package com.msi.dmsapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.msi.dmsapp.entity.NewsEntity;

@Repository
public interface NewsRepository extends JpaRepository<NewsEntity, String> {

	NewsEntity findByNewsId(String newsId);
}
