package com.book.book_log.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @UuidGenerator
    @Column(length = 36, unique = true, nullable = false, updatable = false)
    private String id;

    @Column(length = 50, nullable = false)
    private String username; // 설정하지 않을 경우 소셜 로그인 ID를 기본값으로 설정

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private AgeGroup age_group;

    @Column(length = 100, unique = true)
    private String email;

//    // 소셜 로그인 관련 필드(나중에 구현)
//    @Column(length = 20, nullable = false)
//    private String oauth_provider;
//
//    @Lob
//    @Column(nullable = false)
//    private String oauth_token;
//
//    @Lob
//    @Column(nullable = false)
//    private String refresh_token;
//
//    @Column(nullable = false)
//    private LocalDateTime expires_at;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}