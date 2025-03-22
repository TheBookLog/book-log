package com.book.book_log.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    @NotNull(message = "Username cannot be null")
    @Size(max = 50, message = "Username must be less than 50 characters")
    private String username;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private AgeGroup ageGroup;

    @Column(length = 50, nullable = false, unique = true)
    @NotNull(message = "OAuth ID cannot be null")
    private String oauthId;

    @Enumerated(EnumType.STRING)
    @Column(name = "oauth_provider", length = 20, nullable = false)
    @NotNull(message = "OAuth provider cannot be null")
    private OAuthProvider oauthProvider;

    @Lob
    @Column(name = "oauth_token", nullable = false)
    @NotNull(message = "OAuth token cannot be null")
    private String oauthToken;

    @Lob
    @Column(name = "refresh_token", nullable = false)
    @NotNull(message = "Refresh token cannot be null")
    private String refreshToken;

    @Column(name = "expires_at", nullable = false)
    @NotNull(message = "Token expiration date cannot be null")
    private LocalDateTime expiresAt;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Log> logs = new ArrayList<>();
}
