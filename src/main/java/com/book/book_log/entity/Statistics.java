package com.book.book_log.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "statistics")
public class Statistics {
    @Id
    @Column(length = 36, unique = true, nullable = false, updatable = false)
    private String bookId; // 책 ID(Book 엔티티의 ID를 그대로 사용)

    @OneToOne
    @MapsId
    @JoinColumn(name = "book_id")
    private Book book; // 책 정보

    @Column(nullable = false)
    private Integer logCount = 0; // log 개수

    @Column(nullable = false)
    private Double averageRating = 0.0; // 평균 별점
}
