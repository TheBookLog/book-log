package com.book.book_log.repository;

import com.book.book_log.entity.OAuthProvider;
import com.book.book_log.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // 닉네임 중복 확인 (GET /api/users/check-username)
    boolean existsByUsername(String username);

    // 소셜 로그인 사용자를 식별하여 조회
    Optional<User> findByOauthIdAndOauthProvider(String oauthId, OAuthProvider oauthProvider);
}