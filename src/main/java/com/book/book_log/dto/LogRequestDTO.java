package com.book.book_log.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class LogRequestDTO {
    private String bookTitle;
    private String author;
    private String publisher;
    private Integer categoryId;
    private String coverUrl;
    private Float rating;
    private String quote;
    private String content;
    private Boolean visibility;
    private LocalDate startDate;
    private LocalDate endDate;
}