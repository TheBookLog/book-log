package com.book.book_log.controller;

import com.book.book_log.dto.CategoryResponseDTO;
import com.book.book_log.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categorySvc;

    // 모든 카테고리 조회
    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
        List<CategoryResponseDTO> categories = categorySvc.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    // 특정 카테고리 조회(하위 카테고리 포함)
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> getCategoryById(@PathVariable Integer id) {
        CategoryResponseDTO category = categorySvc.getCategoryById(id);
        return ResponseEntity.ok(category);
    }
}