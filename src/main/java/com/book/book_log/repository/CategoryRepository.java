package com.book.book_log.repository;

import com.book.book_log.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    // 특정 카테고리 조회 (GET /api/categories/{id})
    Optional<Category> findById(Long id);

    // 특정 부모 카테고리에 속한 모든 하위 카테고리 조회
    List<Category> findByParentId(Long parentId);

    // 최상위 카테고리 (parent가 없는 카테고리) 조회
    List<Category> findByParentIsNull();
}