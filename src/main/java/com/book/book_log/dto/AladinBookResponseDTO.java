package com.book.book_log.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true) // 정의되지 않은 필드 무시
public class AladinBookResponseDTO {
    private String title;
    private List<BookItem> item;

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class BookItem {
        private String title; // 책 제목
        private String author; // 저자
        private String publisher; // 출판사
        private String cover; // 책 표지 URL
        private String isbn; // ISBN
    }
}