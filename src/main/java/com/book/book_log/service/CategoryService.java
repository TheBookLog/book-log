package com.book.book_log.service;

import com.book.book_log.dto.CategoryResponseDTO;
import com.book.book_log.entity.Category;
import com.book.book_log.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepo;

    // 모든 카테고리 조회
    public List<CategoryResponseDTO> getAllCategories() {
        List<Category> categories = categoryRepo.findAll();
        return categories.stream()
                .map(CategoryResponseDTO::new)
                .collect(Collectors.toList());
    }

    // 특정 카테고리 조회(하위 카테고리 포함)
    public CategoryResponseDTO getCategoryById(Integer id) {
        Category category = categoryRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 카테고리를 찾을 수 없습니다: " + id));
        return new CategoryResponseDTO(category);
    }
}