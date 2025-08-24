package com.book.book_log.repository;

import com.book.book_log.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUsername(String username);
//    Optional<User> findByOauthIdAndOauthProvider(String oauthId, OAuthProvider oauthProvider);
}