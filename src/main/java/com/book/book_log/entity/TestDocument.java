package com.book.book_log.entity;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "test")
public class TestDocument {
    @Id
    private String id;
    private String message;
}
