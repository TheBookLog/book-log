package com.book.book_log.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class AladinBookResponseDTO {
    private String version;
    private String title;
    private List<BookItem> item;

    @Getter
    @Setter
    public static class BookItem {
        private String title; // 책 제목
        private String author; // 저자
        private String publisher; // 출판사
        private String cover; // 책 표지 URL
        private String isbn; // ISBN
    }
}
