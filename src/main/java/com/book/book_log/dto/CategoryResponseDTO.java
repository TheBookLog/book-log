package com.book.book_log.dto;

import com.book.book_log.entity.Category;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class CategoryResponseDTO {
    private Integer id;
    private String name;
    private List<CategoryResponseDTO> subCategories;

    public CategoryResponseDTO(Category category) {
        this.id = category.getId();
        this.name = category.getName();
        this.subCategories = category.getSubCategories().stream()
                .map(CategoryResponseDTO::new)
                .collect(Collectors.toList());
    }
}