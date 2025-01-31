package com.book.book_log.dto;

import com.book.book_log.entity.Log;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class LogResponseDTO {
    private String id;
    private String userId;
    private String bookId;
    private String bookTitle;
    private Float rating;
    private String quote;
    private String content;
    private Boolean visibility;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public LogResponseDTO(Log log) {
        this.id = log.getId();
        this.userId = log.getUser().getId();
        this.bookId = log.getBook().getId();
        this.bookTitle = log.getBook().getTitle();
        this.rating = log.getRating();
        this.quote = log.getQuote();
        this.content = log.getContent();
        this.visibility = log.getVisibility();
        this.startDate = log.getStartDate();
        this.endDate = log.getEndDate();
        this.createdAt = log.getCreatedAt();
        this.updatedAt = log.getUpdatedAt();
    }
}