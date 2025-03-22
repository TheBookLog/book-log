package com.book.book_log.repository;

import com.book.book_log.entity.User;
import com.book.book_log.entity.OAuthProvider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUsername(String username);
    Optional<User> findByOauthIdAndOauthProvider(String oauthId, OAuthProvider oauthProvider);
}