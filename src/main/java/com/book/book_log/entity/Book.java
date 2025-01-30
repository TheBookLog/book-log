package com.book.book_log.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "book")
public class Book {
    @Id
    @UuidGenerator
    @Column(length = 36, unique = true, nullable = false, updatable = false)
    private String id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 100)
    private String author;

    @Column(nullable = false, length = 100)
    private String publisher;

    @Column(length = 255)
    private String coverUrl;

    @Column(nullable = false)
    private Integer categoryId;
}
