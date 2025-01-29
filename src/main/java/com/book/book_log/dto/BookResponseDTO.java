package com.book.book_log.dto;

import com.book.book_log.entity.Book;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookResponseDTO {
    private String id;
    private String title;
    private String author;
    private String publisher;
    private String coverUrl;
    private String genreName;

    // 직접 필드를 설정하는 방식
    public BookResponseDTO(String id, String title, String author, String publisher, String coverUrl, String genreName) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.coverUrl = coverUrl;
        this.genreName = genreName;
    }

    // Book 엔티티를 직접 받아서 DTO로 변환하는 생성자 추가
    public BookResponseDTO(Book book) {
        this.id = book.getId();
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.publisher = book.getPublisher();
        this.coverUrl = book.getCoverUrl();
        this.genreName = book.getGenre() != null ? book.getGenre().getName() : null; // Genre가 null일 경우 대비
    }
}