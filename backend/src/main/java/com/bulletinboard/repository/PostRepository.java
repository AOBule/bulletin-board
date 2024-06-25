package com.bulletinboard.repository;

import com.bulletinboard.model.Post;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {
  @Query("SELECT p FROM Post p WHERE "
      + "(cast(:category as string) IS NULL OR p.category LIKE %:category%) AND "
      + "(cast(:startDate as timestamp) IS NULL OR p.createdAt >= :startDate) AND "
      + "(cast(:endDate as timestamp) IS NULL OR p.createdAt <= :endDate)")
  List<Post> findByFilters(
  @Param("category") String category,
  @Param("startDate") LocalDateTime startDate,
  @Param("endDate") LocalDateTime endDate);
}
